import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  className = '',
  style,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 padding:0; ';

  const variants = {
    primary: {
      background: 'var(--gradient-cta)',
      color: '#FFFFFF',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1.5px solid var(--border)',
    },
    subtle: {
      background: 'rgba(232,106,23,0.06)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-orange)',
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        padding: '12px 18px',
        borderRadius: '999px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: '0.01em',
        transition: 'var(--transition)',
        ...variants[variant],
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
      whileHover={disabled ? undefined : { y: -1, boxShadow: '0 10px 30px rgba(232,106,23,0.28)' }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
    >
      {children}
    </motion.button>
  );
}

