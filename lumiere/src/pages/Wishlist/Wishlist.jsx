import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Wishlist.css';

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedMetal: product.metalOptions[0] || null,
      selectedSize: product.sizes[0] || null,
      quantity: 1
    });
  };

  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-empty">
            <SectionTitle title="Your Wishlist is Empty" center={true} />
            <p>Save items you love here to shop them later.</p>
            <Link to="/shop" className="btn btn-primary">
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <SectionTitle title="My Wishlist" center={false} />
          <span className="wishlist-count">{items.length} items</span>
        </div>

        <div className="wishlist-grid">
          {items.map((product) => (
            <div key={product.id} className="wishlist-card">
              <button 
                className="wishlist-remove"
                onClick={() => removeItem(product.id)}
                aria-label="Remove from wishlist"
              >
                <X size={16} />
              </button>
              
              <Link to={`/product/${product.id}`} className="wishlist-image-wrap">
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.name}
                  aspectRatio="1/1"
                />
              </Link>
              
              <div className="wishlist-info">
                <Link to={`/product/${product.id}`} className="wishlist-name">
                  {product.name}
                </Link>
                <span className="wishlist-price">${product.price.toLocaleString()}</span>
                
                <button 
                  className="btn btn-outline btn-full wishlist-add-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingBag size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
