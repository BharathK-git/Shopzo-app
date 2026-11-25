export const ADMIN_ACCOUNTS = [
  { name: "Bharath", email: "bharathk@gmail.com", pass: "123456" },
  { name: "Vijay", email: "vijay@gmail.com", pass: "123456" },
  { name: "Swaroop", email: "swaroop@gmail.com", pass: "123456" }
];

export const TRACK_STEPS = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export const DEFAULT_PRODUCTS = [
  {
    id: "mob-samsung", brand: "Samsung", productType: "mobiles", tags: "mobile mobiles phone phones smartphone smartphones android 5g",
    title: "Samsung Galaxy 5G Smartphones", category: "electronics", categoryLabel: "Mobiles", rating: 4.8, badge: "5G Ready", badgeType: "sale",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80",
    description: "Super AMOLED 120Hz displays, Galaxy AI, and pro-grade OIS cameras across flagship and A-series.",
    models: [
      { sku: "SAM-A55-128", name: "Galaxy A55 5G (8GB/128GB)", specs: "120Hz AMOLED • IP67", price: 18499, originalPrice: 24999 },
      { sku: "SAM-S24U-256", name: "Galaxy S24 Ultra (12GB/256GB)", specs: "200MP • S Pen • Titanium", price: 99999, originalPrice: 129999 },
      { sku: "SAM-ZFLIP6", name: "Galaxy Z Flip 6 (12GB/256GB)", specs: "Foldable • FlexCam", price: 89999, originalPrice: 109999 }
    ]
  },
  {
    id: "mob-apple", brand: "Apple", productType: "mobiles", tags: "mobile mobiles phone phones smartphone smartphones iphone ios 5g",
    title: "Apple iPhone Series", category: "electronics", categoryLabel: "Mobiles", rating: 4.9, badge: "Flagship", badgeType: "trending",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80",
    description: "A18 Pro & A18 silicon, Super Retina XDR displays, and Ceramic Shield durability.",
    models: [
      { sku: "APL-IP15-128", name: "iPhone 15 (128GB Black)", specs: "A16 Bionic • Dynamic Island", price: 59990, originalPrice: 69900 },
      { sku: "APL-IP16-128", name: "iPhone 16 (128GB Ultramarine)", specs: "A18 Chip • Camera Control", price: 74900, originalPrice: 79900 },
      { sku: "APL-IP16PM", name: "iPhone 16 Pro Max (256GB)", specs: "A18 Pro • 5x Telephoto", price: 139900, originalPrice: 144900 }
    ]
  },
  {
    id: "mob-oneplus", brand: "OnePlus", productType: "mobiles", tags: "mobile mobiles phone phones smartphone smartphones android 5g",
    title: "OnePlus 5G Smartphones", category: "electronics", categoryLabel: "Mobiles", rating: 4.7, badge: "Fast Charge", badgeType: "sale",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
    description: "Hasselblad camera tuning, 100W SUPERVOOC charging, and 120Hz ProXDR displays.",
    models: [
      { sku: "OP-NORD4", name: "OnePlus Nord 4 (8GB/256GB)", specs: "Metal Unibody • 100W", price: 29999, originalPrice: 32999 },
      { sku: "OP-12R", name: "OnePlus 12R (16GB/256GB)", specs: "Snapdragon 8 Gen 2 • 5500mAh", price: 39999, originalPrice: 44999 },
      { sku: "OP-12-PRO", name: "OnePlus 12 (16GB/512GB)", specs: "Snapdragon 8 Gen 3 • Hasselblad", price: 64999, originalPrice: 69999 }
    ]
  },
  {
    id: "mob-pixel", brand: "Google Pixel", productType: "mobiles", tags: "mobile mobiles phone phones smartphone smartphones android pixel 5g",
    title: "Google Pixel AI Smartphones", category: "electronics", categoryLabel: "Mobiles", rating: 4.8, badge: "AI Camera", badgeType: "trending",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    description: "Google Tensor G4 powered phones with Gemini AI, Best Take, and 7 years of OS updates.",
    models: [
      { sku: "PIX-8A-128", name: "Pixel 8a (8GB/128GB Aloe)", specs: "Tensor G3 • 64MP Camera", price: 44999, originalPrice: 52999 },
      { sku: "PIX-9-256", name: "Pixel 9 (12GB/256GB Porcelain)", specs: "Tensor G4 • Actua Display", price: 74999, originalPrice: 79999 },
      { sku: "PIX-9PRO", name: "Pixel 9 Pro (16GB/256GB Hazel)", specs: "Triple Pro Cam • Super Actua", price: 99999, originalPrice: 109999 }
    ]
  },
  {
    id: "lap-asus", brand: "ASUS", productType: "laptops", tags: "laptop laptops notebook computer computers ultrabook gaming",
    title: "ASUS Vivobook & ROG Laptops", category: "electronics", categoryLabel: "Laptops", rating: 4.8, badge: "Top Deal", badgeType: "trending",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    description: "Thin & light productivity ultrabooks and high-refresh ROG esports gaming laptops.",
    models: [
      { sku: "ASU-VB15-I5", name: "Vivobook 15 (i5 / 16GB / 512GB)", specs: "13th Gen • FHD IPS", price: 38990, originalPrice: 49990 },
      { sku: "ASU-VB15-OLED", name: "Vivobook 15 OLED (i7 / 1TB)", specs: "2.8K OLED • 120Hz", price: 56990, originalPrice: 69990 },
      { sku: "ROG-G16-4060", name: "ROG Strix G16 (RTX 4060)", specs: "i7-13650HX • 165Hz Nebula", price: 109990, originalPrice: 134990 }
    ]
  },
  {
    id: "lap-apple", brand: "Apple MacBook", productType: "laptops", tags: "laptop laptops notebook computer computers macbook mac",
    title: "Apple MacBook Air & Pro", category: "electronics", categoryLabel: "Laptops", rating: 4.9, badge: "M3 / M4", badgeType: "trending",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
    description: "Silent fanless performance with Liquid Retina displays and up to 18-hour battery life.",
    models: [
      { sku: "MAC-AIR13-M3", name: "MacBook Air 13 M3 (16GB/256GB)", specs: "13.6-inch • Midnight", price: 104900, originalPrice: 114900 },
      { sku: "MAC-AIR15-M3", name: "MacBook Air 15 M3 (16GB/512GB)", specs: "15.3-inch • Starlight", price: 134900, originalPrice: 154900 },
      { sku: "MAC-PRO14-M4", name: "MacBook Pro 14 M4 (16GB/512GB)", specs: "120Hz XDR • Space Black", price: 164900, originalPrice: 169900 }
    ]
  },
  {
    id: "lap-dell", brand: "Dell", productType: "laptops", tags: "laptop laptops notebook computer computers ultrabook",
    title: "Dell Inspiron & XPS Laptops", category: "electronics", categoryLabel: "Laptops", rating: 4.7, badge: "Work & Pro", badgeType: "",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    description: "Precision-crafted aluminum laptops for everyday coding, business, and creative studio work.",
    models: [
      { sku: "DEL-INS15", name: "Inspiron 15 (i5 / 16GB / 512GB)", specs: "120Hz FHD • Platinum Silver", price: 46990, originalPrice: 58990 },
      { sku: "DEL-XPS13", name: "XPS 13 (Core Ultra 7 / 16GB)", specs: "InfinityEdge • CNC Aluminum", price: 124990, originalPrice: 144990 },
      { sku: "DEL-AW-M16", name: "Alienware m16 (RTX 4070)", specs: "QHD+ 240Hz • 32GB RAM", price: 169990, originalPrice: 199990 }
    ]
  },
  {
    id: "lap-hp", brand: "HP", productType: "laptops", tags: "laptop laptops notebook computer computers pavilion",
    title: "HP Pavilion, Envy & Omen Laptops", category: "electronics", categoryLabel: "Laptops", rating: 4.7, badge: "Bestseller", badgeType: "sale",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
    description: "Reliable HP laptops with B&O audio, fast charge, and crisp micro-edge displays.",
    models: [
      { sku: "HP-PAV15", name: "Pavilion 15 (Ryzen 5 / 16GB)", specs: "512GB SSD • Natural Silver", price: 44990, originalPrice: 56990 },
      { sku: "HP-ENVY-X360", name: "Envy x360 2-in-1 Touch (i7)", specs: "OLED Touch • Stylus Included", price: 84990, originalPrice: 99990 },
      { sku: "HP-OMEN16", name: "Omen 16 Gaming (RTX 4060)", specs: "165Hz • Tempest Cooling", price: 104990, originalPrice: 124990 }
    ]
  },
  {
    id: "sho-nike", brand: "Nike", productType: "shoes", tags: "shoe shoes footwear sneakers sneaker running trainers",
    title: "Nike Sneakers & Running Shoes", category: "footwear", categoryLabel: "Shoes", rating: 4.8, badge: "Trending", badgeType: "trending",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80",
    description: "Iconic Nike court silhouettes, Air Max cushioning, and daily road-running trainers.",
    models: [
      { sku: "NKE-REV7-8", name: "Revolution 7 Running (UK 8)", specs: "Foam Midsole • Crimson/Black", price: 2199, originalPrice: 3695 },
      { sku: "NKE-CV-9", name: "Court Vision Mid (UK 9)", specs: "Classic Mid-Top • White/Black", price: 2799, originalPrice: 4495 },
      { sku: "NKE-AM270-9", name: "Air Max 270 (UK 9)", specs: "270 Air Unit • Triple Black", price: 8995, originalPrice: 13995 }
    ]
  },
  {
    id: "sho-adidas", brand: "Adidas", productType: "shoes", tags: "shoe shoes footwear sneakers sneaker running trainers",
    title: "Adidas Originals & Ultraboost Shoes", category: "footwear", categoryLabel: "Shoes", rating: 4.8, badge: "Classic", badgeType: "",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    description: "Timeless Adidas Originals streetwear and responsive Boost energy-return running shoes.",
    models: [
      { sku: "ADI-STAN-8", name: "Stan Smith Classic (UK 8)", specs: "Full-Grain • White/Green", price: 4999, originalPrice: 8999 },
      { sku: "ADI-SAMBA-9", name: "Samba OG (UK 9)", specs: "Suede T-Toe • Gum Sole", price: 8999, originalPrice: 10999 },
      { sku: "ADI-UB-9", name: "Ultraboost Light (UK 9)", specs: "Continental Rubber • Core Black", price: 11999, originalPrice: 17999 }
    ]
  },
  {
    id: "sho-puma", brand: "Puma", productType: "shoes", tags: "shoe shoes footwear sneakers sneaker running trainers",
    title: "Puma Nitro & RS-X Shoes", category: "footwear", categoryLabel: "Shoes", rating: 4.7, badge: "Hot Deal", badgeType: "sale",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    description: "Nitrogen-infused Nitro foam runners and bold RS-X retro-futuristic lifestyle sneakers.",
    models: [
      { sku: "PUM-PAL-8", name: "Palermo Leather (UK 8)", specs: "Terrace Classic • Navy/Gum", price: 4499, originalPrice: 6999 },
      { sku: "PUM-RSX-9", name: "RS-X Efekt (UK 9)", specs: "Chunky Retro • White/Lime", price: 5999, originalPrice: 9999 },
      { sku: "PUM-VN3-9", name: "Velocity Nitro 3 (UK 9)", specs: "PUMAGRIP • Road Runner", price: 7999, originalPrice: 11999 }
    ]
  },
  {
    id: "sho-nb", brand: "New Balance", productType: "shoes", tags: "shoe shoes footwear sneakers sneaker running trainers",
    title: "New Balance 574 & 9060 Sneakers", category: "footwear", categoryLabel: "Shoes", rating: 4.9, badge: "Collector", badgeType: "trending",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
    description: "Heritage suede-mesh comfort with ENCAP and ABZORB dual-density midsole cushioning.",
    models: [
      { sku: "NB-574-8", name: "574 Core (UK 8)", specs: "ENCAP Cushion • Nimbus Gray", price: 6499, originalPrice: 9999 },
      { sku: "NB-9060-9", name: "9060 Sea Salt (UK 9)", specs: "ABZORB • Sculpted Pod Sole", price: 12999, originalPrice: 16999 },
      { sku: "NB-1080-9", name: "Fresh Foam X 1080v13 (UK 9)", specs: "Max Cushion • Marathon", price: 13999, originalPrice: 17999 }
    ]
  },
  {
    id: "aud-sony", brand: "Sony", productType: "audio", tags: "audio headphone headphones earbuds earphones anc wireless",
    title: "Sony Wireless ANC Headphones & Earbuds", category: "audio", categoryLabel: "Audio", rating: 4.9, badge: "Bestseller", badgeType: "sale",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    description: "Industry-leading active noise cancellation with V1/QN1 processors and LDAC Hi-Res audio.",
    models: [
      { sku: "SNY-720-BLK", name: "WH-CH720N Over-Ear", specs: "35h Battery • Multipoint", price: 2499, originalPrice: 3999 },
      { sku: "SNY-WF5-BLK", name: "WF-1000XM5 Earbuds", specs: "24h Total • IPX4", price: 16990, originalPrice: 24990 },
      { sku: "SNY-XM5-PRO", name: "WH-1000XM5 Flagship", specs: "8-Mic ANC • 30h Battery", price: 19990, originalPrice: 29990 }
    ]
  },
  {
    id: "aud-jbl", brand: "JBL", productType: "audio", tags: "audio headphone headphones earbuds earphones wireless bass",
    title: "JBL Pure Bass & ANC Headphones", category: "audio", categoryLabel: "Audio", rating: 4.7, badge: "Deep Bass", badgeType: "",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
    description: "Signature JBL Pure Bass sound with adaptive noise cancelling and ultra-fast USB-C charging.",
    models: [
      { sku: "JBL-T770", name: "Tune 770NC Wireless", specs: "70h Battery • Adaptive ANC", price: 4999, originalPrice: 9999 },
      { sku: "JBL-L770", name: "Live 770NC Spatial", specs: "65h Battery • Spatial Sound", price: 7999, originalPrice: 14999 },
      { sku: "JBL-TOUR", name: "Tour One M2 Flagship", specs: "True Adaptive ANC • Hi-Res", price: 15999, originalPrice: 24999 }
    ]
  },
  {
    id: "aud-boat", brand: "boAt", productType: "audio", tags: "audio headphone headphones earbuds earphones wireless",
    title: "boAt Rockerz & Nirvana Audio", category: "audio", categoryLabel: "Audio", rating: 4.6, badge: "Value Pick", badgeType: "sale",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    description: "Punchy bass drivers, ASAP fast charge, and BEAST low-latency gaming mode.",
    models: [
      { sku: "BOT-AD141", name: "Airdopes 141 TWS", specs: "42h Playtime • ENx Mic", price: 1099, originalPrice: 2990 },
      { sku: "BOT-R550", name: "Rockerz 550 Over-Ear", specs: "50mm Drivers • 20h Battery", price: 1799, originalPrice: 3999 },
      { sku: "BOT-N751", name: "Nirvana 751 ANC", specs: "33dB ANC • 65h Playtime", price: 3499, originalPrice: 7990 }
    ]
  },
  {
    id: "aud-bose", brand: "Bose", productType: "audio", tags: "audio headphone headphones earbuds earphones anc wireless",
    title: "Bose QuietComfort Wireless Series", category: "audio", categoryLabel: "Audio", rating: 4.9, badge: "Studio ANC", badgeType: "trending",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    description: "World-class acoustic noise cancellation with plush ear cushions and Immersive Audio.",
    models: [
      { sku: "BOS-QC-STD", name: "QuietComfort Headphones", specs: "24h Battery • Wind Block", price: 22900, originalPrice: 29900 },
      { sku: "BOS-QCU-EA", name: "QuietComfort Ultra Earbuds", specs: "CustomTune • Spatial", price: 24900, originalPrice: 29900 },
      { sku: "BOS-QCU-HD", name: "QuietComfort Ultra Over-Ear", specs: "Immersive Audio • Sandstone", price: 29900, originalPrice: 35900 }
    ]
  },
  {
    id: "wat-casio", brand: "Casio", productType: "watches", tags: "watch watches smartwatch timepiece analog digital",
    title: "Casio Enticer & G-Shock Watches", category: "watches", categoryLabel: "Watches", rating: 4.8, badge: "Iconic", badgeType: "",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    description: "Japanese quartz precision from classic leather chronographs to 200m shockproof G-Shock.",
    models: [
      { sku: "CAS-ENT-TAN", name: "Enticer Tan Leather (42mm)", specs: "Chronograph • 50m WR", price: 1999, originalPrice: 3295 },
      { sku: "CAS-GS-BLK", name: "G-Shock GA-2100 Stealth", specs: "Carbon Core • 200m WR", price: 6995, originalPrice: 9295 },
      { sku: "CAS-EDF-STL", name: "Edifice Sapphire Chrono", specs: "Solar • Stainless Steel", price: 11995, originalPrice: 15995 }
    ]
  },
  {
    id: "wat-fossil", brand: "Fossil", productType: "watches", tags: "watch watches smartwatch timepiece analog chronograph",
    title: "Fossil Chronograph & Automatic Watches", category: "watches", categoryLabel: "Watches", rating: 4.7, badge: "Classic", badgeType: "",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&auto=format&fit=crop&q=80",
    description: "44mm statement cases with Roman numerals, skeleton dials, and interchangeable straps.",
    models: [
      { sku: "FOS-GRN-BRN", name: "Grant Chronograph Brown", specs: "44mm • Genuine Leather", price: 6495, originalPrice: 11495 },
      { sku: "FOS-MCH-BLK", name: "Machine Black Stainless", specs: "42mm • Smoke Steel", price: 7995, originalPrice: 13495 },
      { sku: "FOS-TWN-AUT", name: "Townsman Automatic", specs: "Skeleton Dial • 44mm", price: 12995, originalPrice: 18995 }
    ]
  },
  {
    id: "wat-titan", brand: "Titan", productType: "watches", tags: "watch watches timepiece analog ceramic",
    title: "Titan Edge & Octane Watches", category: "watches", categoryLabel: "Watches", rating: 4.7, badge: "Slim Design", badgeType: "sale",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    description: "Ultra-slim Edge ceramic timepieces and sporty Octane chronographs crafted in India.",
    models: [
      { sku: "TIT-NEO-BLK", name: "Neo Iv Analog Black", specs: "40mm • Leather Strap", price: 2995, originalPrice: 4495 },
      { sku: "TIT-OCT-BLU", name: "Octane Hyper Lume", specs: "100m WR • Tachymeter", price: 5995, originalPrice: 8995 },
      { sku: "TIT-EDG-CER", name: "Edge Ceramic Ultra-Slim", specs: "4.4mm Thin • Sapphire", price: 18995, originalPrice: 24995 }
    ]
  },
  {
    id: "fas-levis", brand: "Levi's", productType: "fashion", tags: "fashion clothes jacket jackets denim jeans shirt wear",
    title: "Levi's Denim Jackets & Jeans", category: "fashion", categoryLabel: "Fashion", rating: 4.7, badge: "Hot Deal", badgeType: "sale",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    description: "Authentic 100% cotton denim staples with branded metal hardware and classic fits.",
    models: [
      { sku: "LEV-511-32", name: "511 Slim Fit Jeans (32)", specs: "Stretch Indigo • Mid-Rise", price: 1799, originalPrice: 3299 },
      { sku: "LEV-JKT-M", name: "Trucker Denim Jacket (M)", specs: "100% Cotton • Indigo", price: 1499, originalPrice: 2799 },
      { sku: "LEV-JKT-XL", name: "Trucker Charcoal Jacket (XL)", specs: "Relaxed Fit • Washed", price: 1699, originalPrice: 2999 }
    ]
  },
  {
    id: "fas-vc", brand: "Vincent Chase", productType: "fashion", tags: "fashion sunglasses eyewear glasses shades wayfarer",
    title: "Vincent Chase Polarized Sunglasses", category: "fashion", categoryLabel: "Fashion", rating: 4.8, badge: "UV400", badgeType: "",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    description: "Lightweight polarized TAC lenses offering 100% UV400 protection and zero glare.",
    models: [
      { sku: "VC-WAY-BLK", name: "Wayfarer Matte Black", specs: "Polarized Green • UV400", price: 999, originalPrice: 1999 },
      { sku: "VC-AVI-GLD", name: "Classic Aviator Gold", specs: "Polarized Gray • Metal", price: 1199, originalPrice: 2299 },
      { sku: "VC-RND-TRT", name: "Retro Round Tortoise", specs: "Polarized Brown • Acetate", price: 1299, originalPrice: 2499 }
    ]
  },
  {
    id: "fas-zara", brand: "Zara", productType: "fashion", tags: "fashion clothes jacket jackets shirt shirts wear",
    title: "Zara Essential Outerwear & Shirts", category: "fashion", categoryLabel: "Fashion", rating: 4.7, badge: "New Edit", badgeType: "trending",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    description: "Contemporary European tailoring in breathable linen blends and structured bomber silhouettes.",
    models: [
      { sku: "ZAR-LIN-M", name: "Linen Overshirt Sand (M)", specs: "Relaxed Cut • Breathable", price: 2490, originalPrice: 3590 },
      { sku: "ZAR-BMB-L", name: "Structured Bomber Black (L)", specs: "Water Repellent • Zip", price: 3990, originalPrice: 5490 },
      { sku: "ZAR-TRS-32", name: "Pleated Tailored Trousers", specs: "Slim Tapered • Charcoal", price: 2990, originalPrice: 4290 }
    ]
  }
  ,{
    id: "elec-tv-sony", brand: "Sony Bravia", productType: "tv", tags: "tv television smart tv 4k oled electronics",
    title: "Sony Bravia 4K Ultra HD Smart TVs", category: "electronics", categoryLabel: "Electronics", rating: 4.9, badge: "4K HDR", badgeType: "trending",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80",
    description: "X1 4K HDR Processor with Dolby Vision, Triluminos Pro, and Google TV.",
    models: [
      { sku: "SNY-TV-43", name: "Bravia 43-inch 4K LED", specs: "Google TV • Dolby Audio", price: 39990, originalPrice: 54900 },
      { sku: "SNY-TV-55", name: "Bravia 55-inch 4K XR", specs: "120Hz • HDMI 2.1 Gaming", price: 64990, originalPrice: 89900 },
      { sku: "SNY-TV-65", name: "Bravia 65-inch OLED", specs: "XR OLED Contrast Pro", price: 149990, originalPrice: 199900 }
    ]
  },
  {
    id: "elec-tab-ipad", brand: "Apple iPad", productType: "tablets", tags: "tablet tablets ipad tab electronics",
    title: "Apple iPad Air & Pro Tablets", category: "electronics", categoryLabel: "Tablets", rating: 4.9, badge: "M2 / M4", badgeType: "sale",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    description: "Liquid Retina display with Apple Pencil Pro support and all-day battery.",
    models: [
      { sku: "IPAD-10-64", name: "iPad 10th Gen (64GB Wi-Fi)", specs: "10.9-inch • A14 Bionic", price: 32900, originalPrice: 39900 },
      { sku: "IPAD-AIR-M2", name: "iPad Air 11 M2 (128GB)", specs: "M2 Chip • Landscape Cam", price: 54900, originalPrice: 59900 },
      { sku: "IPAD-PRO-M4", name: "iPad Pro 13 M4 OLED", specs: "Ultra Retina XDR • M4", price: 119900, originalPrice: 129900 }
    ]
  }
];

