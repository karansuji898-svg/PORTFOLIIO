import styles from './Contents.module.css';

export default function Contents({ data }) {
  return (
    <section className={`page-section ${styles.contentsSection}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={`bordered-box ${styles.contentsBox} hover-lift`}>
          <h2 className={styles.heading}>Contents</h2>
          <div className={styles.grid}>
            {data.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.dot}></div>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
