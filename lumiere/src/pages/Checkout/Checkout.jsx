import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import './Checkout.css';

export default function Checkout() {
  const { items, subtotal, total, shippingCost, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'US',
    address: '',
    city: '',
    state: '',
    zip: '',
    sameAsShipping: true,
    shippingMethod: 'standard',
    paymentMethod: 'card'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    const newOrderNumber = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNumber);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="checkout-page checkout-success">
        <div className="container">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h1>Order Confirmed</h1>
            <p className="success-message">Thank you for your purchase.</p>
            <div className="order-number-box">
              <span>Order Number</span>
              <strong>{orderNumber}</strong>
            </div>
            <p className="success-note">
              We've sent a confirmation email to {formData.email} with your order details and tracking information.
            </p>
            <Link to="/shop" className="btn btn-primary">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Your cart is empty</h2>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>
            BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Already have an account? <Link to="/account">Log in</Link></p>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          {/* Main Form Area */}
          <div className="checkout-main">
            
            <section className="checkout-section">
              <h2>Billing Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input type="text" name="firstName" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input type="text" name="lastName" className="form-input" required onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" name="email" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input type="tel" name="phone" className="form-input" required onChange={handleChange} />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Country / Region *</label>
                <select name="country" className="form-select" value={formData.country} onChange={handleChange} required>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Address *</label>
                <input type="text" name="address" className="form-input" placeholder="Street address" required onChange={handleChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input type="text" name="city" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group" style={{ flex: '0 0 30%' }}>
                  <label className="form-label">State *</label>
                  <input type="text" name="state" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group" style={{ flex: '0 0 30%' }}>
                  <label className="form-label">ZIP *</label>
                  <input type="text" name="zip" className="form-input" required onChange={handleChange} />
                </div>
              </div>

              <label className="form-checkbox-label">
                <input 
                  type="checkbox" 
                  name="sameAsShipping" 
                  checked={formData.sameAsShipping} 
                  onChange={handleChange} 
                />
                <span className="checkbox-custom"></span>
                Ship to a different address?
              </label>
            </section>

            <section className="checkout-section">
              <h2>Shipping Method</h2>
              <div className="radio-group">
                <label className="radio-label">
                  <div className="radio-left">
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="standard" 
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    <div>
                      <strong>Free Shipping</strong>
                      <span> (3-5 business days)</span>
                    </div>
                  </div>
                  <span>$0.00</span>
                </label>
                
                <label className="radio-label">
                  <div className="radio-left">
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="express" 
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    <div>
                      <strong>Express Shipping</strong>
                      <span> (1-2 business days)</span>
                    </div>
                  </div>
                  <span>$25.00</span>
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <h2>Payment Method</h2>
              <div className="radio-group payment-methods">
                <label className="radio-label">
                  <div className="radio-left">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="card" 
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    <span>Credit / Debit Card</span>
                  </div>
                </label>
                {formData.paymentMethod === 'card' && (
                  <div className="payment-card-details">
                    <div className="form-group">
                      <input type="text" className="form-input" placeholder="Card Number" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <input type="text" className="form-input" placeholder="MM/YY" required />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-input" placeholder="CVC" required />
                      </div>
                    </div>
                  </div>
                )}

                <label className="radio-label">
                  <div className="radio-left">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="paypal" 
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    <span>PayPal</span>
                  </div>
                </label>

                <label className="radio-label">
                  <div className="radio-left">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="applepay" 
                      checked={formData.paymentMethod === 'applepay'}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    <span>Apple Pay</span>
                  </div>
                </label>

                <label className="radio-label">
                  <div className="radio-left">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="googlepay" 
                      checked={formData.paymentMethod === 'googlepay'}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    <span>Google Pay</span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Sidebar / Order Summary */}
          <div className="checkout-sidebar">
            <div className="order-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-items">
                {items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="summary-item">
                    <div className="summary-item-image">
                      <ImageWithFallback src={item.image} alt={item.name} aspectRatio="1/1" />
                      <span className="summary-item-qty">{item.quantity}</span>
                    </div>
                    <div className="summary-item-details">
                      <h4>{item.name}</h4>
                      <span>{item.selectedMetal} {item.selectedSize ? `/ ${item.selectedSize}` : ''}</span>
                    </div>
                    <div className="summary-item-price">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{formData.shippingMethod === 'express' ? '$25.00' : (shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`)}</span>
                </div>
                <div className="summary-row summary-final">
                  <span>Total</span>
                  <span>
                    ${(total + (formData.shippingMethod === 'express' ? 25 : 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full checkout-submit-btn">
                PLACE ORDER
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
