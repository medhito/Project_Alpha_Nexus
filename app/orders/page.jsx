"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, MessageCircle, AlertCircle } from "lucide-react";
import styles from "./orders.module.css";

export default function BuyerOrdersPage() {
  // Mock active order state
  const [orders, setOrders] = useState([
    {
      id: "ORD-8924",
      date: new Date().toISOString(),
      status: "pending",
      total: 45.9,
      sellerName: "Fresh Sourdough Bakery",
      sellerWhatsApp: "1234567890",
      items: [
        { title: "Handmade Minimalist Ceramic Mug", qty: 2, price: 24.0 },
      ],
      // time remaining in seconds for cancellation (5 mins max)
      cancelTimeRemaining: 300,
    },
    {
      id: "ORD-8925",
      date: new Date().toISOString(),
      status: "cancelled_by_seller",
      total: 18.0,
      sellerName: "Artisan Coffee Roasters",
      sellerWhatsApp: "0987654321",
      items: [{ title: "Artisan Coffee Beans", qty: 1, price: 18.0 }],
      cancelTimeRemaining: 0,
      cancelReason: "Store closed for maintenance",
    },
  ]);

  // Handle countdown timer for cancellation window
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((currentOrders) =>
        currentOrders.map((order) => ({
          ...order,
          cancelTimeRemaining:
            order.cancelTimeRemaining > 0 ? order.cancelTimeRemaining - 1 : 0,
        })),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCancelOrder = (orderId) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: "cancelled_by_buyer" }
          : order,
      ),
    );
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className={`container ${styles.dashboardContainer}`}>
      <h1 className={styles.pageTitle}>My Orders</h1>

      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div className={styles.orderMeta}>
                <h3>Order #{order.id}</h3>
                <span className={styles.orderDate}>
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
              <div className={`${styles.statusBadge} ${styles[order.status]}`}>
                {order.status.replace(/_/g, " ").toUpperCase()}
              </div>
            </div>

            <div className={styles.sellerInfo}>
              <Package size={16} />
              <span>Seller: {order.sellerName}</span>
            </div>

            <div className={styles.itemsList}>
              {order.items.map((item, index) => (
                <div key={index} className={styles.itemRow}>
                  <span>
                    {item.qty}x {item.title}
                  </span>
                  <span>${(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.orderTotal}>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </div>

            <div className={styles.orderActions}>
              <a
                href={`https://wa.me/${order.sellerWhatsApp}?text=Hi, regarding my order ${order.id}...`}
                target="_blank"
                rel="noreferrer"
                className={styles.contactButton}
              >
                <MessageCircle size={16} /> Contact Seller (WhatsApp)
              </a>

              {/* 5-minute cancellation window logic */}
              {order.status === "pending" && order.cancelTimeRemaining > 0 && (
                <div className={styles.cancelWrapper}>
                  <span className={styles.timerText}>
                    Cancel window ends in:{" "}
                    {formatTime(order.cancelTimeRemaining)}
                  </span>
                  <button
                    className={styles.cancelButton}
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                </div>
              )}

              {order.status === "pending" &&
                order.cancelTimeRemaining === 0 && (
                  <span className={styles.lockedText}>
                    Cancellation window closed. Processing...
                  </span>
                )}

              {/* Status messages sent by seller */}
              {order.status === "cancelled_by_seller" && (
                <div
                  className={styles.alertBox}
                  style={{
                    backgroundColor: "#fee2e2",
                    color: "#991b1b",
                    padding: "12px",
                    borderRadius: "8px",
                    marginTop: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AlertCircle size={16} />
                  <span>
                    <strong>Order Cancelled by Seller:</strong>{" "}
                    {order.cancelReason || "Cannot fulfill order"}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className={styles.emptyState}>
            <p>You have no recent orders.</p>
            <Link href="/" className={styles.browseButton}>
              Browse Local Market
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
