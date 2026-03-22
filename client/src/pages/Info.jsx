import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './Info.css';

const SetItem = ({ name, url }) => {
  // Try to generate a URL if one isn't provided, matching fujicardshop pattern
  const href = url || `https://www.fujicardshop.com/card-lists/${name.toLowerCase().replace(/ cardlist$/i, '').replace(/[^a-z0-9]+/g, '-')}/`;
  
  // Clean up the display name
  const displayName = name.endsWith(' cardlist') ? name.slice(0, -9) : name;
  const hasCardlist = name.toLowerCase().includes('cardlist');

  return (
    <li className="info-list-item">
      <i className="fa-solid fa-circle bullet-dot"></i>
      <a href={href} className="item-link-text" target="_blank" rel="noopener noreferrer">
        {displayName} {hasCardlist ? '' : 'cardlist'}
      </a>
    </li>
  );
};

const Info = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'lists';

  return (
    <div className="info-page">
      <div className="container">
        <div className="discovery-header">
           <h1>{activeTab === 'news' ? 'LATEST TCG NEWS' : 'DISCOVER ALL CARDLISTS'}</h1>
        </div>

        {activeTab === 'news' ? (
          <div className="news-section">
            <article className="news-item">
              <div className="news-image-wrapper">
                <img src="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=1000" alt="Pokemon Crimson Haze" />
                <span className="news-tag">POKEMON</span>
              </div>
              <div className="news-content">
                <h3>The Crimson Haze Returns: A Deep Dive into the Newest Japanese Set</h3>
                <p>Japanese collectors are bracing for the latest high-class release. Crimson Haze promises massive hitters with unique Art Rare prints that have already seen a 30% surge in pre-order volume.</p>
                <span className="news-date">March 21, 2026</span>
              </div>
            </article>

            <article className="news-item">
              <div className="news-image-wrapper">
                <img src="https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&q=80&w=1000" alt="One Piece OP-09" />
                <span className="news-tag">ONE PIECE</span>
              </div>
              <div className="news-content">
                <h3>Four Emperors Expansion: OP-09 Meta Shift Predictions</h3>
                <p>With the announcement of OP-09 'Four Emperors', the competition is heating up. Early leaks suggest a powerful new Manga Rare Shanks that is expected to break records in the collectors market.</p>
                <span className="news-date">March 19, 2026</span>
              </div>
            </article>

            <article className="news-item">
              <div className="news-image-wrapper">
                <img src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1000" alt="Gundam News" />
                <span className="news-tag">BUNDAI</span>
              </div>
              <div className="news-content">
                <h3>Gundam Emerge Vol. 1: Supply Shortages Hit Japanese Retailers</h3>
                <p>The first wave of the new Gundam TCG has sold out across major Tokyo districts. Secondary market prices for 'Emerge' boxes are already seeing a 50% premium as the game gains sudden traction with veteran collectors.</p>
                <span className="news-date">March 18, 2026</span>
              </div>
            </article>

            <article className="news-item">
              <div className="news-image-wrapper">
                <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1000" alt="Union Arena" />
                <span className="news-tag">UNION ARENA</span>
              </div>
              <div className="news-content">
                <h3>Union Arena Championship: Tokyo Masters Highlights</h3>
                <p>The latest Union Arena masters saw a surprise victory for the Gundam deck archetypes. We take a look at the top 8 lists and the secret tech cards that made it happen.</p>
                <span className="news-date">March 15, 2026</span>
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
      </div>
    </div>
  );
};

export default Info;
