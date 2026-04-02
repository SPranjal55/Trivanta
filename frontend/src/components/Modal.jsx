import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18,
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
          <motion.div
            initial={{ y: 14, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 14, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{
              width: 'min(720px, 96vw)',
              borderRadius: 18,
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              boxShadow: '0 18px 60px rgba(0,0,0,0.12)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900 }}>{title}</div>
              <button
                onClick={() => onClose?.()}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 14,
                  border: '1px solid rgba(0,0,0,0.10)',
                  background: 'rgba(0,0,0,0.03)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div style={{ padding: 18 }}>{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

