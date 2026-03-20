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

  // Mock Premium Products as per user's image if API doesn't have them yet
  const premiumProductsData = [
    {
      id: 'mock-1',
      name: "M4 Ninja Spinner booster box Japanese Pokemon Card",
      category: "BOOSTER BOXES POKEMON",
      price: 278.00 / 4.60, // Convert to GBP roughly (4.6 is AED rate)
      image: "/slideshow/M4-back-300x167.webp",
      stock: 5
    },
    {
      id: 'mock-2',
      name: "OP-15 Adventure on KAMI's Island booster box Japanese ONE PIECE CARD",
      category: "BOOSTER BOXES ONE PIECE",
      price: 285.00 / 4.60,
      image: "/slideshow/OP-15-back-300x176.webp",
      stock: 5
    },
    {
      id: 'mock-3',
      name: "OP-15 Adventure on KAMI's Island Sealed Case (12 boxes) Japanese ONE PIECE CARD",
      category: "ONE PIECE",
      price: 3398.00 / 4.60,
      image: "/slideshow/OP-15-back-300x176.webp",
      stock: 2
    }
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?featured=true`);
        if (response.data && response.data.products) {
          setFeaturedProducts(response.data.products);
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

      {/* Premium Products Collection (Matching User Mockup) */}
      <section className="premium-collection-section">
        <div className="container">
          <div className="premium-grid">
            {premiumProductsData.map(product => (
              <PremiumProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* API Featured Products (Secondary) */}
      {!loading && featuredProducts.length > 0 && (
         <section className="featured-section">
            <div className="container">
              <h2 className="section-title">Explore Our Shop</h2>
              <div className="products-grid">
                {/* Fallback to regular cards for other products */}
                {featuredProducts.map(product => (
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
