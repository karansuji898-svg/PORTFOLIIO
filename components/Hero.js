"use client";

import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero({ data }) {
  return (
    <section className={styles.heroSection}>
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
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {data.subtitle}
          </motion.div>
          <motion.div 
            className={styles.authorBadge}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
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
