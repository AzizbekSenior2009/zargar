import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

export default function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion ${isOpen ? 'accordion--open' : ''}`}>
      <button
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <ChevronDown size={18} className="accordion-icon" />
      </button>
      <div className="accordion-content" role="region">
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}
