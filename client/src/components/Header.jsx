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
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
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
        // Fallback to primary Japanese TCG categories
        setCategories([
          { id: 'c1', name: 'pokemon' },
          { id: 'c2', name: 'onepiece' },
          { id: 'c3', name: 'other' }
        ]);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false); // CLOSE MENU AFTER SEARCH
    }
  };

  const toggleCategories = () => {
    // Determine screen size to either show drawer (mobile) or dropdown (desktop)
    if (window.innerWidth <= 768) {
      setMobileMenuOpen(true);
    } else {
      setCatDropdownOpen(!catDropdownOpen);
    }
  };

  return (
    <header className={`header-v2 ${isHeaderVisible ? 'visible' : 'hidden'}`}>
      {/* Top Bar - Blue */}
      <div className="header-top-blue">
        <div className="container top-bar-content">
          <div className="top-text-section">
             <span>JAPANESE TCG SHOP</span>
          </div>
          <div className="top-right-mockup">
            <Link to="/contact" className="contact-pill">
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

      {/* Main Bar - White */}
      <div className="header-middle-white">
        <div className="container middle-flex-container">
          <button className="mobile-only-hamburger" onClick={() => setMobileMenuOpen(true)}>
             <i className="fa-solid fa-bars"></i>
          </button>

          <Link to="/" className="branding-mockup">
            <img src="/logo.png" alt="Fuji Card Shop" className="logo-mockup-round" />
            <span className="name-mockup-bold">FUJI CARD SHOP</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="desktop-search-container">
            <form className="search-box-desktop" onSubmit={handleSearch}>
              <div className="search-all-dropdown-container">
                <div className="search-all-dropdown" onClick={toggleCategories}>
                  <span>All</span>
                  <i className={`fa-solid fa-chevron-down ${catDropdownOpen ? 'rotated' : ''}`}></i>
                </div>
                
                {catDropdownOpen && (
                  <ul className="desktop-categories-dropdown">
                    {categories.map(cat => (
                      <li key={cat.id}>
                        <Link to={`/products?category=${cat.name}`} onClick={() => setCatDropdownOpen(false)}>
                          {cat.name.toUpperCase()}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input 
                type="text" 
                placeholder="Which item are you looking for.." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-icon-trigger">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          <div className="user-cart-mockup">
            <Link to={isAuthenticated ? "/account" : "/login"} className="user-action-mockup">
              <span className="user-label-desktop">{isAuthenticated ? (user?.name || 'ACCOUNT') : 'LOGIN'}</span>
              <div className="user-circle-mockup">
                <i className="fa-solid fa-user"></i>
              </div>
            </Link>

            <div className="divider-desktop"></div>

            <button className="mobile-search-toggle" onClick={() => navigate('/products')}>
               <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <Link to="/cart" className="cart-action-mockup">
              <span className="cart-label-desktop">CART</span>
              <div className="cart-blue-bag">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004aad" strokeWidth="2.5">
                  <rect x="3" y="8" width="18" height="13" rx="1.5"></rect>
                  <path d="M8 8V6a4 4 0 0 1 8 0v2"></path>
                </svg>
                <span className="cart-digit">{cart.itemCount}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Nav Bar - Red */}
      <div className="header-bottom-red">
        <div className="container">
          <nav className="centered-navigation">
            <ul className="nav-links-mockup">
              <li><Link to="/products?category=pokemon">POKEMON <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/products?category=onepiece">ONE PIECE <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/products?category=other">OTHER TCG <i className="fa-solid fa-chevron-down"></i></Link></li>
              <li><Link to="/cardlists">CARD LISTS <i className="fa-solid fa-chevron-down"></i></Link></li>
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
              <button className="drawer-close" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <nav className="mobile-drawer-nav">
              <ul className="mobile-main-links">
                <li>
                  <Link to="/products?category=pokemon" onClick={() => setMobileMenuOpen(false)}>
                    POKEMON <i className="fa-solid fa-chevron-down"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=onepiece" onClick={() => setMobileMenuOpen(false)}>
                    ONE PIECE <i className="fa-solid fa-chevron-down"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=other" onClick={() => setMobileMenuOpen(false)}>
                    OTHER TCG <i className="fa-solid fa-chevron-down"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/cardlists" onClick={() => setMobileMenuOpen(false)}>
                    CARD LISTS <i className="fa-solid fa-chevron-down"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/info" onClick={() => setMobileMenuOpen(false)}>
                    INFO <i className="fa-solid fa-chevron-down"></i>
                  </Link>
                </li>
              </ul>

              {/* Mobile Integrated Search */}
              <div className="mobile-search-slot">
                <form className="mobile-search-integrated" onSubmit={handleSearch}>
                  <div className="mobile-search-all">
                    <span>All</span> <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className="mobile-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Which item are you looking for.." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </form>
              </div>

              <div className="mobile-auth-links">
                <Link to={isAuthenticated ? "/account" : "/login"} onClick={() => setMobileMenuOpen(false)}>
                  {isAuthenticated ? (user?.name?.toUpperCase() || 'ACCOUNT') : 'LOGIN / REGISTER'}
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
