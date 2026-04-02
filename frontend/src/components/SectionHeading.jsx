import React from 'react';

export default function SectionHeading({ title, subtitle, align = 'left' }) {
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 950,
          fontSize: 28,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div style={{ color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.8, fontWeight: 800 }}>{subtitle}</div>
      ) : null}
      <div
        aria-hidden="true"
        style={{
          marginTop: 14,
          height: 2,
          width: align === 'left' ? 140 : '100%',
          background: 'var(--gradient-cta)',
          marginLeft: align === 'left' ? 0 : 'auto',
          marginRight: align === 'left' ? 0 : 'auto',
          borderRadius: 999,
        }}
      />
    </div>
  );
}

