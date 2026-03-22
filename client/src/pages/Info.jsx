import React, { useState } from 'react';
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
  return (
    <div className="info-page">
      <div className="container">
        <div className="discovery-header">
           <h1>DISCOVER ALL CARDLISTS</h1>
        </div>

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
          <ul className="card-list grid-list">
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
            <SetItem name="Mask of change" id="mask" />
            <SetItem name="Crimson Haze" id="crimson" />
            <SetItem name="Cyber Judge" id="cyber" />
            <SetItem name="Wild Force" id="wild" />
            <SetItem name="Shiny Treasure Ex" id="shiny" />
            <SetItem name="Ancient Roar" id="ancient" />
            <SetItem name="Future Flash" id="future" />
            <SetItem name="Raging Surf" id="raging" />
            <SetItem name="Ruler of the Black Flame" id="ruler" />
            <SetItem name="Pokémon 151" id="p151" />
            <SetItem name="Snow Hazard" id="snow" />
            <SetItem name="Clay Burst" id="clay" />
            <SetItem name="Triplet Beat" id="triplet" />
            <SetItem name="Violet Ex" id="violet" />
            <SetItem name="Scarlet Ex" id="scarlet" />
          </ul>

          <div className="series-divider">
            <span>SWORD & SHIELD SERIES</span>
          </div>
          <ul className="card-list grid-list">
            <SetItem name="Vstar Universe" id="vstar" />
            <SetItem name="Paradigm Trigger" id="paradigm" />
            <SetItem name="Incandescent Arcana" id="arcana" />
            <SetItem name="Lost Abyss" id="lost" />
            <SetItem name="Pokémon GO" id="pgo" />
            <SetItem name="Dark Phantasma" id="phantasma" />
            <SetItem name="Time Gazer" id="time" />
            <SetItem name="Space Juggler" id="space" />
            <SetItem name="Battle Region" id="region" />
            <SetItem name="Star Birth" id="star" />
            <SetItem name="Start Deck 100" id="deck100" />
            <SetItem name="Vmax Climax" id="climax" />
            <SetItem name="25th Anniversary Promo" id="promo25" />
            <SetItem name="25th Anniversary Collection" id="coll25" />
            <SetItem name="Fusion Arts" id="fusion" />
            <SetItem name="Blue Sky Stream" id="blue_sky" />
            <SetItem name="Towering Perfection" id="towering" />
            <SetItem name="Eevee Heroes" id="eevee" />
            <SetItem name="Jet Black Spirit" id="jet_black" />
            <SetItem name="Silver Lance" id="silver" />
            <SetItem name="Matchless Fighters" id="fighters" />
            <SetItem name="Rapid Strike Master" id="rapid" />
            <SetItem name="Single Strike Master" id="single" />
            <SetItem name="Shiny Star V" id="shiny_star" />
            <SetItem name="Shocking Volt Tackle" id="volt" />
            <SetItem name="Legendary Heartbeat" id="heartbeat" />
            <SetItem name="Infinity Zone" id="infinity" />
            <SetItem name="Explosive Flame Walker" id="flame" />
            <SetItem name="Rebellion Crash" id="rebellion" />
            <SetItem name="Vmax Rising" id="rising" />
            <SetItem name="Sword" id="sword" />
            <SetItem name="Shield" id="shield" />
            <SetItem name="Sword & Shield promos" id="swsh_promos" />
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
            <SetItem name="OP-11 A Fist of Divine Speed" id="op11" />
            <SetItem name="OP-10 Royal Blood" id="op10" />
            <SetItem name="OP-09 Emperors in the new world" id="op09" />
            <SetItem name="OP-08 Two Legends" id="op08" />
            <SetItem name="OP-07 500 Years in the Future" id="op07" />
            <SetItem name="OP-06 Wings of the Captain" id="op06" />
            <SetItem name="OP-05 Awakening of the New Era" id="op05" />
            <SetItem name="OP-04 Kingdoms of Intrigue" id="op04" />
            <SetItem name="OP-03 Pillars of Strength" id="op03" />
            <SetItem name="OP-02 Paramount War" id="op02" />
            <SetItem name="OP-01 Romance Dawn" id="op01" />
          </ul>

          <div className="series-divider">
            <span>ONE PIECE - SPECIAL SETS & DECKS</span>
          </div>
          <ul className="card-list">
            <SetItem name="EB-04 EGGHEAD CRISIS" id="eb04" />
            <SetItem name="EB-03 Heroines Edition" id="eb03" />
            <SetItem name="Premium Card Collection Best Selection Vol.3" id="best3" />
            <SetItem name="PRB-01 One Piece Card The Best" id="prb01" />
            <SetItem name="EB-01 Memorial Collection" id="eb01" />
            <SetItem name="Premium Card Collection Uta" id="uta" />
            <SetItem name="Premium Card Collection Girls Edition" id="girls" />
            <SetItem name="One Piece Card Game x 7-eleven collab" id="seven_eleven" />
            <SetItem name="Champion Ship set" id="champion" />
            <SetItem name="ST-13 Ultimate Deck the Three Brothers" id="st13" />
            <SetItem name="ST-12 Start Deck Zoro & Sanji" id="st12" />
            <SetItem name="ST-11 Start Deck Side Uta" id="st11" />
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Info;
