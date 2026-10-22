import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Rating from '../../components/Rating/Rating';
import QuantityInput from '../../components/QuantityInput/QuantityInput';
import Accordion from '../../components/Accordion/Accordion';
import ProductCard from '../../components/ProductCard/ProductCard';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import Toast from '../../components/Toast/Toast';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { products } from '../../data/products';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  
  const product = products.find(p => p.id === parseInt(id, 10));
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(0);
      setSelectedMetal(product.metalOptions[0] || '');
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedMetal,
      selectedSize,
      quantity
    });
    setToastMessage(`Added ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: product.category, path: `/shop?category=${product.category}` },
    { label: product.name, path: `/product/${product.id}` }
  ];

  return (
    <div className="product-page">
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />

        <div className="product-layout">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="product-thumbnails">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`product-thumbnail-btn ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <ImageWithFallback src={img} alt="" aspectRatio="1/1" />
                </button>
              ))}
            </div>
            <div className="product-main-image">
              <ImageWithFallback
                src={product.images[activeImage]}
                alt={product.name}
                aspectRatio="1/1"
              />
            </div>
          </div>

          {/* Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-rating-wrap">
              <Rating rating={product.rating} count={product.reviewCount} size={16} />
            </div>
            <div className="product-prices">
              <span className="product-price">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="product-original-price">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="product-short-desc">{product.shortDescription}</p>

            {/* Options */}
            <div className="product-options">
              {product.metalOptions.length > 0 && (
                <div className="product-option-group">
                  <span className="product-option-label">Metal</span>
                  <div className="product-option-buttons">
                    {product.metalOptions.map(metal => (
                      <button
                        key={metal}
                        className={`product-option-btn ${selectedMetal === metal ? 'active' : ''}`}
                        onClick={() => setSelectedMetal(metal)}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes.length > 0 && (
                <div className="product-option-group">
                  <div className="product-option-label-wrap">
                    <span className="product-option-label">Size</span>
                    <button className="product-size-guide-btn">Size Guide</button>
                  </div>
                  <div className="product-option-buttons">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`product-option-btn product-option-btn--size ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="product-actions-wrap">
              <QuantityInput value={quantity} onChange={setQuantity} />
              <div className="product-actions">
                <button className="btn btn-outline product-btn-add" onClick={handleAddToCart}>
                  ADD TO BAG
                </button>
                <button
                  className={`product-btn-wishlist ${wishlisted ? 'active' : ''}`}
                  onClick={() => toggleItem(product)}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
            
            <button className="btn btn-primary btn-full product-btn-buy" onClick={handleBuyNow}>
              BUY IT NOW
            </button>

            {/* Badges */}
            <div className="product-badges">
              <div className="product-badge">
                <Truck size={18} />
                <span>Free shipping over $100</span>
              </div>
              <div className="product-badge">
                <RefreshCw size={18} />
                <span>Easy returns</span>
              </div>
              <div className="product-badge">
                <ShieldCheck size={18} />
                <span>Secure checkout</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="product-accordions">
              <Accordion title="Description" defaultOpen={true}>
                {product.description}
              </Accordion>
              <Accordion title="Materials">
                {product.materials}
              </Accordion>
              <Accordion title="Dimensions">
                {product.dimensions}
              </Accordion>
              <Accordion title="Shipping & Returns">
                {product.shippingReturns}
              </Accordion>
              <Accordion title="Care Instructions">
                {product.careInstructions}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="related-title">You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Toast
        message={toastMessage}
        isVisible={!!toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
