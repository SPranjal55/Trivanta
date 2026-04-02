import React, { useMemo, useState } from 'react';
import { passwordRules, strengthColor } from '../utils/validators.js';

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.58 10.58A2.5 2.5 0 0 0 12 15a2.5 2.5 0 0 0 2.42-3.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.88 5.08A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a19.9 19.9 0 0 1-4.1 5.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.11 6.11C3.55 8.08 2 12 2 12s3.5 7 10 7c1.23 0 2.38-.2 3.42-.55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PasswordInput({
  label,
  value,
  onChange,
  name,
  placeholder,
  required,
  showStrength = false,
  showRules = false,
  disabled,
}) {
  const [show, setShow] = useState(false);

  const { score, checks } = useMemo(() => passwordRules(value), [value]);
  const color = strengthColor(score);

  const strengthSegments = 4;
  const fillRatio = score / 5; // score 0..5
  const filled = Math.max(0, Math.min(strengthSegments, Math.round(fillRatio * strengthSegments)));

  return (
    <div style={{ width: '100%' }}>
      {label ? (
        <label style={{ display: 'block', fontWeight: 800, fontSize: 13, marginBottom: 8, color: 'var(--text-primary)' }}>
          {label}
          {required ? <span style={{ color: 'var(--primary)' }}> *</span> : null}
        </label>
      ) : null}

      <div
        style={{
          position: 'relative',
          borderRadius: 14,
          border: '1.5px solid var(--border)',
          background: '#F8FAFF',
        }}
      >
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '14px 46px 14px 14px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: 14,
          }}
        />
        <button
          type="button"
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={() => setShow((s) => !s)}
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 34,
            height: 34,
            borderRadius: 12,
            border: '1.5px solid var(--border)',
            background: 'rgba(232,106,23,0.06)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
        >
          <EyeIcon open={show} />
        </button>
      </div>

      {showStrength ? (
        <div style={{ marginTop: 10 }}>
          <div style={{ height: 10, display: 'grid', gridTemplateColumns: `repeat(${strengthSegments}, 1fr)`, gap: 6 }}>
            {Array.from({ length: strengthSegments }).map((_, idx) => {
              const on = idx < filled;
              return (
                <div
                  key={idx}
                  style={{
                    borderRadius: 999,
                    height: 10,
                        background: on ? color : 'rgba(0,0,0,0.06)',
                        border: on ? `1px solid ${color}` : '1px solid rgba(0,0,0,0.06)',
                    transition: 'var(--transition)',
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {showRules ? (
        <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }}>Password rules</div>
          <div style={{ display: 'grid', gap: 6 }}>
            <RuleRow ok={checks[0]?.ok} text="At least 8 characters" />
            <RuleRow ok={checks[1]?.ok} text="At least one uppercase letter (A-Z)" />
            <RuleRow ok={checks[2]?.ok} text="At least one lowercase letter (a-z)" />
            <RuleRow ok={checks[3]?.ok} text="At least one number (0-9)" />
            <RuleRow ok={checks[4]?.ok} text="At least one special character (!@#$%^&*)" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RuleRow({ ok, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          background: ok ? 'rgba(232,106,23,0.14)' : 'rgba(232,106,23,0.05)',
          border: ok ? '1px solid rgba(232,106,23,0.30)' : '1px solid rgba(232,106,23,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: ok ? 'var(--primary)' : 'var(--text-muted)',
          fontWeight: 900,
          fontSize: 13,
        }}
      >
        {ok ? '✓' : '✗'}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: ok ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
        {text}
      </div>
    </div>
  );
}

