import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, LogIn } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[var(--primary-color)]">
            <LogIn className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            HUREMASO
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Demo Portal Authentication
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-rose-50 p-4 border border-rose-200">
              <div className="flex gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-500 shrink-0" />
                <div className="text-sm font-medium text-rose-800">{error}</div>
              </div>
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[var(--primary-color)] focus:outline-none text-sm"
                placeholder="Enter admin username"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[var(--primary-color)] focus:outline-none text-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-lg p-3 text-xs text-blue-800 border border-blue-100">
            <span className="font-semibold block mb-1">Demo Credentials (Pre-filled):</span>
            Username: <code className="bg-blue-100/50 px-1 py-0.5 rounded text-blue-900 font-mono">admin</code><br />
            Password: <code className="bg-blue-100/50 px-1 py-0.5 rounded text-blue-900 font-mono">admin123</code>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-[var(--primary-color)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
            >
              Enter Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
