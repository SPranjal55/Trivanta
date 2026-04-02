import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { AUTH_SESSION_EXPIRED } from '../utils/authEvents.js';

const AuthContext = createContext(null);

const TOKEN_KEY = 'trivanta_token';
const USER_KEY = 'trivanta_user';

function readUserFromStorage() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // Lazy init from localStorage so first paint matches stored session (no flash of logged-out UI).
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => readUserFromStorage());
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token);

  // Sync React state when axios clears storage after 401 (no full page reload).
  useEffect(() => {
    const onSessionExpired = () => {
      setToken(null);
      setUser(null);
    };
    window.addEventListener(AUTH_SESSION_EXPIRED, onSessionExpired);
    return () => window.removeEventListener(AUTH_SESSION_EXPIRED, onSessionExpired);
  }, []);

  // Optional: keep tabs in sync when localStorage changes in another tab
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === TOKEN_KEY) {
        setToken(e.newValue);
        if (!e.newValue) setUser(null);
      }
      if (e.key === USER_KEY) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback((nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser ?? null);
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser ?? null));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      loading,
      login,
      logout,
    }),
    [user, token, isAuthenticated, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
