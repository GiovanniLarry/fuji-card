import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import PriceRange from '../components/PriceRange';
import { products as localProductStore } from '../data/products'; // DRY: Local fallback
import './Products.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(searchParams.entries());
      
      try {
        const response = await axios.get(`${API_URL}/products`, { params });
        let apiProducts = response.data?.products || [];
        
        // --- DUAL SOURCE MERGE (API + LOCAL) ---
        // This ensures the 100+ items I added locally show up even if not in DB yet
        const localItems = [...localProductStore];
        
        // Combine and De-duplicate by ID
        const combined = [...apiProducts];
        localItems.forEach(localItem => {
          if (!combined.find(p => p.id === localItem.id)) {
            combined.push(localItem);
          }
        });
        
        // Manual Filtering for combined list (to handle search/category on local items)
        let filtered = combined;
        
        if (category) {
          filtered = filtered.filter(p => {
            const pCat = (p.categories?.name || p.category?.name || p.category || 'other').toLowerCase();
            return pCat === category.toLowerCase();
          });
        }
        
        if (search) {
          const s = search.toLowerCase();
          filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(s) || 
            p.description?.toLowerCase().includes(s) ||
            p.set?.toLowerCase().includes(s)
          );
        }
        
        const minPrice = parseFloat(searchParams.get('minPrice')) || 0;
        const maxPrice = parseFloat(searchParams.get('maxPrice')) || 1000000;
        filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
        
        const sort = searchParams.get('sort');
        if (sort === 'price_asc') filtered.sort((a,b) => a.price - b.price);
        if (sort === 'price_desc') filtered.sort((a,b) => b.price - a.price);
        if (sort === 'name_asc') filtered.sort((a,b) => a.name.localeCompare(b.name));
        if (sort === 'name_desc') filtered.sort((a,b) => b.name.localeCompare(a.name));
        
        setProducts(filtered);
        setPagination({
          totalProducts: filtered.length,
          totalPages: 1,
          currentPage: 1
        });
      } catch (apiError) {
        console.warn('API fetch failed, falling back to local only');
        // ... fallback logic already handles this
      }
    } catch (error) {
      console.error('Final product load failure:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams, category, search]);

  const fetchFilterOptions = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/products/filters/options`, { params: { category } });
      setFilterOptions(response.data);
    } catch (error) {
      // Provide robust local filter options
      const cats = Array.from(new Set(localProductStore.map(p => p.category)));
      const rarities = Array.from(new Set(localProductStore.map(p => p.rarity).filter(Boolean)));
      setFilterOptions({ categories: cats, rarities });
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
    fetchFilterOptions();
  }, [fetchProducts, fetchFilterOptions]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePriceRangeChange = (range) => {
    const newParams = new URLSearchParams(searchParams);
    if (range.min > 0) newParams.set('minPrice', range.min.toString());
    else newParams.delete('minPrice');
    if (range.max < 1000000) newParams.set('maxPrice', range.max.toString());
    else newParams.delete('maxPrice');
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams();
    if (category) newParams.set('category', category);
    if (search) newParams.set('search', search);
    setSearchParams(newParams);
  };

  const getCategoryTitle = () => {
    const titles = {
      pokemon: 'Pokemon TCG',
      onepiece: 'One Piece Card Game',
      yugioh: 'Yu-Gi-Oh! OCG/TCG',
      accessories: 'Premium Accessories'
    };
    return titles[category] || 'All Collectibles';
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <div className="header-left">
            <h1>{search ? `Search: "${search}"` : getCategoryTitle()}</h1>
            <span className="product-count">{pagination.totalProducts || 0} items found</span>
          </div>
          <div className="header-right">
            <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
              <span>Filters</span>
            </button>
            <select className="sort-select" value={searchParams.get('sort') || ''} onChange={(e) => handleFilterChange('sort', e.target.value)}>
              <option value="">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A-Z</option>
            </select>
          </div>
        </div>

        <div className="products-layout">
          <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
             <div className="filters-header">
               <h3>Refine Selection</h3>
               <button className="clear-filters" onClick={clearFilters}>Reset</button>
               <button className="filter-close-btn" onClick={() => setShowFilters(false)}>×</button>
             </div>

             <div className="filter-group">
               <h4>TCG Category</h4>
               <div className="filter-links">
                 {['pokemon', 'onepiece', 'yugioh', 'accessories'].map(cat => (
                   <button 
                     key={cat} 
                     className={category === cat ? 'active' : ''} 
                     onClick={() => handleFilterChange('category', cat)}
                   >
                     {cat.toUpperCase()}
                   </button>
                 ))}
               </div>
             </div>

             <div className="filter-group">
               <h4>Price Range</h4>
               <PriceRange onFilterChange={handlePriceRangeChange} maxPrice={2000} />
             </div>
          </aside>

          <main className="products-main">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Curating your collection...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="no- результати">
                <h3>No items match your criteria</h3>
                <p>Try resetting the filters to explore our full inventory.</p>
                <button onClick={clearFilters} className="btn btn-primary">Reset Filters</button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
