import { Star } from 'lucide-react';
import './Rating.css';

export default function Rating({ rating, count, size = 14 }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} size={size} className="star star--full" fill="currentColor" />
      );
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <span key={i} className="star-half-wrap" style={{ width: size, height: size }}>
          <Star size={size} className="star star--empty" />
          <span className="star-half-overlay" style={{ width: size / 2 }}>
            <Star size={size} className="star star--full" fill="currentColor" />
          </span>
        </span>
      );
    } else {
      stars.push(
        <Star key={i} size={size} className="star star--empty" />
      );
    }
  }

  return (
    <div className="rating">
      <div className="rating-stars">{stars}</div>
      {count !== undefined && (
        <span className="rating-count">({count})</span>
      )}
    </div>
  );
}
