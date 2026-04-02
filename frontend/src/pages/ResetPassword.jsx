import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import PasswordInput from '../components/PasswordInput.jsx';
import Loader from '../components/Loader.jsx';
import Button from '../components/Button.jsx';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  const nav = useNavigate();
  const loc = useLocation();

  const search = new URLSearchParams(loc.search);
  const token = search.get('token');

  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setValid(false);
        setError('Invalid or missing reset token.');
        setChecking(false);
        return;
      }
      try {
        const res = await api.get('/reset_password.php', { params: { token } });
        const ok = res?.data?.success === true;
        setValid(ok);
        setError(!ok ? res?.data?.message || 'Reset token is invalid or expired.' : null);
      } catch (e) {
        setValid(false);
        setError(e?.response?.data?.message || 'Reset token validation failed.');
      } finally {
        setChecking(false);
      }
    };
    run();
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    if (!password || !confirmPassword) {
      setError('Please enter your new password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/reset_password.php', {
        token,
        password,
        confirm_password: confirmPassword,
      });
      if (res?.data?.success) {
        setResult({ type: 'success', message: 'Password updated!' });
        setTimeout(() => nav('/login'), 1800);
      } else {
        setResult({ type: 'error', message: res?.data?.message || 'Password update failed.' });
      }
    } catch (err) {
      setResult({ type: 'error', message: err?.response?.data?.message || 'Password update failed.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '28px 16px', background: 'var(--gradient-hero)' }}>
      <div style={{ width: 'min(520px, 96vw)' }}>
        <div className="glass" style={{ padding: 18, borderRadius: 22 }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 26 }}>Create New Password</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.7 }}>
              Your new password must be different from your previous password.
            </div>
          </div>

          {checking ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
              <Loader size={28} />
            </div>
          ) : !valid ? (
            <div style={{ textAlign: 'center', padding: 12 }}>
              <div style={{ color: '#ff6b6b', fontWeight: 900 }}>{error || 'Reset link expired.'}</div>
              <div style={{ marginTop: 16 }}>
                <Button variant="primary" onClick={() => nav('/forgot-password')}>
                  Request new link
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: 14 }}>
              <div
                className="glass"
                style={{
                  padding: 14,
                  borderRadius: 18,
                  border: '1px solid var(--border)',
                  background: 'rgba(232,106,23,0.06)',
                }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 20 }}>ℹ️</span>
                  <div style={{ fontWeight: 950 }}>Your password must meet all of the following requirements:</div>
                </div>
              </div>

              <PasswordInput
                label="New Password"
                required
                value={password}
                onChange={setPassword}
                name="password"
                placeholder="Create a new password"
                showStrength
                showRules
              />

              <PasswordInput
                label="Confirm New Password"
                required
                value={confirmPassword}
                onChange={setConfirmPassword}
                name="confirm_password"
                placeholder="Confirm your new password"
                showStrength={false}
                showRules={false}
              />

              {error ? <div style={{ color: '#ff6b6b', fontWeight: 900 }}>{error}</div> : null}
              {result ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: result.type === 'success' ? 'var(--primary)' : '#ff6b6b', fontWeight: 900 }}>
                  {result.message}
                </motion.div>
              ) : null}

              <Button type="submit" variant="primary" disabled={submitting} style={{ width: '100%', padding: '14px 16px' }}>
                {submitting ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <Loader size={16} /> Updating...
                  </span>
                ) : (
                  'Update Password'
                )}
              </Button>

              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: 800, marginTop: 2 }}>
                {result?.type === 'success' ? (
                  <span>
                    Password updated!{' '}
                    <button
                      type="button"
                      onClick={() => nav('/login')}
                      style={{ color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 1000 }}
                    >
                      Go to Login
                    </button>
                  </span>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

