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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={styles.categoryHeader}>
                <motion.h2 
                  className={styles.categoryTitle}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {category.title}
                </motion.h2>
                <div className={styles.categoryLine}></div>
                <span className={styles.categoryCount}>
                  {category.images?.length || 0} Projects
                </span>
              </div>
              
              {category.images && category.images.length > 0 ? (
                <div className={styles.imageGrid}>
                  {category.images.map((imgUrl, imgIndex) => (
                    <motion.div 
                      key={imgIndex} 
                      className={styles.imageCard}
                      onClick={() => setSelectedImage(imgUrl)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: imgIndex * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        y: -15,
                        rotateY: 5,
                        rotateX: -5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className={styles.imageWrapper}>
                        <img src={imgUrl} alt={`${category.title} work ${imgIndex + 1}`} />
                      </div>
                      <div className={styles.overlay}>
                        <div className={styles.overlayContent}>
                          <span className={styles.viewBtn}>View Project</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>More work coming soon.</p>
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
