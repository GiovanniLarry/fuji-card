import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeSlider from '../components/HomeSlider';
import PremiumProductCard from '../components/PremiumProductCard';
import CurrencySelector from '../components/CurrencySelector';
import './Home.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?featured=true`);
        if (response.data && response.data.products) {
          // Sort or Filter to ensure marquee products are at the top
          const marqueeIds = ["jp-m4-booster", "jp-op15-booster", "jp-op15-case"];
          const marquee = response.data.products.filter(p => marqueeIds.includes(p.id));
          const others = response.data.products.filter(p => !marqueeIds.includes(p.id));
          
          setFeaturedProducts([...marquee, ...others]);
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // First 3 products are the 'Premium' marquee row
  const premiumRow = featuredProducts.slice(0, 3);
  const secondaryFeatured = featuredProducts.slice(3, 7);

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

      {/* Premium Products Collection (From Database) */}
      <section className="premium-collection-section">
        <div className="container">
          {!loading && premiumRow.length > 0 ? (
            <div className="premium-grid">
              {premiumRow.map(product => (
                <PremiumProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : loading && (
            <div className="loading">Loading Premium Collection...</div>
          )}
        </div>
      </section>

      {/* API Featured Products (Secondary) */}
      {!loading && secondaryFeatured.length > 0 && (
         <section className="featured-section">
            <div className="container">
              <h2 className="section-title">Explore Our Shop</h2>
              <div className="products-grid">
                {secondaryFeatured.map(product => (
                  <PremiumProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
         </section>
      )}
    </div>
  );
};

export default Home;
