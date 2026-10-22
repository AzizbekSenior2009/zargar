import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import QuantityInput from '../../components/QuantityInput/QuantityInput';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Cart.css';

export default function Cart() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    subtotal, 
    total, 
    shippingCost,
    coupon,
    couponDiscount,
    applyCoupon
  } = useCart();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [giftCardInput, setGiftCardInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    if (couponInput === 'LUMIERE10') {
      applyCoupon(couponInput);
      setCouponError('');
      setCouponInput('');
    } else if (couponInput) {
      setCouponError('Invalid coupon code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <SectionTitle title="Your Cart is Empty" center={true} />
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="btn btn-primary">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Your Cart</h1>
          <span className="cart-count">{items.length} items</span>
        </div>

        <div className="cart-layout">
          {/* Main Cart Items */}
          <div className="cart-main">
            <div className="cart-table-header desktop-only">
              <div className="cart-th-product">Product</div>
              <div className="cart-th-price">Price</div>
              <div className="cart-th-qty">Quantity</div>
              <div className="cart-th-subtotal">Subtotal</div>
            </div>

            <div className="cart-items">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item">
                  <div className="cart-item-product">
                    <button 
                      className="cart-item-remove mobile-only"
                      onClick={() => removeItem(index)}
                      aria-label="Remove item"
                    >
                      <X size={16} />
                    </button>
                    <Link to={`/product/${item.id}`} className="cart-item-image">
                      <ImageWithFallback src={item.image} alt={item.name} aspectRatio="1/1" />
                    </Link>
                    <div className="cart-item-details">
                      <Link to={`/product/${item.id}`} className="cart-item-name">
                        {item.name}
                      </Link>
                      <div className="cart-item-variants">
                        {item.selectedMetal && <span>Metal: {item.selectedMetal}</span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>
                      <div className="cart-item-price mobile-only">
                        ${item.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="cart-item-price desktop-only">
                    ${item.price.toLocaleString()}
                  </div>

                  <div className="cart-item-qty">
                    <QuantityInput
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(index, qty)}
                    />
                  </div>

                  <div className="cart-item-subtotal">
                    ${(item.price * item.quantity).toLocaleString()}
                    <button 
                      className="cart-item-remove desktop-only"
                      onClick={() => removeItem(index)}
                      aria-label="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <div className="cart-codes">
                <div className="cart-code-group">
                  <div className="cart-code-input-wrap">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Apply coupon"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                    />
                    <button className="btn btn-dark btn-sm" onClick={handleApplyCoupon}>
                      APPLY
                    </button>
                  </div>
                  {couponError && <p className="form-error">{couponError}</p>}
                  {coupon && <p className="cart-code-success">Coupon '{coupon}' applied (-{couponDiscount}%)</p>}
                </div>
                
                <div className="cart-code-group">
                  <div className="cart-code-input-wrap">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Gift card code"
                      value={giftCardInput}
                      onChange={(e) => setGiftCardInput(e.target.value)}
                    />
                    <button className="btn btn-dark btn-sm">
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
              
              <button className="btn btn-outline" onClick={() => window.location.reload()}>
                UPDATE CART
              </button>
            </div>
          </div>

          {/* Cart Totals Sidebar */}
          <div className="cart-sidebar">
            <div className="cart-totals">
              <h2>Cart Totals</h2>
              
              <div className="cart-totals-row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              
              {couponDiscount > 0 && (
                <div className="cart-totals-row cart-totals-discount">
                  <span>Discount ({couponDiscount}%)</span>
                  <span>-${((subtotal * couponDiscount) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="cart-totals-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free shipping' : `$${shippingCost.toFixed(2)}`}</span>
              </div>

              <div className="cart-totals-row cart-totals-final">
                <span>Total</span>
                <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <button 
                className="btn btn-primary btn-full cart-checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                PROCEED TO CHECKOUT
              </button>
              
              <Link to="/shop" className="cart-continue-link">
                CONTINUE SHOPPING <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
