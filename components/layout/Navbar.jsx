"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  ShoppingCart,
  Globe,
  Mail,
  User,
  List,
  Heart,
  LayoutDashboard,
  PlusSquare,
  Store,
  LogOut,
} from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* Navigation Links (Desktop center-right) */}
        <div className={styles.navMenuRight}>
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>
              Shop
            </Link>
            <Link href="/orders" className={styles.navLink}>
              Orders
            </Link>
            <Link href="/seller/dashboard" className={styles.sellerButton}>
              Seller Center
            </Link>
          </nav>

          <div className={styles.divider}></div>

          {/* Actions (Notifications, Cart, Profile) */}
          <div className={styles.actions}>
            <button className={styles.iconButton} aria-label="Notifications">
              <Bell size={20} color="#333" />
              <span className={styles.notificationDotNew}></span>
            </button>

            <Link href="/cart" className={styles.iconButton} aria-label="Cart">
              <ShoppingCart size={20} color="#333" />
              <span className={styles.badgeNew}>2</span>
            </Link>

            <div className={styles.profileDropdownContainer} ref={dropdownRef}>
              <button
                className={styles.profileAvatarButton}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className={styles.profileImage}
                />
              </button>

              {isProfileOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropdownName}>Alex Rivera</p>
                    <p className={styles.dropdownEmail}>
                      alex@neighborhood.com
                    </p>
                  </div>

                  <div className={styles.dropdownSection}>
                    <p className={styles.sectionTitle}>BUYER</p>
                    <Link
                      href="/profile"
                      className={styles.dropdownItem}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={16} /> My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className={styles.dropdownItem}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <List size={16} /> My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className={styles.dropdownItem}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Heart size={16} /> Wishlist
                    </Link>
                  </div>

                  <div className={styles.dropdownSection}>
                    <p className={styles.sectionTitle}>SELLER</p>
                    <Link
                      href="/seller/dashboard"
                      className={styles.dropdownItem}
                      style={{ fontWeight: "600" }}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LayoutDashboard size={16} /> Seller Dashboard
                    </Link>
                    <Link
                      href="/seller/dashboard#addProduct"
                      className={styles.dropdownItem}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <PlusSquare size={16} /> Add Product
                    </Link>
                    <Link
                      href="/seller/profile"
                      className={styles.dropdownItem}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Store size={16} /> Store Profile
                    </Link>
                  </div>

                  <button
                    className={styles.signOutButton}
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
