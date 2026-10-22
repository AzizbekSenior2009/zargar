import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import { collections } from '../../data/collections';
import './Collections.css';

export default function Collections() {
  const regularCollections = collections.filter(c => !c.wide);
  const wideCollection = collections.find(c => c.wide);

  return (
    <div className="collections-page">
      <div className="container">
        <SectionTitle
          title="Our Collections"
          subtitle="Timeless pieces for every chapter of your story"
          center={false}
        />

        <div className="collections-mosaic">
          {regularCollections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/shop?collection=${collection.name}`}
              className={`collection-card ${index % 3 === 0 ? 'collection-card--large' : ''}`}
            >
              <div className="collection-card-bg">
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.name}
                  aspectRatio="4/5"
                  className="collection-image"
                />
                <div className="collection-overlay" />
              </div>
              <div className="collection-content">
                <h2>{collection.name}</h2>
                <span className="collection-link">
                  Explore Collection <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {wideCollection && (
          <div className="collections-wide">
            <Link
              to={`/shop?collection=${wideCollection.name}`}
              className="collection-card collection-card--wide"
            >
              <div className="collection-card-bg">
                <ImageWithFallback
                  src={wideCollection.image}
                  alt={wideCollection.name}
                  aspectRatio="21/9"
                  className="collection-image desktop-only"
                />
                <ImageWithFallback
                  src={wideCollection.image}
                  alt={wideCollection.name}
                  aspectRatio="4/5"
                  className="collection-image mobile-only"
                />
                <div className="collection-overlay" />
              </div>
              <div className="collection-content">
                <h2>{wideCollection.name}</h2>
                <span className="collection-link">
                  Explore Collection <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
