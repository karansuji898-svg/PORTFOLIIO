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
    <section className={`page-section ${styles.contentsSection}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          className={`bordered-box ${styles.contentsBox} hover-lift`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.heading}>Contents</h2>
          <motion.div 
            className={styles.grid}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {data.map((itemData, index) => (
              <motion.div key={index} className={styles.item} variants={item}>
                <div className={styles.dot}></div>
                <span>{itemData.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
