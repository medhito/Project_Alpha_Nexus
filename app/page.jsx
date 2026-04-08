import { ChevronRight, Clock } from "lucide-react";
import Hero from "../components/home/Hero";
import ProductCard from "../components/home/ProductCard";
import { flashSales, recommendedItems } from "../lib/mockData";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Hero />

      {/* Nearby Flash Sales Section */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2 className={styles.sectionTitle}>Nearby Flash Sales</h2>
            <div className={styles.timer}>
              <Clock size={14} />
              <span>02 : 45 : 12</span>
            </div>
          </div>
          <button className={styles.seeAllButton}>
            See All <ChevronRight size={16} />
          </button>
        </div>

        <div className={styles.gridContainer}>
          {flashSales.slice(0, 2).map((product) => (
            <ProductCard key={product.id} product={product} variant="flash" />
          ))}
        </div>
      </section>

      {/* Recommended Section */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recommended For You</h2>
          <div className={styles.filterTabs}>
            <button className={`${styles.filterTab} ${styles.activeTab}`}>
              All
            </button>
            <button className={styles.filterTab}>Food</button>
            <button className={styles.filterTab}>Services</button>
            <button className={styles.filterTab}>Goods</button>
          </div>
        </div>

        <div className={styles.gridContainer}>
          {recommendedItems.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="standard"
            />
          ))}
        </div>

        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreButton}>
            Load More Recommendations
          </button>
        </div>
      </section>
    </div>
  );
}
