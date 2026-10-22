import { useState, useRef, useEffect } from 'react';
import { Diamond, ShieldCheck, Leaf, Play } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ImageWithFallback from '../../components/ImageWithFallback/ImageWithFallback';
import './About.css';

export default function About() {
  const videoRef1 = useRef(null);
  const [isPlaying1, setIsPlaying1] = useState(false);

  const videoRef2 = useRef(null);
  const [isPlaying2, setIsPlaying2] = useState(false);

  const togglePlay1 = () => {
    if (videoRef1.current) {
      if (isPlaying1) {
        videoRef1.current.pause();
      } else {
        videoRef1.current.play();
      }
    }
  };

  const togglePlay2 = () => {
    if (videoRef2.current) {
      if (isPlaying2) {
        videoRef2.current.pause();
      } else {
        videoRef2.current.play();
      }
    }
  };

  useEffect(() => {
    // Pause video if user scrolls it out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (entry.target === videoRef1.current && !videoRef1.current.paused) {
              videoRef1.current.pause();
            }
            if (entry.target === videoRef2.current && !videoRef2.current.paused) {
              videoRef2.current.pause();
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (videoRef1.current) {
      observer.observe(videoRef1.current);
    }
    if (videoRef2.current) {
      observer.observe(videoRef2.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        
        {/* Our Story */}
        <section className="about-story">
          <div className="about-story-text">
            <SectionTitle
              label="Our Story"
              title="Jewellery created for life's most meaningful moments."
              center={false}
            />
            <p>
              At Lumière, we believe that jewellery is more than an accessory—it's a physical 
              marker of a beautiful memory. Founded in 2025, our mission has been to craft 
              pieces that capture life's special occasions.
            </p>
            <p>
              From everyday elegance to once-in-a-lifetime milestones, we source the finest 
              materials and employ masterful artisans to create timeless designs that can be 
              passed down through generations.
            </p>
          </div>
          <div className="about-story-image">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop"
              alt="Lumière jewellery creation"
              aspectRatio="4/5"
            />
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="about-philosophy section">
          <SectionTitle title="Our Philosophy" center={true} />
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <Diamond size={32} />
              </div>
              <h3>Timeless Design</h3>
              <p>Classic pieces that never go out of style, designed for everyday wear and special occasions alike.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <ShieldCheck size={32} />
              </div>
              <h3>Exceptional Quality</h3>
              <p>Only the finest materials and craftsmanship go into every Lumière piece, ensuring lasting beauty.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <Leaf size={32} />
              </div>
              <h3>Ethical Sourcing</h3>
              <p>Responsibly sourced materials, with a commitment to sustainable practices and ethical supply chains.</p>
            </div>
          </div>
        </section>

        {/* Craftsmanship */}
        <section className="about-craftsmanship section">
          <div 
            className="craftsmanship-image-wrap" 
            onClick={togglePlay1} 
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <video 
              ref={videoRef1}
              src="/vdyo/taqin choq vid yo.mp4" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onPlay={() => setIsPlaying1(true)}
              onPause={() => setIsPlaying1(false)}
            >
              Your browser does not support the video tag.
            </video>
            
            {!isPlaying1 && (
              <button className="craftsmanship-play" aria-label="Play video" style={{ pointerEvents: 'none' }}>
                <Play size={24} fill="currentColor" />
              </button>
            )}
          </div>
          <div className="craftsmanship-text">
            <h2>Craftsmanship</h2>
            <p>
              Every piece is a result of meticulous attention to detail. 
              Our master artisans blend traditional techniques with modern 
              innovation to create jewellery that is flawless in its execution.
            </p>
          </div>
        </section>

        {/* Rings Video */}
        <section className="about-craftsmanship section" style={{ flexDirection: 'row' }}>
          <div 
            className="craftsmanship-image-wrap" 
            onClick={togglePlay2} 
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <video 
              ref={videoRef2}
              src="/vdyo/uzik.mp4" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onPlay={() => setIsPlaying2(true)}
              onPause={() => setIsPlaying2(false)}
            >
              Your browser does not support the video tag.
            </video>
            
            {!isPlaying2 && (
              <button className="craftsmanship-play" aria-label="Play video" style={{ pointerEvents: 'none' }}>
                <Play size={24} fill="currentColor" />
              </button>
            )}
          </div>
          <div className="craftsmanship-text">
            <h2>Signature Rings</h2>
            <p>
              Discover the perfect symbol of your love with our exquisite ring collection.
              Every ring is designed with passion and crafted to last a lifetime.
            </p>
          </div>
        </section>

        {/* Our Materials */}
        <section className="about-materials section">
          <SectionTitle title="Our Materials" center={true} />
          <div className="materials-grid">
            <div className="material-item">
              <div className="material-circle">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop"
                  alt="Diamonds"
                  aspectRatio="1/1"
                />
              </div>
              <h4>Diamonds</h4>
            </div>
            <div className="material-item">
              <div className="material-circle">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop"
                  alt="Gold"
                  aspectRatio="1/1"
                />
              </div>
              <h4>Gold</h4>
            </div>
            <div className="material-item">
              <div className="material-circle">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&h=200&fit=crop"
                  alt="Platinum"
                  aspectRatio="1/1"
                />
              </div>
              <h4>Platinum</h4>
            </div>
            <div className="material-item">
              <div className="material-circle">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop"
                  alt="Gemstones"
                  aspectRatio="1/1"
                />
              </div>
              <h4>Gemstones</h4>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
