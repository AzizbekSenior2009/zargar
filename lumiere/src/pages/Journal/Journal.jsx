import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import { journalPosts, journalCategories } from '../../data/journal';
import './Journal.css';

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? journalPosts
    : journalPosts.filter(post => post.category === activeCategory);

  return (
    <div className="journal-page">
      <div className="container">
        <div className="journal-header">
          <SectionTitle
            title="Our Journal"
            subtitle="Guides, insights and stories from the world of fine jewellery"
            center={false}
          />
        </div>

        <div className="journal-categories-wrap">
          <div className="journal-categories">
            {journalCategories.map(cat => (
              <button
                key={cat}
                className={`journal-category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="journal-grid">
            {filteredPosts.map(post => (
              <Link to={`/journal/${post.slug}`} key={post.id} className="journal-card">
                <div className="journal-card-image-wrap">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    aspectRatio="3/2"
                    className="journal-card-image"
                  />
                  <span className="journal-card-category">{post.category}</span>
                </div>
                <div className="journal-card-content">
                  <h3 className="journal-card-title">{post.title}</h3>
                  <div className="journal-card-meta">
                    <span className="journal-card-date">{post.date}</span>
                    <span className="journal-card-dot">•</span>
                    <span className="journal-card-read">{post.readTime}</span>
                  </div>
                  <span className="journal-card-link">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="journal-empty">
            <p>No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
