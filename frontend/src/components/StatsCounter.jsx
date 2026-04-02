import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../hooks/useIntersectionObserver.js';

function formatValue(v, suffix, decimals = 0) {
  const n = Math.max(0, Number(v));
  const fixed = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  if (suffix) return `${Number(fixed).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  return Number(fixed).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default function StatsCounter({ items = [] }) {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.2 });
  const [values, setValues] = useState(items.map(() => 0));

  const targets = useMemo(() => items.map((it) => it.value), [items]);
  const decimalsByIdx = useMemo(
    () =>
      items.map((it) => {
        if (typeof it.decimals === 'number') return it.decimals;
        return Number.isInteger(it.value) ? 0 : 1;
      }),
    [items],
  );

  useEffect(() => {
    if (!inView) return;

    let raf = 0;
    const start = performance.now();
    const duration = 900;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = targets.map((target, idx) => {
        const decimals = decimalsByIdx[idx] ?? 0;
        const raw = target * eased;
        const factor = Math.pow(10, decimals);
        return Math.round(raw * factor) / factor;
      });
      setValues(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, targets]);

  return (
    <motion.div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      {items.map((it, idx) => (
        <motion.div
          key={it.label}
          className="glass"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: idx * 0.06 }}
          style={{ padding: 18 }}
        >
          <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
            {formatValue(values[idx], it.suffix, decimalsByIdx[idx] ?? 0)}
            {it.star ? <span style={{ color: '#F59E0B' }}>{it.star}</span> : null}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: 13, marginTop: 6, lineHeight: 1.4 }}>
            {it.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

