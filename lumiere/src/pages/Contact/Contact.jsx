import { useState } from 'react';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Accordion from '../../components/Accordion/Accordion';
import { faqItems } from '../../data/faq';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send data to backend here
    setSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        
        <div className="contact-header">
          <SectionTitle
            title="Get in Touch"
            subtitle="We'd love to hear from you. Our team is here to help."
            center={false}
          />
        </div>

        <div className="contact-layout">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-info-block">
              <h3>Customer Care</h3>
              <div className="contact-info-item">
                <Mail size={18} />
                <span>azizbeksiddiqov077@gmail.com</span>
              </div>
              <div className="contact-info-item">
                <Phone size={18} />
                <span>+998936953066</span>
              </div>
              <div className="contact-info-item">
                <Clock size={18} />
                <span>Mon - Fri, 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="contact-info-block">
              <h3>Our Location</h3>
              <div className="contact-info-item">
                <MapPin size={18} />
                <span>
                  Namangan tuman,<br />
                  Yangi qo'rg'on, Olmazor ko'cha
                </span>
              </div>
              <div className="contact-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  Facebook
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We will get back to you within 24 hours.</p>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">General Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="custom">Custom Design</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="contact-faq section">
          <SectionTitle
            title="Frequently Asked Questions"
            center={false}
          />
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <Accordion key={index} title={item.question}>
                {item.answer}
              </Accordion>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
