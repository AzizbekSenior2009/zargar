import './SectionTitle.css';

export default function SectionTitle({ label, title, subtitle, center = true }) {
  return (
    <div className={`section-title ${center ? 'section-title--center' : ''}`}>
      {label && <span className="gold-label">{label}</span>}
      <h2 className="section-title-heading">{title}</h2>
      {subtitle && <p className="section-title-sub">{subtitle}</p>}
    </div>
  );
}
