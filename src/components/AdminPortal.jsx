import React, { useState } from 'react';
import { ADMIN_ACCOUNTS, TRACK_STEPS } from '../data/products';
import { formatINR, formatStepDate, loadUsers } from '../utils/storage';

export default function AdminPortal({
  adminSession, onAdminLogin, onAdminLogout, onExitToUser,
  products, onUpdateProducts, orders, onUpdateOrders, showToast
}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [alert, setAlert] = useState('');
  const [tab, setTab] = useState('overview');
  const [form, setForm] = useState({ title: '', brand: '', cat: 'electronics', model: '', price: '', orig: '', desc: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    const matched = ADMIN_ACCOUNTS.find(a => a.email.toLowerCase() === email.trim().toLowerCase() && a.pass === pass);
    if (matched) {
      setAlert('');
      onAdminLogin(matched.name);
      showToast(`Welcome Admin ${matched.name}!`, 'success');
    } else {
      setAlert('Access Denied: Invalid Admin credentials. Regular user accounts are not permitted.');
    }
  };

  if (!adminSession.isAuth) {
    return (
      <div id="admin-portal-root" className="active">
        <div className="admin-gate-wrapper">
          <div className="admin-gate-card">
            <div className="admin-badge-pill">🛡️ RESTRICTED • ADMIN ONLY</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Shopzo Admin Portal</h1>
            <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>Authorized administrators only. Regular user accounts cannot access this portal.</p>
            {alert && <div className="auth-alert error">{alert}</div>}
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>Admin Email</label>
                <input type="email" className="admin-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="bharathk@gmail.com" required />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1' }}>Admin Password</label>
                <input type="password" className="admin-input" value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter admin key" required />
              </div>
              <button type="submit" className="admin-btn-primary" style={{ width: '100%', padding: 11 }}>Unlock Admin Portal →</button>
            </form>
            <button type="button" onClick={() => { setEmail(ADMIN_ACCOUNTS[0].email); setPass(ADMIN_ACCOUNTS[0].pass); }} style={{ width: '100%', marginTop: 10, padding: 8, border: '1px dashed #475569', borderRadius: 8, color: '#cbd5e1', fontSize: 12 }}>
              🔑 Fill Demo Admin Credentials
            </button>
            <button type="button" onClick={onExitToUser} style={{ width: '100%', marginTop: 12, color: '#94a3b8', fontSize: 12, textDecoration: 'underline' }}>
              ← Back to User Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const users = loadUsers();
  const totalRevenue = orders.reduce((s, o) => s + Number(o.total || 0), 0);
  const totalModels = products.reduce((s, p) => s + (p.models ? p.models.length : 1), 0);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const catLabels = { electronics: "Electronics", audio: "Audio", footwear: "Footwear", fashion: "Fashion", watches: "Watches" };
    const newProd = {
      id: "prod-" + Date.now(),
      brand: form.brand,
      title: form.title,
      category: form.cat,
      categoryLabel: catLabels[form.cat] || "Electronics",
      rating: 4.8,
      badge: "New",
      badgeType: "trending",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      description: form.desc,
      models: [{ sku: form.brand.slice(0,3).toUpperCase() + "-" + Math.floor(100+Math.random()*900), name: form.model, specs: "Standard Edition", price: Number(form.price), originalPrice: Number(form.orig) }]
    };
    onUpdateProducts([newProd, ...products]);
    setForm({ title: '', brand: '', cat: 'electronics', model: '', price: '', orig: '', desc: '' });
    showToast("Product added to catalog!", "success");
  };

  const handleAddModel = (prodId) => {
    const updated = products.map(p => {
      if (p.id !== prodId) return p;
      const basePrice = p.models[0]?.price || 1999;
      const num = p.models.length + 1;
      return {
        ...p,
        models: [...p.models, { sku: `${(p.brand || "SZ").slice(0,3).toUpperCase()}-M${num}`, name: `Pro Edition V${num}`, specs: "Upgraded Variant", price: basePrice + 1000, originalPrice: basePrice + 2500 }]
      };
    });
    onUpdateProducts(updated);
    showToast("Model added!", "success");
  };

  const handleDeleteModel = (prodId, mIdx) => {
    const updated = products.map(p => p.id === prodId && p.models.length > 1 ? { ...p, models: p.models.filter((_, i) => i !== mIdx) } : p);
    onUpdateProducts(updated);
  };

  const handleUpdateOrderStatus = (idx, status) => {
    const updated = orders.map((o, i) => {
      if (i !== idx) return o;
      const todayShort = formatStepDate(new Date(), 0);
      const hist = [...(o.statusHistory || [])];
      const existing = hist.find(h => h.step === status);
      if (existing) existing.date = todayShort;
      else hist.push({ step: status, date: todayShort });
      return { ...o, status, statusHistory: hist };
    });
    onUpdateOrders(updated);
    showToast(`Order updated to ${status}`, "success");
  };

  const handleUpdateDeliveryDate = (idx, isoDate) => {
    if (!isoDate) return;
    const d = new Date(isoDate + "T00:00:00");
    if (isNaN(d.getTime())) return;
    const label = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
    onUpdateOrders(orders.map((o, i) => i === idx ? { ...o, estimatedDelivery: label } : o));
    showToast(`Delivery date updated to ${label}`, "success");
  };

  const renderOrdersTable = () => orders.length === 0 ? <p style={{ color: '#94a3b8', fontSize: 13 }}>No orders placed yet.</p> : (
    <table className="admin-table">
      <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>
        {orders.map((o, idx) => (
          <tr key={o.orderId}>
            <td><strong>{o.orderId}</strong><br /><span style={{ fontSize: 11, color: '#94a3b8' }}>{o.date}</span></td>
            <td>{o.customerName}<br /><span style={{ fontSize: 11, color: '#94a3b8' }}>{o.customerEmail}</span></td>
            <td style={{ fontSize: 12 }}>{o.items.map((i, k) => <div key={k}>{i.title} ({i.modelName}) x{i.qty}</div>)}</td>
            <td><strong>{formatINR(o.total)}</strong></td>
            <td><span style={{ padding: '3px 8px', borderRadius: 99, fontSize: 11, background: '#334155' }}>{o.status}</span></td>
            <td>
              <select className="admin-input" style={{ padding: '4px 8px', fontSize: 11.5, margin: '0 0 6px 0' }} value={o.status} onChange={e => handleUpdateOrderStatus(idx, e.target.value)}>
                {[...TRACK_STEPS, "Cancelled"].map(st => <option key={st} value={st}>{st}</option>)}
              </select>
              <input type="date" className="admin-input" style={{ padding: '4px 6px', fontSize: 11, margin: 0 }} onChange={e => handleUpdateDeliveryDate(idx, e.target.value)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div id="admin-portal-root" className="active">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26, padding: '0 6px' }}>
            <div className="logo-icon">S</div>
            <div><div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Shopzo Admin</div><div style={{ fontSize: 11, color: '#818cf8', fontWeight: 600 }}>Control Center</div></div>
          </div>
          <button className={`admin-nav-btn ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>📊 Dashboard Overview</button>
          <button className={`admin-nav-btn ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>📦 Products & Models</button>
          <button className={`admin-nav-btn ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>🧾 Customer Orders</button>
          <button className={`admin-nav-btn ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>👥 Registered Users</button>
          <div style={{ marginTop: 'auto', borderTop: '1px solid #1e293b', paddingTop: 14 }}>
            <button className="admin-nav-btn" onClick={onExitToUser}>🛍️ View Storefront</button>
            <button className="admin-nav-btn" style={{ color: '#fca5a5' }} onClick={onAdminLogout}>🚪 Admin Sign Out</button>
          </div>
        </aside>
        <main className="admin-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
            <div><h1 style={{ fontSize: 22, fontWeight: 800 }}>Shopzo Admin Dashboard</h1><p style={{ fontSize: 12.5, color: '#94a3b8' }}>Manage inventory, product models, orders, and users.</p></div>
            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', padding: '6px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>● Admin: {adminSession.name}</span>
          </div>

          {tab === 'overview' && (
            <>
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card"><div className="admin-kpi-label">Total Revenue</div><div className="admin-kpi-val">{formatINR(totalRevenue)}</div></div>
                <div className="admin-kpi-card"><div className="admin-kpi-label">Total Orders</div><div className="admin-kpi-val">{orders.length}</div></div>
                <div className="admin-kpi-card"><div className="admin-kpi-label">Products / Models</div><div className="admin-kpi-val">{products.length} / {totalModels}</div></div>
                <div className="admin-kpi-card"><div className="admin-kpi-label">Registered Users</div><div className="admin-kpi-val">{users.length}</div></div>
              </div>
              <div className="admin-panel"><h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Recent Orders</h3>{renderOrdersTable()}</div>
            </>
          )}

          {tab === 'products' && (
            <>
              <div className="admin-panel">
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>➕ Add New Product & Initial Model</h3>
                <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  <input className="admin-input" placeholder="Product Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                  <input className="admin-input" placeholder="Brand" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} required />
                  <select className="admin-input" value={form.cat} onChange={e => setForm({...form, cat: e.target.value})}>
                    <option value="electronics">Electronics</option><option value="audio">Audio</option><option value="footwear">Footwear</option><option value="fashion">Fashion</option><option value="watches">Watches</option>
                  </select>
                  <input className="admin-input" placeholder="Model Name" value={form.model} onChange={e => setForm({...form, model: e.target.value})} required />
                  <input type="number" className="admin-input" placeholder="Price (₹)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                  <input type="number" className="admin-input" placeholder="Original Price (₹)" value={form.orig} onChange={e => setForm({...form, orig: e.target.value})} required />
                  <input className="admin-input" style={{ gridColumn: 'span 2' }} placeholder="Description" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} required />
                  <button type="submit" className="admin-btn-primary">Add Product</button>
                </form>
              </div>
              <div className="admin-panel">
                <table className="admin-table">
                  <thead><tr><th>Product</th><th>Category</th><th>Models</th><th>Action</th></tr></thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td><strong>{p.title}</strong></td>
                        <td>{p.categoryLabel}</td>
                        <td>
                          {p.models.map((m, mi) => (
                            <div key={m.sku} style={{ display: 'flex', justifyContent: 'space-between', background: '#0f172a', padding: '4px 8px', borderRadius: 6, marginBottom: 4, fontSize: 11.5 }}>
                              <span>{m.name} ({formatINR(m.price)})</span>
                              {p.models.length > 1 && <button className="admin-btn-sm admin-btn-danger" onClick={() => handleDeleteModel(p.id, mi)}>✕</button>}
                            </div>
                          ))}
                          <button className="admin-btn-sm" style={{ background: '#4338ca' }} onClick={() => handleAddModel(p.id)}>+ Add Model</button>
                        </td>
                        <td><button className="admin-btn-sm admin-btn-danger" onClick={() => onUpdateProducts(products.filter(x => x.id !== p.id))}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 'orders' && <div className="admin-panel">{renderOrdersTable()}</div>}

          {tab === 'users' && (
            <div className="admin-panel">
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Email</th><th>Orders Placed</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.email}><td><strong>{u.name}</strong></td><td>{u.email}</td><td>{orders.filter(o => o.customerEmail === u.email).length}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
