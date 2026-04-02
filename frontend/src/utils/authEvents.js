/** Dispatched when axios gets 401 — AuthContext listens and clears session without a full-page redirect. */
export const AUTH_SESSION_EXPIRED = 'trivanta:auth-session-expired';

export function dispatchSessionExpired() {
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_EXPIRED));
}
