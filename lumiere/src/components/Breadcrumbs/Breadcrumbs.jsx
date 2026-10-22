import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbs-item">
            {index > 0 && <ChevronRight size={14} className="breadcrumbs-sep" />}
            {index === items.length - 1 ? (
              <span className="breadcrumbs-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.path} className="breadcrumbs-link">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
