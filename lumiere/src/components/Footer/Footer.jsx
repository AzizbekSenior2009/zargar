import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { footerLinks } from '../../data/nav';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useTranslation();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="container footer-newsletter-inner">
          <div className="footer-newsletter-text">
            <h3>{t('footer.join')}</h3>
            <p>{t('footer.subscribe_text')}</p>
          </div>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <div className="footer-newsletter-input-wrap">
              <input
                type="email"
                placeholder={t('footer.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-newsletter-input"
                aria-label="Email for newsletter"
                required
              />
              <button
                type="submit"
                className="footer-newsletter-btn"
                aria-label="Subscribe"
              >
                <Send size={18} />
              </button>
            </div>
            {subscribed && (
              <p className="footer-newsletter-success">
                {t('footer.success')}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.shop')}</h4>
            <ul className="footer-col-list">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.path}>{t(`nav.${link.label}`)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.about')}</h4>
            <ul className="footer-col-list">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link to={link.path}>{t(`nav.${link.label}`)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.customer_care')}</h4>
            <ul className="footer-col-list">
              {footerLinks.customerCare.map((link) => (
                <li key={link.label}>
                  <Link to={link.path}>{t(`nav.${link.label}`)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.legal')}</h4>
            <ul className="footer-col-list">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.path}>{t(`nav.${link.label}`)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">
            {t('footer.rights')}
          </p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
