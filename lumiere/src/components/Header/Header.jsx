import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { navLinks } from '../../data/nav';
import { useTranslation } from 'react-i18next';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' }
  ];
  const currentLang = i18n.language?.substring(0, 2) || 'en';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container header-inner">
        <button
          className="header-hamburger"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={24} />
        </button>

        <Link to="/" className="header-logo">
          <span className="header-logo-name">Lumière</span>
          <span className="header-logo-sub">FINE JEWELLERY</span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `header-nav-link ${isActive ? 'active' : ''}`
              }
              end={link.path === '/'}
            >
              {t(`header.${link.label.toLowerCase()}`)}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-lang-custom" ref={langRef} style={{ position: 'relative', marginRight: '15px' }}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-dark)', padding: '5px' }}
            >
              {currentLang.toUpperCase()}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: isLangOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {isLangOpen && (
              <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '5px', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 100, minWidth: '70px', display: 'flex', flexDirection: 'column' }}>
                {langs.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { i18n.changeLanguage(lang.code); setIsLangOpen(false); }}
                    style={{ display: 'block', width: '100%', padding: '10px 16px', background: currentLang === lang.code ? 'var(--color-beige)' : 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', textAlign: 'center', transition: 'background 0.2s', color: currentLang === lang.code ? 'var(--color-gold)' : 'var(--color-dark)', fontWeight: currentLang === lang.code ? 'bold' : 'normal' }}
                    onMouseOver={(e) => { if(currentLang !== lang.code) e.target.style.background = '#f9f9f9'; }}
                    onMouseOut={(e) => { if(currentLang !== lang.code) e.target.style.background = 'transparent'; }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/search"
            className="header-action-btn"
            aria-label="Search"
          >
            <Search size={20} />
          </Link>
          <Link to="/wishlist" className="header-action-btn" aria-label="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="header-badge">{wishlistCount}</span>
            )}
          </Link>
          <Link to="/cart" className="header-action-btn" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="header-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
      <div
        className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer-header">
          <span className="header-logo-name">Lumière</span>
          <button
            className="mobile-drawer-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-drawer-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="mobile-drawer-link"
              onClick={closeMobileMenu}
              end={link.path === '/'}
            >
              {t(`header.${link.label.toLowerCase()}`)}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-drawer-footer">
          <Link to="/search" className="btn btn-outline btn-full" onClick={closeMobileMenu} style={{marginBottom: 'var(--space-md)'}}>
            <Search size={16} /> {t('header.search')}
          </Link>
          <div className="mobile-drawer-links">
            <Link to="/wishlist" onClick={closeMobileMenu}>
              {t('header.wishlist')} ({wishlistCount})
            </Link>
            <Link to="/account" onClick={closeMobileMenu}>
              {t('header.account')}
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <select 
              value={i18n.language?.substring(0, 2) || 'en'} 
              onChange={(e) => { i18n.changeLanguage(e.target.value); closeMobileMenu(); }}
              style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', outline: 'none', fontSize: '16px', color: 'inherit' }}
            >
              <option value="en">English (EN)</option>
              <option value="uz">O'zbekcha (UZ)</option>
              <option value="ru">Русский (RU)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
