import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './Header.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState([]);
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className={`header-v2 ${isHeaderVisible ? 'visible' : 'hidden'}`}>
      {/* Top Bar - Blue */}
      <div className="header-top-blue">
        <div className="container header-content">
          <div className="top-left">
            <span>JAPANESE TCG SHOP</span>
          </div>
          <div className="top-right">
            <Link to="/contact" className="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              CONTACT
            </Link>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar - White */}
      <div className="header-middle-white">
        <div className="container header-content">
          <Link to="/" className="main-logo">
            <img src="/logo.png" alt="Fuji Card Shop" className="logo-img" />
          </Link>

          <div className="search-section">
            <form className="search-bar-v2" onSubmit={handleSearch}>
              <div className="search-category-dropdown">
                <span>All</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Which item are you looking for.." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn-v2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </form>
          </div>

          <div className="header-user-actions">
            {isAuthenticated ? (
              <Link to="/account" className="user-profile-btn">
                <span className="user-name">{user?.name || 'ACCOUNT'}</span>
                <div className="user-avatar-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="user-profile-btn">
                <span className="user-name">LOGIN</span>
                <div className="user-avatar-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </Link>
            )}

            <div className="divider-line"></div>

            <Link to="/cart" className="cart-summary-v2">
              <span className="cart-label">CART / £{(cart.totalPrice || 0).toFixed(2)}</span>
              <div className="cart-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004aad" strokeWidth="2.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span className="cart-count-v2">{cart.itemCount}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Nav Bar - Red */}
      <div className="header-bottom-red">
        <div className="container">
          <nav className="main-nav-v2">
            <ul className="nav-list-v2">
              <li className="nav-item-v2 has-dropdown">
                <Link to="/products?category=pokemon">POKEMON <span className="arrow-down"></span></Link>
              </li>
              <li className="nav-item-v2 has-dropdown">
                <Link to="/products?category=onepiece">ONE PIECE <span className="arrow-down"></span></Link>
              </li>
              <li className="nav-item-v2 has-dropdown">
                <Link to="/products?category=other">OTHER TCG <span className="arrow-down"></span></Link>
              </li>
              <li className="nav-item-v2">
                <Link to="/info">INFO <span className="arrow-down"></span></Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Button - absolutely positioned or visible on mobile only */}
      <button className="mobile-menu-v2-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-drawer-v2 ${mobileMenuOpen ? 'open' : ''}`}>
         {/* Drawer content here */}
      </div>
    </header>
  );
};

export default Header;
