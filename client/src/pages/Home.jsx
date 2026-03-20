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
          // Priority to specifically identified premium Japanese products
          const jpProducts = response.data.products.filter(p => p.id.startsWith('jp-'));
          const others = response.data.products.filter(p => !p.id.startsWith('jp-'));
          
          setFeaturedProducts([...jpProducts, ...others]);
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
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

      {/* Primary Products Grid (Directly below spinner as requested) */}
      <section className="premium-collection-section">
        <div className="container">
          {!loading ? (
            <div className="premium-grid">
              {featuredProducts.map(product => (
                <PremiumProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="loading">Loading products...</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
