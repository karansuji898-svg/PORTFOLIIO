"use client";

import { motion } from 'framer-motion';
import styles from './Contents.module.css';

export default function Contents({ data }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="contents" className={`page-section ${styles.contentsSection}`}>
      <div className="container">
        <motion.div 
          className={`glass-box ${styles.contentsBox} hover-lift`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.heading}>Table of Contents</h2>
          <motion.div 
            className={styles.grid}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.a 
              href="#introduction"
              className={styles.item} 
              variants={item}
              whileHover={{ x: 5, color: 'var(--accent-color)' }}
            >
              <div className={styles.dot}></div>
              <span>Introduction</span>
            </motion.a>
            <motion.a 
              href="#education"
              className={styles.item} 
              variants={item}
              whileHover={{ x: 5, color: 'var(--accent-color)' }}
            >
              <div className={styles.dot}></div>
              <span>Education</span>
            </motion.a>
            {data.map((itemData, index) => (
              <motion.a 
                key={index} 
                href={`#${itemData.title.toLowerCase().replace(/\s+/g, '-')}`}
                className={styles.item} 
                variants={item}
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
              >
                <div className={styles.dot}></div>
                <span>{itemData.title}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
