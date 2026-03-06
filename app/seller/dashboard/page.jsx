'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import styles from './seller.module.css';

export default function SellerDashboard() {
    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'

    // Mock Seller Products
    const [products, setProducts] = useState([
        { id: '1', title: 'Fresh Sourdough Bread', price: 8.50, stock: 12 },
        { id: '2', title: 'Artisan Coffee Beans', price: 18.00, stock: 5 },
    ]);

    // Mock Seller Orders Received
    const [orders, setOrders] = useState([
        {
            id: 'ORD-8924',
            date: new Date().toISOString(),
            status: 'pending', // pending, accepted, rejected, out_of_stock
            buyerName: 'Jane Doe',
            total: 24.00,
            items: [{ title: 'Handmade Minimalist Ceramic Mug', qty: 1 }]
        }
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ title: '', price: 0, stock: 0 });

    // --- Product Management ---
    const handleAddProduct = () => {
        setIsEditing(true);
        setCurrentProduct({ title: '', price: '', stock: '' });
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        if (currentProduct.id) {
            setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
        } else {
            setProducts([...products, { ...currentProduct, id: Date.now().toString() }]);
        }
        setIsEditing(false);
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    // --- Order Management ---
    const handleUpdateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <div className={`container ${styles.dashboardContainer}`}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Seller Dashboard</h1>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'products' ? styles.active : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        My Products
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Received Orders
                    </button>
                </div>
            </div>

            {/* --- PRODUCTS TAB --- */}
            {activeTab === 'products' && (
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Manage Inventory</h2>
                        <button className={styles.addButton} onClick={handleAddProduct}>
                            <Plus size={16} /> Add New Product
                        </button>
                    </div>

                    {isEditing ? (
                        <form className={styles.formCard} onSubmit={handleSaveProduct}>
                            <h3>{currentProduct.id ? 'Edit Product' : 'Add Product'}</h3>
                            <div className={styles.formGroup}>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={currentProduct.title}
                                    onChange={e => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroupRow}>
                                <div className={styles.formGroup}>
                                    <label>Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={currentProduct.price}
                                        onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        value={currentProduct.stock}
                                        onChange={e => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formActions}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
                                <button type="submit" className={styles.saveBtn}>Save Product</button>
                            </div>
                        </form>
                    ) : (
                        <div className={styles.tableRef}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.title}</td>
                                            <td>${product.price.toFixed(2)}</td>
                                            <td>{product.stock} units</td>
                                            <td className={styles.actionCells}>
                                                <button
                                                    className={styles.iconBtn}
                                                    onClick={() => { setCurrentProduct(product); setIsEditing(true); }}
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className={styles.emptyText}>No products found. Add one to start selling!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* --- ORDERS TAB --- */}
            {activeTab === 'orders' && (
                <div className={styles.section}>
                    <h2>Order Receipts</h2>
                    <div className={styles.ordersList}>
                        {orders.map(order => (
                            <div key={order.id} className={styles.orderCard}>
                                <div className={styles.orderHeader}>
                                    <div>
                                        <h3>Order #{order.id}</h3>
                                        <span className={styles.orderDate}>{new Date(order.date).toLocaleString()}</span>
                                    </div>
                                    <div className={`${styles.statusBadge} ${styles[order.status]}`}>
                                        {order.status.replace(/_/g, ' ').toUpperCase()}
                                    </div>
                                </div>

                                <div className={styles.buyerInfo}>
                                    <strong>Buyer:</strong> {order.buyerName}
                                </div>

                                <div className={styles.itemsList}>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className={styles.itemRow}>
                                            <span>{item.qty}x {item.title}</span>
                                        </div>
                                    ))}
                                    <div className={styles.orderTotal}>Total: ${order.total.toFixed(2)}</div>
                                </div>

                                {order.status === 'pending' && (
                                    <div className={styles.orderActions}>
                                        <button
                                            className={styles.acceptBtn}
                                            onClick={() => handleUpdateOrderStatus(order.id, 'accepted')}
                                        >
                                            <CheckCircle size={16} /> Accept Order
                                        </button>
                                        <button
                                            className={styles.rejectBtn}
                                            onClick={() => handleUpdateOrderStatus(order.id, 'rejected')}
                                        >
                                            <XCircle size={16} /> Reject Order
                                        </button>
                                        <button
                                            className={styles.outOfStockBtn}
                                            onClick={() => handleUpdateOrderStatus(order.id, 'out_of_stock')}
                                        >
                                            Mark Out of Stock
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        {orders.length === 0 && (
                            <div className={styles.emptyText}>No orders received yet.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
