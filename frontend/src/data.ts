const data = {
  "products": [
    {
      "id": "prod_001",
      "name": "Wireless Noise-Cancelling Headphones Pro",
      "brand": "AudioTech",
      "price": 249.99,
      "discountPrice": 199.99,
      "images": [
        "https://picsum.photos/seed/headphones1/400/400",
        "https://picsum.photos/seed/headphones2/400/400",
        "https://picsum.photos/seed/headphones3/400/400"
      ],
      "rating": 4.7,
      "reviewCount": 1254,
      "stock": 45,
      "category": "Electronics",
      "description": "Premium wireless headphones with active noise cancellation, 40-hour battery life, and hi-res audio certification.",
      "specifications": {
        "battery": "40 hours",
        "connectivity": "Bluetooth 5.2",
        "weight": "250g",
        "color": "Black"
      }
    },
    {
      "id": "prod_002",
      "name": "Smart Fitness Band 6",
      "brand": "FitLife",
      "price": 89.99,
      "discountPrice": 69.99,
      "images": [
        "https://picsum.photos/seed/fitnessband1/400/400",
        "https://picsum.photos/seed/fitnessband2/400/400"
      ],
      "rating": 4.5,
      "reviewCount": 876,
      "stock": 120,
      "category": "Wearables",
      "description": "Advanced fitness tracker with heart rate monitor, SpO2 tracking, sleep analysis, and 14-day battery life.",
      "specifications": {
        "display": "1.3-inch AMOLED",
        "water_resistance": "5ATM",
        "battery": "14 days",
        "compatibility": "iOS 12+, Android 8+"
      }
    },
    {
      "id": "prod_003",
      "name": "Organic Cotton T-Shirt",
      "brand": "EcoWear",
      "price": 34.99,
      "images": [
        "https://picsum.photos/seed/tshirt1/400/400",
        "https://picsum.photos/seed/tshirt2/400/400"
      ],
      "rating": 4.3,
      "reviewCount": 432,
      "stock": 200,
      "category": "Clothing",
      "description": "Sustainable 100% organic cotton t-shirt, ethically made and available in multiple colors.",
      "specifications": {
        "material": "100% Organic Cotton",
        "sizes": "S, M, L, XL",
        "care": "Machine wash cold",
        "origin": "Made in India"
      }
    },
    {
      "id": "prod_004",
      "name": "Stainless Steel Water Bottle",
      "brand": "HydroPure",
      "price": 29.99,
      "discountPrice": 24.99,
      "images": [
        "https://picsum.photos/seed/bottle1/400/400",
        "https://picsum.photos/seed/bottle2/400/400",
        "https://picsum.photos/seed/bottle3/400/400"
      ],
      "rating": 4.8,
      "reviewCount": 2109,
      "stock": 350,
      "category": "Kitchen",
      "description": "Double-walled vacuum insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
      "specifications": {
        "capacity": "750ml",
        "material": "18/8 Stainless Steel",
        "insulation": "24 hours cold, 12 hours hot",
        "color": "Matte Black"
      }
    },
    {
      "id": "prod_005",
      "name": "4K Action Camera",
      "brand": "SnapVision",
      "price": 299.99,
      "discountPrice": 249.99,
      "images": [
        "https://picsum.photos/seed/camera1/400/400",
        "https://picsum.photos/seed/camera2/400/400"
      ],
      "rating": 4.6,
      "reviewCount": 567,
      "stock": 30,
      "category": "Electronics",
      "description": "Ultra-compact action camera with 4K 60fps recording, image stabilization, and waterproof to 10 meters.",
      "specifications": {
        "video": "4K@60fps, 1080p@120fps",
        "sensor": "12MP Sony CMOS",
        "waterproof": "10m",
        "storage": "Up to 256GB microSD"
      }
    },
    {
      "id": "prod_006",
      "name": "Leather Crossbody Bag",
      "brand": "UrbanCraft",
      "price": 79.99,
      "images": [
        "https://picsum.photos/seed/bag1/400/400",
        "https://picsum.photos/seed/bag2/400/400",
        "https://picsum.photos/seed/bag3/400/400"
      ],
      "rating": 4.4,
      "reviewCount": 312,
      "stock": 75,
      "category": "Accessories",
      "description": "Genuine leather crossbody bag with adjustable strap, perfect for everyday use.",
      "specifications": {
        "material": "100% Genuine Leather",
        "dimensions": "20cm x 15cm x 8cm",
        "strap": "Adjustable up to 120cm",
        "color": "Tan Brown"
      }
    },
    {
      "id": "prod_007",
      "name": "Wireless Charging Pad",
      "brand": "ChargeMaster",
      "price": 39.99,
      "discountPrice": 29.99,
      "images": [
        "https://picsum.photos/seed/charger1/400/400",
        "https://picsum.photos/seed/charger2/400/400"
      ],
      "rating": 4.2,
      "reviewCount": 987,
      "stock": 150,
      "category": "Electronics",
      "description": "Fast wireless charging pad compatible with all Qi-enabled devices, with LED indicator and anti-slip design.",
      "specifications": {
        "output": "15W Max",
        "compatibility": "Qi-enabled devices",
        "input": "5V/2A, 9V/2A",
        "safety": "Over-current protection"
      }
    },
    {
      "id": "prod_008",
      "name": "Men's Running Shoes",
      "brand": "SpeedStep",
      "price": 119.99,
      "discountPrice": 99.99,
      "images": [
        "https://picsum.photos/seed/shoes1/400/400",
        "https://picsum.photos/seed/shoes2/400/400",
        "https://picsum.photos/seed/shoes3/400/400"
      ],
      "rating": 4.9,
      "reviewCount": 1843,
      "stock": 90,
      "category": "Footwear",
      "description": "Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole.",
      "specifications": {
        "size_range": "7-12 US",
        "weight": "280g",
        "drop": "8mm",
        "color": "Black/White"
      }
    },
    {
      "id": "prod_009",
      "name": "Smart Home Hub",
      "brand": "HomeIQ",
      "price": 149.99,
      "images": [
        "https://picsum.photos/seed/hub1/400/400",
        "https://picsum.photos/seed/hub2/400/400"
      ],
      "rating": 4.3,
      "reviewCount": 234,
      "stock": 40,
      "category": "Smart Home",
      "description": "Central smart home controller with voice assistant, compatible with Zigbee, Z-Wave, and Wi-Fi devices.",
      "specifications": {
        "connectivity": "Wi-Fi, Zigbee, Z-Wave",
        "voice_assistant": "Built-in",
        "compatibility": "Alexa, Google Home, Apple HomeKit",
        "ports": "USB-C, Ethernet"
      }
    },
    {
      "id": "prod_010",
      "name": "Portable Power Bank 20000mAh",
      "brand": "Energize",
      "price": 59.99,
      "discountPrice": 49.99,
      "images": [
        "https://picsum.photos/seed/powerbank1/400/400",
        "https://picsum.photos/seed/powerbank2/400/400"
      ],
      "rating": 4.7,
      "reviewCount": 1567,
      "stock": 250,
      "category": "Electronics",
      "description": "High-capacity power bank with fast charging, dual USB ports, and digital battery display.",
      "specifications": {
        "capacity": "20000mAh",
        "ports": "2x USB-A, 1x USB-C",
        "fast_charging": "PD 18W, QC 3.0",
        "weight": "420g"
      }
    },
    {
      "id": "prod_011",
      "name": "Yoga Mat Premium",
      "brand": "ZenLife",
      "price": 45.99,
      "discountPrice": 39.99,
      "images": [
        "https://picsum.photos/seed/yoga1/400/400",
        "https://picsum.photos/seed/yoga2/400/400"
      ],
      "rating": 4.6,
      "reviewCount": 789,
      "stock": 180,
      "category": "Sports",
      "description": "Non-slip premium yoga mat with alignment lines, 6mm thickness for joint comfort.",
      "specifications": {
        "material": "Natural Rubber",
        "size": "183cm x 68cm",
        "thickness": "6mm",
        "weight": "3.2kg"
      }
    },
    {
      "id": "prod_012",
      "name": "Bluetooth Speaker Mini",
      "brand": "SoundWave",
      "price": 49.99,
      "images": [
        "https://picsum.photos/seed/speaker1/400/400",
        "https://picsum.photos/seed/speaker2/400/400",
        "https://picsum.photos/seed/speaker3/400/400"
      ],
      "rating": 4.4,
      "reviewCount": 654,
      "stock": 100,
      "category": "Electronics",
      "description": "Portable Bluetooth speaker with 360° sound, IPX7 waterproof, and 12-hour playtime.",
      "specifications": {
        "output": "10W",
        "battery": "12 hours",
        "bluetooth": "5.0",
        "waterproof": "IPX7"
      }
    },
    {
      "id": "prod_013",
      "name": "Women's Leather Jacket",
      "brand": "StyleCraft",
      "price": 199.99,
      "discountPrice": 169.99,
      "images": [
        "https://picsum.photos/seed/jacket1/400/400",
        "https://picsum.photos/seed/jacket2/400/400"
      ],
      "rating": 4.8,
      "reviewCount": 432,
      "stock": 25,
      "category": "Clothing",
      "description": "Classic genuine leather jacket with quilted lining, perfect for any season.",
      "specifications": {
        "material": "Genuine Leather",
        "lining": "Quilted Polyester",
        "sizes": "XS, S, M, L, XL",
        "care": "Professional clean only"
      }
    },
    {
      "id": "prod_014",
      "name": "Noise-Canceling Earbuds",
      "brand": "AudioTech",
      "price": 179.99,
      "discountPrice": 149.99,
      "images": [
        "https://picsum.photos/seed/earbuds1/400/400",
        "https://picsum.photos/seed/earbuds2/400/400"
      ],
      "rating": 4.5,
      "reviewCount": 1021,
      "stock": 65,
      "category": "Electronics",
      "description": "True wireless earbuds with hybrid ANC, transparency mode, and 8-hour battery life.",
      "specifications": {
        "battery": "8 hours (earbuds), 32 hours (case)",
        "anc": "Hybrid Active Noise Cancellation",
        "water_resistance": "IPX5",
        "codecs": "AAC, SBC"
      }
    },
    {
      "id": "prod_015",
      "name": "Mechanical Keyboard RGB",
      "brand": "KeyMaster",
      "price": 129.99,
      "discountPrice": 109.99,
      "images": [
        "https://picsum.photos/seed/keyboard1/400/400",
        "https://picsum.photos/seed/keyboard2/400/400"
      ],
      "rating": 4.7,
      "reviewCount": 876,
      "stock": 55,
      "category": "Electronics",
      "description": "Mechanical gaming keyboard with RGB backlighting, hot-swappable switches, and detachable wrist rest.",
      "specifications": {
        "switch": "Cherry MX Red",
        "backlight": "RGB 16.8M colors",
        "size": "TKL (87 keys)",
        "connectivity": "USB-C"
      }
    },
    {
      "id": "prod_016",
      "name": "Natural Skincare Set",
      "brand": "PureGlow",
      "price": 89.99,
      "images": [
        "https://picsum.photos/seed/skincare1/400/400",
        "https://picsum.photos/seed/skincare2/400/400",
        "https://picsum.photos/seed/skincare3/400/400"
      ],
      "rating": 4.9,
      "reviewCount": 2103,
      "stock": 130,
      "category": "Beauty",
      "description": "Complete organic skincare set including cleanser, serum, moisturizer, and face mask.",
      "specifications": {
        "set_size": "4 products",
        "ingredients": "100% Natural",
        "skin_type": "All skin types",
        "certification": "Cruelty-free"
      }
    },
    {
      "id": "prod_017",
      "name": "Coffee Maker Deluxe",
      "brand": "BrewMaster",
      "price": 159.99,
      "discountPrice": 139.99,
      "images": [
        "https://picsum.photos/seed/coffee1/400/400",
        "https://picsum.photos/seed/coffee2/400/400"
      ],
      "rating": 4.6,
      "reviewCount": 543,
      "stock": 35,
      "category": "Kitchen",
      "description": "Programmable coffee maker with thermal carafe, built-in grinder, and 12-cup capacity.",
      "specifications": {
        "capacity": "12 cups",
        "carafe": "Stainless Steel Thermal",
        "programmable": "24-hour timer",
        "grinder": "Integrated"
      }
    },
    {
      "id": "prod_018",
      "name": "Gaming Mouse Pro",
      "brand": "ClickTech",
      "price": 79.99,
      "discountPrice": 69.99,
      "images": [
        "https://picsum.photos/seed/mouse1/400/400",
        "https://picsum.photos/seed/mouse2/400/400"
      ],
      "rating": 4.8,
      "reviewCount": 1345,
      "stock": 80,
      "category": "Electronics",
      "description": "Lightweight gaming mouse with 16000 DPI sensor, programmable buttons, and RGB lighting.",
      "specifications": {
        "sensor": "16000 DPI Optical",
        "weight": "69g",
        "buttons": "6 programmable",
        "connectivity": "Wired USB"
      }
    },
    {
      "id": "prod_019",
      "name": "Designer Sunglasses",
      "brand": "OptiStyle",
      "price": 149.99,
      "images": [
        "https://picsum.photos/seed/sunglasses1/400/400",
        "https://picsum.photos/seed/sunglasses2/400/400"
      ],
      "rating": 4.5,
      "reviewCount": 267,
      "stock": 20,
      "category": "Accessories",
      "description": "Premium polarized sunglasses with UV400 protection and lightweight titanium frame.",
      "specifications": {
        "lens": "Polarized",
        "uv_protection": "UV400",
        "frame": "Titanium",
        "lens_color": "Smoke Gray"
      }
    },
    {
      "id": "prod_020",
      "name": "Smart Watch Classic",
      "brand": "WearTech",
      "price": 199.99,
      "discountPrice": 169.99,
      "images": [
        "https://picsum.photos/seed/watch1/400/400",
        "https://picsum.photos/seed/watch2/400/400",
        "https://picsum.photos/seed/watch3/400/400"
      ],
      "rating": 4.7,
      "reviewCount": 934,
      "stock": 60,
      "category": "Wearables",
      "description": "Elegant smart watch with AMOLED display, GPS, heart rate monitor, and 10-day battery life.",
      "specifications": {
        "display": "1.4-inch AMOLED",
        "battery": "10 days",
        "sensors": "GPS, HR, SpO2",
        "colors": "Black, Silver, Rose Gold"
      }
    },
    {
      "id": "prod_021",
      "name": "Cookware Set 10-Piece",
      "brand": "ChefPro",
      "price": 249.99,
      "discountPrice": 199.99,
      "images": [
        "https://picsum.photos/seed/cookware1/400/400",
        "https://picsum.photos/seed/cookware2/400/400"
      ],
      "rating": 4.8,
      "reviewCount": 678,
      "stock": 45,
      "category": "Kitchen",
      "description": "Complete non-stick cookware set including pots, pans, and utensils for professional cooking.",
      "specifications": {
        "pieces": "10",
        "material": "Hard-anodized Aluminum",
        "non_stick": "Triple-layer",
        "oven_safe": "Up to 260°C"
      }
    },
    {
      "id": "prod_022",
      "name": "Fitness Leggings",
      "brand": "FlexFit",
      "price": 59.99,
      "discountPrice": 49.99,
      "images": [
        "https://picsum.photos/seed/leggings1/400/400",
        "https://picsum.photos/seed/leggings2/400/400"
      ],
      "rating": 4.4,
      "reviewCount": 567,
      "stock": 110,
      "category": "Clothing",
      "description": "High-waist compression leggings made from moisture-wicking fabric, perfect for yoga and running.",
      "specifications": {
        "material": "80% Nylon, 20% Spandex",
        "waist": "High-rise",
        "sizes": "XS, S, M, L, XL",
        "colors": "Black, Navy, Gray"
      }
    },
    {
      "id": "prod_023",
      "name": "Wireless Microphone System",
      "brand": "VoicePro",
      "price": 89.99,
      "images": [
        "https://picsum.photos/seed/mic1/400/400",
        "https://picsum.photos/seed/mic2/400/400"
      ],
      "rating": 4.3,
      "reviewCount": 234,
      "stock": 30,
      "category": "Electronics",
      "description": "Dual wireless microphone system for vlogging, interviews, and presentations with noise-canceling technology.",
      "specifications": {
        "type": "Lavalier Wireless",
        "range": "50m",
        "battery": "6 hours",
        "connectivity": "2.4GHz"
      }
    },
    {
      "id": "prod_024",
      "name": "Aromatherapy Diffuser",
      "brand": "Scentify",
      "price": 34.99,
      "discountPrice": 29.99,
      "images": [
        "https://picsum.photos/seed/diffuser1/400/400",
        "https://picsum.photos/seed/diffuser2/400/400"
      ],
      "rating": 4.6,
      "reviewCount": 1423,
      "stock": 300,
      "category": "Home",
      "description": "Ultrasonic essential oil diffuser with LED light, auto shut-off, and 8-hour runtime.",
      "specifications": {
        "capacity": "300ml",
        "runtime": "8 hours",
        "light": "LED 7 colors",
        "material": "BPA-free Plastic"
      }
    },
    {
      "id": "prod_025",
      "name": "Carbon Fiber Tripod",
      "brand": "StabilPro",
      "price": 169.99,
      "discountPrice": 149.99,
      "images": [
        "https://picsum.photos/seed/tripod1/400/400",
        "https://picsum.photos/seed/tripod2/400/400",
        "https://picsum.photos/seed/tripod3/400/400"
      ],
      "rating": 4.9,
      "reviewCount": 876,
      "stock": 25,
      "category": "Electronics",
      "description": "Professional carbon fiber tripod with ball head, quick-release plate, and load capacity of 10kg.",
      "specifications": {
        "material": "Carbon Fiber",
        "max_height": "165cm",
        "weight": "1.2kg",
        "load_capacity": "10kg"
      }
    }
  ],
  "dashboardStats": {
    "totalRevenue": 1245678.45,
    "totalOrders": 3421,
    "totalCustomers": 2187,
    "totalProducts": 25,
    "revenueChange": 12.5,
    "ordersChange": 8.3,
    "recentOrders": [
      {
        "id": "ORD-2026-001",
        "status": "SHIPPED",
        "total": 249.99,
        "estimatedDelivery": "2026-08-18",
        "items": [
          {
            "productId": "prod_001",
            "name": "Wireless Noise-Cancelling Headphones Pro",
            "image": "https://picsum.photos/seed/headphones1/100/100",
            "quantity": 1,
            "price": 249.99
          }
        ],
        "createdAt": "2026-08-12T10:30:00Z",
        "customerName": "John Smith"
      },
      {
        "id": "ORD-2026-002",
        "status": "CONFIRMED",
        "total": 179.97,
        "estimatedDelivery": "2026-08-20",
        "items": [
          {
            "productId": "prod_014",
            "name": "Noise-Canceling Earbuds",
            "image": "https://picsum.photos/seed/earbuds1/100/100",
            "quantity": 1,
            "price": 149.99
          },
          {
            "productId": "prod_007",
            "name": "Wireless Charging Pad",
            "image": "https://picsum.photos/seed/charger1/100/100",
            "quantity": 1,
            "price": 29.99
          }
        ],
        "createdAt": "2026-08-13T14:15:00Z",
        "customerName": "Sarah Johnson"
      },
      {
        "id": "ORD-2026-003",
        "status": "PENDING",
        "total": 89.99,
        "estimatedDelivery": "2026-08-22",
        "items": [
          {
            "productId": "prod_002",
            "name": "Smart Fitness Band 6",
            "image": "https://picsum.photos/seed/fitnessband1/100/100",
            "quantity": 1,
            "price": 69.99
          },
          {
            "productId": "prod_024",
            "name": "Aromatherapy Diffuser",
            "image": "https://picsum.photos/seed/diffuser1/100/100",
            "quantity": 1,
            "price": 29.99
          }
        ],
        "createdAt": "2026-08-14T09:45:00Z",
        "customerName": "Michael Brown"
      },
      {
        "id": "ORD-2026-004",
        "status": "OUT_FOR_DELIVERY",
        "total": 449.98,
        "estimatedDelivery": "2026-08-16",
        "items": [
          {
            "productId": "prod_005",
            "name": "4K Action Camera",
            "image": "https://picsum.photos/seed/camera1/100/100",
            "quantity": 1,
            "price": 249.99
          },
          {
            "productId": "prod_025",
            "name": "Carbon Fiber Tripod",
            "image": "https://picsum.photos/seed/tripod1/100/100",
            "quantity": 1,
            "price": 149.99
          },
          {
            "productId": "prod_018",
            "name": "Gaming Mouse Pro",
            "image": "https://picsum.photos/seed/mouse1/100/100",
            "quantity": 1,
            "price": 69.99
          }
        ],
        "createdAt": "2026-08-11T16:20:00Z",
        "customerName": "Emily Davis"
      },
      {
        "id": "ORD-2026-005",
        "status": "DELIVERED",
        "total": 119.99,
        "estimatedDelivery": "2026-08-14",
        "items": [
          {
            "productId": "prod_008",
            "name": "Men's Running Shoes",
            "image": "https://picsum.photos/seed/shoes1/100/100",
            "quantity": 1,
            "price": 99.99
          }
        ],
        "createdAt": "2026-08-08T11:00:00Z",
        "customerName": "David Wilson"
      },
      {
        "id": "ORD-2026-006",
        "status": "PACKED",
        "total": 234.98,
        "estimatedDelivery": "2026-08-19",
        "items": [
          {
            "productId": "prod_013",
            "name": "Women's Leather Jacket",
            "image": "https://picsum.photos/seed/jacket1/100/100",
            "quantity": 1,
            "price": 169.99
          },
          {
            "productId": "prod_006",
            "name": "Leather Crossbody Bag",
            "image": "https://picsum.photos/seed/bag1/100/100",
            "quantity": 1,
            "price": 79.99
          }
        ],
        "createdAt": "2026-08-12T08:30:00Z",
        "customerName": "Lisa Anderson"
      }
    ],
    "lowStockProducts": [
      {
        "id": "prod_013",
        "name": "Women's Leather Jacket",
        "brand": "StyleCraft",
        "price": 199.99,
        "discountPrice": 169.99,
        "images": [
          "https://picsum.photos/seed/jacket1/400/400",
          "https://picsum.photos/seed/jacket2/400/400"
        ],
        "rating": 4.8,
        "reviewCount": 432,
        "stock": 25,
        "category": "Clothing",
        "description": "Classic genuine leather jacket with quilted lining, perfect for any season.",
        "specifications": {
          "material": "Genuine Leather",
          "lining": "Quilted Polyester",
          "sizes": "XS, S, M, L, XL",
          "care": "Professional clean only"
        }
      },
      {
        "id": "prod_025",
        "name": "Carbon Fiber Tripod",
        "brand": "StabilPro",
        "price": 169.99,
        "discountPrice": 149.99,
        "images": [
          "https://picsum.photos/seed/tripod1/400/400",
          "https://picsum.photos/seed/tripod2/400/400",
          "https://picsum.photos/seed/tripod3/400/400"
        ],
        "rating": 4.9,
        "reviewCount": 876,
        "stock": 25,
        "category": "Electronics",
        "description": "Professional carbon fiber tripod with ball head, quick-release plate, and load capacity of 10kg.",
        "specifications": {
          "material": "Carbon Fiber",
          "max_height": "165cm",
          "weight": "1.2kg",
          "load_capacity": "10kg"
        }
      },
      {
        "id": "prod_019",
        "name": "Designer Sunglasses",
        "brand": "OptiStyle",
        "price": 149.99,
        "images": [
          "https://picsum.photos/seed/sunglasses1/400/400",
          "https://picsum.photos/seed/sunglasses2/400/400"
        ],
        "rating": 4.5,
        "reviewCount": 267,
        "stock": 20,
        "category": "Accessories",
        "description": "Premium polarized sunglasses with UV400 protection and lightweight titanium frame.",
        "specifications": {
          "lens": "Polarized",
          "uv_protection": "UV400",
          "frame": "Titanium",
          "lens_color": "Smoke Gray"
        }
      }
    ]
  },
  "orders": [
    {
      "id": "ORD-2026-001",
      "status": "SHIPPED",
      "total": 249.99,
      "estimatedDelivery": "2026-08-18",
      "items": [
        {
          "productId": "prod_001",
          "name": "Wireless Noise-Cancelling Headphones Pro",
          "image": "https://picsum.photos/seed/headphones1/100/100",
          "quantity": 1,
          "price": 249.99
        }
      ],
      "createdAt": "2026-08-12T10:30:00Z"
    },
    {
      "id": "ORD-2026-002",
      "status": "CONFIRMED",
      "total": 179.97,
      "estimatedDelivery": "2026-08-20",
      "items": [
        {
          "productId": "prod_014",
          "name": "Noise-Canceling Earbuds",
          "image": "https://picsum.photos/seed/earbuds1/100/100",
          "quantity": 1,
          "price": 149.99
        },
        {
          "productId": "prod_007",
          "name": "Wireless Charging Pad",
          "image": "https://picsum.photos/seed/charger1/100/100",
          "quantity": 1,
          "price": 29.99
        }
      ],
      "createdAt": "2026-08-13T14:15:00Z"
    },
    {
      "id": "ORD-2026-003",
      "status": "PENDING",
      "total": 89.99,
      "estimatedDelivery": "2026-08-22",
      "items": [
        {
          "productId": "prod_002",
          "name": "Smart Fitness Band 6",
          "image": "https://picsum.photos/seed/fitnessband1/100/100",
          "quantity": 1,
          "price": 69.99
        },
        {
          "productId": "prod_024",
          "name": "Aromatherapy Diffuser",
          "image": "https://picsum.photos/seed/diffuser1/100/100",
          "quantity": 1,
          "price": 29.99
        }
      ],
      "createdAt": "2026-08-14T09:45:00Z"
    },
    {
      "id": "ORD-2026-004",
      "status": "OUT_FOR_DELIVERY",
      "total": 449.98,
      "estimatedDelivery": "2026-08-16",
      "items": [
        {
          "productId": "prod_005",
          "name": "4K Action Camera",
          "image": "https://picsum.photos/seed/camera1/100/100",
          "quantity": 1,
          "price": 249.99
        },
        {
          "productId": "prod_025",
          "name": "Carbon Fiber Tripod",
          "image": "https://picsum.photos/seed/tripod1/100/100",
          "quantity": 1,
          "price": 149.99
        },
        {
          "productId": "prod_018",
          "name": "Gaming Mouse Pro",
          "image": "https://picsum.photos/seed/mouse1/100/100",
          "quantity": 1,
          "price": 69.99
        }
      ],
      "createdAt": "2026-08-11T16:20:00Z"
    },
    {
      "id": "ORD-2026-005",
      "status": "DELIVERED",
      "total": 119.99,
      "estimatedDelivery": "2026-08-14",
      "items": [
        {
          "productId": "prod_008",
          "name": "Men's Running Shoes",
          "image": "https://picsum.photos/seed/shoes1/100/100",
          "quantity": 1,
          "price": 99.99
        }
      ],
      "createdAt": "2026-08-08T11:00:00Z"
    },
    {
      "id": "ORD-2026-006",
      "status": "PACKED",
      "total": 234.98,
      "estimatedDelivery": "2026-08-19",
      "items": [
        {
          "productId": "prod_013",
          "name": "Women's Leather Jacket",
          "image": "https://picsum.photos/seed/jacket1/100/100",
          "quantity": 1,
          "price": 169.99
        },
        {
          "productId": "prod_006",
          "name": "Leather Crossbody Bag",
          "image": "https://picsum.photos/seed/bag1/100/100",
          "quantity": 1,
          "price": 79.99
        }
      ],
      "createdAt": "2026-08-12T08:30:00Z"
    }
  ],
  "orderItems": [
    {
      "productId": "prod_001",
      "name": "Wireless Noise-Cancelling Headphones Pro",
      "image": "https://picsum.photos/seed/headphones1/100/100",
      "quantity": 1,
      "price": 249.99
    },
    {
      "productId": "prod_014",
      "name": "Noise-Canceling Earbuds",
      "image": "https://picsum.photos/seed/earbuds1/100/100",
      "quantity": 1,
      "price": 149.99
    },
    {
      "productId": "prod_007",
      "name": "Wireless Charging Pad",
      "image": "https://picsum.photos/seed/charger1/100/100",
      "quantity": 1,
      "price": 29.99
    },
    {
      "productId": "prod_002",
      "name": "Smart Fitness Band 6",
      "image": "https://picsum.photos/seed/fitnessband1/100/100",
      "quantity": 1,
      "price": 69.99
    },
    {
      "productId": "prod_024",
      "name": "Aromatherapy Diffuser",
      "image": "https://picsum.photos/seed/diffuser1/100/100",
      "quantity": 1,
      "price": 29.99
    },
    {
      "productId": "prod_005",
      "name": "4K Action Camera",
      "image": "https://picsum.photos/seed/camera1/100/100",
      "quantity": 1,
      "price": 249.99
    },
    {
      "productId": "prod_025",
      "name": "Carbon Fiber Tripod",
      "image": "https://picsum.photos/seed/tripod1/100/100",
      "quantity": 1,
      "price": 149.99
    },
    {
      "productId": "prod_018",
      "name": "Gaming Mouse Pro",
      "image": "https://picsum.photos/seed/mouse1/100/100",
      "quantity": 1,
      "price": 69.99
    },
    {
      "productId": "prod_008",
      "name": "Men's Running Shoes",
      "image": "https://picsum.photos/seed/shoes1/100/100",
      "quantity": 1,
      "price": 99.99
    },
    {
      "productId": "prod_013",
      "name": "Women's Leather Jacket",
      "image": "https://picsum.photos/seed/jacket1/100/100",
      "quantity": 1,
      "price": 169.99
    },
    {
      "productId": "prod_006",
      "name": "Leather Crossbody Bag",
      "image": "https://picsum.photos/seed/bag1/100/100",
      "quantity": 1,
      "price": 79.99
    }
  ]
}
export const products: Product[] = data.products;
export const dashboardStats: DashboardStats = data.dashboardStats;
export const orders: Order = data.orders;
export const orderItems: OrderItem[] = data.orderItems;

