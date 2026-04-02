import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import useAuth from '../hooks/useAuth.js';
import COURSES from '../utils/courses.js';
import Loader from '../components/Loader.jsx';

export default function Dashboard() {
  const nav = useNavigate();
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [courseSlugs, setCourseSlugs] = useState([]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const res = await api.get('/courses.php');
        const slugs =
          res?.data?.data?.course_slugs ||
          res?.data?.data?.enrolled_slugs ||
          res?.data?.course_slugs ||
          res?.data?.enrolled_slugs ||
          [];
        setCourseSlugs(Array.isArray(slugs) ? slugs : []);
      } catch {
        setCourseSlugs([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const enrolledCourses = useMemo(() => {
    return courseSlugs.map((s) => COURSES.find((c) => c.slug === s)).filter(Boolean);
  }, [courseSlugs]);

  const initials = (user?.name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  const onLogout = () => {
    logout();
    nav('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0 }}>
      <aside
        className="glass"
        style={{
          margin: 18,
          borderRadius: 22,
          padding: 18,
          position: 'sticky',
          top: 18,
          height: 'calc(100vh - 36px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            aria-hidden="true"
            style={{
              width: 44,
              height: 44,
              borderRadius: 16,
              background: 'var(--gradient-cta)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          />
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 18 }}>Trivanta</div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'var(--gradient-cta)',
              border: '1px solid rgba(255,255,255,0.10)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 950,
            }}
          >
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 950 }}>{user?.name}</div>
            <div style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: 13 }}>{user?.email}</div>
          </div>
        </div>

        <nav style={{ display: 'grid', gap: 10, marginTop: 10 }}>
          <NavLink
            to="/courses"
            style={({ isActive }) => ({
              padding: '12px 14px',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              background: isActive ? 'rgba(232,106,23,0.10)' : 'rgba(255,255,255,0.03)',
              color: 'var(--text-primary)',
              fontWeight: 900,
            })}
          >
            My Courses
          </NavLink>
          <NavLink
            to="/services"
            style={({ isActive }) => ({
              padding: '12px 14px',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              background: isActive ? 'rgba(232,106,23,0.10)' : 'rgba(255,255,255,0.03)',
              color: 'var(--text-primary)',
              fontWeight: 900,
            })}
          >
            Services
          </NavLink>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.03)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 950,
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      <section style={{ padding: 24 }}>
        <h1 className="page-title" style={{ margin: '6px 0 8px', fontSize: 40 }}>
          Welcome back, {user?.name}!
        </h1>
        <div style={{ color: 'var(--text-secondary)', fontWeight: 800, lineHeight: 1.7 }}>
          Keep going — your skills are compounding.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 18 }}>
          <StatCard title="Enrolled Courses" value={courseSlugs.length} />
          <StatCard title="Completed" value={0} />
          <StatCard title="Certificates" value={0} />
        </div>

        <div className="glass" style={{ padding: 18, borderRadius: 22, marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 18 }}>My Courses</div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: 13, marginTop: 4 }}>
                Continue where you left off.
              </div>
            </div>
            <NavLink to="/courses">
              <button
                style={{
                  padding: '10px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: 'var(--gradient-cta)',
                  color: '#06101f',
                  fontWeight: 950,
                  cursor: 'pointer',
                }}
              >
                Explore More Courses
              </button>
            </NavLink>
          </div>

          {loading ? (
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
              <Loader size={26} />
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div style={{ marginTop: 18, color: 'var(--text-secondary)', fontWeight: 800 }}>
              You haven’t enrolled in any courses yet.
            </div>
          ) : (
            <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
              {enrolledCourses.map((c) => (
                <NavLink key={c.slug} to={`/courses/${c.slug}`}>
                  <div
                    style={{
                      borderRadius: 18,
                      padding: 14,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 950 }}>{c.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: 13, marginTop: 6 }}>
                      ★ {c.rating.toFixed(1)} • {c.duration}
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="glass" style={{ padding: 16, borderRadius: 18 }}>
      <div style={{ color: 'var(--text-muted)', fontWeight: 900, fontSize: 13 }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 1000, fontSize: 28, marginTop: 8 }}>{value}</div>
    </div>
  );
}

