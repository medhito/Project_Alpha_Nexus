"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Star,
  Minus,
  Plus,
  Share2,
  Bookmark,
  MessageCircle,
  ShoppingCart,
  MapPin,
  ShieldCheck,
  Truck,
  CheckCircle,
} from "lucide-react";
import styles from "./product.module.css";
import ProductCard from "../../../components/home/ProductCard";
import { recommendedItems } from "../../../lib/mockData";

export default function ProductDetailPage({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Hardcoded to strictly match the UI template requested
  const product = {
    title: "Homemade Sourdough Bread",
    price: "Rp 45.000",
    rating: 5.0,
    reviews: 48,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549931319-a545dff3bea1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&q=80&w=800",
    ],
    seller: {
      name: "Sarah Jenkins",
      location: "Green Village Cluster",
      memberSince: "Oct 2021",
      response: "~15 mins",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    },
  };

  const handleQtyChange = (type) => {
    if (type === "inc" && quantity < product.stock) setQuantity((q) => q + 1);
    if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <div className={`container ${styles.productPageContainer}`}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <ChevronRight size={14} color="#999" />
        <Link href="#">Neighborhood</Link>
        <ChevronRight size={14} color="#999" />
        <Link href="#">Food</Link>
        <ChevronRight size={14} color="#999" />
        <span>{product.title}</span>
      </div>

      <div className={styles.mainSection}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <div className={styles.imageGallery}>
            <img
              src={product.images[activeImage]}
              alt={product.title}
              className={styles.mainImage}
            />
            <div className={styles.thumbnailContainer}>
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`${styles.thumbnail} ${activeImage === idx ? styles.activeThumbnail : ""}`}
                  onClick={() => setActiveImage(idx)}
                />
              ))}
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h2>Product Description</h2>
            <div className={styles.descriptionContent}>
              <p>
                Hand-crafted with love in our small home kitchen using a
                5-year-old sourdough starter. Each loaf undergoes a long 24-hour
                fermentation process, resulting in a complex flavor profile and
                a perfectly chewy crust.
              </p>
              <br />
              <p>
                Our sourdough is made with only three ingredients: organic
                stone-ground flour, filtered water, and sea salt. No commercial
                yeast or preservatives added.
              </p>
              <ul>
                <li>Weight: Approx. 750g per loaf</li>
                <li>Allergens: Contains Wheat (Gluten)</li>
                <li>
                  Storage: Best consumed within 3 days; can be frozen for up to
                  a month
                </li>
                <li>Order lead time: 2 days in advance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <div className={styles.actionCard}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <div className={styles.badges}>
              <span className={styles.freshBadge}>FRESHLY BAKED</span>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
                <span>({product.reviews} reviews)</span>
              </div>
            </div>

            <div className={styles.price}>{product.price}</div>

            <div className={styles.quantitySection}>
              <span className={styles.quantityLabel}>QUANTITY</span>
              <div className={styles.quantityControls}>
                <div
                  style={{
                    display: "flex",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    className={styles.qtyButton}
                    onClick={() => handleQtyChange("dec")}
                  >
                    <Minus size={16} />
                  </button>
                  <div
                    className={styles.qtyValue}
                    style={{
                      width: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {quantity}
                  </div>
                  <button
                    className={styles.qtyButton}
                    onClick={() => handleQtyChange("inc")}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className={styles.availableText}>
                  Available: {product.stock} loaves
                </span>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <a
                href="https://wa.me/123456789"
                className={styles.waButton}
                style={{ textDecoration: "none" }}
              >
                <MessageCircle size={18} /> Pesan via WhatsApp
              </a>
              <Link
                href="/checkout"
                className={styles.appButton}
                style={{ textDecoration: "none" }}
              >
                <ShoppingCart size={18} /> Pesan via Aplikasi
              </Link>
            </div>

            <div className={styles.secondaryActions}>
              <button className={styles.secActionBtn}>
                <Share2 size={16} /> Share
              </button>
              <button className={styles.secActionBtn}>
                <Bookmark size={16} /> Save
              </button>
            </div>
          </div>

          <div className={styles.sellerCard}>
            <div className={styles.sellerHeaderLabel}>SELLER INFORMATION</div>

            <div className={styles.sellerProfile}>
              <img
                src={product.seller.avatar}
                alt={product.seller.name}
                className={styles.sellerAvatar}
              />
              <div>
                <div className={styles.sellerNameRow}>
                  <span className={styles.sellerName}>
                    {product.seller.name}
                  </span>
                  <CheckCircle
                    size={14}
                    color="#10B981"
                    fill="#10B981"
                    style={{ color: "white" }}
                  />
                </div>
                <div className={styles.sellerLocation}>
                  <MapPin size={12} /> {product.seller.location}
                </div>
              </div>
            </div>

            <div className={styles.sellerStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Member since</span>
                <span className={styles.statValue}>
                  {product.seller.memberSince}
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Response</span>
                <span className={`${styles.statValue} ${styles.green}`}>
                  {product.seller.response}
                </span>
              </div>
            </div>

            <button className={styles.profileBtn}>View Seller Profile</button>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <ShieldCheck size={16} color="#10B981" /> Secure local exchange
            </div>
            <div className={styles.trustBadge}>
              <Truck size={16} color="#10B981" /> Same-day delivery
            </div>
          </div>
        </div>
      </div>

      {/* More from Seller / Location Section */}
      <div className={styles.relatedSection}>
        <div className={styles.relatedHeader}>
          <h3 className={styles.relatedTitle}>More in Green Village</h3>
          <Link href="#" className={styles.viewAll}>
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className={styles.gridContainer}>
          {recommendedItems.slice(0, 4).map((item) => (
            <div key={item.id} style={{ display: "block" }}>
              <ProductCard product={item} variant="standard" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
