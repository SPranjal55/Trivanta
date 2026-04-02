export function validateEmail(email) {
  const v = String(email ?? '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function validateRequired(value) {
  return String(value ?? '').trim().length > 0;
}

export function passwordRules(password) {
  const v = String(password ?? '');
  const hasMinLength = v.length >= 8;
  const hasUppercase = /[A-Z]/.test(v);
  const hasLowercase = /[a-z]/.test(v);
  const hasNumber = /[0-9]/.test(v);
  const hasSpecial = /[!@#$%^&*()\-_=+\[\]{};:'",.<>?/\\|`~]/.test(v);

  const checks = [
    { key: 'minLength', ok: hasMinLength },
    { key: 'uppercase', ok: hasUppercase },
    { key: 'lowercase', ok: hasLowercase },
    { key: 'number', ok: hasNumber },
    { key: 'special', ok: hasSpecial },
  ];

  const score = checks.filter((c) => c.ok).length; // 0-5
  return { score, checks };
}

export function strengthLabel(score) {
  if (score <= 1) return 'Weak';
  if (score === 2 || score === 3) return 'Fair';
  if (score === 4) return 'Good';
  return 'Strong';
}

export function strengthColor(score) {
  if (score <= 1) return '#ff4d4d';
  if (score === 2 || score === 3) return '#ffb020';
  if (score === 4) return '#ffd84a';
  return '#27e28c';
}

