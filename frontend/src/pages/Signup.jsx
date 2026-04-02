import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import useAuth from '../hooks/useAuth.js';
import PasswordInput from '../components/PasswordInput.jsx';
import Loader from '../components/Loader.jsx';
import Button from '../components/Button.jsx';
import { validateEmail, passwordRules } from '../utils/validators.js';

export default function Signup() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // {type:'error'|'success', message}

  const setError = (msg) => {
    if (!msg) {
      setStatus(null);
      return;
    }
    setStatus({ type: 'error', message: msg });
  };

  const { score } = passwordRules(form.password);

  const isStrongEnough = score >= 4; // Good/Strong

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.name?.trim()) {
      setError('Please enter your full name.');
      setLoading(false);
      return;
    }
    if (!form.email?.trim()) {
      setError('Please enter your email address.');
      setLoading(false);
      return;
    }
    if (!validateEmail(form.email)) {
      setError('Please enter a valid email.');
      setLoading(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (!form.terms) {
      setError('Please agree to the Terms & Conditions.');
      setLoading(false);
      return;
    }
    if (!isStrongEnough) {
      setError('Password must meet all strength requirements.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/register.php', {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone?.trim() || '',
        password: form.password,
        confirm_password: form.confirmPassword,
      });

      if (response.data?.success) {
        const { token, user } = response.data.data;
        localStorage.setItem('trivanta_token', token);
        localStorage.setItem('trivanta_user', JSON.stringify(user));
        if (typeof login === 'function') login(token, user);
        nav('/dashboard');
      } else {
        setError(response.data?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        setError(
          'Cannot reach the PHP API. Open http://localhost/trivanta/backend/test.php in your browser — if that fails, copy the project to C:\\xampp\\htdocs\\trivanta\\ and ensure Apache is running.',
        );
      } else if (err.response?.status === 502 || err.response?.status === 503) {
        setError(
          'Backend not reachable (bad gateway). Confirm http://localhost/trivanta/backend/test.php returns JSON and your project lives under htdocs/trivanta.',
        );
      } else if (msg) {
        const dbHint =
          /database|mysql|SQLSTATE|Access denied|refused/i.test(msg)
            ? ' Also start MySQL in XAMPP and run http://localhost/trivanta/backend/setup_database.php once.'
            : '';
        setError(msg + dbHint);
      } else if (err.response?.status === 404) {
        setError('API endpoint not found. Check that register.php exists in backend/api/.');
      } else if (err.response?.status === 500) {
        setError(
          (msg || 'Server error.') +
            ' Check XAMPP logs, start MySQL if stopped, and run setup_database.php if you have not yet.',
        );
      } else {
        setError('Something went wrong. Please try again.');
      }
      console.error('[Signup Error]', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '28px 16px', background: 'var(--gradient-hero)' }}>
      <div style={{ width: 'min(480px, 96vw)' }}>
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
          <div style={{ color: 'var(--text-secondary)', fontWeight: 800, marginTop: 10, fontSize: 14 }}>Create your account</div>
        </div>

        <div className="glass" style={{ padding: 18, borderRadius: 22 }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 900, fontSize: 13, marginBottom: 8 }}>
                Full Name <span style={{ color: 'var(--primary)' }}> *</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                style={inputStyle}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 900, fontSize: 13, marginBottom: 8 }}>
                Email <span style={{ color: 'var(--primary)' }}> *</span>
              </label>
              <input
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 900, fontSize: 13, marginBottom: 8 }}>Phone (optional)</label>
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                style={inputStyle}
                placeholder="+1 555 0123"
              />
            </div>

            <PasswordInput
              label="Password"
              required
              value={form.password}
              onChange={(v) => setForm((f) => ({ ...f, password: v }))}
              name="password"
              placeholder="Create a password"
              showStrength
              showRules
            />

            <PasswordInput
              label="Confirm Password"
              required
              value={form.confirmPassword}
              onChange={(v) => setForm((f) => ({ ...f, confirmPassword: v }))}
              name="confirm_password"
              placeholder="Confirm your password"
              showStrength={false}
              showRules={false}
            />

            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--text-secondary)', fontWeight: 800, fontSize: 13 }}>
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => setForm((f) => ({ ...f, terms: e.target.checked }))}
                style={{ marginTop: 3 }}
              />
              I agree to the Terms &amp; Conditions and Privacy Policy
            </label>

            {status ? (
              <div style={{ color: status.type === 'success' ? 'var(--primary)' : '#ff6b6b', fontWeight: 900 }}>
                {status.message}
              </div>
            ) : null}

            <Button type="submit" variant="primary" disabled={loading} style={{ width: '100%', padding: '14px 16px' }}>
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <Loader size={16} /> Creating...
                </span>
              ) : (
                'Create Account'
              )}
            </Button>

            <div style={{ textAlign: 'center', marginTop: 2 }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 800 }}>Already have an account? </span>
              <NavLink to="/login" style={{ color: 'var(--primary)', fontWeight: 950 }}>
                Login
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

