import styles from "./HowItWorks.module.scss";

export default function HowItWorks() {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.howItWorksStripeTop} />
      <div className={styles.howItWorksInner}>
        <div className={styles.howItWorksContent}>
          <div className={styles.howItWorksLeft}>
            <h2>Як це працює?</h2>
            <p>Тут буде короткий опис етапів або переваг сервісу.</p>
          </div>
          <div className={styles.howItWorksRight}>
          </div>
        </div>
      </div>
      <div className={styles.howItWorksStripeBottom} />
    </section>
  );
} 