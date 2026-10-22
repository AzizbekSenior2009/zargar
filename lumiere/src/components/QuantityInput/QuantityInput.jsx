import { Minus, Plus } from 'lucide-react';
import './QuantityInput.css';

export default function QuantityInput({ value, onChange, min = 1, max = 99 }) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= min && val <= max) {
      onChange(val);
    }
  };

  return (
    <div className="quantity-input">
      <button
        className="quantity-btn"
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <input
        type="number"
        className="quantity-value"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        aria-label="Quantity"
      />
      <button
        className="quantity-btn"
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
