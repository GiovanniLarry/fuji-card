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

    const { data } = await axios.get(targetUrl);
    const $ = cheerio.load(data);
    
    // Attempt to extract the primary content area
    const contentHtml = $('#content').html() || $('#main').html() || $('.page-wrapper').html() || 'No cards found for this set.';

    // Rewrite relative URLs to absolute if any exist (e.g. for images)
    // Though usually WP has absolute.
    
    res.json({ html: contentHtml });
  } catch (error) {
    console.error('Error proxying card list:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

export default router;
