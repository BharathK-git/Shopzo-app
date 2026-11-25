import { DEFAULT_PRODUCTS } from '../data/products';

export const STORAGE_KEYS = {
  PRODUCTS: "shopzo_products_v4",
  USERS: "shopzo_users",
  CURRENT_USER: "shopzo_currentUser",
  ADMIN_SESSION: "shopzo_admin_session",
  ADMIN_NAME: "shopzo_admin_name",
  CART: "shopzo_cart_v2",
  WISHLIST: "shopzo_wishlist",
  ORDERS: "shopzo_orders_v2"
};

export function loadProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
}

export function saveProducts(products) {
  try { localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products)); } catch (e) {}
}

export function loadUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    if (stored) return JSON.parse(stored);
    const defaults = [{ name: "bharath karri", email: "bharath@shopzo.com", password: "password123" }];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaults));
    return defaults;
  } catch (e) {
    return [{ name: "bharath karri", email: "bharath@shopzo.com", password: "password123" }];
  }
}

export function saveUsers(users) {
  try { localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)); } catch (e) {}
}

export function loadCurrentUser() {
  try {
    const s = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return s ? JSON.parse(s) : null;
  } catch (e) { return null; }
}

export function saveCurrentUser(user) {
  try {
    if (user) sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    else sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (e) {}
}

export function loadAdminSession() {
  try {
    return {
      isAuth: sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === "true",
      name: sessionStorage.getItem(STORAGE_KEYS.ADMIN_NAME) || "Admin"
    };
  } catch (e) { return { isAuth: false, name: "Admin" }; }
}

export function saveAdminSession(isAuth, name = "") {
  try {
    if (isAuth) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, "true");
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_NAME, name);
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_NAME);
    }
  } catch (e) {}
}

export function loadCart() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || "[]"); } catch (e) { return []; }
}

export function saveCart(cart) {
  try { localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart)); } catch (e) {}
}

export function loadWishlist() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST) || "[]"); } catch (e) { return []; }
}

export function saveWishlist(wishlist) {
  try { localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist)); } catch (e) {}
}

export function loadOrders() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || "[]"); } catch (e) { return []; }
}

export function saveOrders(orders) {
  try { localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders)); } catch (e) {}
}

export function formatINR(num) {
  return "₹" + Number(num).toLocaleString("en-IN");
}

export function parseOrderDate(dateStr) {
  if (!dateStr) return new Date();
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const d = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    if (!isNaN(d.getTime())) return d;
  }
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function formatShortDateOffset(baseDate, offsetDays) {
  const d = new Date(baseDate.getTime());
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

export function formatStepDate(baseDate, offsetDays) {
  const d = new Date(baseDate.getTime());
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function getProductDeliveryBadge() {
  return "🚚 Delivery by " + formatShortDateOffset(new Date(), 2);
}

export function getProductFallbackSvg(brand, category) {
  const icons = { Audio: "🎧", Electronics: "💻", Footwear: "👟", Watches: "⌚", Fashion: "👕" };
  const bg = { Audio: "#eef2ff", Electronics: "#eff6ff", Footwear: "#fef3c7", Watches: "#f3e8ff", Fashion: "#ecfdf5" };
  const icon = icons[category] || "🛍️";
  const fill = bg[category] || "#f1f5f9";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="${fill}"/><text x="200" y="145" font-size="72" text-anchor="middle" dominant-baseline="middle">${icon}</text><text x="200" y="215" font-family="sans-serif" font-size="20" font-weight="700" fill="#334155" text-anchor="middle">${brand || category}</text></svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}
