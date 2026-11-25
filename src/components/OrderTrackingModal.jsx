import React, { useState } from 'react';
import { TRACK_STEPS } from '../data/products';
import { formatINR, formatShortDateOffset, formatStepDate, parseOrderDate } from '../utils/storage';

export default function OrderTrackingModal({ open, onClose, orders, currentUser }) {
  const [query, setQuery] = useState('');
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  if (!open) return null;

  let userOrders = currentUser ? orders.filter(o => o.customerEmail === currentUser.email) : orders;
  if (query.trim()) {
    const q = query.trim().toLowerCase();
    userOrders = userOrders.filter(o =>
      o.orderId.toLowerCase().includes(q) ||
      (o.trackingNumber || '').toLowerCase().includes(q) ||
      o.items.some(i => i.title.toLowerCase().includes(q) || (i.modelName || '').toLowerCase().includes(q))
    );
  }

  const stepOffsets = [0, 0, 1, 2, 2];

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="orders-modal" style={{ maxWidth: 740 }}>
        <div className="checkout-header">
          <div className="checkout-title"><span>📦</span><span>{selectedOrderItem ? 'Ordered Product Details' : 'My Orders & Live Tracking'}</span></div>
          <button className="cart-close-btn" onClick={() => { setSelectedOrderItem(null); onClose(); }}>✕</button>
        </div>
        <div className="checkout-body">
          {selectedOrderItem ? (
            <div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 14 }}>
                <img src={selectedOrderItem.item.image} style={{ width: 76, height: 76, borderRadius: 10, objectFit: 'cover' }} alt="" />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{selectedOrderItem.item.title}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--primary)' }}>Model: {selectedOrderItem.item.modelName || 'Standard'}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>SKU: {selectedOrderItem.item.sku || 'N/A'}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12.5, marginBottom: 14 }}>
                <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid var(--border-color)' }}><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Order ID</div><strong>{selectedOrderItem.order.orderId}</strong></div>
                <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid var(--border-color)' }}><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Tracking ID</div><strong>{selectedOrderItem.order.trackingNumber}</strong></div>
                <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid var(--border-color)' }}><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Status</div><strong style={{ color: 'var(--primary)' }}>{selectedOrderItem.order.status}</strong></div>
                <div style={{ background: '#f0fdf4', padding: 10, borderRadius: 8, border: '1px solid #bbf7d0' }}><div style={{ color: '#166534', fontSize: 11 }}>Expected Delivery</div><strong style={{ color: 'var(--success)' }}>🚚 {selectedOrderItem.estDelivery}</strong></div>
                <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid var(--border-color)' }}><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Qty & Price</div><strong>{selectedOrderItem.item.qty} × {formatINR(selectedOrderItem.item.price)} = {formatINR(selectedOrderItem.item.price * selectedOrderItem.item.qty)}</strong></div>
                <div style={{ background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid var(--border-color)' }}><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Payment Mode</div><strong>{selectedOrderItem.order.paymentMethod}</strong></div>
              </div>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 12.5, marginBottom: 16 }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Delivery Address</div>
                <strong>{selectedOrderItem.order.customerName}</strong> • {selectedOrderItem.order.address ? selectedOrderItem.order.address + ', ' : ''}{selectedOrderItem.order.city}
              </div>
              <button className="btn-primary-action" style={{ width: '100%' }} onClick={() => setSelectedOrderItem(null)}>← Back to Order Tracking</button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 16 }}>
                <input className="form-control" placeholder="Search by Order ID (e.g. #SZ-123456) or Product name..." value={query} onChange={e => setQuery(e.target.value)} />
              </div>
              {userOrders.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 28 }}>No matching orders found. Place an order to track it live!</p>
              ) : userOrders.map(o => {
                const baseDate = parseOrderDate(o.date);
                const estDelivery = (o.estimatedDelivery && !o.estimatedDelivery.includes('Days')) ? o.estimatedDelivery : formatShortDateOffset(baseDate, 2);
                const isCancelled = o.status === 'Cancelled';
                const currentIdx = Math.max(0, TRACK_STEPS.indexOf(o.status));

                return (
                  <div className="track-card" key={o.orderId}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 800 }}>{o.orderId} <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)' }}>• Placed {o.date}</span></div>
                        <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Tracking ID: <strong>{o.trackingNumber}</strong> • Delivery Date: <strong style={{ color: 'var(--success)' }}>{estDelivery}</strong></div>
                      </div>
                      <span style={{ padding: '4px 10px', borderRadius: 99, fontSize: 11.5, fontWeight: 700, background: isCancelled ? '#fef2f2' : '#eef2ff', color: isCancelled ? '#dc2626' : 'var(--primary)' }}>{o.status}</span>
                    </div>
                    {isCancelled ? (
                      <div style={{ background: '#fef2f2', color: '#dc2626', padding: 10, borderRadius: 8, fontSize: 12.5, fontWeight: 700, margin: '10px 0' }}>✕ This order was Cancelled</div>
                    ) : (
                      <div className="track-stepper">
                        {TRACK_STEPS.map((st, idx) => {
                          const cls = idx < currentIdx ? 'done' : idx === currentIdx ? 'current' : '';
                          const hist = (o.statusHistory || []).find(h => h.step === st);
                          const stepDate = hist?.date || formatStepDate(baseDate, stepOffsets[idx]);
                          return (
                            <div className={`track-step ${cls}`} key={st}>
                              <div className="track-dot">{idx <= currentIdx ? '✓' : idx + 1}</div>
                              <div className="track-step-label">{st}</div>
                              <div style={{ fontSize: 10, color: idx <= currentIdx ? 'var(--primary)' : '#94a3b8', fontWeight: 600, marginTop: 2 }}>{idx <= currentIdx ? '' : 'Est. '}{stepDate}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#475569', marginTop: 8 }}>ORDERED PRODUCT DETAILS (Click item to view full details):</div>
                    {o.items.map((i, k) => (
                      <div key={k} className="track-item-row" onClick={() => setSelectedOrderItem({ order: o, item: i, estDelivery })}>
                        <img src={i.image} className="track-item-img" alt="" onError={e => { e.currentTarget.style.display = 'none'; }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{i.title}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--primary)', fontWeight: 600 }}>Model: {i.modelName || 'Standard'} {i.sku ? `• SKU: ${i.sku}` : ''}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Qty: {i.qty} × {formatINR(i.price)} • <span style={{ color: 'var(--success)', fontWeight: 700 }}>🚚 Delivery: {estDelivery}</span></div>
                        </div>
                        <div style={{ fontSize: 13.5, fontWeight: 800 }}>{formatINR(i.price * i.qty)}</div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 12, paddingTop: 10, borderTop: '1px dashed var(--border-color)', fontSize: 12 }}>
                      <span style={{ color: 'var(--text-muted)' }}>📍 Deliver to: <strong>{o.customerName}</strong>, {o.address ? o.address + ', ' : ''}{o.city}</span>
                      <span style={{ fontSize: 14, fontWeight: 800 }}>Total Paid: {formatINR(o.total)} ({o.paymentMethod})</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
