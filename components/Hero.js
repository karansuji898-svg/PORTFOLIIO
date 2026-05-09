import styles from './Hero.module.css';

export default function Hero({ data }) {
  return (
    <section className={styles.heroSection}>
      <div className={`${styles.heroContent} animate-fade-in`}>
        <div className={`${styles.titleBox} hover-glow`}>
          <div className={styles.glowEffect}></div>
          <div className={styles.subtitleBadge}>
            {data.subtitle}
          </div>
          <div className={styles.authorBadge}>
            {data.name}
          </div>
          <h1 className={styles.title}>{data.title}</h1>
        </div>
      </div>
    </section>
  );
}
