import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeSlider from '../components/HomeSlider';
import PremiumProductCard from '../components/PremiumProductCard';
import CurrencySelector from '../components/CurrencySelector';
import './Home.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Hardcoded Premium Data to ensure visibility regardless of API state (as requested "as first added")
const MARQUEE_PRODUCTS = [
  {
    id: "jp-m4-bb",
    name: "M4 Ninja Spinner booster box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 60.43,
    image: "/M4-bb-750x750.webp",
    featured: true,
    stock: 12
  },
  {
    id: "jp-op15-bb",
    name: "OP-15 Adventure on KAMI’s Island booster box Japanese ONE PIECE CARD",
    category: "Booster Boxes One Piece",
    price: 61.96,
    image: "/OP-15-bb-750x750.webp.webp",
    featured: true,
    stock: 15
  },
  {
    id: "jp-op15-case",
    name: "OP-15 Adventure on KAMI’s Island Sealed Case (12 boxes) Japanese ONE PIECE CARD",
    category: "One Piece",
    price: 738.70,
    image: "/OP-15-bb-750x750.webp.webp",
    featured: true,
    stock: 2
  },
  {
    id: "jp-m3-bb",
    name: "M3 Munikis Zero (Nihil Zero) booster box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 42.39,
    image: "/M3-bb-1024x1024.webp",
    featured: true,
    stock: 8
  },
  {
    id: "jp-m2a-bb",
    name: "M2a MEGA Dream ex booster box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 57.61,
    image: "/M2a-bb-750x750.webp",
    featured: true,
    stock: 10
  },
  {
    id: "jp-m2-bb",
    name: "M2 Inferno X booster box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 109.35,
    image: "/M2-bb-750x750.webp",
    featured: true,
    stock: 5
  },
  {
    id: "jp-eb04-bb",
    name: "EB-04 EGGHEAD CRISIS Booster Box Japanese ONE PIECE CARD",
    category: "Booster Boxes One Piece",
    price: 53.48,
    image: "/EB-04-bb-750x750.webp",
    featured: true,
    stock: 20
  },
  {
    id: "jp-op14-case",
    name: "OP-14 The Azure Sea’s Seven Sealed Case (12 boxes) Japanese ONE PIECE CARD",
    category: "One Piece",
    price: 671.74,
    image: "/OP-14-bb-750x750.webp.webp",
    featured: true,
    stock: 3
  },
  {
    id: "jp-m1l-bb",
    name: "M1L Mega Brave booster box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 58.91,
    image: "/M1L-bb-750x750.webp",
    featured: true,
    stock: 7
  },
  {
    id: "jp-m1s-bb",
    name: "M1S Mega Symphonia booster box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 55.00,
    image: "/M1S-bb-750x750.webp",
    featured: true,
    stock: 9
  },
  {
    id: "jp-sv11b-bb",
    name: "SV11B Black Bolt Booster Box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 103.91,
    image: "/SV11B-bb-750x750.webp",
    featured: true,
    stock: 6
  },
  {
    id: "jp-sv11w-bb",
    name: "SV11W White Flare Booster Box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 98.26,
    image: "/SV11W-bb-750x750.webp",
    featured: true,
    stock: 8
  },
  {
    id: "jp-sv10-bb",
    name: "SV10 Glory of Team Rocket Booster Box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 106.96,
    image: "/SV10-bb-750x750.webp",
    featured: true,
    stock: 5
  },
  {
    id: "jp-sv8a-bb",
    name: "SV8a Terastal Festival ex Booster box Japanese Pokemon Card",
    category: "Booster Boxes Pokemon",
    price: 89.78,
    image: "/SV8a-bb-750x750.webp",
    featured: true,
    stock: 12
  },
  {
    id: "jp-sp-fukuoka",
    name: "Pokemon Center Fukuoka Special Box Japanese Pokemon Card",
    category: "Pokemon",
    price: 157.17,
    image: "/SP-fukuoka-750x750.webp",
    featured: true,
    stock: 4
  },
  {
    id: "jp-sp-hiroshima",
    name: "Pokemon Center Hiroshima Special Box Japanese Pokemon Card",
    category: "Pokemon",
    price: 157.17,
    image: "/SP-hiroshima-1-750x750.webp",
    featured: true,
    stock: 4
  },
  {
    id: "jp-sp-tohoku",
    name: "Pokemon Center Tohoku Special Box Japanese Pokemon Card",
    category: "Pokemon",
    price: 134.57,
    image: "/SP-tohoku-750x750.webp",
    featured: true,
    stock: 6
  },
  {
    id: "jp-mbg-deck",
    name: "Starter Set MEGA Mega Gengar ex MBG Japanese Pokemon Card",
    category: "Pokemon",
    price: 17.83,
    image: "/MBG-deck-750x750.webp",
    featured: true,
    stock: 15
  },
  {
    id: "jp-mbd-deck",
    name: "Starter Set MEGA Mega Diancie ex MBD Japanese Pokemon Card",
    category: "Pokemon",
    price: 7.61,
    image: "/MBD-deck-750x750.webp",
    featured: true,
    stock: 20
  },
  {
    id: "jp-mc2025-promo",
    name: "McDonald’s 2025 Promo Pack Japanese Pokemon Card",
    category: "Pokemon",
    price: 19.78,
    image: "/MC2025-promo-pack-750x750.png.webp",
    featured: true,
    stock: 50
  }
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState(MARQUEE_PRODUCTS);
  const [loading, setLoading] = useState(false); // Default to false since we have marquee data

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?featured=true`);
        if (response.data && response.data.products && response.data.products.length > 0) {
          // If API returns data, merge it with marquee (avoiding duplicates)
          const apiIds = new Set(response.data.products.map(p => p.id));
          const marqueeOnly = MARQUEE_PRODUCTS.filter(p => !apiIds.has(p.id));
          setFeaturedProducts([...marqueeOnly, ...response.data.products]);
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page-container">
      {/* Top Controls Row */}
      <div className="home-top-bar">
        <div className="container">
          <CurrencySelector />
        </div>
      </div>

      {/* Main Announcement Slider */}
      <div className="home-main-hero">
        <div className="container">
          <HomeSlider />
        </div>
      </div>

      {/* Primary Products Grid (Directly below spinner) */}
      <section className="premium-collection-section">
        <div className="container">
          <div className="premium-grid">
            {featuredProducts.map(product => (
              <PremiumProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
