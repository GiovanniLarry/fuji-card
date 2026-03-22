import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl || !targetUrl.startsWith('https://www.fujicardshop.com/')) {
      return res.status(400).json({ error: 'Valid FujiCardShop URL is required' });
    }

    const { data } = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      timeout: 15000 
    });
    
    const $ = cheerio.load(data);
    
    // Remove noscript tags so we don't get duplicate fallback images shown
    $('noscript').remove();

    // Fix lazy loaded images before extracting HTML
    $('img').each((i, el) => {
      const $img = $(el);
      // Check common lazy loading attributes
      const realSrc = $img.attr('data-src') || 
                      $img.attr('data-lazy-src') || 
                      $img.attr('data-original') || 
                      $img.attr('data-opt-src') ||
                      $img.attr('data-srcset'); // sometimes the real URL is the first part of srcset
      
      if (realSrc) {
        // If it's a srcset value, just take the first URL for simplicity
        const firstUrl = realSrc.split(' ')[0];
        $img.attr('src', firstUrl);
      }

      // Remove srcset since it might contain lazy placeholders
      $img.removeAttr('srcset');
      $img.removeAttr('sizes');

      // Remove any inline styles that might hide the image (like opacity: 0)
      const style = $img.attr('style');
      if (style && style.includes('opacity')) {
        $img.attr('style', style.replace(/opacity:\s*0[^;]*;?/gi, 'opacity: 1;'));
      }
      
      // Also remove common lazy load classes just in case there's an external CSS rule hiding them
      $img.removeClass('lazyload lazy lazy-hidden');
      $img.removeAttr('loading'); 
    });

    // Attempt to extract the primary content area
    const $content = $('#content').length ? $('#content') : 
                     ($('#main').length ? $('#main') : 
                     ($('.page-wrapper').length ? $('.page-wrapper') : null));
                     
    const contentHtml = $content ? $content.html() : 'No cards found for this set. (Check console or network proxy)';

    res.json({ html: contentHtml });
  } catch (error) {
    console.error('Error proxying card list:', error);
    res.status(500).json({ error: 'Failed to fetch cards. The source site might be blocking the request or timing out.' });
  }
});

export default router;
