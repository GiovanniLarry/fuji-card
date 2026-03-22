import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Info.css';

// Base URL for API calls if needed. Usually handled by proxy in development
// and relative in production, or environment variable.
const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

const SetItem = ({ name, url }) => {
  // We encode the fujicardshop URL into our own local query parameter
  const encodedUrl = encodeURIComponent(url || `https://www.fujicardshop.com/card-lists/${name.toLowerCase().replace(/ cardlist$/i, '').replace(/[^a-z0-9]+/g, '-')}/`);
  const href = `/info?url=${encodedUrl}`;

  const displayName = name.endsWith(' cardlist') ? name.slice(0, -9) : name;
  const hasCardlist = name.toLowerCase().includes('cardlist');

  return (
    <li className="info-list-item">
      <i className="fa-solid fa-circle bullet-dot"></i>
      {/* Target self to stay on the site */}
      <a href={href} className="item-link-text">
        {displayName} {hasCardlist ? '' : 'cardlist'}
      </a>
    </li>
  );
};

const ScrapedView = ({ url }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Clean URL to handle potential double encoding or issues
        const cleanUrl = decodeURIComponent(url);
        
        let targetApi = `/api/scrape?url=${encodeURIComponent(cleanUrl)}`;
        if (window.location.hostname === 'localhost') {
           targetApi = `http://localhost:5000/api/scrape?url=${encodeURIComponent(cleanUrl)}`;
        }

        const res = await axios.get(targetApi);
        if (res.data && res.data.html) {
          // Process the HTML simple fixes if needed (styles, scripts etc.)
          let cleanHtml = res.data.html;
          setHtmlContent(cleanHtml);
        } else {
          setError('No card data found for this set.');
        }
      } catch (err) {
        console.error('Failed to proxy card list:', err);
        setError('Failed to fetch the card list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [url]);

  return (
    <div className="scraped-content-view">
      <a href="/info" className="back-link" style={{display: 'inline-block', marginBottom: '20px', color: '#ffb300', textDecoration: 'none'}}>
        <i className="fa-solid fa-arrow-left" style={{marginRight: '8px'}}></i> Back to Card Lists
      </a>
      
      {loading && (
        <div style={{textAlign: 'center', padding: '50px', color: '#888'}}>
          <i className="fa-solid fa-spinner fa-spin fa-3x" style={{marginBottom:'20px'}}></i>
          <h3>Discovering Cards...</h3>
        </div>
      )}
      
      {error && !loading && (
        <div style={{color: '#ff4444', background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333'}}>
          {error}
        </div>
      )}

      {!loading && !error && htmlContent && (
        <div className="proxied-card-gallery" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      )}
    </div>
  );
};

const Info = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'lists';
  const targetUrl = searchParams.get('url');

  return (
    <div className="info-page">
      <div className="container">
        
        {targetUrl ? (
          <ScrapedView url={targetUrl} />
        ) : (
          <>
            <div className="discovery-header">
               <h1>{activeTab === 'news' ? 'LATEST TCG NEWS' : 'DISCOVER ALL CARDLISTS'}</h1>
            </div>

            {activeTab === 'news' ? (
              <div className="news-section">
                <article className="news-item">
                  <div className="news-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&q=80&w=1000" alt="One Piece Ban List" />
                    <span className="news-tag">ONE PIECE</span>
                  </div>
                  <div className="news-content">
                    <h3>Bandai Announces Major Update to One Piece Ban List (March 2026)</h3>
                    <p>Charlotte Pudding (OP06-047) has been officially banned due to its disruptive hand-resetting ability. Simultaneously, six older cards have been unbanned to prepare for the Block 2 competitive era.</p>
                    <span className="news-date">March 16, 2026</span>
                  </div>
                </article>

                <article className="news-item">
                  <div className="news-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=1000" alt="Set Rotation" />
                    <span className="news-tag">SYSTEM CHANGE</span>
                  </div>
                  <div className="news-content">
                    <h3>Historic Shift: Block Rotation Introduced for One Piece TCG</h3>
                    <p>Starting April 1, 2026, Bandai is implementing the first-ever Standard format rotation. Block 1 (OP01-04) will move to the Eternal format, keeping the Standard meta fresh and focused on newer releases.</p>
                    <span className="news-date">March 16, 2026</span>
                  </div>
                </article>

                <article className="news-item">
                  <div className="news-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&q=80&w=1000" alt="OP-15 Two Legends" />
                    <span className="news-tag">SET RELEASE</span>
                  </div>
                  <div className="news-content">
                    <h3>OP-15 'Two Legends' Global Launch: Gear 5 Luffy Takes Over</h3>
                    <p>The 15th expansion has arrived. Featuring revolutionary cards for Imu and the Five Elders, OP-15 is set to be the most impactful set of 2026 for both players and investors.</p>
                    <span className="news-date">March 07, 2026</span>
                  </div>
                </article>

                <article className="news-item">
                  <div className="news-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1000" alt="Treasure Cup" />
                    <span className="news-tag">TOURNAMENT</span>
                  </div>
                  <div className="news-content">
                    <h3>One Piece Card Game: Rules Update for Treasure Cup 2025/2026</h3>
                    <p>Bandai has issued a comprehensive rules patch targeting interaction timing for 'On Play' effects. This change aims to clarify complex board states during the upcoming Treasure Cup circuit.</p>
                    <span className="news-date">March 02, 2026</span>
                  </div>
                </article>

                <article className="news-item">
                  <div className="news-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1000" alt="OP-16 Leaks" />
                    <span className="news-tag">LEAKS</span>
                  </div>
                  <div className="news-content">
                    <h3>OP-16 Rumors: Three Manga Rares Confirmed for Next Expansion</h3>
                    <p>Early distributor leaks suggest OP-16 will feature an unprecedented three Manga Art secret rares. This marks a significant increase in chase card density for non-anniversary sets.</p>
                    <span className="news-date">February 28, 2026</span>
                  </div>
                </article>
              </div>
            ) : (
              <>
                <section className="card-section">
                  <h2>Pokémon card lists</h2>
                  <p className="intro-text">
                    Dive into the extensive world of Japanese Pokémon cards with our comprehensive list, meticulously compiled for collectors and fans alike. 
                    Here, you will discover everything from classic treasures to the newest additions, covering every series and set exclusively released in Japan.
                  </p>

                  <div className="series-divider">
                    <span>MEGA SERIES</span>
                  </div>
                  <ul className="card-list">
                    <SetItem name="Ninja Spinner" url="https://www.fujicardshop.com/card-lists/ninja-spinner/" />
                    <SetItem name="Munikis Zero (Nihil Zero)" url="https://www.fujicardshop.com/card-lists/munikis-zero-nihil-zero/" />
                    <SetItem name="MEGA Dream ex" url="https://www.fujicardshop.com/card-lists/mega-dream-ex/" />
                    <SetItem name="Inferno X" url="https://www.fujicardshop.com/card-lists/inferno-x/" />
                    <SetItem name="Mega Brave" url="https://www.fujicardshop.com/card-lists/mega-brave/" />
                    <SetItem name="Mega Symphonia" url="https://www.fujicardshop.com/card-lists/mega-symphonia/" />
                  </ul>

                  <div className="series-divider">
                    <span>SCARLET & VIOLET SERIES</span>
                  </div>
                  <ul className="card-list">
                    <SetItem name="White Flare" url="https://www.fujicardshop.com/card-lists/white-flare/" />
                    <SetItem name="Black Bolt" url="https://www.fujicardshop.com/card-lists/black-bolt/" />
                    <SetItem name="Glory of Team Rocket" url="https://www.fujicardshop.com/card-lists/glory-of-team-rocket/" />
                    <SetItem name="Heat Wave Arena" url="https://www.fujicardshop.com/card-lists/heat-wave-arena/" />
                    <SetItem name="Battle Partners" url="https://www.fujicardshop.com/card-lists/battle-partners/" />
                    <SetItem name="Terastal Festival Ex" url="https://www.fujicardshop.com/card-lists/terastal-festival-ex/" />
                    <SetItem name="Super Electric Breaker" url="https://www.fujicardshop.com/card-lists/super-electric-breaker/" />
                    <SetItem name="Paradise Dragona" url="https://www.fujicardshop.com/card-lists/paradise-dragona/" />
                    <SetItem name="Stella Miracle" url="https://www.fujicardshop.com/card-lists/stella-miracle/" />
                    <SetItem name="Night Wanderer" url="https://www.fujicardshop.com/card-lists/night-wanderer/" />
                    <SetItem name="Mask of change" url="https://www.fujicardshop.com/card-lists/mask-of-change/" />
                    <SetItem name="Crimson Haze" url="https://www.fujicardshop.com/card-lists/crimson-haze/" />
                    <SetItem name="Cyber Judge" url="https://www.fujicardshop.com/card-lists/cyber-judge/" />
                    <SetItem name="Wild Force" url="https://www.fujicardshop.com/card-lists/wild-force/" />
                    <SetItem name="Shiny Treasure Ex" url="https://www.fujicardshop.com/card-lists/shiny-treasure-ex/" />
                    <SetItem name="Ancient Roar" url="https://www.fujicardshop.com/card-lists/ancient-roar/" />
                    <SetItem name="Future Flash" url="https://www.fujicardshop.com/card-lists/future-flash/" />
                    <SetItem name="Raging Surf" url="https://www.fujicardshop.com/card-lists/raging-surf/" />
                    <SetItem name="Ruler of the Black Flame" url="https://www.fujicardshop.com/card-lists/ruler-of-the-black-flame/" />
                    <SetItem name="Pokémon 151" url="https://www.fujicardshop.com/card-lists/pokemon-151/" />
                    <SetItem name="Snow Hazard" url="https://www.fujicardshop.com/card-lists/snow-hazard/" />
                    <SetItem name="Clay Burst" url="https://www.fujicardshop.com/card-lists/clay-burst/" />
                    <SetItem name="Triplet Beat" url="https://www.fujicardshop.com/card-lists/triplet-beat/" />
                    <SetItem name="Violet Ex" url="https://www.fujicardshop.com/card-lists/violet-ex/" />
                    <SetItem name="Scarlet Ex" url="https://www.fujicardshop.com/card-lists/scarlet-ex/" />
                  </ul>

                  <div className="series-divider">
                    <span>SWORD & SHIELD SERIES</span>
                  </div>
                  <ul className="card-list">
                    <SetItem name="Vstar Universe" url="https://www.fujicardshop.com/card-lists/vstar-universe/" />
                    <SetItem name="Paradigm Trigger" url="https://www.fujicardshop.com/card-lists/paradigm-trigger/" />
                    <SetItem name="Incandescent Arcana" url="https://www.fujicardshop.com/card-lists/incandescent-arcana/" />
                    <SetItem name="Lost Abyss" url="https://www.fujicardshop.com/card-lists/lost-abyss/" />
                    <SetItem name="Pokémon GO" url="https://www.fujicardshop.com/card-lists/pokemon-go/" />
                    <SetItem name="Dark Phantasma" url="https://www.fujicardshop.com/card-lists/dark-phantasma/" />
                    <SetItem name="Time Gazer" url="https://www.fujicardshop.com/card-lists/time-gazer/" />
                    <SetItem name="Space Juggler" url="https://www.fujicardshop.com/card-lists/space-juggler/" />
                    <SetItem name="Battle Region" url="https://www.fujicardshop.com/card-lists/battle-region/" />
                    <SetItem name="Star Birth" url="https://www.fujicardshop.com/card-lists/star-birth/" />
                    <SetItem name="Start Deck 100" url="https://www.fujicardshop.com/card-lists/start-deck-100/" />
                    <SetItem name="Vmax Climax" url="https://www.fujicardshop.com/card-lists/vmax-climax/" />
                    <SetItem name="25th Anniversary Promo" url="https://www.fujicardshop.com/card-lists/25th-anniversary-promo/" />
                    <SetItem name="25th Anniversary Collection" url="https://www.fujicardshop.com/card-lists/25th-anniversary-collection/" />
                    <SetItem name="Fusion Arts" url="https://www.fujicardshop.com/card-lists/fusion-arts/" />
                    <SetItem name="Blue Sky Stream" url="https://www.fujicardshop.com/card-lists/blue-sky-stream/" />
                    <SetItem name="Towering Perfection" url="https://www.fujicardshop.com/card-lists/towering-perfection/" />
                    <SetItem name="Eevee Heroes" url="https://www.fujicardshop.com/card-lists/eevee-heroes/" />
                    <SetItem name="Jet Black Spirit" url="https://www.fujicardshop.com/card-lists/jet-black-spirit/" />
                    <SetItem name="Silver Lance" url="https://www.fujicardshop.com/card-lists/silver-lance/" />
                    <SetItem name="Matchless Fighters" url="https://www.fujicardshop.com/card-lists/matchless-fighters/" />
                    <SetItem name="Rapid Strike Master" url="https://www.fujicardshop.com/card-lists/rapid-strike-master/" />
                    <SetItem name="Single Strike Master" url="https://www.fujicardshop.com/card-lists/single-strike-master/" />
                    <SetItem name="Shiny Star V" url="https://www.fujicardshop.com/card-lists/shiny-star-v/" />
                    <SetItem name="Shocking Volt Tackle" url="https://www.fujicardshop.com/card-lists/shocking-volt-tackle/" />
                    <SetItem name="Legendary Heartbeat" url="https://www.fujicardshop.com/card-lists/legendary-heartbeat/" />
                    <SetItem name="Infinity Zone" url="https://www.fujicardshop.com/card-lists/infinity-zone/" />
                    <SetItem name="Explosive Flame Walker" url="https://www.fujicardshop.com/card-lists/explosive-flame-walker/" />
                    <SetItem name="Rebellion Crash" url="https://www.fujicardshop.com/card-lists/rebellion-crash/" />
                    <SetItem name="Vmax Rising" url="https://www.fujicardshop.com/card-lists/vmax-rising/" />
                    <SetItem name="Sword" url="https://www.fujicardshop.com/card-lists/sword/" />
                    <SetItem name="Shield" url="https://www.fujicardshop.com/card-lists/shield/" />
                    <SetItem name="Sword & Shield promos" url="https://www.fujicardshop.com/card-lists/sword-shield-promos/" />
                  </ul>
                </section>

                <section className="card-section">
                  <h2>One Piece card lists</h2>
                  <p className="intro-text">
                    Explore the vast world of Japanese One Piece cards with our ultimate card list, thoughtfully curated for dedicated collectors and passionate fans. 
                    Discover everything from iconic classics to the latest releases, featuring every series and set exclusively available in Japan.
                  </p>

                  <div className="series-divider">
                    <span>ONE PIECE - MAIN SETS</span>
                  </div>
                  <ul className="card-list">
                    <SetItem name="OP-15 Adventure on KAMI’s Island" url="https://www.fujicardshop.com/card-lists/op-15-adventure-on-kamis-island/" />
                    <SetItem name="OP-14 The Azure Sea’s Seven" url="https://www.fujicardshop.com/card-lists/op-14-the-azure-seas-seven/" />
                    <SetItem name="OP-13 Carrying on His Will" url="https://www.fujicardshop.com/card-lists/op-13-carrying-on-his-will/" />
                    <SetItem name="OP-12 Legacy of the Master" url="https://www.fujicardshop.com/card-lists/op-12-legacy-of-the-master/" />
                    <SetItem name="OP-11 A Fist of Divine Speed" url="https://www.fujicardshop.com/card-lists/op-11-a-fist-of-divine-speed/" />
                    <SetItem name="OP-10 Royal Blood" url="https://www.fujicardshop.com/card-lists/op-10-royal-blood/" />
                    <SetItem name="OP-09 Emperors in the new world" url="https://www.fujicardshop.com/card-lists/op-09-emperors-in-the-new-world/" />
                    <SetItem name="OP-08 Two Legends" url="https://www.fujicardshop.com/card-lists/op-08-two-legends/" />
                    <SetItem name="OP-07 500 Years in the Future" url="https://www.fujicardshop.com/card-lists/op-07-500-years-in-the-future/" />
                    <SetItem name="OP-06 Wings of the Captain" url="https://www.fujicardshop.com/card-lists/op-06-wings-of-the-captain/" />
                    <SetItem name="OP-05 Awakening of the New Era" url="https://www.fujicardshop.com/card-lists/op-05-awakening-of-the-new-era/" />
                    <SetItem name="OP-04 Kingdoms of Intrigue" url="https://www.fujicardshop.com/card-lists/op-04-kingdoms-of-intrigue/" />
                    <SetItem name="OP-03 Pillars of Strength" url="https://www.fujicardshop.com/card-lists/op-03-pillars-of-strength/" />
                    <SetItem name="OP-02 Paramount War" url="https://www.fujicardshop.com/card-lists/op-02-paramount-war/" />
                    <SetItem name="OP-01 Romance Dawn" url="https://www.fujicardshop.com/card-lists/op-01-romance-dawn/" />
                  </ul>

                  <div className="series-divider">
                    <span>ONE PIECE - SPECIAL SETS & DECKS</span>
                  </div>
                  <ul className="card-list">
                    <SetItem name="EB-04 EGGHEAD CRISIS" url="https://www.fujicardshop.com/card-lists/eb-04-egghead-crisis/" />
                    <SetItem name="EB-03 Heroines Edition" url="https://www.fujicardshop.com/card-lists/eb-03-heroines-edition/" />
                    <SetItem name="Premium Card Collection Best Selection Vol.3" url="https://www.fujicardshop.com/card-lists/premium-card-collection-best-selection-vol-3/" />
                    <SetItem name="PRB-01 One Piece Card The Best" url="https://www.fujicardshop.com/card-lists/prb-01-one-piece-card-the-best/" />
                    <SetItem name="EB-01 Memorial Collection" url="https://www.fujicardshop.com/card-lists/eb-01-memorial-collection/" />
                    <SetItem name="Premium Card Collection Uta" url="https://www.fujicardshop.com/card-lists/premium-card-collection-uta/" />
                    <SetItem name="Premium Card Collection Girls Edition" url="https://www.fujicardshop.com/card-lists/premium-card-collection-girls-edition/" />
                    <SetItem name="One Piece Card Game x 7-eleven collab" url="https://www.fujicardshop.com/card-lists/one-piece-card-game-x-7-eleven-collab/" />
                    <SetItem name="Champion Ship set" url="https://www.fujicardshop.com/card-lists/champion-ship-set/" />
                    <SetItem name="ST-13 Ultimate Deck the Three Brothers" url="https://www.fujicardshop.com/card-lists/st-13-ultimate-deck-the-three-brothers/" />
                    <SetItem name="ST-12 Start Deck Zoro & Sanji" url="https://www.fujicardshop.com/card-lists/st-12-start-deck-zoro-sanji/" />
                    <SetItem name="ST-11 Start Deck Side Uta" url="https://www.fujicardshop.com/card-lists/st-11-start-deck-side-uta/" />
                  </ul>
                </section>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Info;