export function normalizeSearchTerm(raw) {
  const q = raw.trim().toLowerCase();
  const aliasMap = {
    mobile: "mobiles", mobiles: "mobiles", modile: "mobiles", modiles: "mobiles", mobils: "mobiles",
    phone: "mobiles", phones: "mobiles", smartphone: "mobiles", smartphones: "mobiles", cell: "mobiles",
    shoe: "shoes", shoes: "shoes", shooes: "shoes", shooe: "shoes", shos: "shoes",
    sneaker: "shoes", sneakers: "shoes", footwear: "shoes", trainers: "shoes",
    laptop: "laptops", laptops: "laptops", laptp: "laptops", leptop: "laptops", computer: "laptops", notebook: "laptops",
    headphone: "audio", headphones: "audio", headphons: "audio", earphones: "audio", earbuds: "audio", buds: "audio", audio: "audio",
    watch: "watches", watches: "watches", wach: "watches", waches: "watches", smartwatch: "watches",
    jacket: "fashion", jackets: "fashion", clothes: "fashion", clothing: "fashion", fashion: "fashion", sunglasses: "fashion", jeans: "fashion", shirt: "fashion"
  };
  if (aliasMap[q]) return { raw: q, canonical: aliasMap[q] };
  const keys = Object.keys(aliasMap);
  for (const k of keys) {
    if (Math.abs(k.length - q.length) <= 1 && q.length >= 4) {
      let diffs = 0;
      for (let i = 0; i < Math.min(k.length, q.length); i++) {
        if (k[i] !== q[i]) diffs++;
      }
      diffs += Math.abs(k.length - q.length);
      if (diffs <= 2) return { raw: q, canonical: aliasMap[k] };
    }
  }
  return { raw: q, canonical: q };
}
