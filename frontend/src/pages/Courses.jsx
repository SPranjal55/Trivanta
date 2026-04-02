import React, { useMemo, useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import COURSES from '../utils/courses.js';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';

const tabs = ['All', 'Design', 'Development', 'Marketing', 'Data', 'Animation'];

export default function Courses() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('All');
  const nav = useNavigate();

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return COURSES.filter((c) => {
      const matchesTab = tab === 'All' ? true : c.category === tab;
      const matchesQuery = query ? c.title.toLowerCase().includes(query) : true;
      return matchesTab && matchesQuery;
    });
  }, [q, tab]);

  return (
    <main style={{ paddingTop: 86 }}>
      <section style={{ padding: '44px 0 24px' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <h1 className="page-title" style={{ fontSize: 40, margin: 0 }}>
              Explore Our Courses
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.7 }}>
              Search, filter, and pick the course that matches your goals.
            </p>

            <div style={{ marginTop: 18, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 320px', minWidth: 240 }}>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search courses..."
                  aria-label="Search courses"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: tab === t ? 'var(--gradient-cta)' : 'rgba(255,255,255,0.03)',
                      color: tab === t ? '#06101f' : 'var(--text-primary)',
                      fontWeight: 900,
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '18px 0 72px' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div className="glass" style={{ padding: 22, textAlign: 'center' }}>
              No courses match your search.
              <div style={{ marginTop: 14 }}>
                <Button variant="outline" onClick={() => nav(0)}>
                  Reset
                </Button>
              </div>
            </div>
          ) : null}

          <div
            style={{
              marginTop: 22,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: 18,
            }}
          >
            {filtered.map((c) => (
              <CourseCard key={c.slug} {...c} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

