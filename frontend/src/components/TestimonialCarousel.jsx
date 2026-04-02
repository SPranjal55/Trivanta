import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function TestimonialCarousel({ testimonials = [] }) {
  const items = useMemo(() => {
    // Duplicate for seamless marquee effect.
    return [...testimonials, ...testimonials];
  }, [testimonials]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 70,
          background: 'linear-gradient(90deg, var(--bg-main), rgba(13,15,26,0))',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: 70,
          background: 'linear-gradient(270deg, var(--bg-main), rgba(13,15,26,0))',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      <div style={{ overflow: 'hidden', borderRadius: 22 }}>
        <motion.div
          style={{
            display: 'flex',
            gap: 14,
            width: 'max-content',
            paddingBottom: 4,
            animation: 'testimonialMarquee 26s linear infinite',
          }}
        >
          {items.map((t, idx) => (
            <motion.div
              key={`${t.name}-${idx}`}
              className="glass"
              style={{
                width: 320,
                padding: 18,
                borderRadius: 22,
                flex: '0 0 auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    background: 'var(--gradient-cta)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 1000,
                  }}
                >
                  {t.name
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((p) => p[0]?.toUpperCase())
                    .join('')}
                </div>
                <div>
                  <div style={{ fontWeight: 1000, fontFamily: 'var(--font-heading)' }}>{t.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 900, fontSize: 13 }}>{t.role}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#F59E0B', fontWeight: 1000, fontSize: 14 }}>
                  {'★'.repeat(5)}
                </div>
              </div>
              <div style={{ marginTop: 12, color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 750 }}>
                “{t.quote}”
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>
        {`
          @keyframes testimonialMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}

