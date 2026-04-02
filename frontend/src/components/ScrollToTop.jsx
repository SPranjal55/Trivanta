import React from 'react';
import { motion } from 'framer-motion';
import useScrollPosition from '../hooks/useScrollPosition.js';

export default function ScrollToTop() {
  const scrolled = useScrollPosition(300);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 10, pointerEvents: scrolled ? 'auto' : 'none' }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        right: 32,
        bottom: 32,
        zIndex: 999,
      }}
    >
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{
          width: 48,
          height: 48,
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.18)',
          background: 'var(--gradient-cta)',
          color: '#FFFFFF',
          cursor: 'pointer',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-btn)',
        }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        ↑
      </motion.button>
    </motion.div>
  );
}

