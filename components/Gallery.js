"use client";

import { useState } from 'react';
import styles from './Gallery.module.css';

export default function Gallery({ data }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className={`page-section ${styles.gallerySection}`}>
      <div className="container">
        <div className={styles.galleryContainer}>
          {data.map((category, index) => (
            <div key={index} className={styles.categoryBlock}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              
              {category.images && category.images.length > 0 ? (
                <div className={styles.imageGrid}>
                  {category.images.map((imgUrl, imgIndex) => (
                    <div 
                      key={imgIndex} 
                      className={styles.imageCard}
                      onClick={() => setSelectedImage(imgUrl)}
                    >
                      <div className={styles.imageWrapper}>
                        <img src={imgUrl} alt={`${category.title} work ${imgIndex + 1}`} />
                      </div>
                      <div className={styles.overlay}>
                        <span>View Full Image</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  More work coming soon. (Add images via Admin Panel)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <div className={styles.modalContent}>
            <img src={selectedImage} alt="Full view" />
            <button className={styles.closeBtn}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
