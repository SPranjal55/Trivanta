import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CourseCard(props) {
  const {
    slug,
    title,
    category,
    instructor,
    rating,
    studentCount,
    duration,
    totalHours,
    price,
    originalPrice,
    thumbnail,
    categoryColor,
    icon,
  } = props;

  return (
    <motion.div
      className="glass course-card"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      style={{
        padding: 16,
        borderRadius: 18,
        background: '#FFFFFF',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="course-card-thumbnail">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className="course-card-thumbnail-fallback"
          style={{ background: categoryColor ?? 'var(--gradient-primary)', display: 'none' }}
        >
          <span className="course-icon">{icon || '📚'}</span>
        </div>
        <span className="course-category-badge">{category}</span>
      </div>

      <div style={{ marginTop: 12, color: 'var(--text-secondary)', fontWeight: 800, fontSize: 12 }}>
        ★ {rating.toFixed(1)}
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 18, lineHeight: 1.25 }}>{title}</div>
        <div style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 13 }}>
          by {instructor} • {studentCount.toLocaleString()} students
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 14 }}>
        <div style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 800 }}>{duration}</div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontWeight: 1000, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>${price}</div>
          {originalPrice ? (
            <div style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: 12 }}>${originalPrice}</div>
          ) : null}
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
        <NavLink to={`/courses/${slug}`} style={{ flex: 1 }}>
          <button
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 14,
              border: '1.5px solid var(--primary)',
              background: 'var(--gradient-cta)',
              color: '#FFFFFF',
              fontWeight: 900,
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            Enroll Now
          </button>
        </NavLink>
      </div>
    </motion.div>
  );
}

