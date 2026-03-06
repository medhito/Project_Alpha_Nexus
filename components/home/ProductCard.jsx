import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import styles from './ProductCard.module.css';

export default function ProductCard({
    product,
    variant = 'standard' // 'standard' or 'flash'
}) {
    const {
        title, price, originalPrice, image,
        distance, rating, reviews, discount,
        soldPercentage, isFullyBooked
    } = product;

    return (
        <div className={styles.card}>
            {/* Image Container */}
            <div className={styles.imageContainer}>
                <img
                    src={image}
                    alt={title}
                    className={styles.image}
                />
                {variant === 'flash' && discount && (
                    <div className={styles.discountBadge}>-{discount}%</div>
                )}
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.priceRow}>
                    <span className={styles.price}>${price.toFixed(2)}</span>
                    {originalPrice && (
                        <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
                    )}
                </div>

                <h3 className={styles.title}>{title}</h3>

                <div className={styles.metaRow}>
                    <div className={styles.location}>
                        <MapPin size={12} className={styles.icon} />
                        <span>{distance} miles away</span>
                    </div>

                    {variant === 'standard' && rating && (
                        <div className={styles.rating}>
                            <Star size={12} className={styles.starIcon} fill="#F59E0B" />
                            <span>{rating.toFixed(1)} ({reviews})</span>
                        </div>
                    )}
                </div>

                {/* Flash Sale Progress Bar */}
                {variant === 'flash' && (
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${soldPercentage}%` }}
                            ></div>
                        </div>
                        <p className={styles.progressText}>
                            {isFullyBooked ? 'FULLY BOOKED' : `${soldPercentage}% SOLD`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
