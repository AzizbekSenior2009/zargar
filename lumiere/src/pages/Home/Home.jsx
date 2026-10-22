import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProductCard from '../../components/ProductCard/ProductCard';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import { products, categories } from '../../data/products';
import './Home.css';

const heroImages = [
  {
    desktop: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&h=1080&fit=crop",
    mobile: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop"
  }
];

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentHeroIdx]); // Reset timer when manually clicked

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          {heroImages.map((img, idx) => (
            <div 
              key={idx} 
              className={`hero-slide ${idx === currentHeroIdx ? 'active' : ''}`}
            >
              <ImageWithFallback
                src={img.desktop}
                alt="Model wearing fine jewellery"
                className="hero-image desktop-only"
                aspectRatio="auto"
              />
              <ImageWithFallback
                src={img.mobile}
                alt="Model wearing fine jewellery"
                className="hero-image mobile-only"
                aspectRatio="auto"
              />
            </div>
          ))}
          <div className="hero-overlay" />
        </div>


        {heroImages.length > 1 && (
          <div className="hero-dots">
            {heroImages.map((_, idx) => (
              <button 
                key={idx}
                className={`hero-dot ${idx === currentHeroIdx ? 'active' : ''}`}
                onClick={() => setCurrentHeroIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
        
        <div className="container hero-content">
          <span className="gold-label">{t('home.timeless')}</span>
          <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
            {t('home.hero_title')}
          </h1>
          <p className="hero-subtitle">
            {t('home.hero_subtitle')}
          </p>
          <Link to="/collections" className="btn btn-primary">
            {t('home.explore')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Categories Row */}
      <section className="section categories">
        <div className="container">
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link to={`/shop?category=${cat.name}`} key={cat.name} className="category-item">
                <div className="category-image-wrap">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.name}
                    aspectRatio="1/1"
                    className="category-image"
                  />
                </div>
                <span className="category-name">{t(`nav.${cat.name}`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="section featured-products">
        <div className="container">
          <div className="featured-header">
            <SectionTitle
              title={t('home.featured')}
              subtitle={t('home.featured_sub')}
              center={false}
            />
            <Link to="/shop?sort=featured" className="featured-view-all">
              {t('home.view_all')} <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="banner">
        <div className="banner-bg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1920&h=800&fit=crop"
            alt="Fine jewellery banner"
            className="banner-image"
            aspectRatio="21/9"
          />
          <div className="banner-overlay" />
        </div>
        <div className="container banner-content">
          <h2 className="banner-title">{t('home.art')}</h2>
          <p className="banner-subtitle">{t('home.discover')}</p>
        </div>
      </section>
    </div>
  );
}
