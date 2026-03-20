import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import AnnouncementSlider from '../components/AnnouncementSlider';
import HomeSlider from '../components/HomeSlider';
import CurrencySelector from '../components/CurrencySelector';
import './Home.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log('Home useEffect triggered');
    fetchData();
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching home page data...');
      
      // Fetch categories
      const categoriesResponse = await axios.get(`${API_URL}/categories`);
      console.log('Categories response:', categoriesResponse.data);
      
      // Fetch featured products - show more on mobile, limited on desktop
      const limit = isMobile ? 12 : 8;
      const productsResponse = await axios.get(`${API_URL}/products`, { 
        params: { featured: 'true', limit } 
      });
      console.log('Featured products response:', productsResponse.data);
      
      if (categoriesResponse.data && categoriesResponse.data.categories) {
        console.log('Setting categories:', categoriesResponse.data.categories.length, 'categories');
        setCategories(categoriesResponse.data.categories);
      } else {
        console.log('No categories data in response');
        setCategories([]);
      }
      
      if (productsResponse.data && productsResponse.data.products) {
        setFeaturedProducts(productsResponse.data.products);
      } else {
        setFeaturedProducts([]);
      }
      
    } catch (error) {
      console.error('Failed to fetch data:', error);
      console.error('Error details:', error.response?.data || error.message);
      // Set empty arrays to prevent undefined errors
      setFeaturedProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMoreFeatured = async () => {
    try {
      setLoading(true);
      const limit = isMobile ? 20 : 16; // Show more when "View More" is clicked
      const productsResponse = await axios.get(`${API_URL}/products`, { 
        params: { featured: 'true', limit } 
      });
      
      if (productsResponse.data && productsResponse.data.products) {
        setFeaturedProducts(productsResponse.data.products);
        setShowAllFeatured(true);
      }
    } catch (error) {
      console.error('Failed to fetch more featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayProducts = showAllFeatured ? featuredProducts : featuredProducts.slice(0, isMobile ? 6 : 4);

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
    </div>
  );
};

export default Home;
