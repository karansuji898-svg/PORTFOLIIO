"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Gallery.module.css';

export default function Gallery({ data }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className={`page-section ${styles.gallerySection}`}>
      <div className="container">
        <div className={styles.galleryContainer}>
          {data.map((category, index) => (
            <motion.div 
              key={index} 
              id={category.title.toLowerCase().replace(/\s+/g, '-')}
              className={styles.categoryBlock}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              
              {category.images && category.images.length > 0 ? (
                <div className={styles.imageGrid}>
                  {category.images.map((imgUrl, imgIndex) => (
                    <motion.div 
                      key={imgIndex} 
                      className={styles.imageCard}
                      onClick={() => setSelectedImage(imgUrl)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: imgIndex * 0.05 }}
                    >
                      <div className={styles.imageWrapper}>
                        <img src={imgUrl} alt={`${category.title} work ${imgIndex + 1}`} />
                      </div>
                      <div className={styles.overlay}>
                        <span>View Full Image</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  More work coming soon. (Add images via Admin Panel)
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className={styles.modal} 
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Full view" />
              <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
