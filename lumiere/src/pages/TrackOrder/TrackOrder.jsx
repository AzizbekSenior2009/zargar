import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Search } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './TrackOrder.css';

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderNumber && email) {
      setIsTracking(true);
    }
  };

  return (
    <div className="track-page">
      <div className="container">
        <SectionTitle title="Track Your Order" center={true} />

        <div className="track-layout">
          {/* Form */}
          <div className="track-form-wrap">
            <p className="track-desc">
              To track your order please enter your Order ID in the box below and press the 
              "Track Order" button. This was given to you on your receipt and in the 
              confirmation email you should have received.
            </p>
            <form className="track-form" onSubmit={handleTrack}>
              <div className="form-group">
                <label className="form-label">Order Number *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. LUM-123456"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <Search size={16} /> TRACK ORDER
              </button>
            </form>
          </div>

          {/* Timeline */}
          {isTracking && (
            <div className="track-result">
              <div className="track-result-header">
                <h3>Order {orderNumber}</h3>
                <p>Expected Delivery: <strong>Oct 12, 2025</strong></p>
              </div>

              <div className="timeline">
                <div className="timeline-item completed">
                  <div className="timeline-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="timeline-content">
                    <h4>Order Received</h4>
                    <p>Oct 05, 2025 - 10:30 AM</p>
                    <span>Your order has been received and confirmed.</span>
                  </div>
                </div>

                <div className="timeline-item completed">
                  <div className="timeline-icon">
                    <Package size={20} />
                  </div>
                  <div className="timeline-content">
                    <h4>Processing</h4>
                    <p>Oct 06, 2025 - 09:15 AM</p>
                    <span>Your items are being carefully picked and packed.</span>
                  </div>
                </div>

                <div className="timeline-item active">
                  <div className="timeline-icon">
                    <Truck size={20} />
                  </div>
                  <div className="timeline-content">
                    <h4>Shipped</h4>
                    <p>Oct 07, 2025 - 02:40 PM</p>
                    <span>Your order has been handed over to the carrier.</span>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">
                    <Truck size={20} />
                  </div>
                  <div className="timeline-content">
                    <h4>Out for Delivery</h4>
                    <p>Pending</p>
                    <span>The package is out for delivery.</span>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="timeline-content">
                    <h4>Delivered</h4>
                    <p>Pending</p>
                    <span>The package has been delivered.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
