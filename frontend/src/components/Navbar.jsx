import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useAuth from '../hooks/useAuth.js';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

function Logo() {
  return (
    <NavLink
      to="/"
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        fontSize: '1.35rem',
        color: 'var(--text-primary)',
      }}
    >
      Trivanta
    </NavLink>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const onLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const styles = useMemo(
    () => ({
      nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background 0.25s ease, backdrop-filter 0.25s ease, border-color 0.25s ease',
        background: scrolled ? '#FFFFFF' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      },
      inner: {
        height: 76,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      },
      desktopLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: 26,
      },
      link: {
        fontSize: 14,
        color: 'var(--text-primary)',
        padding: '10px 2px',
        position: 'relative',
        transition: 'color 0.2s ease',
      },
      active: {
        color: 'var(--text-primary)',
      },
      underline: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -6,
        height: 2,
        borderRadius: 999,
        background: 'var(--gradient-cta)',
      },
    }),
    [scrolled],
  );

  return (
    <header style={styles.nav}>
      <div className="container" style={styles.inner}>
        <Logo />

        <nav className="hide-mobile" style={styles.desktopLinks} aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.active : null),
              })}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive ? <span style={styles.underline} /> : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {isAuthenticated ? (
            <>
              <span
                style={{
                  maxWidth: 160,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                }}
                title={user?.name || ''}
              >
                Hi, {user?.name?.split(' ')[0] || 'there'}
              </span>
              <NavLink to="/dashboard">
                <button
                  type="button"
                  style={{
                    padding: '10px 18px',
                    borderRadius: 999,
                    border: '1.5px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  Dashboard
                </button>
              </NavLink>
              <button
                type="button"
                onClick={onLogout}
                style={{
                  padding: '10px 18px',
                  borderRadius: 999,
                  border: '1.5px solid transparent',
                  background: 'rgba(232,106,23,0.08)',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" style={{ marginRight: 4 }}>
                <button
                  type="button"
                  style={{
                    padding: '10px 18px',
                    borderRadius: 999,
                    border: '1.5px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button
                  type="button"
                  style={{
                    padding: '12px 20px',
                    borderRadius: 999,
                    border: 'none',
                    background: 'var(--gradient-cta)',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontWeight: 800,
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 18px 40px rgba(232,106,23,0.24)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  Get Started
                </button>
              </NavLink>
            </>
          )}
        </div>

        <button
          className="show-mobile"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            border: '1.5px solid var(--border)',
            background: 'rgba(0,0,0,0.02)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          ☰
        </button>
      </div>

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
              zIndex: 1200,
            }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
                width: 'min(420px, 92vw)',
                background: '#FFFFFF',
                borderLeft: '1px solid rgba(0,0,0,0.06)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 14,
                    border: '1px solid rgba(255,255,255,0.16)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      padding: '12px 14px',
                      borderRadius: 14,
                      border: '1px solid rgba(0,0,0,0.06)',
                      background: isActive ? 'rgba(232,106,23,0.12)' : 'rgba(0,0,0,0.02)',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: 700,
                    })}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {isAuthenticated ? (
                  <>
                    <div style={{ fontWeight: 800, color: 'var(--text-secondary)', padding: '0 8px' }}>
                      Signed in as {user?.name || user?.email}
                    </div>
                    <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                      <button
                        type="button"
                        style={{
                          width: '100%',
                          padding: '12px 18px',
                          borderRadius: 999,
                          border: '1.5px solid var(--border)',
                          background: 'transparent',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          fontWeight: 800,
                        }}
                      >
                        Dashboard
                      </button>
                    </NavLink>
                    <button
                      type="button"
                      onClick={onLogout}
                      style={{
                        width: '100%',
                        padding: '12px 18px',
                        borderRadius: 999,
                        border: 'none',
                        background: 'rgba(232,106,23,0.12)',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        fontWeight: 900,
                      }}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" onClick={() => setOpen(false)}>
                      <button
                        type="button"
                        style={{
                          width: '100%',
                          padding: '12px 18px',
                          borderRadius: 999,
                          border: '1.5px solid var(--border)',
                          background: 'transparent',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          fontWeight: 800,
                        }}
                      >
                        Login
                      </button>
                    </NavLink>
                    <NavLink to="/signup" onClick={() => setOpen(false)}>
                      <button
                        type="button"
                        style={{
                          width: '100%',
                          padding: '12px 18px',
                          borderRadius: 999,
                          border: 'none',
                          background: 'var(--gradient-cta)',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          fontWeight: 900,
                        }}
                      >
                        Get Started
                      </button>
                    </NavLink>
                  </>
                )}
                <div style={{ color: 'var(--text-muted)', fontSize: 12, padding: '0 8px' }}>
                  You are currently viewing: <span style={{ color: 'var(--text-secondary)' }}>{location.pathname}</span>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