export const faqs: Faq[] = [
  {
    id: "faq-1",
    category: "Orders",
    question: "How can I place an order?",
    answer:
      "Browse our products, add the items you want to your cart, and proceed to checkout. Follow the instructions to complete your order.",
  },
  {
    id: "faq-2",
    category: "Orders",
    question: "Can I modify my order after placing it?",
    answer:
      "Orders can only be modified before they are processed. Contact our support team as soon as possible if you need to make a change.",
  },
  {
    id: "faq-3",
    category: "Shipping",
    question: "How long does delivery take?",
    answer:
      "Standard delivery usually takes 3–7 business days, depending on your location and the availability of the products.",
  },
  {
    id: "faq-4",
    category: "Shipping",
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you will receive a tracking number. You can use it to check the latest delivery status.",
  },
  {
    id: "faq-5",
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "Eligible products can generally be returned within 30 days of delivery, provided they are unused and in their original condition.",
  },
  {
    id: "faq-6",
    category: "Returns",
    question: "How do I request a refund?",
    answer:
      "Contact our support team with your order details and reason for the return. Once the return is approved, your refund will be processed according to our refund policy.",
  },
  {
    id: "faq-7",
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit and debit cards, UPI, and other payment methods available during checkout.",
  },
  {
    id: "faq-8",
    category: "Payments",
    question: "Is my payment information secure?",
    answer:
      "Yes. Payment information is processed through secure payment providers, and we do not store your complete card details on our servers.",
  },
  {
    id: "faq-9",
    category: "Account",
    question: "How do I create an account?",
    answer:
      "Click the Sign Up or Register option, enter your required details, and follow the instructions to create your account.",
  },
  {
    id: "faq-10",
    category: "Account",
    question: "I forgot my password. What should I do?",
    answer:
      "Click the Forgot Password option on the login page and follow the instructions to reset your password.",
  },
  {
    id: "faq-11",
    category: "Products",
    question: "How can I find a specific product?",
    answer:
      "Use the search bar or browse products by category. You can also use available filters to narrow down the results.",
  },
  {
    id: "faq-12",
    category: "Support",
    question: "How can I contact customer support?",
    answer:
      "You can contact our support team through email or phone. Live chat support will also be available soon.",
  },
];