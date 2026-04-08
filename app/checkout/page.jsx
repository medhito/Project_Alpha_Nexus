"use client";
import { useState } from "react";
import Link from "next/link";
import { QrCode, Wallet, CheckCircle, Clock } from "lucide-react";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // New state for Buyer Requirements
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("standard"); // standard, express
  const [error, setError] = useState("");

  const handlePayment = () => {
    if (!address.trim() || !location.trim()) {
      setError("Please enter both your address and location.");
      return;
    }
    setError("");
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const deliveryFee = deliveryOption === "express" ? 5.0 : 2.0;
  const itemsTotal = 45.9;
  const finalTotal = itemsTotal + deliveryFee;

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
          <span>
            You have <strong>5 minutes</strong> to cancel this order if you
            change your mind.
          </span>
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
          <h2 className={styles.sectionTitle}>Delivery Information</h2>
          <div
            style={{
              marginBottom: "30px",
              backgroundColor: "var(--background)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Location (City/Region) *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Jakarta Selatan"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid var(--border)",
                  }}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Detailed Address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Full street address..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid var(--border)",
                    minHeight: "80px",
                  }}
                  required
                ></textarea>
              </div>
              {error && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
              )}
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Delivery Options</h2>
          <div style={{ marginBottom: "30px", display: "flex", gap: "15px" }}>
            <div
              className={`${styles.methodCard} ${deliveryOption === "standard" ? styles.activeMethod : ""}`}
              onClick={() => setDeliveryOption("standard")}
              style={{ flex: 1, cursor: "pointer" }}
            >
              <h3>Standard Delivery</h3>
              <p style={{ margin: "5px 0" }}>2-3 days</p>
              <strong>+$2.00</strong>
            </div>
            <div
              className={`${styles.methodCard} ${deliveryOption === "express" ? styles.activeMethod : ""}`}
              onClick={() => setDeliveryOption("express")}
              style={{ flex: 1, cursor: "pointer" }}
            >
              <h3>Express Delivery</h3>
              <p style={{ margin: "5px 0" }}>Same-day</p>
              <strong>+$5.00</strong>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Select Payment Method</h2>

          <div
            className={`${styles.methodCard} ${paymentMethod === "qris" ? styles.activeMethod : ""}`}
            onClick={() => setPaymentMethod("qris")}
          >
            <div className={styles.methodHeader}>
              <QrCode className={styles.methodIcon} />
              <div className={styles.methodTitles}>
                <h3>QRIS</h3>
                <p>Scan code with any supported banking or e-wallet app</p>
              </div>
              <div className={styles.radioIndicator}>
                {paymentMethod === "qris" && (
                  <div className={styles.radioInner}></div>
                )}
              </div>
            </div>

            {paymentMethod === "qris" && (
              <div className={styles.qrCodeArea}>
                <div className={styles.qrPlaceholder}>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LocalMarketPayment"
                    alt="QRIS Code"
                  />
                </div>
                <p>Scan this QRIS to complete payment</p>
              </div>
            )}
          </div>

          <div
            className={`${styles.methodCard} ${paymentMethod === "bank_transfer" ? styles.activeMethod : ""}`}
            onClick={() => setPaymentMethod("bank_transfer")}
          >
            <div className={styles.methodHeader}>
              <Wallet className={styles.methodIcon} />
              <div className={styles.methodTitles}>
                <h3>Bank Transfer</h3>
                <p>Manual transfer to our virtual account</p>
              </div>
              <div className={styles.radioIndicator}>
                {paymentMethod === "bank_transfer" && (
                  <div className={styles.radioInner}></div>
                )}
              </div>
            </div>
            {paymentMethod === "bank_transfer" && (
              <div
                className={styles.qrCodeArea}
                style={{ textAlign: "left", padding: "15px" }}
              >
                <p>Please transfer the total amount to:</p>
                <p>
                  <strong>Bank BCA</strong>
                  <br />
                  Account: 1234567890
                  <br />
                  Name: LocalMarket Escrow
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Items Total</span>
            <span>${itemsTotal.toFixed(2)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              paddingBottom: "20px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "20px",
            }}
          >
            <span>Total to Pay</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>

          <button
            className={styles.payButton}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing
              ? "Processing..."
              : `Pay $${finalTotal.toFixed(2)} securely`}
          </button>

          <p className={styles.secureText}>
            🔒 Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
}
