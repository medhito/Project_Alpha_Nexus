import Link from 'next/link';
import { Search, Bell, ShoppingCart, Globe, Mail } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.navContainer}`}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}></div>
                    <span className={styles.logoText}>LocalMarket</span>
                </Link>

                {/* Search Bar */}
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search for food, services, or goods in your neighborhood..."
                        className={styles.searchInput}
                    />
                </div>

                {/* Navigation Links */}
                <nav className={styles.navLinks}>
                    <Link href="/category/food" className={styles.navLink}>Food</Link>
                    <Link href="/category/services" className={styles.navLink}>Services</Link>
                    <Link href="/category/goods" className={styles.navLink}>Goods</Link>
                </nav>

                {/* Actions (Notifications, Cart, Profile) */}
                <div className={styles.actions}>
                    <button className={styles.iconButton} aria-label="Notifications">
                        <Bell size={20} />
                        <span className={styles.notificationDot}></span>
                    </button>

                    <Link href="/cart" className={styles.iconButton} aria-label="Cart">
                        <ShoppingCart size={20} />
                        <span className={styles.badge}>3</span>
                    </Link>

                    <Link href="/seller/dashboard" aria-label="Profile">
                        <div className={styles.profileAvatar}>
                            {/* Fallback avatar image */}
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" />
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
