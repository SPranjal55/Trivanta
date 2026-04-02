import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../utils/api.js';
import Button from './Button.jsx';

function SocialIcon({ label, href, hoverBg, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noreferrer"
      aria-label={label}
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.08)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A09080',
        transition: 'var(--transition)',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.color = '#A09080';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const onSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      await api.post('/contact.php', {
        type: 'newsletter',
        name: 'Newsletter Subscriber',
        email: email.trim(),
        phone: '',
        subject: 'Newsletter',
        message: 'Newsletter subscription request',
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <footer style={{ marginTop: 64, padding: '48px 0 26px', background: 'var(--gradient-dark)', color: 'var(--text-on-dark)' }}>
      <div
        aria-hidden="true"
        style={{
          height: 3,
          width: '100%',
          background: 'var(--gradient-cta)',
          marginBottom: 34,
        }}
      />
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 22 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em', color: '#FFFFFF' }}>Trivanta</div>
          <div style={{ marginTop: 10, color: '#A09080', lineHeight: 1.7 }}>
            Learn It. Build It. Scale It.
          </div>
          <div style={{ marginTop: 14, color: '#8A7A6A', fontSize: 13, lineHeight: 1.7 }}>
            Modern skill courses plus done-for-you digital services.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, borderBottom: '2px solid var(--primary)', paddingBottom: 8, display: 'inline-block', marginBottom: 10 }}>
            Quick Links
          </div>
          {[
            ['Home', '/'],
            ['Courses', '/courses'],
            ['Services', '/services'],
            ['About', '/about'],
            ['Blog', '/blog'],
            ['Contact', '/contact'],
          ].map(([label, to]) => (
            <NavLink
              key={label}
              to={to}
              style={{ color: '#A09080', fontSize: 14, transition: 'var(--transition)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary-glow)';
                e.currentTarget.style.paddingLeft = '6px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#A09080';
                e.currentTarget.style.paddingLeft = '0px';
              }}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, borderBottom: '2px solid var(--primary)', paddingBottom: 8, display: 'inline-block', marginBottom: 10 }}>
            Contact Us
          </div>
          <div style={{ color: '#A09080', fontSize: 14 }}>📞 +91-6283535200</div>
          <div style={{ color: '#A09080', fontSize: 14 }}>✉️ support@trivanta.com</div>
          <div style={{ color: '#A09080', fontSize: 14 }}>📍 Trivanta Headquarters, Ludhiana, Punjab, India</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, borderBottom: '2px solid var(--primary)', paddingBottom: 8, display: 'inline-block', marginBottom: 10 }}>
            Follow Us
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <SocialIcon label="Instagram" href="#" hoverBg="linear-gradient(45deg, #F09433, #E6683C, #DC2743, #CC2366, #BC1888)">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </SocialIcon>
            <SocialIcon label="Facebook" href="#" hoverBg="#1877F2">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </SocialIcon>
            <SocialIcon label="Twitter X" href="#" hoverBg="#000000">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </SocialIcon>
            <SocialIcon label="Email" href="mailto:support@trivanta.com" hoverBg="var(--primary)">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </SocialIcon>
          </div>

          <form onSubmit={onSubscribe} style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Newsletter email"
              aria-label="Newsletter email"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 999,
                padding: '12px 14px',
                color: '#F5F1E8',
                outline: 'none',
              }}
            />
            <div style={{ minWidth: 120 }}>
              <Button type="submit" variant="primary" disabled={loading} style={{ padding: '12px 16px' }}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>
          {status ? (
            <div style={{ fontSize: 13, color: status === 'success' ? 'var(--primary-glow)' : '#ff6b6b', marginTop: -2 }}>
              {status === 'success' ? 'Subscribed successfully!' : 'Subscription failed. Try again.'}
            </div>
          ) : null}
        </div>
      </div>

      <div className="container" style={{ marginTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ color: '#6A5A4A', fontSize: 13 }}>© 2025 Trivanta. All Rights Reserved.</div>
        <div style={{ color: '#6A5A4A', fontSize: 13 }}>Made with ❤️ in India</div>
      </div>
    </footer>
  );
}

