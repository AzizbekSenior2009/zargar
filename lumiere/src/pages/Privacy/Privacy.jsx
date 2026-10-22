import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="container">
        <SectionTitle
          title="Privacy Policy"
          subtitle="Last updated: October 2025"
          center={true}
        />
        <div className="privacy-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us. For example, we collect information when you create an account, participate in any interactive features of our services, fill out a form, request customer support, or otherwise communicate with us.
            </p>
            <ul>
              <li>Contact information (such as name, email address, mailing address, and phone number)</li>
              <li>Payment information (such as credit card details)</li>
              <li>Account credentials (such as passwords and other security information)</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, such as to:</p>
            <ul>
              <li>Process transactions and send related information, including confirmations and receipts</li>
              <li>Send you technical notices, updates, security alerts, and support and administrative messages</li>
              <li>Respond to your comments, questions, and requests, and provide customer service</li>
              <li>Communicate with you about products, services, offers, promotions, and events offered by Lumière</li>
            </ul>
          </section>

          <section>
            <h2>3. Sharing of Information</h2>
            <p>
              We may share personal information about you as follows:
            </p>
            <ul>
              <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
              <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process</li>
              <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Lumière or others</li>
            </ul>
          </section>

          <section>
            <h2>4. Security</h2>
            <p>
              Lumière takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>
          </section>

          <section>
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:<br />
              Email: privacy@lumiere.com<br />
              Address: 123 Luxury Lane, New York, NY 10001, USA
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
