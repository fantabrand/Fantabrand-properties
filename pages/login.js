import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to admin if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) router.replace('/admin');
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          router.replace('/admin');
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Admin Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '1.5rem' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#6a00f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}