'use client';
import { useState } from 'react';
import Link from 'next/link';
import { QrCode, Wallet, CheckCircle, Clock } from 'lucide-react';
import styles from './checkout.module.css';

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('ewallet');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        // Mock processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className={`container ${styles.successContainer}`}>
                <CheckCircle size={64} className={styles.successIcon} />
                <h1 className={styles.successTitle}>Payment Successful!</h1>
                <p className={styles.successMessage}>
                    Your order has been sent to the seller.
                </p>
                <div className={styles.cancellationWarning}>
                    <Clock size={16} />
                    <span>You have <strong>5 minutes</strong> to cancel this order if you change your mind.</span>
                </div>

                <div className={styles.actionLinks}>
                    <Link href="/orders" className={styles.primaryButton}>
                        View My Orders
                    </Link>
                    <Link href="/" className={styles.secondaryButton}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`container ${styles.checkoutContainer}`}>
            <h1 className={styles.pageTitle}>Checkout</h1>

            <div className={styles.checkoutLayout}>
                <div className={styles.paymentMethods}>
                    <h2 className={styles.sectionTitle}>Select Payment Method</h2>

                    <div
                        className={`${styles.methodCard} ${paymentMethod === 'ewallet' ? styles.activeMethod : ''}`}
                        onClick={() => setPaymentMethod('ewallet')}
                    >
                        <div className={styles.methodHeader}>
                            <Wallet className={styles.methodIcon} />
                            <div className={styles.methodTitles}>
                                <h3>E-Wallet</h3>
                                <p>Pay instantly with your linked e-wallet</p>
                            </div>
                            <div className={styles.radioIndicator}>
                                {paymentMethod === 'ewallet' && <div className={styles.radioInner}></div>}
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.methodCard} ${paymentMethod === 'qrcode' ? styles.activeMethod : ''}`}
                        onClick={() => setPaymentMethod('qrcode')}
                    >
                        <div className={styles.methodHeader}>
                            <QrCode className={styles.methodIcon} />
                            <div className={styles.methodTitles}>
                                <h3>QR Code Scan</h3>
                                <p>Open your banking app to scan and pay</p>
                            </div>
                            <div className={styles.radioIndicator}>
                                {paymentMethod === 'qrcode' && <div className={styles.radioInner}></div>}
                            </div>
                        </div>

                        {paymentMethod === 'qrcode' && (
                            <div className={styles.qrCodeArea}>
                                <div className={styles.qrPlaceholder}>
                                    {/* Mock QR Code graphic */}
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LocalMarketPayment" alt="QR Code" />
                                </div>
                                <p>Scan this code to complete payment</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <h2 className={styles.summaryTitle}>Total to Pay</h2>
                    <div className={styles.totalAmount}>$45.90</div>

                    <button
                        className={styles.payButton}
                        onClick={handlePayment}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : `Pay $45.90 securely`}
                    </button>

                    <p className={styles.secureText}>
                        🔒 Your payment information is encrypted and secure
                    </p>
                </div>
            </div>
        </div>
    );
}
