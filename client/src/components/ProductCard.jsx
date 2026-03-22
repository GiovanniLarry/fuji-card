import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [adding, setAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const gallery = product.gallery || [product.image || product.image_url];
  const totalImages = gallery.length;

  const nextImage = (e) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = (e) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Debug log for mobile testing
    console.log('Add to cart clicked for product:', product);
    console.log('Product ID:', product.id);
    console.log('Product name:', product.name);
    
    try {
      setAdding(true);
      await addToCart(product.id, 1);
      console.log('Successfully added to cart:', product.id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to add to cart: ${error.response?.data?.error || error.message}`);
    } finally {
      setAdding(false);
    }
  };

  const placeholderImage = `https://via.placeholder.com/300x400?text=${encodeURIComponent(product.name)}`;

  // Handle both API formats (store.js and Supabase)
  const imageUrl = product.image || product.image_url;
  const category = product.category || product.categories?.name || 'Unknown';
  const setName = product.set || product.set_name || 'N/A';
  const originalPrice = product.originalPrice || product.original_price;

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img 
          src={imageError ? placeholderImage : gallery[currentImgIndex]} 
          alt={`${product.name} - view ${currentImgIndex + 1}`}
          onError={() => setImageError(true)}
        />
        
        {totalImages > 1 && (
          <div className="gallery-controls">
            <button className="gallery-btn prev" onClick={prevImage}>❮</button>
            <button className="gallery-btn next" onClick={nextImage}>❯</button>
            <div className="gallery-indicators">
              {gallery.map((_, i) => (
                <span 
                  key={i} 
                  className={`dot ${i === currentImgIndex ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImgIndex(i); }}
                />
              ))}
            </div>
          </div>
        )}
        {product.stock <= 3 && product.stock > 0 && (
          <span className="stock-badge low">Only {product.stock} left!</span>
        )}
        {product.stock === 0 && (
          <span className="stock-badge out">Sold Out</span>
        )}
        {product.featured && (
          <span className="featured-badge">Featured</span>
        )}
        {product.promo && product.discount && (
          <span className="promo-badge">-{product.discount}%</span>
        )}
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-set">{setName}</span>
          <span className="product-condition">{product.condition}</span>
        </div>
        
        {/* NEW: Description display per request */}
        <p className="product-card-description">{product.description}</p>

        {product.graded && (
          <div className="grading-info">
            <span className="grading-badge">{product.gradingCompany || product.grading_company} {product.grade}</span>
          </div>
        )}
        <div className="product-footer">
          {/* Price hidden per request: "simple cards no price but should have description and name" */}
          <div className="price-container" style={{ display: 'none' }}>
            {product.promo && originalPrice && (
              <span className="original-price">{formatPrice(originalPrice)}</span>
            )}
            <span className="product-price">{formatPrice(product.price)}</span>
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
          >
            {adding ? 'Adding...' : product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
