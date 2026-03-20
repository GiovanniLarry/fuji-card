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
        <div className="container top-bar-content">
          <div className="top-left">
            <span>JAPANESE TCG SHOP</span>
          </div>
          <div className="top-right">
            <Link to="/contact" className="contact-link-blue">
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
        <div className="container middle-flex">
          <button className="mobile-hamburger" onClick={() => setMobileMenuOpen(true)}>
            <i className="fa-solid fa-bars"></i>
          </button>

          <Link to="/" className="site-brand">
            <img src="/logo.png" alt="Fuji Card Shop" className="logo-img-circular" />
            <span className="brand-name">FUJI CARD SHOP</span>
          </Link>

          <div className="action-icons">
            <button className="search-box-btn" onClick={() => navigate('/products')}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <Link to={isAuthenticated ? "/account" : "/login"} className="user-icon-btn">
              <i className="fa-solid fa-user"></i>
            </Link>
            <Link to="/cart" className="cart-box-btn">
              <div className="cart-svg-container">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004aad" strokeWidth="2.5">
                    <rect x="3" y="8" width="18" height="13" rx="2"></rect>
                    <path d="M8 8V6a4 4 0 0 1 8 0v2"></path>
                 </svg>
                 <span className="cart-count-overlay">{cart.itemCount}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Nav Bar - Red */}
      <div className="header-bottom-red">
        <div className="container">
          <nav className="scrolling-nav">
            <ul className="nav-list-inline">
              <li><Link to="/products?category=pokemon">POKEMON <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/products?category=onepiece">ONE PIECE <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/products?category=other">OTHER TCG <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/info">INFO <i className="fa-solid fa-chevron-down"></i></Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="mobile-drawer-v2 open">
             <div className="mobile-drawer-header">
                 <h3>MENU</h3>
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
