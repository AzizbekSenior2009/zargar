import './TopBar.css';
import { Link } from 'react-router-dom';
import { Heart, User } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export default function TopBar() {
  const { wishlistCount } = useWishlist();

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <p className="topbar-message">
          Free worldwide shipping on orders over $100
        </p>
        <div className="topbar-right">
          <select className="topbar-currency" aria-label="Select currency">
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
            <option value="GBP">GBP £</option>
          </select>
          <Link to="/wishlist" className="topbar-link">
            <Heart size={14} />
            <span>Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ''}</span>
          </Link>
          <Link to="/account" className="topbar-link">
            <User size={14} />
            <span>Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
