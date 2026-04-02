import React, { useState } from 'react';
import api from '../utils/api.js';
import Button from '../components/Button.jsx';
import Loader from '../components/Loader.jsx';
import { NavLink } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/forgot_password.php', { email: email.trim() });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '28px 16px', background: 'var(--gradient-hero)' }}>
      <div style={{ width: 'min(480px, 96vw)' }}>
        <div className="glass" style={{ padding: 18, borderRadius: 22 }}>
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 24 }}>Forgot your password?</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.7 }}>
              Enter your registered email and we'll send you a reset link.
            </div>
          </div>

          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 14 }}>
            <label style={{ display: 'block', fontWeight: 900, fontSize: 13 }}>
              Email <span style={{ color: 'var(--primary)' }}> *</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="you@example.com"
            />

            {error ? <div style={{ color: '#ff6b6b', fontWeight: 900 }}>{error}</div> : null}

            {submitted ? (
              <div style={{ color: 'var(--primary)', fontWeight: 900 }}>
                If this email is registered, you'll receive a link shortly.
              </div>
            ) : (
              <Button type="submit" variant="primary" disabled={loading} style={{ padding: '14px 16px' }}>
                {loading ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <Loader size={16} /> Sending...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            )}

            <div style={{ textAlign: 'center', marginTop: 4 }}>
              <NavLink to="/login" style={{ color: 'var(--primary)', fontWeight: 950 }}>
                Back to Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 14px',
  borderRadius: 14,
  border: '1.5px solid var(--border)',
  background: '#F8FAFF',
  color: 'var(--text-primary)',
  outline: 'none',
};

