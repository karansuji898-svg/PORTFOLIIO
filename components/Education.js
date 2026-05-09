"use client";

import { motion } from 'framer-motion';
import styles from './Education.module.css';

export default function Education({ data }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <section className={`page-section ${styles.educationSection}`}>
      <div className="container">
        <motion.div 
          className={`bordered-box ${styles.educationBox} hover-lift`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.imageCol}>
            <img
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop"
              alt="Workspace"
            />
          </div>
          <div className={styles.contentCol}>
            <h2 className={styles.heading}>Education Qualification</h2>
            <motion.div 
              className={styles.list}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {data.map((edu, index) => (
                <motion.div key={index} className={styles.listItem} variants={item}>
                  <div className={styles.level}>{edu.level}</div>
                  <div className={styles.institution}>{edu.institution}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
