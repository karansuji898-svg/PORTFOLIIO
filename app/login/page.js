"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginBox} onSubmit={handleLogin}>
        <h1 className={styles.title}>Admin Access</h1>
        <p className={styles.subtitle}>Please enter your password to continue</p>
        
        <input 
          type="password" 
          className={styles.input} 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && <p className={styles.error}>{error}</p>}
        
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Authenticating...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
