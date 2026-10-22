import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { filterOptions } from '../../data/products';
import './FilterSidebar.css';

export default function FilterSidebar({ filters, onFilterChange, isOpen, onClose }) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    metal: false,
    gemstone: false,
    occasion: false,
    collection: false,
    availability: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckbox = (filterType, value) => {
    const current = filters[filterType] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(filterType, updated);
  };

  const handlePriceRange = (range) => {
    const current = filters.priceRange || [];
    const rangeStr = `${range.min}-${range.max}`;
    const updated = current.includes(rangeStr)
      ? current.filter((v) => v !== rangeStr)
      : [...current, rangeStr];
    onFilterChange('priceRange', updated);
  };

  const renderFilterSection = (title, key, options, type = 'checkbox') => (
    <div className={`filter-section ${openSections[key] ? 'open' : ''}`}>
      <button
        className="filter-section-header"
        onClick={() => toggleSection(key)}
        aria-expanded={openSections[key]}
      >
        <span>{title}</span>
        <ChevronDown size={16} className="filter-section-icon" />
      </button>
      <div className="filter-section-content">
        <div className="filter-options">
          {type === 'price'
            ? filterOptions.priceRanges.map((range) => {
                const rangeStr = `${range.min}-${range.max}`;
                return (
                  <label key={rangeStr} className="filter-option">
                    <input
                      type="checkbox"
                      checked={(filters.priceRange || []).includes(rangeStr)}
                      onChange={() => handlePriceRange(range)}
                    />
                    <span className="filter-checkbox" />
                    <span>{range.label}</span>
                  </label>
                );
              })
            : options.map((option) => (
                <label key={option} className="filter-option">
                  <input
                    type="checkbox"
                    checked={(filters[key] || []).includes(option)}
                    onChange={() => handleCheckbox(key, option)}
                  />
                  <span className="filter-checkbox" />
                  <span>{option}</span>
                </label>
              ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`filter-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <aside className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="filter-sidebar-header">
          <h3>Filters</h3>
          <button className="filter-close-btn" onClick={onClose} aria-label="Close filters">
            <X size={20} />
          </button>
        </div>
        <div className="filter-sidebar-body">
          {renderFilterSection('Category', 'category', filterOptions.categories)}
          {renderFilterSection('Price', 'price', null, 'price')}
          {renderFilterSection('Metal', 'metal', filterOptions.metals)}
          {renderFilterSection('Gemstone', 'gemstone', filterOptions.gemstones)}
          {renderFilterSection('Occasion', 'occasion', filterOptions.occasions)}
          {renderFilterSection('Collection', 'collection', filterOptions.collections)}
          {renderFilterSection('Availability', 'availability', filterOptions.availability)}
        </div>
      </aside>
    </>
  );
}
