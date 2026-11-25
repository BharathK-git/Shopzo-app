import React from 'react';

export default function Footer({ onSelectCategory, onOpenOrders, showToast }) {
  return (
    <footer className="shopzo-pro-footer">
      <div className="container">
        <div className="pro-footer-grid">
          <div className="pro-footer-col">
            <h5>ABOUT</h5>
            <ul>
              <li><a href="#contact" onClick={e => { e.preventDefault(); showToast('Contact: support@shopzo.com | 1800-120-7467', 'info'); }}>Contact Us</a></li>
              <li><a href="#about" onClick={e => { e.preventDefault(); showToast('Shopzo Retail — Curated Tech, Footwear & Fashion', 'info'); }}>About Us</a></li>
              <li><a href="#careers" onClick={e => { e.preventDefault(); showToast('Careers open at Shopzo Bengaluru & Visakhapatnam', 'info'); }}>Careers</a></li>
              <li><a href="#stories" onClick={e => { e.preventDefault(); showToast('Shopzo Stories: 100% Genuine Brand Hubs', 'info'); }}>Shopzo Stories</a></li>
              <li><a href="#press" onClick={e => { e.preventDefault(); showToast('Press inquiries: press@shopzo.com', 'info'); }}>Press</a></li>
              <li><a href="#corp" onClick={e => { e.preventDefault(); showToast('Shopzo Retail Technologies Pvt. Ltd.', 'info'); }}>Corporate Information</a></li>
            </ul>
          </div>

          <div className="pro-footer-col">
            <h5>CATEGORIES</h5>
            <ul>
              <li><a href="#catalog" onClick={() => onSelectCategory('electronics')}>Mobiles & Laptops</a></li>
              <li><a href="#catalog" onClick={() => onSelectCategory('audio')}>Audio & Headphones</a></li>
              <li><a href="#catalog" onClick={() => onSelectCategory('footwear')}>Footwear & Sneakers</a></li>
              <li><a href="#catalog" onClick={() => onSelectCategory('watches')}>Watches</a></li>
              <li><a href="#catalog" onClick={() => onSelectCategory('fashion')}>Fashion & Eyewear</a></li>
            </ul>
          </div>

          <div className="pro-footer-col">
            <h5>HELP</h5>
            <ul>
              <li><a href="#pay" onClick={e => { e.preventDefault(); showToast('Accepted: UPI, Credit/Debit Cards & Cash on Delivery', 'info'); }}>Payments</a></li>
              <li><a href="#ship" onClick={e => { e.preventDefault(); showToast('Free Express Delivery above ₹999 across India', 'info'); }}>Shipping</a></li>
              <li><a href="#track" onClick={e => { e.preventDefault(); onOpenOrders(); }}>Track Your Order</a></li>
              <li><a href="#ret" onClick={e => { e.preventDefault(); showToast('7-Day easy returns & instant replacements', 'info'); }}>Cancellation & Returns</a></li>
              <li><a href="#faq" onClick={e => { e.preventDefault(); showToast('24/7 Customer Care: 1800-120-7467', 'info'); }}>FAQ</a></li>
            </ul>
          </div>

          <div className="pro-footer-col">
            <h5>CONSUMER POLICY</h5>
            <ul>
              <li><a href="#cancel" onClick={e => { e.preventDefault(); showToast('Zero-fee cancellation before shipment', 'info'); }}>Cancellation & Returns</a></li>
              <li><a href="#terms" onClick={e => { e.preventDefault(); showToast('Standard Shopzo Terms of Use apply', 'info'); }}>Terms Of Use</a></li>
              <li><a href="#sec" onClick={e => { e.preventDefault(); showToast('256-bit SSL encrypted checkout', 'info'); }}>Security</a></li>
              <li><a href="#priv" onClick={e => { e.preventDefault(); showToast('Your data is protected under Shopzo Privacy Policy', 'info'); }}>Privacy</a></li>
              <li><a href="#griev" onClick={e => { e.preventDefault(); showToast('Grievance Officer: grievance@shopzo.com', 'info'); }}>Grievance Redressal</a></li>
            </ul>
          </div>

          <div className="pro-footer-col pro-footer-divider">
            <h5>Mail Us:</h5>
            <p>
              Shopzo Retail Technologies Pvt. Ltd.,<br />
              Indiranagar 100 Feet Road, HAL 2nd Stage,<br />
              Bengaluru, 560038,<br />
              Karnataka, India
            </p>
            <h5 style={{ marginTop: 14 }}>Social:</h5>
            <div className="pro-footer-social">
              <span title="Facebook">📘</span>
              <span title="X / Twitter">𝕏</span>
              <span title="YouTube">▶️</span>
              <span title="Instagram">📸</span>
            </div>
          </div>

          <div className="pro-footer-col">
            <h5>Registered Office Address:</h5>
            <p>
              Shopzo Retail Technologies Pvt. Ltd.,<br />
              Indiranagar 100 Feet Road, HAL 2nd Stage,<br />
              Bengaluru, 560038, Karnataka, India<br />
              CIN : U74999KA2024PTC184210<br />
              Telephone: <span style={{ color: '#60a5fa' }}>1800-120-7467 / 044-67415800</span>
            </p>
          </div>
        </div>

        <div className="pro-footer-bottom">
          <div className="pro-footer-bottom-links">
            <span>🏪 Become a Seller</span>
            <span>📢 Advertise</span>
            <span>🎁 Gift Cards</span>
            <span onClick={() => showToast('Help Center: support@shopzo.com', 'info')} style={{ cursor: 'pointer' }}>❓ Help Center</span>
          </div>
          <div>© 2026 Shopzo.com — All Rights Reserved</div>
          <div className="pro-footer-payments">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>RuPay</span>
            <span>UPI</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
