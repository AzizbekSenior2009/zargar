import { useState } from 'react';
import { Send } from 'lucide-react';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="newsletter">
      <div className="container newsletter-inner">
        <div className="newsletter-content">
          <h3>Join the Lumière world</h3>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input-group">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
              aria-label="Email address"
            />
            <button type="submit" className="newsletter-btn" aria-label="Subscribe">
              <Send size={18} />
            </button>
          </div>
          {subscribed && (
            <p className="newsletter-success">Thank you for subscribing!</p>
          )}
        </form>
      </div>
    </div>
  );
}
