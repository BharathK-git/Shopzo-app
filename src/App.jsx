import React, { useState, useEffect, useMemo } from 'react';
import { normalizeSearchTerm } from './data/products';
import * as store from './utils/storage';
import AuthScreen from './components/AuthScreen';
import AdminPortal from './components/AdminPortal';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import QuickViewModal from './components/QuickViewModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import Footer from './components/Footer';

export default function App() {
  const [products, setProducts] = useState(() => store.loadProducts());
  const [currentUser, setCurrentUser] = useState(() => store.loadCurrentUser());
  const [adminSession, setAdminSession] = useState(() => store.loadAdminSession());
  const [isAdminRoute, setIsAdminRoute] = useState(() => window.location.hash === '#/admin');
  const [isSearchPage, setIsSearchPage] = useState(() => window.location.hash.startsWith('#/search'));
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [cart, setCart] = useState(() => store.loadCart());
  const [wishlist, setWishlist] = useState(() => store.loadWishlist());
  const [orders, setOrders] = useState(() => store.loadOrders());
  const [selectedModels, setSelectedModels] = useState({});

  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [promoCode, setPromoCode] = useState(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [directItem, setDirectItem] = useState(null);
  const [quickViewProdId, setQuickViewProdId] = useState(null);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const onHash = () => setIsAdminRoute(window.location.hash === '#/admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const showToast = (msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const handleSubmitSearch = (q, brand = null) => {
    if (!q || !q.trim()) return;
    setSearchQuery(q);
    setSelectedBrand(brand);
    window.location.hash = `#/search?q=${encodeURIComponent(q.trim())}`;
    setIsSearchPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exitSearchPage = () => {
    setSearchQuery('');
    setSelectedBrand(null);
    window.location.hash = '';
    setIsSearchPage(false);
  };

  const getActiveModel = (prod) => {
    const idx = selectedModels[prod.id] || 0;
    return prod.models?.[idx] || prod.models?.[0];
  };

  const filteredProducts = useMemo(() => {
    const rawQ = searchQuery.trim().toLowerCase();
    const { raw, canonical } = normalizeSearchTerm(rawQ);
    let list = products.filter(p => {
      if (wishlistOnly && !wishlist.includes(p.id)) return false;
      if (!rawQ && category !== 'all' && p.category !== category) return false;
      if (!rawQ) return true;
      const modelMatch = (p.models || []).some(m => m.name.toLowerCase().includes(raw) || m.specs.toLowerCase().includes(raw) || m.sku.toLowerCase().includes(raw));
      const typeMatch = (p.productType || '').toLowerCase() === canonical || (p.tags || '').toLowerCase().includes(canonical);
      return typeMatch || p.title.toLowerCase().includes(raw) || (p.brand || '').toLowerCase().includes(raw) || p.categoryLabel.toLowerCase().includes(raw) || modelMatch;
    });
    if (sortBy === 'price-low') list = [...list].sort((a,b) => getActiveModel(a).price - getActiveModel(b).price);
    if (sortBy === 'price-high') list = [...list].sort((a,b) => getActiveModel(b).price - getActiveModel(a).price);
    if (sortBy === 'rating') list = [...list].sort((a,b) => b.rating - a.rating);
    return list;
  }, [products, searchQuery, category, sortBy, wishlistOnly, wishlist, selectedModels]);

  const matchingBrands = useMemo(() => [...new Set(filteredProducts.map(p => p.brand || p.title))], [filteredProducts]);

  const updateProducts = (next) => { setProducts(next); store.saveProducts(next); };
  const updateOrders = (next) => { setOrders(next); store.saveOrders(next); };

  const addToCart = (prodId) => {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;
    const m = getActiveModel(prod);
    const key = `${prod.id}::${m.sku}`;
    const next = cart.some(i => i.cartKey === key)
      ? cart.map(i => i.cartKey === key ? { ...i, qty: i.qty + 1 } : i)
      : [...cart, { cartKey: key, id: prod.id, title: prod.title, modelName: m.name, sku: m.sku, price: m.price, image: prod.image, qty: 1 }];
    setCart(next);
    store.saveCart(next);
    showToast(`Added ${m.name} to Cart!`, 'success');
  };

  const handlePlaceOrder = ({ name, phone, address, city, pincode, paymentMethod }) => {
    const orderId = '#SZ-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = 'TRK-IN-' + Math.floor(1000000 + Math.random() * 9000000);
    const items = directItem ? [directItem] : [...cart];
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const total = promoCode === 'SHOPZO15' && !directItem ? Math.max(0, subtotal - Math.round(subtotal * 0.15)) : subtotal;
    const newOrder = {
      orderId, trackingNumber, customerName: name || currentUser?.name || 'Guest', customerEmail: currentUser?.email || 'guest@shopzo.com',
      phone, address, city, pincode, items, total, paymentMethod, status: 'Order Placed',
      date: new Date().toLocaleDateString('en-IN'),
      estimatedDelivery: store.formatShortDateOffset(new Date(), 2),
      statusHistory: [{ step: 'Order Placed', date: store.formatStepDate(new Date(), 0) }]
    };
    updateOrders([newOrder, ...orders]);
    if (!directItem) { setCart([]); store.saveCart([]); setPromoCode(null); }
    setDirectItem(null);
    showToast('Order placed! Live tracking active.', 'success');
    return orderId;
  };

  if (isAdminRoute) {
    return (
      <>
        <AdminPortal
          adminSession={adminSession}
          onAdminLogin={(name) => { store.saveAdminSession(true, name); setAdminSession({ isAuth: true, name }); }}
          onAdminLogout={() => { store.saveAdminSession(false); setAdminSession({ isAuth: false, name: 'Admin' }); window.location.hash = ''; }}
          onExitToUser={() => { window.location.hash = ''; }}
          products={products}
          onUpdateProducts={updateProducts}
          orders={orders}
          onUpdateOrders={updateOrders}
          showToast={showToast}
        />
        <div id="toast-container">{toasts.map(t => <div key={t.id} className={`toast-msg ${t.type}`}>{t.msg}</div>)}</div>
      </>
    );
  }

  if (!currentUser || showAuthModal) {
    return (
      <>
        <AuthScreen
          canClose={Boolean(currentUser)}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(u) => { store.saveCurrentUser(u); setCurrentUser(u); setShowAuthModal(false); showToast(`Welcome, ${u.name}!`, 'success'); }}
          onOpenAdminLogin={() => { window.location.hash = '#/admin'; }}
        />
        <div id="toast-container">{toasts.map(t => <div key={t.id} className={`toast-msg ${t.type}`}>{t.msg}</div>)}</div>
      </>
    );
  }

  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const checkoutTotal = directItem ? directItem.price : Math.max(0, cartSubtotal - (promoCode === 'SHOPZO15' ? Math.round(cartSubtotal * 0.15) : 0));

  return (
    <div id="user-portal-root">
      <Header
        currentUser={currentUser}
        searchQuery={searchQuery}
        onSearchChange={(q) => { setSearchQuery(q); setSelectedBrand(null); }}
        onSubmitSearch={handleSubmitSearch}
        onClearSearch={exitSearchPage}
        matchingBrands={matchingBrands}
        onSelectBrand={(b) => setSelectedBrand(b)}
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onToggleWishlist={() => setWishlistOnly(!wishlistOnly)}
        onOpenOrders={() => setOrdersOpen(true)}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={() => { store.saveCurrentUser(null); setCurrentUser(null); }}
        onResetFilters={() => { setCategory('all'); setWishlistOnly(false); exitSearchPage(); }}
      />

      {isSearchPage ? (
        <main className="catalog-section" style={{ minHeight: '72vh', paddingTop: 28 }}>
          <div className="container">
            <div className="search-results-banner show" style={{ marginBottom: 24 }}>
              <div className="search-banner-top" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <button className="model-pill-btn" onClick={exitSearchPage}>← Back to Home</button>
                  {selectedBrand && <button className="model-pill-btn" onClick={() => setSelectedBrand(null)}>← All Brands</button>}
                  <div className="search-banner-title">
                    {selectedBrand
                      ? `${selectedBrand} — Product Details & Available Models`
                      : `Search Results for "${searchQuery}" (${matchingBrands.length} ${matchingBrands.length === 1 ? 'Brand' : 'Brands'})`}
                  </div>
                </div>
                <button className="model-pill-btn" onClick={exitSearchPage}>Clear Search ✕</button>
              </div>
            </div>

            {matchingBrands.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize: 42, marginBottom: 10 }}>🔍</div>
                <h3>No products found for "{searchQuery}"</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '8px 0 16px' }}>
                  Try searching mobiles, shoes, laptops, headphones, watches, or fashion.
                </p>
                <button className="btn-primary-action" style={{ maxWidth: 200, margin: '0 auto' }} onClick={exitSearchPage}>
                  Back to Home Page
                </button>
              </div>
            ) : !selectedBrand ? (
              <>
                <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginBottom: 16 }}>
                  Click any brand below to view all models and full product descriptions:
                </p>
                <div className="brands-only-grid">
                  {matchingBrands.map(b => (
                    <div key={b} className="brand-only-card" onClick={() => setSelectedBrand(b)}>
                      <div className="brand-only-avatar">{b.slice(0, 2).toUpperCase()}</div>
                      <div className="brand-only-name">{b}</div>
                      <span className="brand-only-cta">View Models & Details →</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="products-grid">
                {filteredProducts.filter(p => (p.brand || p.title) === selectedBrand).flatMap(prod =>
                  prod.models.map((m, mIdx) => {
                    const discPct = Math.round(((m.originalPrice - m.price) / m.originalPrice) * 100);
                    return (
                      <div className="product-card" key={m.sku}>
                        <div className="product-image-container">
                          <span className="product-badge trending">{selectedBrand}</span>
                          <img src={prod.image} alt={m.name} className="product-image" onError={e => { e.currentTarget.src = store.getProductFallbackSvg(prod.brand, prod.categoryLabel); }} />
                        </div>
                        <div className="product-details">
                          <div className="product-category-row"><span className="product-category">{prod.categoryLabel} • {m.sku}</span><span className="product-rating">★ {prod.rating}</span></div>
                          <h3 className="product-title">{m.name}</h3>
                          <p className="product-desc-snippet"><strong>{m.specs}</strong> — {prod.description}</p>
                          <div className="product-price-row">
                            <span className="current-price">{store.formatINR(m.price)}</span>
                            <span className="original-price">{store.formatINR(m.originalPrice)}</span>
                            <span className="discount-tag">{discPct > 0 ? `${discPct}% OFF` : 'BEST'}</span>
                          </div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--success)', marginBottom: 8 }}>{store.getProductDeliveryBadge()}</div>
                          <div className="product-action-buttons">
                            <button className="btn-add-cart" onClick={() => { setSelectedModels({ ...selectedModels, [prod.id]: mIdx }); addToCart(prod.id); }}>🛒 Add</button>
                            <button className="btn-buy-now" onClick={() => { setDirectItem({ id: prod.id, title: prod.title, modelName: m.name, sku: m.sku, image: prod.image, price: m.price, qty: 1 }); setCheckoutOpen(true); }}>⚡ Buy Now</button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </main>
      ) : (
        <main>
          <section className="hero-section">
            <div className="container">
              <div className="hero-banner">
                <div className="hero-content">
                  <div className="hero-tag"><span>⚡</span> AUTUMN / FESTIVE 2026 EDIT</div>
                  <h1 className="hero-title">Curated Electronics, Iconic Footwear & <span>Modern Essentials</span>.</h1>
                  <p className="hero-subtitle">Explore every product and compare all available models side-by-side. Authentic gear shipped directly from verified brand hubs across India.</p>
                  <div className="hero-cta-group">
                    <a href="#catalog" className="hero-primary-btn"><span>Shop Featured Deals</span><span>↓</span></a>
                    <div className="hero-coupon-pill" onClick={() => { setPromoCode('SHOPZO15'); setCartOpen(true); showToast('SHOPZO15 applied!', 'success'); }}>🏷️ Coupon: <strong>SHOPZO15</strong> (Tap to apply)</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="catalog-section" id="catalog">
            <div className="container">
              <div className="catalog-header-bar">
                <div className="category-pills">
                  {[['all', '✨ All Products'], ['electronics', '💻 Electronics'], ['audio', '🎧 Audio'], ['footwear', '👟 Footwear'], ['fashion', '👕 Fashion'], ['watches', '⌚ Watches']].map(([key, label]) => (
                    <button key={key} className={`category-pill ${category === key ? 'active' : ''}`} onClick={() => { setCategory(key); setWishlistOnly(false); }}>{label}</button>
                  ))}
                </div>
                <div className="sort-control-wrapper">
                  <label>Sort By:</label>
                  <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="featured">Featured Picks</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              <div className="products-grid">
                {filteredProducts.map(prod => {
                  const m = getActiveModel(prod);
                  const discPct = Math.round(((m.originalPrice - m.price) / m.originalPrice) * 100);
                  const isWish = wishlist.includes(prod.id);
                  return (
                    <div className="product-card" key={prod.id}>
                      <div className="product-image-container">
                        {prod.badge && <span className={`product-badge ${prod.badgeType}`}>{prod.badge}</span>}
                        <button className="wishlist-toggle-btn" onClick={() => {
                          const next = isWish ? wishlist.filter(id => id !== prod.id) : [...wishlist, prod.id];
                          setWishlist(next); store.saveWishlist(next);
                        }}>{isWish ? '❤️' : '🤍'}</button>
                        <img src={prod.image} alt={prod.title} className="product-image" onError={e => { e.currentTarget.src = store.getProductFallbackSvg(prod.brand, prod.categoryLabel); }} />
                        <button className="quick-view-overlay-btn" onClick={() => setQuickViewProdId(prod.id)}>Quick View 👁️</button>
                      </div>
                      <div className="product-details">
                        <div className="product-category-row"><span className="product-category">{prod.brand} • {prod.categoryLabel}</span><span className="product-rating">★ {prod.rating}</span></div>
                        <h3 className="product-title">{prod.title}</h3>
                        <p className="product-desc-snippet">{prod.description}</p>
                        <div className="card-models-box">
                          <div className="card-models-label">
                            <span>Models ({prod.models.length})</span>
                            <span>{m.sku}</span>
                          </div>
                          <div className="card-models-list">
                            {prod.models.map((mod, mIdx) => (
                              <button
                                key={mod.sku}
                                className={`model-pill-btn ${(selectedModels[prod.id] || 0) === mIdx ? 'active' : ''}`}
                                onClick={() => setSelectedModels({ ...selectedModels, [prod.id]: mIdx })}
                              >
                                {mod.name}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="product-price-row">
                          <span className="current-price">{store.formatINR(m.price)}</span>
                          <span className="original-price">{store.formatINR(m.originalPrice)}</span>
                          <span className="discount-tag">{discPct > 0 ? `${discPct}% OFF` : 'BEST'}</span>
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--success)', marginBottom: 8 }}>{store.getProductDeliveryBadge()}</div>
                        <div className="product-action-buttons">
                          <button className="btn-add-cart" onClick={() => addToCart(prod.id)}>🛒 Add</button>
                          <button className="btn-buy-now" onClick={() => { setDirectItem({ id: prod.id, title: prod.title, modelName: m.name, sku: m.sku, image: prod.image, price: m.price, qty: 1 }); setCheckoutOpen(true); }}>⚡ Buy Now</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      )}

      <Footer onSelectCategory={(c) => { setCategory(c); setWishlistOnly(false); }} onOpenOrders={() => setOrdersOpen(true)} showToast={showToast} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={(key, delta) => {
          const next = cart.map(i => i.cartKey === key ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0);
          setCart(next); store.saveCart(next);
        }}
        onRemove={(key) => { const next = cart.filter(i => i.cartKey !== key); setCart(next); store.saveCart(next); }}
        promoCode={promoCode}
        onApplyPromo={(c) => { if (c === 'SHOPZO15') { setPromoCode(c); showToast('SHOPZO15 applied!', 'success'); } else showToast('Invalid code', 'danger'); }}
        onCheckout={() => { setCartOpen(false); setDirectItem(null); setCheckoutOpen(true); }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => { setCheckoutOpen(false); setDirectItem(null); }}
        total={checkoutTotal}
        currentUser={currentUser}
        onPlaceOrder={handlePlaceOrder}
        onTrackOrder={() => setOrdersOpen(true)}
      />

      <QuickViewModal
        product={products.find(p => p.id === quickViewProdId)}
        selectedModelIdx={selectedModels[quickViewProdId] || 0}
        onSelectModel={(pid, idx) => setSelectedModels({ ...selectedModels, [pid]: idx })}
        onClose={() => setQuickViewProdId(null)}
        onAddToCart={addToCart}
        onBuyNow={(pid) => {
          const p = products.find(x => x.id === pid);
          const m = getActiveModel(p);
          setDirectItem({ id: p.id, title: p.title, modelName: m.name, sku: m.sku, image: p.image, price: m.price, qty: 1 });
          setCheckoutOpen(true);
        }}
      />

      <OrderTrackingModal
        open={ordersOpen}
        onClose={() => setOrdersOpen(false)}
        orders={orders}
        currentUser={currentUser}
        onOpenOrderedProduct={(prodId, modelName) => {
          const prod = products.find(p => p.id === prodId);
          if (!prod) return;
          const idx = prod.models.findIndex(m => m.name === modelName);
          if (idx > -1) setSelectedModels({ ...selectedModels, [prod.id]: idx });
          setQuickViewProdId(prod.id);
        }}
      />

      <div id="toast-container">{toasts.map(t => <div key={t.id} className={`toast-msg ${t.type}`}>{t.msg}</div>)}</div>
    </div>
  );
}
