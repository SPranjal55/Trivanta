import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import COURSES from '../utils/courses.js';
import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
import api from '../utils/api.js';
import useAuth from '../hooks/useAuth.js';

const tabs = ['Overview', 'Curriculum', 'Instructor', 'Reviews'];

export default function CourseDetail() {
  const { slug } = useParams();
  const nav = useNavigate();
  const { isAuthenticated, token, login } = useAuth();
  const course = useMemo(() => COURSES.find((c) => c.slug === slug), [slug]);
  const [tab, setTab] = useState('Overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onEnroll = async () => {
    setError(null);
    if (!isAuthenticated) {
      nav('/login');
      return;
    }
    setLoading(true);
    try {
      // Backend enrollment expects slug and auth token.
      await api.post('/enroll.php', { course_slug: slug });
      nav('/dashboard');
    } catch (e) {
      setError(e?.response?.data?.message || 'Enrollment failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <div className="container" style={{ padding: '96px 0 120px' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 34, fontWeight: 900 }}>Course not found</div>
      </div>
    );
  }

  return (
    <main style={{ paddingTop: 86 }}>
      <section className="container" style={{ padding: '34px 0 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 22 }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 800 }}>
              Home &gt; Courses &gt; <span style={{ color: 'var(--text-secondary)' }}>{course.title}</span>
            </div>
            <h1 className="page-title" style={{ fontSize: 40, margin: '10px 0 6px' }}>
              {course.title}
            </h1>
            <div style={{ color: 'var(--text-secondary)', fontWeight: 800 }}>
              ★ {course.rating.toFixed(1)} • {course.studentCount.toLocaleString()} enrolled
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
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
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              {tab === 'Overview' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 10px' }}>What you’ll learn</h3>
                  <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.9, margin: 0, paddingLeft: 18 }}>
                    {course.overview.learn.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
              {tab === 'Curriculum' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  {course.curriculum.map((m, idx) => (
                    <div key={m.title} style={{ marginBottom: 16 }}>
                      <div style={{ fontWeight: 1000, fontFamily: 'var(--font-heading)' }}>{m.title}</div>
                      <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.9, margin: '6px 0 0', paddingLeft: 18 }}>
                        {m.lessons.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              ) : null}
              {tab === 'Instructor' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div
                      aria-hidden="true"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: 'var(--gradient-cta)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 1000,
                      }}
                    >
                      {course.instructorDetails.name
                        .split(' ')
                        .slice(0, 2)
                        .map((s) => s[0])
                        .join('')}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 18 }}>
                        {course.instructorDetails.name}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.6 }}>{course.instructorDetails.bio}</div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: 6, fontWeight: 900 }}>★ {course.instructorDetails.rating.toFixed(1)}</div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
              {tab === 'Reviews' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  <div style={{ display: 'grid', gap: 12 }}>
                    {course.reviews.map((r) => (
                      <div key={r.name} className="glass" style={{ padding: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                          <div style={{ fontWeight: 1000 }}>{r.name}</div>
                          <div style={{ color: '#F59E0B' }}>★ 5.0</div>
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: 13 }}>{r.role}</div>
                        <div style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{r.text}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </div>
          </div>

          <aside
            className="glass"
            style={{
              position: 'sticky',
              top: 96,
              height: 'fit-content',
              padding: 18,
            }}
          >
            <div style={{ color: 'var(--text-muted)', fontWeight: 900, fontSize: 13 }}>Course Price</div>
            <div style={{ marginTop: 8, fontFamily: 'var(--font-heading)', fontWeight: 1000, fontSize: 34 }}>
              ${course.price}
            </div>
            <div style={{ color: 'var(--text-muted)', textDecoration: 'line-through', marginTop: 4, fontWeight: 800 }}>
              ${course.originalPrice}
            </div>

            <div style={{ marginTop: 14 }}>
              <Button variant="primary" disabled={loading} onClick={onEnroll} style={{ width: '100%' }}>
                {loading ? 'Enrolling...' : 'Enroll Now'}
              </Button>
              {error ? <div style={{ color: '#ff6b6b', fontWeight: 800, marginTop: 10 }}>{error}</div> : null}
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontWeight: 1000, fontFamily: 'var(--font-heading)' }}>What you’ll learn</div>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.9, margin: '8px 0 0', paddingLeft: 18 }}>
                {course.overview.learn.slice(0, 5).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
              <button
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: 900,
                }}
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
              >
                Share
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: 900,
                }}
                onClick={() => {}}
              >
                Wishlist
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

