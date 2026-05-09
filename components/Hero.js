"use client";

import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero({ data }) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.blobsContainer}>
        <motion.div 
          className={styles.blob1}
          animate={{ 
            x: [0, 50, -20, 0], 
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className={styles.blob2}
          animate={{ 
            x: [0, -40, 30, 0], 
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.2, 1] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className={styles.heroContent}>
        <motion.div 
          className={styles.titleBox}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className={styles.glowEffect}></div>
          <motion.div 
            className={styles.subtitleBadge}
            initial={{ x: -20, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              delay: 0.5,
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {data.subtitle}
          </motion.div>
          <motion.div 
            className={styles.authorBadge}
            initial={{ x: 20, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              y: [0, 10, 0]
            }}
            transition={{ 
              delay: 0.5,
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {data.name}
          </motion.div>
          <motion.h1 
            className={styles.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {data.title}
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}
