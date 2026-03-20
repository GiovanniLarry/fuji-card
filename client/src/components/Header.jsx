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
  const { user, isAuthenticated } = useAuth();
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
        <div className="container header-top-content">
          <div className="top-right-actions">
            <span className="shop-tagline">JAPANESE TCG SHOP</span>
            <Link to="/contact" className="contact-btn-mockup">
              <i className="fa-solid fa-envelope"></i>
              CONTACT
            </Link>
            <div className="social-nodes">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="node">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="node">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Bar - White */}
      <div className="header-middle-white">
        <div className="container middle-bar-grid">
          <Link to="/" className="brand-section">
            <img src="/logo.png" alt="Fuji Card Shop" className="logo-round" />
            <span className="brand-bold">FUJI CARD SHOP</span>
          </Link>

          <div className="search-composite">
            <form className="search-form-mockup" onSubmit={handleSearch}>
              <div className="all-dropdown-mockup" onClick={() => setMobileMenuOpen(true)}>
                <span>All</span>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
              <input 
                type="text" 
                placeholder="Which item are you looking for.." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-trigger">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          <div className="account-cart-section">
            <Link to={isAuthenticated ? "/account" : "/login"} className="user-info-mockup">
              <span className="user-name-text">{isAuthenticated ? (user?.name || 'ACCOUNT') : 'LOGIN'}</span>
              <div className="user-icon-circle">
                <i className="fa-solid fa-user"></i>
              </div>
            </Link>

            <div className="vertical-divider"></div>

            <Link to="/cart" className="cart-preview-mockup">
              <span className="cart-total-text">CART / £{(cart.totalPrice || 0).toFixed(2)}</span>
              <div className="cart-box-styled">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004aad" strokeWidth="2.5">
                  <rect x="3" y="8" width="18" height="13" rx="1.5"></rect>
                  <path d="M8 8V6a4 4 0 0 1 8 0v2"></path>
                </svg>
                <span className="cart-count-badge">{cart.itemCount}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Red */}
      <div className="header-bottom-red">
        <div className="container">
          <nav className="centered-nav">
            <ul className="nav-items-unified">
              <li><Link to="/">HOME <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/products?category=pokemon">POKEMON <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/products?category=onepiece">ONE PIECE <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/products?category=other">OTHER TCG <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/info">INFO <i className="fa-solid fa-chevron-down"></i></Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="mobile-drawer-v2 open">
             <div className="mobile-drawer-header">
                 <h3>CATEGORIES</h3>
                 <button onClick={() => setMobileMenuOpen(false)}><i className="fa-solid fa-xmark"></i></button>
             </div>
             <ul className="mobile-drawer-links">
                 <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>HOME</Link></li>
                 {categories.map(cat => (
                     <li key={cat.id}><Link to={`/products?category=${cat.name}`} onClick={() => setMobileMenuOpen(false)}>{cat.name.toUpperCase()}</Link></li>
                 ))}
             </ul>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
