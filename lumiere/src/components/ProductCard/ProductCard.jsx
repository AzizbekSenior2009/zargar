import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import Rating from '../Rating/Rating';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedMetal: product.metalOptions[0],
      selectedSize: product.sizes[0] || null,
    };
    addItem(item);
    if (onAddToCart) onAddToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image-wrap">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          aspectRatio="1/1"
          className="product-card-image"
        />
        {product.new && <span className="product-card-badge">New</span>}
        {product.originalPrice && (
          <span className="product-card-badge product-card-badge--sale">
            Sale
          </span>
        )}
        <div className="product-card-actions">
          <button
            className={`product-card-action-btn ${wishlisted ? 'active' : ''}`}
            onClick={handleToggleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            className="product-card-action-btn"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
      <div className="product-card-info">
        <h3 className="product-card-name">{product.name}</h3>
        <Rating rating={product.rating} count={product.reviewCount} />
        <div className="product-card-prices">
          <span className="product-card-price">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="product-card-original-price">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
