import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceCard({ icon, name, description, deliverables, onQuote, image }) {
  return (
    <motion.div
      className="glass service-card"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      whileHover={{
        y: -4,
        boxShadow: '0 18px 50px rgba(232,106,23,0.22)',
      }}
      style={{
        padding: 18,
        borderRadius: 20,
        border: '1px solid var(--border)',
        background: '#FFFFFF',
      }}
    >
      <div className="service-card-image">
        <img
          src={image}
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80';
          }}
        />
        <div className="service-card-icon-overlay">
          <span>{icon}</span>
        </div>
      </div>
      <div style={{ marginTop: 14, fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 18 }}>{name}</div>
      <div style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>{description}</div>

      <ul style={{ margin: '12px 0 0', paddingLeft: 18, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {deliverables.slice(0, 3).map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>

      <div style={{ marginTop: 16 }}>
        <button
          onClick={onQuote}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 14,
            border: '1.5px solid var(--primary)',
            background: 'transparent',
            color: 'var(--primary)',
            fontWeight: 950,
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--primary)';
          }}
        >
          Get a Quote
        </button>
      </div>
    </motion.div>
  );
}

