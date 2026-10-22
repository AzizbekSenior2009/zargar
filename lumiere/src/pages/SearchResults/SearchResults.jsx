import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import './SearchResults.css';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    if (newQuery) {
      setSearchParams({ q: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const results = query.trim() ? products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  ) : products;

  return (
    <div className="search-page">
      <div className="container">
        
        <div className="search-page-header">
          <SectionTitle 
            title="Search" 
            subtitle="Find your perfect piece of jewellery"
            center={true} 
          />
          <div className="search-page-input-wrap">
            <Search size={20} className="search-page-icon" />
            <input
              type="text"
              className="search-page-input"
              placeholder="Type to search..."
              value={query}
              onChange={handleSearchChange}
              autoFocus
            />
          </div>
        </div>

        {query.trim() && (
          <div className="search-results-info">
            {results.length} products found for "{query}"
          </div>
        )}

        {results.length > 0 ? (
          <div className="search-grid">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="search-empty">
            <p>Sorry, we couldn't find any products matching your search.</p>
            <Link to="/shop" className="btn btn-primary">
              CONTINUE SHOPPING
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
