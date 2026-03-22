import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { setShowcase, getDefaultShowcase } from '../data/setCards';
import './Info.css';

const SetItem = ({ name, id }) => {
  return (
    <li className="info-list-item">
      <i className="fa-solid fa-circle bullet-dot"></i>
      <a href={`/info?set=${id}`} className="item-link-text">
        {name} {name.toLowerCase().includes('cardlist') ? '' : 'cardlist'}
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
                <SetItem name="Ninja Spinner" id="ninja" />
                <SetItem name="Munikis Zero (Nihil Zero)" id="munikis" />
                <SetItem name="MEGA Dream ex" id="mega_dream" />
                <SetItem name="Inferno X" id="inferno_x" />
                <SetItem name="Mega Brave" id="mega_brave" />
                <SetItem name="Mega Symphonia" id="mega_symphonia" />
              </ul>

              <div className="series-divider">
                <span>SCARLET & VIOLET SERIES</span>
              </div>
              <ul className="card-list">
                <SetItem name="White Flare" id="white_flare" />
                <SetItem name="Black Bolt" id="black_bolt" />
                <SetItem name="Glory of Team Rocket" id="team_rocket" />
                <SetItem name="Heat Wave Arena" id="heat_wave" />
                <SetItem name="Battle Partners" id="partners" />
                <SetItem name="Terastal Festival Ex" id="terastal" />
                <SetItem name="Super Electric Breaker" id="electric" />
                <SetItem name="Paradise Dragona" id="dragona" />
                <SetItem name="Stella Miracle" id="stella" />
                <SetItem name="Night Wanderer" id="night" />
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
                <SetItem name="OP-15 Adventure on KAMI’s Island" id="op15" />
                <SetItem name="OP-14 The Azure Sea’s Seven" id="op14" />
                <SetItem name="OP-13 Carrying on His Will" id="op13" />
                <SetItem name="OP-12 Legacy of the Master" id="op12" />
                <SetItem name="OP-01 Romance Dawn" id="op01" />
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Info;
