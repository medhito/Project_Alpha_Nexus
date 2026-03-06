import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={`container ${styles.heroSection}`}>
            <div className={styles.heroContent}>
                <div className={styles.tagLabel}>Neighborhood Favorite</div>
                <h1 className={styles.title}>
                    Fresh Sourdough<br />Delivered Today
                </h1>
                <p className={styles.subtitle}>
                    Support your local bakers in Green Hills. Free delivery on orders over $15.
                </p>
                <button className={styles.ctaButton}>Claim Deal</button>

                {/* Pagination Dots indicating carousel */}
                <div className={styles.pagination}>
                    <span className={`${styles.dot} ${styles.active}`}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                </div>
            </div>

            {/* Background Image Overlay handled via CSS to match the UI */}
        </section>
    );
}
