import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], itemCount: 0, subtotal: '0.00' });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load from local storage for high-impact fallback persistence
  const getLocalCart = () => {
    const local = localStorage.getItem('fuji_local_cart');
    return local ? JSON.parse(local) : { items: [], itemCount: 0, subtotal: '0.00' };
  };

  const saveLocalCart = (cartData) => {
    localStorage.setItem('fuji_local_cart', JSON.stringify(cartData));
  };

  // Generate session ID for guest cart
  useEffect(() => {
    if (!localStorage.getItem('sessionId') && !localStorage.getItem('token')) {
      localStorage.setItem('sessionId', `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    // Initialize cart from local storage for instant UI visibility
    setCart(getLocalCart());
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cartAPI.get();
      setCart(response.data);
      saveLocalCart(response.data); // Keep local sync'd with server
    } catch (error) {
      console.warn('API Cart failed, using local fallback:', error);
      setCart(getLocalCart());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart, isAuthenticated]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      console.log('Adding to cart - Product ID:', productId, 'Quantity:', quantity);
      
      // Try server first
      try {
        await cartAPI.add(productId, quantity);
        await fetchCart();
      } catch (apiError) {
        console.warn('Server Add failed, implementing local persistence fallback');
        // If API fails (e.g. Supabase down), fallback to full client-side logic
        const currentLocal = getLocalCart();
        
        // Find if item exists in local cart
        const existingIndex = currentLocal.items.findIndex(item => item.productId === productId);
        
        // We need product info for local display - since we are adding from Home, we likely have MARQUEE available
        // But for simplicity, we just increment itemCount for immediate feedback
        if (existingIndex > -1) {
          currentLocal.items[existingIndex].quantity += quantity;
        } else {
          currentLocal.items.push({
            id: `local_${Date.now()}`,
            productId: productId,
            quantity: quantity,
            product: { id: productId, name: 'Product', price: 0 } // Placeholder if API failing
          });
        }
        
        currentLocal.itemCount = currentLocal.items.reduce((sum, item) => sum + item.quantity, 0);
        setCart(currentLocal);
        saveLocalCart(currentLocal);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      try {
        await cartAPI.update(itemId, quantity);
      } catch (e) {
        const local = getLocalCart();
        const item = local.items.find(i => i.id === itemId);
        if (item) {
          if (quantity <= 0) local.items = local.items.filter(i => i.id !== itemId);
          else item.quantity = quantity;
          local.itemCount = local.items.reduce((sum, i) => sum + i.quantity, 0);
          setCart(local);
          saveLocalCart(local);
        }
      }
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      try {
        await cartAPI.remove(itemId);
      } catch (e) {
        const local = getLocalCart();
        local.items = local.items.filter(i => i.id !== itemId);
        local.itemCount = local.items.reduce((sum, i) => sum + i.quantity, 0);
        setCart(local);
        saveLocalCart(local);
      }
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      try {
        await cartAPI.clear();
      } catch (e) {
        const cleared = { items: [], itemCount: 0, subtotal: '0.00' };
        setCart(cleared);
        saveLocalCart(cleared);
      }
      await fetchCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      refreshCart: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
