import Link from 'next/link';
import { Globe, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>

                {/* Brand Area */}
                <div className={styles.brandArea}>
                    <Link href="/" className={styles.logo}>
                        <div className={styles.logoIcon}></div>
                        <span className={styles.logoText}>LocalMarket</span>
                    </Link>
                    <p className={styles.description}>
                        Bringing the neighborhood closer, one local deal at a time. Support your community, shop local.
                    </p>
                    <div className={styles.socials}>
                        <button className={styles.socialIcon} aria-label="Website">
                            <Globe size={20} />
                        </button>
                        <button className={styles.socialIcon} aria-label="Email">
                            <Mail size={20} />
                        </button>
                    </div>
                </div>

                {/* Links Area */}
                <div className={styles.linksArea}>
                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Shop</h4>
                        <Link href="/food" className={styles.footerLink}>Food & Drink</Link>
                        <Link href="/services" className={styles.footerLink}>Home Services</Link>
                        <Link href="/goods" className={styles.footerLink}>Handmade Goods</Link>
                        <Link href="/flash-sales" className={styles.footerLink}>Nearby Flash Sales</Link>
                    </div>

                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Community</h4>
                        <Link href="/sell" className={styles.footerLink}>Sell on LocalMarket</Link>
                        <Link href="/guidelines" className={styles.footerLink}>Community Guidelines</Link>
                        <Link href="/success" className={styles.footerLink}>Success Stories</Link>
                        <Link href="/events" className={styles.footerLink}>Local Events</Link>
                    </div>

                    <div className={styles.linkColumn}>
                        <h4 className={styles.columnTitle}>Support</h4>
                        <Link href="/help" className={styles.footerLink}>Help Center</Link>
                        <Link href="/safety" className={styles.footerLink}>Safety Center</Link>
                        <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
                        <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className={styles.bottomBar}>
                <div className={`container ${styles.bottomContainer}`}>
                    <p className={styles.copyright}>
                        © 2024 LocalMarket Inc. All rights reserved.
                    </p>
                    <div className={styles.localeInfo}>
                        <span>English (US)</span>
                        <span>$ USD</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
