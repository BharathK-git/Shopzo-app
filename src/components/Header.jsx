import React, { useState } from 'react';

export default function Header({
  currentUser, searchQuery, onSearchChange, onSubmitSearch, onClearSearch, matchingBrands, onSelectBrand,
  cartCount, wishlistCount, onOpenCart, onToggleWishlist, onOpenOrders, onOpenAuth, onLogout, onResetFilters
}) {
  const [dropOpen, setDropOpen] = useState(false);
  const [sugOpen, setSugOpen] = useState(false);
  const initials = currentUser?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <>
      <div className="announcement-bar">
        <span className="badge">FESTIVE SALE</span>
        <span>Use code <strong>SHOPZO15</strong> for 15% OFF on orders above ₹1,999 | Free Express Delivery across India</span>
      </div>
      <header className="site-header">
        <div className="container">
          <div className="nav-container">
            <a href="#top" className="brand-logo" onClick={e => { e.preventDefault(); onResetFilters(); }}>
              <div className="logo-icon">S</div>
              <span>Shopzo<span className="dot">.</span></span>
            </a>

            <div className="search-wrapper">
              <span className="search-icon-left">🔍</span>
              <input
                type="text"
                className="search-input"
                value={searchQuery}
                placeholder="Search mobiles, shoes, laptops... (Press Enter)"
                onChange={e => { onSearchChange(e.target.value); setSugOpen(true); }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    e.preventDefault();
                    setSugOpen(false);
                    onSubmitSearch(searchQuery);
                  }
                }}
                onFocus={() => searchQuery && setSugOpen(true)}
                onBlur={() => setTimeout(() => setSugOpen(false), 180)}
              />
              {searchQuery && <button className="search-clear-btn" style={{ display: 'block' }} onClick={onClearSearch}>✕</button>}
              {sugOpen && searchQuery.trim() && (
                <div className="search-suggestions-dropdown show">
                  <div className="search-sug-header">Matching Brands ({matchingBrands.length})</div>
                  {matchingBrands.length === 0 ? (
                    <div className="search-sug-header">No matching brands</div>
                  ) : matchingBrands.map(b => (
                    <div key={b} className="search-sug-item" onMouseDown={() => { onSubmitSearch(searchQuery, b); setSugOpen(false); }}>
                      <div className="brand-only-avatar" style={{ width: 34, height: 34, fontSize: 13, borderRadius: 8 }}>{b.slice(0,2).toUpperCase()}</div>
                      <div className="search-sug-info">
                        <div className="search-sug-title">{b}</div>
                        <div className="search-sug-models">Tap to view all {b} models →</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="header-actions">
              <button className="action-btn" onClick={onOpenOrders}><span>📦</span><span>Track Order</span></button>
              <button className="action-btn" onClick={onToggleWishlist}><span>❤️</span><span>{wishlistCount}</span></button>
              <button className="action-btn cart-btn" onClick={onOpenCart}>
                <span>🛍️</span><span style={{ fontWeight: 700 }}>Cart</span><span className="action-badge">{cartCount}</span>
              </button>
              <div className="user-profile-menu">
                <button className="user-pill" onClick={() => setDropOpen(!dropOpen)}>
                  <div className="user-avatar">{initials}</div>
                  <span className="user-name-text">{currentUser?.name?.split(" ")[0] || "User"}</span>
                  <span style={{ fontSize: 10, color: '#64748b' }}>▼</span>
                </button>
                {dropOpen && (
                  <div className="user-dropdown show" onMouseLeave={() => setDropOpen(false)}>
                    <div className="user-dropdown-header">
                      <div className="drop-name">{currentUser?.name}</div>
                      <div className="drop-email">{currentUser?.email}</div>
                    </div>
                    <button className="dropdown-item" onClick={() => { setDropOpen(false); onOpenOrders(); }}><span>📦</span> My Orders & Tracking</button>
                    <button className="dropdown-item" onClick={() => { setDropOpen(false); onOpenAuth(); }}><span>🔄</span> Switch Account</button>
                    <button className="dropdown-item logout" onClick={() => { setDropOpen(false); onLogout(); }}><span>🚪</span> Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
