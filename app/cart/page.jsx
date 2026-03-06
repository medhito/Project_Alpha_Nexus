import Link from 'next/link';
import { recommendedItems } from '../lib/mockData';
import styles from './cart.module.css';

export default function CartPage() {
    // Using a mock cart based on the recommended items for demonstration
    const cartItems = [
        { ...recommendedItems[0], quantity: 2 },
        { ...recommendedItems[1], quantity: 1 }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const delivery = 5.00;
    const total = subtotal + tax + delivery;

    return (
        <div className={`container ${styles.cartContainer}`}>
            <h1 className={styles.pageTitle}>Your Cart</h1>

            <div className={styles.cartLayout}>
                {/* Cart Items List */}
                <div className={styles.itemsList}>
                    {cartItems.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <img src={item.image} alt={item.title} className={styles.itemImage} />

                            <div className={styles.itemDetails}>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>

                                <div className={styles.quantityControls}>
                                    <button className={styles.qtyButton}>-</button>
                                    <span className={styles.qtyValue}>{item.quantity}</span>
                                    <button className={styles.qtyButton}>+</button>
                                </div>
                            </div>

                            <div className={styles.itemActions}>
                                <p className={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</p>
                                <button className={styles.removeButton}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className={styles.summaryCard}>
                    <h2 className={styles.summaryTitle}>Order Summary</h2>

                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Delivery</span>
                        <span>${delivery.toFixed(2)}</span>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Link href="/checkout" className={styles.checkoutButton}>
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
