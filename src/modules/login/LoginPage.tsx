import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import HuremasoLogo from '../../components/common/HuremasoLogo';
import HuremasoWaveBg from '../../components/common/HuremasoWaveBg';

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Huremaso Wave Background */}
      <HuremasoWaveBg />

      <div className="relative z-10 w-full max-w-md space-y-8 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-200/80">
        <div className="text-center space-y-2">
          <HuremasoLogo size="xl" />
          <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
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
            <Input
              label="Username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
            />
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="bg-blue-50/50 rounded-lg p-3 text-xs text-blue-800 border border-blue-100">
            <span className="font-semibold block mb-1">Demo Credentials (Pre-filled):</span>
            Username: <code className="bg-blue-100/50 px-1 py-0.5 rounded text-blue-900 font-mono">admin</code><br />
            Password: <code className="bg-blue-100/50 px-1 py-0.5 rounded text-blue-900 font-mono">admin123</code>
          </div>

          <div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
            >
              Enter Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
