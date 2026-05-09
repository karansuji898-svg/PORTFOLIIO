import styles from './Education.module.css';

export default function Education({ data }) {
  return (
    <section className={`page-section ${styles.educationSection}`}>
      <div className="container">
        <div className={`bordered-box ${styles.educationBox} hover-lift`}>
          <div className={styles.imageCol}>
            {/* Adding a placeholder workspace image as seen in the PDF */}
            <img
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop"
              alt="Workspace"
            />
          </div>
          <div className={styles.contentCol}>
            <h2 className={styles.heading}>Education Qualification</h2>
            <div className={styles.list}>
              {data.map((item, index) => (
                <div key={index} className={styles.listItem}>
                  <div className={styles.level}>{item.level}</div>
                  <div className={styles.institution}>{item.institution}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
