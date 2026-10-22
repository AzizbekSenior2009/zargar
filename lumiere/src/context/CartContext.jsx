import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  coupon: null,
  couponDiscount: 0,
};

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('lumiere_cart');
    return saved ? JSON.parse(saved) : initialState;
  } catch {
    return initialState;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedMetal === action.payload.selectedMetal &&
          item.selectedSize === action.payload.selectedSize
      );

      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + (action.payload.quantity || 1),
        };
        return { ...state, items: newItems };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (item, index) => index !== action.payload
        ),
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = [...state.items];
      if (action.payload.quantity <= 0) {
        newItems.splice(action.payload.index, 1);
      } else {
        newItems[action.payload.index] = {
          ...newItems[action.payload.index],
          quantity: action.payload.quantity,
        };
      }
      return { ...state, items: newItems };
    }

    case 'APPLY_COUPON': {
      if (action.payload.code === 'LUMIERE10') {
        return { ...state, coupon: 'LUMIERE10', couponDiscount: 10 };
      }
      return state;
    }

    case 'REMOVE_COUPON': {
      return { ...state, coupon: null, couponDiscount: 0 };
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem('lumiere_cart', JSON.stringify(state));
  }, [state]);

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = state.couponDiscount
    ? (subtotal * state.couponDiscount) / 100
    : 0;

  const shippingCost = subtotal >= 100 ? 0 : 9.95;

  const total = subtotal - discountAmount + shippingCost;

  const value = {
    items: state.items,
    coupon: state.coupon,
    couponDiscount: state.couponDiscount,
    cartCount,
    subtotal,
    discountAmount,
    shippingCost,
    total,
    dispatch,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: (index) => dispatch({ type: 'REMOVE_ITEM', payload: index }),
    updateQuantity: (index, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } }),
    applyCoupon: (code) => dispatch({ type: 'APPLY_COUPON', payload: { code } }),
    removeCoupon: () => dispatch({ type: 'REMOVE_COUPON' }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
