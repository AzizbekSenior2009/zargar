import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import Pagination from '../../components/Pagination/Pagination';
import Toast from '../../components/Toast/Toast';
import { products, sortOptions } from '../../data/products';
import './Shop.css';

const ITEMS_PER_PAGE = 8;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Read initial filters from URL
  const initialCategory = searchParams.get('category');
  const initialSort = searchParams.get('sort') || 'featured';

  const [filters, setFilters] = useState({
    category: initialCategory ? [initialCategory] : [],
    priceRange: [],
    metal: [],
    gemstone: [],
    occasion: [],
    collection: [],
    availability: [],
  });
  
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync state when URL changes (e.g. from header nav or home categories)
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category: [category] }));
      setCurrentPage(1);
    }
  }, [searchParams]);

  const handleFilterChange = (filterType, updatedValues) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: updatedValues,
    }));
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    setToastMessage(`Added ${product.name} to cart`);
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.category.length > 0 && !filters.category.includes(product.category)) return false;
      if (filters.metal.length > 0 && !product.metalOptions.some(m => filters.metal.includes(m))) return false;
      if (filters.gemstone.length > 0 && !filters.gemstone.includes(product.gemstone)) return false;
      if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
      if (filters.collection.length > 0 && !filters.collection.includes(product.collection)) return false;
      if (filters.availability.length > 0 && !filters.availability.includes(product.availability)) return false;
      
      if (filters.priceRange.length > 0) {
        const matchesPrice = filters.priceRange.some(rangeStr => {
          const [minStr, maxStr] = rangeStr.split('-');
          const min = parseFloat(minStr);
          const max = maxStr === 'Infinity' ? Infinity : parseFloat(maxStr);
          return product.price >= min && product.price <= max;
        });
        if (!matchesPrice) return false;
      }
      
      return true;
    });
  }, [filters]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'featured':
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="shop-page">
      <div className="container">
        <SectionTitle
          title="Shop"
          subtitle="Discover our latest collection"
          center={true}
        />

        <div className="shop-toolbar">
          <button
            className="btn btn-outline shop-filter-toggle"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          
          <p className="shop-results-count">
            Showing {sortedProducts.length} results
          </p>

          <div className="shop-sort">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              className="form-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="shop-layout">
          <div className="shop-sidebar-wrap">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={isMobileFiltersOpen}
              onClose={() => setIsMobileFiltersOpen(false)}
            />
          </div>
          
          <div className="shop-main">
            {currentProducts.length > 0 ? (
              <>
                <div className="shop-grid">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="shop-empty">
                <p>No products found matching your filters.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setFilters({
                    category: [], priceRange: [], metal: [], gemstone: [],
                    occasion: [], collection: [], availability: []
                  })}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={!!toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
