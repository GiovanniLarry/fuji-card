import React from 'react';
import { cardLists } from '../data/cardlists';
import './CardLists.css';

const CardLists = () => {
  const renderGrid = (items, categoryLabel) => (
    <div className="gallery-section">
      <h2 className="section-title">{categoryLabel}</h2>
      <div className="gallery-grid">
        {items.map((item) => (
          <div key={item.id} className="gallery-item">
            <img src={item.image} alt={item.name} className="item-image" loading="lazy" />
            <div className="item-overlay">
              <span className="item-badge">{categoryLabel.split(' ')[0]} COLLECTION</span>
              <h3 className="item-name">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="card-lists-page">
      <div className="gallery-container">
        <header className="gallery-header">
          <h1>Japanese TCG Chronicles</h1>
          <p>
            Explore the vast world of Japanese POKEMON & ONE PIECE cards with our ultimate gallery, 
            thoughtfully curated for dedicated collectors and passionate fans. Discover everything 
            from iconic classics to the latest futuristic releases, featuring every series and 
            set exclusively available in the Japanese OCG market.
          </p>
        </header>

        {renderGrid(cardLists.pokemon.custom, "Pokemon Special Sets")}
        {renderGrid(cardLists.pokemon.scarlet_violet, "Pokemon Scarlet & Violet Series")}
        {renderGrid(cardLists.pokemon.sword_shield, "Pokemon Sword & Shield Series")}
        
        {renderGrid(cardLists.onepiece.main_sets, "One Piece Anniversary Series")}
        {renderGrid(cardLists.onepiece.special_sets, "One Piece Special Editions")}
      </div>
    </div>
  );
};

export default CardLists;
