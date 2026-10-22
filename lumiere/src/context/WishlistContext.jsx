import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

function loadWishlistFromStorage() {
  try {
    const saved = localStorage.getItem('lumiere_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(loadWishlistFromStorage);

  useEffect(() => {
    localStorage.setItem('lumiere_wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return items.some((item) => item.id === productId);
  };

  const toggleItem = (product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
      return false;
    } else {
      addItem(product);
      return true;
    }
  };

  const wishlistCount = items.length;

  const value = {
    items,
    wishlistCount,
    addItem,
    removeItem,
    isInWishlist,
    toggleItem,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
