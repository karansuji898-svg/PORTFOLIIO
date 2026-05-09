import Image from 'next/image';
import styles from './Introduction.module.css';

export default function Introduction({ data }) {
  return (
    <section className={`page-section ${styles.introSection}`}>
      <div className="container">
        <div className={`bordered-box ${styles.introBox} hover-lift`}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageCircle}>
              {/* Using standard img instead of Next Image for simplicity if the image doesn't exist yet, 
                  but we'll use an online placeholder or expect it in public/assets/ */}
              <img 
                src={data.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                alt="Profile" 
              />
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>Introduction</h2>
            <p className={styles.text}>{data.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
