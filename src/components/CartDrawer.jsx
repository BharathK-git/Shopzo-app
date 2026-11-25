import React, { useState } from 'react';
import { formatINR } from '../utils/storage';

export default function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove, promoCode, onApplyPromo, onCheckout }) {
  const [codeInput, setCodeInput] = useState(promoCode || '');
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = promoCode === 'SHOPZO15' ? Math.round(subtotal * 0.15) : 0;
  const grandTotal = Math.max(0, subtotal - discount);

  return (
    <>
      <div className={`cart-drawer-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div className="cart-drawer-title"><span>Shopping Bag</span><span style={{ fontSize: 13, color: 'var(--text-muted)' }}>({cart.reduce((s, i) => s + i.qty, 0)})</span></div>
          <button className="cart-close-btn" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 42 }}>🛒</div>
            <h4 style={{ margin: '10px 0' }}>Your Bag is Empty</h4>
            <button className="btn-primary-action" style={{ margin: '0 auto' }} onClick={onClose}>Start Shopping</button>
          </div>
        ) : (
          <>
            <div className="shipping-meter-bar">
              <span>{subtotal >= 999 ? '🎉 You unlocked FREE Express Delivery!' : `Add ${formatINR(999 - subtotal)} more for FREE Delivery!`}</span>
              <div className="meter-progress-container"><div className="meter-progress-fill" style={{ width: `${Math.min(100, (subtotal / 999) * 100)}%` }} /></div>
            </div>
            <div className="cart-items-list">
              {cart.map(item => (
                <div className="cart-item-card" key={item.cartKey}>
                  <img src={item.image} className="cart-item-img" alt="" />
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <div><div className="cart-item-name">{item.title}</div><div className="cart-item-model">Model: {item.modelName}</div></div>
                      <button onClick={() => onRemove(item.cartKey)} style={{ color: '#94a3b8' }}>✕</button>
                    </div>
                    <div className="cart-item-bottom">
                      <span className="cart-item-price">{formatINR(item.price * item.qty)}</span>
                      <div className="qty-controls">
                        <button className="qty-btn" onClick={() => onUpdateQty(item.cartKey, -1)}>−</button>
                        <span className="qty-display">{item.qty}</span>
                        <button className="qty-btn" onClick={() => onUpdateQty(item.cartKey, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-drawer-footer">
              <div className="coupon-box">
                <input className="coupon-input" placeholder="Promo code (SHOPZO15)" value={codeInput} onChange={e => setCodeInput(e.target.value)} />
                <button className="coupon-apply-btn" onClick={() => onApplyPromo(codeInput.trim().toUpperCase())}>Apply</button>
              </div>
              <div className="price-breakdown">
                <div className="price-row"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                {discount > 0 && <div className="price-row" style={{ color: 'var(--success)', fontWeight: 600 }}><span>Promo Discount</span><span>-{formatINR(discount)}</span></div>}
                <div className="price-row"><span>Delivery</span><span style={{ color: 'var(--success)', fontWeight: 700 }}>FREE</span></div>
                <div className="price-row total-row"><span>Grand Total</span><span>{formatINR(grandTotal)}</span></div>
              </div>
              <button className="checkout-btn" onClick={onCheckout}><span>Proceed to Checkout</span><span>→</span></button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
