import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import useAuth from '../hooks/useAuth.js';
import PasswordInput from '../components/PasswordInput.jsx';
import Loader from '../components/Loader.jsx';
import Button from '../components/Button.jsx';

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/login.php', {
        email: email.trim().toLowerCase(),
        password,
      });

      if (response.data?.success) {
        const { token, user } = response.data.data;
        localStorage.setItem('trivanta_token', token);
        localStorage.setItem('trivanta_user', JSON.stringify(user));
        if (typeof login === 'function') login(token, user);
        nav('/dashboard');
      } else {
        setError(response.data?.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        setError(
          'Cannot reach the PHP API. Open http://localhost/trivanta/backend/test.php — if it fails, copy the project to C:\\xampp\\htdocs\\trivanta\\ and start Apache.',
        );
      } else if (err.response?.status === 502 || err.response?.status === 503) {
        setError(
          'Backend not reachable. Confirm http://localhost/trivanta/backend/test.php returns JSON.',
        );
      } else if (msg) {
        setError(
          msg +
            (/database|mysql|SQLSTATE/i.test(msg)
              ? ' Start MySQL in XAMPP and run setup_database.php if needed.'
              : ''),
        );
      } else {
        setError('Invalid email or password.');
      }
      console.error('[Login Error]', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '28px 16px', background: 'var(--gradient-hero)' }}>
      <div style={{ width: 'min(440px, 96vw)' }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
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
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 22 }}>Trivanta</div>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontWeight: 800, marginTop: 10 }}>Welcome back</div>
        </div>

        <div className="glass" style={{ padding: 18, borderRadius: 22 }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 900, fontSize: 13, marginBottom: 8 }}>
                Email <span style={{ color: 'var(--primary)' }}> *</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                style={{
                  width: '100%',
                  padding: '14px 14px',
                  borderRadius: 14,
                  border: '1.5px solid var(--border)',
                  background: '#F8FAFF',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <PasswordInput
                label="Password"
                required
                value={password}
                onChange={setPassword}
                name="password"
                placeholder="Your password"
              />
              <div style={{ textAlign: 'right', marginTop: 8 }}>
                <NavLink to="/forgot-password" style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 13 }}>
                  Forgot Password?
                </NavLink>
              </div>
            </div>

            {error ? <div style={{ color: '#ff6b6b', fontWeight: 900 }}>{error}</div> : null}

            <Button type="submit" variant="primary" disabled={loading} style={{ padding: '14px 16px' }}>
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <Loader size={16} /> Logging in...
                </span>
              ) : (
                'Login'
              )}
            </Button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, color: 'var(--text-muted)', fontWeight: 900 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
              — OR —
              <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
            </div>

            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 800 }}>Don't have an account? </span>
              <NavLink to="/signup" style={{ color: 'var(--primary)', fontWeight: 950 }}>
                Sign Up
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

