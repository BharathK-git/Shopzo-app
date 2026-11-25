import React, { useState } from 'react';
import { ADMIN_ACCOUNTS } from '../data/products';
import { loadUsers, saveUsers } from '../utils/storage';

export default function AuthScreen({ onLoginSuccess, onOpenAdminLogin, canClose, onClose }) {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [alert, setAlert] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (ADMIN_ACCOUNTS.some(a => a.email.toLowerCase() === cleanEmail)) {
      setAlert('Please use the separate Admin Login Page for administrator access.');
      return;
    }
    const users = loadUsers();
    const matched = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);
    if (matched) {
      setAlert('');
      onLoginSuccess({ name: matched.name, email: matched.email });
    } else {
      setAlert('Invalid email or password.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (ADMIN_ACCOUNTS.some(a => a.email.toLowerCase() === cleanEmail)) {
      setAlert('This email is reserved.');
      return;
    }
    const users = loadUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      setAlert('Account already exists. Please sign in.');
      return;
    }
    const newUser = { name: signupName.trim(), email: cleanEmail, password };
    saveUsers([...users, newUser]);
    setAlert('');
    onLoginSuccess({ name: newUser.name, email: newUser.email });
  };

  return (
    <div id="auth-screen">
      <div className="auth-card">
        {canClose && <button className="auth-close-btn" onClick={onClose} title="Close">✕</button>}
        <div className="auth-header">
          <div className="auth-brand">
            <div className="auth-brand-logo">S</div>
            <div className="auth-brand-name">Shopzo</div>
          </div>
          <p className="auth-tagline">Access your orders, saved addresses & wishlist</p>
        </div>
        <div className="auth-body">
          <div className="auth-tabs">
            <button type="button" className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setAlert(''); }}>Sign In</button>
            <button type="button" className={`auth-tab-btn ${tab === 'signup' ? 'active' : ''}`} onClick={() => { setTab('signup'); setAlert(''); }}>Create Account</button>
          </div>
          {alert && <div className="auth-alert error">{alert}</div>}

          {tab === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="auth-form-group">
                <label>Email Address</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">✉</span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>
              </div>
              <div className="auth-form-group">
                <label>Password</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🔒</span>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
                </div>
              </div>
              <button type="submit" className="auth-submit-btn"><span>Sign In to Shopzo</span><span>→</span></button>
              <button type="button" className="auth-demo-btn" onClick={() => onLoginSuccess({ name: "bharath karri", email: "bharath@shopzo.com" })}>
                ⚡ Instant Demo Customer Login
              </button>
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                <button type="button" onClick={onOpenAdminLogin} style={{ fontSize: 12.5, fontWeight: 700, color: '#312e81', padding: '6px 12px', borderRadius: 6, background: '#eef2ff' }}>
                  🛡️ Admin Login Page
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <div className="auth-form-group">
                <label>Full Name</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">👤</span>
                  <input type="text" value={signupName} onChange={e => setSignupName(e.target.value)} placeholder="John Doe" required />
                </div>
              </div>
              <div className="auth-form-group">
                <label>Email Address</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">✉</span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>
              </div>
              <div className="auth-form-group">
                <label>Create Password</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🔒</span>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} required />
                </div>
              </div>
              <button type="submit" className="auth-submit-btn"><span>Create Free Account</span><span>→</span></button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
