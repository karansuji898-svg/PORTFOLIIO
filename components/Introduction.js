"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Introduction.module.css';

export default function Introduction({ data }) {
  return (
    <section id="introduction" className={`page-section ${styles.introSection}`}>
      <div className="container">
        <motion.div 
          className={`glass-box ${styles.introBox} hover-lift`}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div 
            className={styles.imageWrapper}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className={styles.imageCircle}>
              <img 
                src={data.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                alt="Profile" 
              />
            </div>
          </motion.div>
          <div className={styles.contentWrapper}>
            <motion.h2 
              className={styles.heading}
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              Introduction
            </motion.h2>
            <motion.p 
              className={styles.text}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {data.text}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
