import { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import './Toast.css';

export default function Toast({ message, type = 'success', isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`toast toast--${type}`}>
      <div className="toast-icon">
        {type === 'success' && <Check size={16} />}
      </div>
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
