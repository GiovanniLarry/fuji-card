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
              <i className="fa-solid fa-envelope"></i>
              CONTACT
            </Link>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fa-brands fa-instagram"></i>
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
              <div className="search-category-dropdown" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <i className="fa-solid fa-bars category-hamburger"></i>
                <span>All</span>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
              <input 
                type="text" 
                placeholder="Which item are you looking for.." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn-v2">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          <div className="header-user-actions">
            {isAuthenticated ? (
              <Link to="/account" className="user-profile-btn">
                <span className="user-name">{user?.name || 'ACCOUNT'}</span>
                <div className="user-avatar-placeholder">
                  <i className="fa-regular fa-user"></i>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="user-profile-btn">
                <span className="user-name">LOGIN</span>
                <div className="user-avatar-placeholder">
                  <i className="fa-regular fa-user"></i>
                </div>
              </Link>
            )}

            <div className="divider-line"></div>

            <Link to="/cart" className="cart-summary-v2">
              <span className="cart-label">CART / £{(cart.totalPrice || 0).toFixed(2)}</span>
              <div className="cart-icon-container">
                <i className="fa-solid fa-shopping-bag main-cart-icon"></i>
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
                   <li className="nav-item-v2">
                <Link to="/">HOME <i className="fa-solid fa-chevron-down"></i></Link>
              </li>
              <li className="nav-item-v2">
                <Link to="/products?category=pokemon">POKEMON <i className="fa-solid fa-chevron-down"></i></Link>
              </li>
              <li className="nav-item-v2">
                <Link to="/products?category=onepiece">ONE PIECE <i className="fa-solid fa-chevron-down"></i></Link>
              </li>
              <li className="nav-item-v2">
                <Link to="/products?category=other">OTHER TCG <i className="fa-solid fa-chevron-down"></i></Link>
              </li>
              <li className="nav-item-v2">
                <Link to="/info">INFO <i className="fa-solid fa-chevron-down"></i></Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-drawer-v2 ${mobileMenuOpen ? 'open' : ''}`}>
           <div className="mobile-drawer-header">
               <h3>CATEGORIES</h3>
               <button onClick={() => setMobileMenuOpen(false)}>
                   <i className="fa-solid fa-xmark"></i>
               </button>
           </div>
           <ul className="mobile-drawer-links">
               <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>HOME</Link></li>
               <li><Link to="/products" onClick={() => setMobileMenuOpen(false)}>ALL PRODUCTS</Link></li>
               <div className="drawer-divider"></div>
               {categories.map(cat => (
                   <li key={cat.id}><Link to={`/products?category=${cat.name}`} onClick={() => setMobileMenuOpen(false)}>{cat.name.toUpperCase()}</Link></li>
               ))}
           </ul>
      </div>
      {mobileMenuOpen && <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>}
    </header>
  );
};

export default Header;
