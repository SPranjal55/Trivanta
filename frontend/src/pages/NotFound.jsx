import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { motion } from 'framer-motion';

export default function NotFound() {
  const nav = useNavigate();
  return (
    <div className="container" style={{ padding: '96px 0 120px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ display: 'grid', placeItems: 'center', gap: 14 }}
      >
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 74, fontWeight: 900, background: 'linear-gradient(90deg, var(--primary), var(--primary-glow))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          404
        </div>
        <div style={{ color: 'var(--text-secondary)', fontWeight: 800 }}>Oops! Page not found</div>
        <Button variant="primary" onClick={() => nav('/')}>
          Go Back Home
        </Button>
      </motion.div>
    </div>
  );
}

