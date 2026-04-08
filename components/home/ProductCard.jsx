import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ShoppingBag } from "lucide-react";
import styles from "./ProductCard.module.css";

export default function ProductCard({
  product,
  variant = "standard", // 'standard' or 'flash'
}) {
  const {
    title,
    price,
    originalPrice,
    image,
    distance,
    rating,
    reviews,
    discount,
    soldPercentage,
    isFullyBooked,
    description,
  } = product;

  return (
    <div className={styles.card}>
      {/* Image Container */}
      <Link
        href={`/product/${product.id}`}
        className={
          variant === "flash"
            ? styles.imageContainerFlash
            : styles.imageContainer
        }
        style={{ display: "block", textDecoration: "none" }}
      >
        <img src={image} alt={title} className={styles.image} />
        {variant === "flash" && discount && (
          <div className={styles.discountBadge}>-{discount}%</div>
        )}
      </Link>

      {/* Content */}
      <div className={styles.content}>
        {variant === "flash" ? (
          <>
            <div className={styles.priceRow}>
              <span className={styles.price}>${price.toFixed(2)}</span>
              {originalPrice && (
                <span className={styles.originalPrice}>
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Link
              href={`/product/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3 className={styles.title}>{title}</h3>
            </Link>
            <div className={styles.location}>
              <MapPin size={12} className={styles.icon} color="#10b981" />
              <span
                style={{
                  color: "#10b981",
                  fontWeight: "600",
                  fontSize: "0.75rem",
                }}
              >
                {distance} miles away
              </span>
            </div>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${soldPercentage}%` }}
                ></div>
              </div>
              <p className={styles.progressText}>
                {isFullyBooked ? "FULLY BOOKED" : `${soldPercentage}% SOLD`}
              </p>
            </div>
          </>
        ) : (
          <>
            <Link
              href={`/product/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3 className={styles.titleStandard}>{title}</h3>
            </Link>
            <div className={styles.priceRow}>
              <span className={styles.price}>${price.toFixed(2)}</span>
            </div>
            <div className={styles.metaRowStandard}>
              <div className={styles.pillBadge}>
                <MapPin size={10} color="#10b981" />
                <span>{distance} mi</span>
              </div>
              {rating && (
                <div className={styles.pillBadge}>
                  <Star size={10} fill="#10b981" color="#10b981" />
                  <span>
                    {rating.toFixed(1)} ({reviews})
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
