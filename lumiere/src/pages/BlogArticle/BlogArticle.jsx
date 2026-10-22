import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { journalPosts } from '../../data/journal';
import './BlogArticle.css';

export default function BlogArticle() {
  const { slug } = useParams();
  const post = journalPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Article not found</h2>
        <Link to="/journal" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Journal
        </Link>
      </div>
    );
  }

  const relatedPosts = post.relatedPosts
    .map(id => journalPosts.find(p => p.id === id))
    .filter(Boolean);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Journal', path: '/journal' },
    { label: post.title, path: `/journal/${post.slug}` }
  ];

  return (
    <div className="article-page">
      {/* Hero Image */}
      <div className="article-hero">
        <ImageWithFallback
          src="https://i.pinimg.com/1200x/31/75/f3/3175f3cb0c51bd898f48e8e9dead4bd1.jpg"
          alt={post.title}
          aspectRatio="21/9"
          className="article-hero-image desktop-only"
        />
        <ImageWithFallback
          src="https://i.pinimg.com/1200x/31/75/f3/3175f3cb0c51bd898f48e8e9dead4bd1.jpg"
          alt={post.title}
          aspectRatio="16/9"
          className="article-hero-image mobile-only"
        />
      </div>

      <div className="container">
        <div className="article-layout">
          {/* Main Content */}
          <article className="article-main">
            <Breadcrumbs items={breadcrumbs} />
            
            <header className="article-header">
              <span className="article-category">{post.category}</span>
              <h1 className="article-title">{post.title}</h1>
              <div className="article-meta">
                <span>{post.date}</span>
                <span className="article-dot">•</span>
                <span>{post.author}</span>
                <span className="article-dot">•</span>
                <span>{post.readTime}</span>
              </div>
            </header>

            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="article-footer">
              <Link to="/journal" className="article-back-link">
                <ArrowLeft size={16} /> Back to Journal
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="article-sidebar">
            <div className="sidebar-sticky">
              <h3 className="sidebar-title">Related Articles</h3>
              <div className="sidebar-posts">
                {relatedPosts.map(related => (
                  <Link to={`/journal/${related.slug}`} key={related.id} className="sidebar-post">
                    <div className="sidebar-post-image">
                      <ImageWithFallback
                        src={related.image}
                        alt={related.title}
                        aspectRatio="1/1"
                      />
                    </div>
                    <div className="sidebar-post-info">
                      <h4>{related.title}</h4>
                      <span>{related.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
