import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeSlider from '../components/HomeSlider';
import PremiumProductCard from '../components/PremiumProductCard';
import CurrencySelector from '../components/CurrencySelector';
import { products as localProductStore } from '../data/products'; // DRY: Import from central store
import './Home.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Home = () => {
  // Use the full MARQUEE as the primary state to ensure immediate, high-fidelity loading
  const MARQUEE_FEATURED = localProductStore.filter(p => p.featured);
  const [featuredProducts, setFeaturedProducts] = useState(MARQUEE_FEATURED);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?featured=true`);
        if (response.data && response.data.products && response.data.products.length > 0) {
          // Identify any unique API products not in our local marquee
          const localIds = new Set(MARQUEE_FEATURED.map(p => p.id));
          const extraProducts = response.data.products.filter(p => !localIds.has(p.id));
          
          setFeaturedProducts([...MARQUEE_FEATURED, ...extraProducts]);
        }
      } catch (error) {
        console.warn('API fetch failed, relying on marquee local store:', error);
      }
    };
    fetchFeatured();
  }, [MARQUEE_FEATURED]);

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
