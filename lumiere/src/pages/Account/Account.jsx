import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Account.css';

const mockOrders = [
  { id: '#LUM-739281', date: 'Oct 02, 2025', status: 'Processing', total: '$1,250.00', items: 1 },
  { id: '#LUM-592814', date: 'Aug 15, 2025', status: 'Delivered', total: '$3,850.00', items: 2 },
  { id: '#LUM-482910', date: 'Jun 10, 2025', status: 'Delivered', total: '$680.00', items: 1 },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'details', label: 'Account Details' },
  ];

  return (
    <div className="account-page">
      <div className="container">
        <SectionTitle title="My Account" center={true} />

        <div className="account-layout">
          {/* Sidebar */}
          <aside className="account-sidebar">
            <nav className="account-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`account-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
              <Link to="/wishlist" className="account-nav-btn">
                Wishlist
              </Link>
              <button className="account-nav-btn account-logout">
                Logout <LogOut size={14} />
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="account-main">
            {activeTab === 'dashboard' && (
              <div className="account-section">
                <h2>Welcome, Sarah!</h2>
                <p>
                  From your account dashboard you can view your recent orders, manage your 
                  shipping and billing addresses, and edit your password and account details.
                </p>
                <div className="account-dashboard-links">
                  <button onClick={() => setActiveTab('orders')} className="btn btn-outline">
                    View Recent Orders
                  </button>
                  <button onClick={() => setActiveTab('details')} className="btn btn-outline">
                    Edit Account Info
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="account-section">
                <h2>Order History</h2>
                <div className="table-responsive">
                  <table className="account-table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id}>
                          <td><strong>{order.id}</strong></td>
                          <td>{order.date}</td>
                          <td>
                            <span className={`status-badge status-${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{order.total} for {order.items} item(s)</td>
                          <td>
                            <button className="btn btn-outline btn-sm">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="account-section">
                <h2>Downloads</h2>
                <p>No digital downloads available yet.</p>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="account-section">
                <h2>Addresses</h2>
                <p>The following addresses will be used on the checkout page by default.</p>
                <div className="address-grid">
                  <div className="address-card">
                    <h3>Billing Address</h3>
                    <address>
                      Sarah Johnson<br />
                      123 Luxury Lane<br />
                      Apartment 4B<br />
                      New York, NY 10001<br />
                      United States
                    </address>
                    <button className="btn btn-outline btn-sm mt-2">Edit</button>
                  </div>
                  <div className="address-card">
                    <h3>Shipping Address</h3>
                    <address>
                      Sarah Johnson<br />
                      123 Luxury Lane<br />
                      Apartment 4B<br />
                      New York, NY 10001<br />
                      United States
                    </address>
                    <button className="btn btn-outline btn-sm mt-2">Edit</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="account-section">
                <h2>Account Details</h2>
                <form className="account-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input type="text" className="form-input" defaultValue="Sarah" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input type="text" className="form-input" defaultValue="Johnson" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Display Name *</label>
                    <input type="text" className="form-input" defaultValue="Sarah J." />
                    <small>This will be how your name will be displayed in the account section and in reviews.</small>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" className="form-input" defaultValue="sarah.j@example.com" />
                  </div>
                  
                  <h3 className="mt-4">Password Change</h3>
                  <div className="form-group">
                    <label className="form-label">Current Password (leave blank to leave unchanged)</label>
                    <input type="password" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password (leave blank to leave unchanged)</label>
                    <input type="password" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-input" />
                  </div>
                  
                  <button type="submit" className="btn btn-primary mt-2">SAVE CHANGES</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
