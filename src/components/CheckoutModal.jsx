import React, { useState } from 'react';
import { formatINR } from '../utils/storage';

export default function CheckoutModal({ open, onClose, total, currentUser, onPlaceOrder, onTrackOrder }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('upi');
  const [ship, setShip] = useState({ name: currentUser?.name || '', phone: '', address: '', city: '', pincode: '' });
  const [confirmedId, setConfirmedId] = useState('');

  if (!open) return null;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      const orderId = onPlaceOrder({ ...ship, paymentMethod: method.toUpperCase() });
      setConfirmedId(orderId);
      setStep(3);
    }, 800);
  };

  return (
    <div className="modal-overlay open">
      <div className="checkout-modal">
        <div className="checkout-header">
          <div className="checkout-title"><span>🔒</span><span>Express Checkout</span></div>
          <button className="cart-close-btn" onClick={() => { setStep(1); onClose(); }}>✕</button>
        </div>
        <div className="checkout-body">
          {step === 1 && (
            <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Delivery Address</h3>
              <div className="form-grid">
                <div className="form-group"><label>Full Name *</label><input className="form-control" required value={ship.name} onChange={e => setShip({...ship, name: e.target.value})} /></div>
                <div className="form-group"><label>Mobile Number *</label><input type="tel" className="form-control" required pattern="[0-9]{10}" placeholder="10-digit number" value={ship.phone} onChange={e => setShip({...ship, phone: e.target.value})} /></div>
              </div>
              <div className="form-group"><label>Street Address *</label><input className="form-control" required value={ship.address} onChange={e => setShip({...ship, address: e.target.value})} /></div>
              <div className="form-grid">
                <div className="form-group"><label>City *</label><input className="form-control" required value={ship.city} onChange={e => setShip({...ship, city: e.target.value})} /></div>
                <div className="form-group"><label>PIN Code *</label><input className="form-control" required pattern="[0-9]{6}" value={ship.pincode} onChange={e => setShip({...ship, pincode: e.target.value})} /></div>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: 8, padding: 12, marginTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <span>Payable Amount:</span><span>{formatINR(total)}</span>
              </div>
              <div className="checkout-btn-group">
                <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-primary-action">Continue to Payment →</button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Select Payment Option</h3>
              <div className="payment-methods-grid">
                <div className={`payment-method-card ${method === 'upi' ? 'selected' : ''}`} onClick={() => setMethod('upi')}><div>📱</div><div style={{ fontSize: 12, fontWeight: 700 }}>UPI / QR</div></div>
                <div className={`payment-method-card ${method === 'card' ? 'selected' : ''}`} onClick={() => setMethod('card')}><div>💳</div><div style={{ fontSize: 12, fontWeight: 700 }}>Card</div></div>
                <div className={`payment-method-card ${method === 'cod' ? 'selected' : ''}`} onClick={() => setMethod('cod')}><div>💵</div><div style={{ fontSize: 12, fontWeight: 700 }}>Cash on Delivery</div></div>
              </div>
              <div className="checkout-btn-group">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button type="button" className="btn-primary-action" onClick={handlePay}>Pay & Place Order ({formatINR(total)})</button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: 30 }}><div className="spinner" /><h3>Processing Payment Securely...</h3></div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <div style={{ fontSize: 40, color: 'var(--success)', marginBottom: 8 }}>✓</div>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Order Confirmed!</h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>Order ID: <strong>{confirmedId}</strong></p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button className="btn-secondary" onClick={() => { setStep(1); onClose(); onTrackOrder(); }}>📦 Track This Order</button>
                <button className="btn-primary-action" onClick={() => { setStep(1); onClose(); }}>Continue Shopping 🛍️</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
