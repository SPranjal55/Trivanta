import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ size = 20 }) {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.18)',
        borderTopColor: 'var(--primary)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
    />
  );
}

