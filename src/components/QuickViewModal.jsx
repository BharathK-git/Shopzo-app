import React from 'react';
import { formatINR, getProductDeliveryBadge, getProductFallbackSvg } from '../utils/storage';

export default function QuickViewModal({ product, selectedModelIdx, onSelectModel, onClose, onAddToCart, onBuyNow }) {
  if (!product) return null;
  const m = product.models[selectedModelIdx] || product.models[0];
  const pct = Math.round(((m.originalPrice - m.price) / m.originalPrice) * 100);

  return (
    <div className="modal-overlay open" style={{ zIndex: 3200 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="quick-view-card">
        <button className="qv-close-btn" onClick={onClose}>✕</button>
        <div className="qv-img-box">
          <img src={product.image} alt={product.title} onError={e => { e.currentTarget.src = getProductFallbackSvg(product.brand, product.categoryLabel); }} />
        </div>
        <div className="qv-info-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span className="product-category">{product.brand} • {product.categoryLabel}</span>
            <span className="product-rating">★ {product.rating}</span>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{product.title}</h2>
          <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 14 }}>{product.description}</p>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 6 }}>SELECT MODEL / VARIANT:</div>
          <div className="qv-models-grid">
            {product.models.map((mod, idx) => (
              <button key={mod.sku} className={`qv-model-card ${idx === selectedModelIdx ? 'active' : ''}`} onClick={() => onSelectModel(product.id, idx)}>
                <div className="qv-model-name">{mod.name}</div>
                <div className="qv-model-sub">{mod.specs} • {formatINR(mod.price)}</div>
              </button>
            ))}
          </div>
          <div className="product-price-row" style={{ marginBottom: 10 }}>
            <span className="current-price" style={{ fontSize: 22 }}>{formatINR(m.price)}</span>
            <span className="original-price" style={{ fontSize: 14 }}>{formatINR(m.originalPrice)}</span>
            <span className="discount-tag">{pct > 0 ? `${pct}% OFF` : 'BEST'}</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--success)', marginBottom: 12 }}>{getProductDeliveryBadge()} (Free Express)</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <button className="btn-add-cart" style={{ flex: 1, padding: 10 }} onClick={() => { onAddToCart(product.id); onClose(); }}>🛍️ Add to Cart</button>
            <button className="btn-buy-now" style={{ flex: 1, padding: 10 }} onClick={() => { onClose(); onBuyNow(product.id); }}>⚡ Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
