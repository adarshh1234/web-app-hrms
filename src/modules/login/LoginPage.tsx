import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  User, 
  Mail, 
  Lock, 
  Briefcase, 
  Smartphone, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  ArrowRight,
  X
} from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import HuremasoLogo from '../../components/common/HuremasoLogo';
import HuremasoWaveBg from '../../components/common/HuremasoWaveBg';
import { 
  registerUserAccount, 
  calculateTrialStatus, 
  upgradeUserToPremium,
  getRegisteredUsers,
  simulateTrialAge,
  TrialStatus
} from './authTrialService';

interface LoginPageProps {
  onLogin: () => void;
}

type AuthTab = 'sign_in' | 'create_account';
type UserRole = 'Candidate' | 'Recruiter';
type VerifyMethod = 'Email' | 'WhatsApp';

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  // Active Tab: Sign In vs Create Account
  const [activeTab, setActiveTab] = useState<AuthTab>('sign_in');

  // Sign In state
  const [signInIdentifier, setSignInIdentifier] = useState('admin');
  const [signInPassword, setSignInPassword] = useState('admin123');

  // Sign Up state
  const [role, setRole] = useState<UserRole>('Candidate');
  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>('Email');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  // OTP Verification Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');

  // Premium Upgrade Modal State
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [pendingUserEmail, setPendingUserEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro'>('pro');

  // General Error / Info Messaging
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Registered Accounts list for quick access / trial overview
  const [registeredAccounts, setRegisteredAccounts] = useState(() => getRegisteredUsers());

  useEffect(() => {
    setRegisteredAccounts(getRegisteredUsers());
  }, [activeTab, showOtpModal, showUpgradeModal]);

  // Handle Sign In submission
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const identifier = signInIdentifier.trim();
    const password = signInPassword.trim();

    if (!identifier || !password) {
      setErrorMessage('Please enter both email/username and password');
      return;
    }

    // Standard Demo Admin shortcut
    if ((identifier === 'admin' || identifier === 'admin@huremaso.com') && password === 'admin123') {
      onLogin();
      navigate('/dashboard');
      return;
    }

    // Check against registered trial accounts
    const trialInfo: TrialStatus = calculateTrialStatus(identifier);

    if (trialInfo.status === 'deactivated') {
      setErrorMessage('Your 3-day free trial expired and account was deactivated on Day 7. Please create a new account.');
      setRegisteredAccounts(getRegisteredUsers());
      return;
    }

    if (trialInfo.status === 'trial_expired') {
      setPendingUserEmail(identifier);
      setShowUpgradeModal(true);
      return;
    }

    // Active Trial or Premium user
    if (trialInfo.status === 'trial_active' || trialInfo.status === 'admin') {
      onLogin();
      navigate('/dashboard');
    } else {
      setErrorMessage('Invalid credentials or unregistered account.');
    }
  };

  // Pre-fill demo credentials
  const fillDemoCredentials = () => {
    setActiveTab('sign_in');
    setSignInIdentifier('admin');
    setSignInPassword('admin123');
    setErrorMessage('');
  };

  // Google OAuth Handler (Simulated)
  const handleGoogleAuth = () => {
    if (activeTab === 'create_account') {
      const gEmail = 'user.google@example.com';
      const gUsername = 'google_user';
      registerUserAccount({
        username: gUsername,
        email: gEmail,
        role: role,
        verifyMethod: 'Email',
      });
      setSuccessMessage('Successfully signed up with Google! 3-Day Free Trial Started.');
      setTimeout(() => {
        onLogin();
        navigate('/dashboard');
      }, 1000);
    } else {
      // Sign In via Google
      onLogin();
      navigate('/dashboard');
    }
  };

  // Initial Sign Up step (Triggers OTP verification)
  const handleInitiateSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signUpUsername.trim()) {
      setErrorMessage('Username is required');
      return;
    }
    if (!signUpEmail.trim()) {
      setErrorMessage('Email address is required');
      return;
    }
    if (signUpPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setShowOtpModal(true);
    setOtpCode('');
    setOtpError('');
  };

  // Complete Sign Up after OTP verification
  const handleConfirmOtp = () => {
    if (otpCode.trim() !== '1234' && otpCode.trim().length < 4) {
      setOtpError('Invalid OTP code. Enter 1234 for demo verification.');
      return;
    }

    const newUser = registerUserAccount({
      username: signUpUsername.trim(),
      email: signUpEmail.trim(),
      role: role,
      verifyMethod: verifyMethod,
      password: signUpPassword,
    });

    setShowOtpModal(false);
    setSuccessMessage(`Account created successfully! Your 3-Day Free Trial is now active.`);
    setRegisteredAccounts(getRegisteredUsers());

    setTimeout(() => {
      onLogin();
      navigate('/dashboard');
    }, 1200);
  };

  // Handle Premium Upgrade activation
  const handleActivatePremium = () => {
    if (pendingUserEmail) {
      upgradeUserToPremium(pendingUserEmail);
      setShowUpgradeModal(false);
      setSuccessMessage('🎉 Premium Plan Activated! Unlimited access granted.');
      setTimeout(() => {
        onLogin();
        navigate('/dashboard');
      }, 1000);
    }
  };

  // Fast test tool for trial simulation (Days 1, 4, 8)
  const handleSimulateAge = (daysAgo: number) => {
    if (registeredAccounts.length > 0) {
      const email = registeredAccounts[0].email;
      simulateTrialAge(email, daysAgo);
      setRegisteredAccounts(getRegisteredUsers());
      setSuccessMessage(`Simulated user account age to ${daysAgo} days ago.`);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Background Graphic */}
      <HuremasoWaveBg />

      {/* Main SaaS Auth Card */}
      <div className="relative z-10 w-full max-w-md space-y-6 bg-white/95 backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200/90 transition-all duration-300">
        
        {/* Top Branding & Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <HuremasoLogo size="lg" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {activeTab === 'sign_in' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {activeTab === 'sign_in' 
              ? 'Sign in to access your HR portal & dashboard.' 
              : 'Start your 3-day free trial with full feature access.'}
          </p>
        </div>

        {/* Segmented Tab Controls (Create Account | Sign In) */}
        <div className="bg-slate-100/90 p-1 rounded-2xl flex border border-slate-200/80">
          <button
            type="button"
            onClick={() => { setActiveTab('create_account'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'create_account'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('sign_in'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'sign_in'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Global Notifications */}
        {errorMessage && (
          <div className="rounded-xl bg-rose-50 p-3.5 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-fadeIn">
            <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl bg-emerald-50 p-3.5 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {/* Google OAuth Option */}
        <div>
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-slate-300 py-2.5 px-4 rounded-full text-xs font-semibold text-slate-700 shadow-xs hover:shadow transition-all duration-200 cursor-pointer active:scale-[0.99]"
          >
            {/* Google Colored Logo SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{activeTab === 'sign_in' ? 'Sign in with Google' : 'Sign up with Google'}</span>
          </button>
        </div>

        {/* Or Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="w-full border-t border-slate-200"></div>
          <span className="absolute bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {activeTab === 'sign_in' ? 'Or with credentials' : 'Or with OTP verification'}
          </span>
        </div>

        {/* SIGN IN FORM */}
        {activeTab === 'sign_in' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              label="Email or Phone Number"
              type="text"
              required
              value={signInIdentifier}
              onChange={(e) => setSignInIdentifier(e.target.value)}
              placeholder="email@example.com or +11234567890"
              icon={<Mail className="w-4 h-4 text-slate-400" />}
            />

            <Input
              label="Password"
              type="password"
              required
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              placeholder="Your password"
              icon={<Lock className="w-4 h-4 text-slate-400" />}
            />

            <Button type="submit" size="lg" className="w-full rounded-full bg-[#0473b8] hover:bg-[#03629e]">
              Sign In
            </Button>

            {/* Demo Credentials Box */}
            <div className="bg-slate-50 rounded-2xl p-3.5 text-xs border border-slate-200/90 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Demo Credentials:
                </span>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-[11px] font-bold text-[#0473b8] hover:underline cursor-pointer"
                >
                  Auto Fill
                </button>
              </div>
              <div className="text-slate-600 font-mono text-[11px] space-y-0.5">
                <div>Username: <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-900">admin</code></div>
                <div>Password: <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-900">admin123</code></div>
              </div>
            </div>
          </form>
        )}

        {/* CREATE ACCOUNT FORM */}
        {activeTab === 'create_account' && (
          <form onSubmit={handleInitiateSignUp} className="space-y-4">
            
            {/* Role Switcher ("I AM A") */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider uppercase text-slate-500">I AM A</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setRole('Candidate')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    role === 'Candidate'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Recruiter')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    role === 'Recruiter'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Recruiter
                </button>
              </div>
            </div>

            {/* Verification Method Switcher ("VERIFY WITH") */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider uppercase text-slate-500">VERIFY WITH</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setVerifyMethod('Email')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    verifyMethod === 'Email'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setVerifyMethod('WhatsApp')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    verifyMethod === 'WhatsApp'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  WhatsApp
                </button>
              </div>
            </div>

            <Input
              label="Username"
              type="text"
              required
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
              placeholder="johndoe"
              icon={<User className="w-4 h-4 text-slate-400" />}
            />

            <Input
              label="Email Address"
              type="email"
              required
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              placeholder="name@company.com"
              icon={<Mail className="w-4 h-4 text-slate-400" />}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Password"
                type="password"
                required
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                placeholder="Min. 6 chars"
                icon={<Lock className="w-4 h-4 text-slate-400" />}
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                value={signUpConfirmPassword}
                onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                placeholder="Re-enter"
                icon={<Lock className="w-4 h-4 text-slate-400" />}
              />
            </div>

            {/* Trial Info Banner */}
            <div className="bg-emerald-50/80 rounded-2xl p-3 border border-emerald-200/80 text-[11px] text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Includes <strong>3-Day Free Trial</strong> with full feature access upon registration.</span>
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full bg-[#0473b8] hover:bg-[#03629e]">
              Send {verifyMethod} OTP
            </Button>
          </form>
        )}

        {/* Registered Accounts Overview Widget (If local trial users exist) */}
        {registeredAccounts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-500 font-medium text-[11px]">
              <span>Active Trial Accounts:</span>
              <span>{registeredAccounts.length} User(s)</span>
            </div>
            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {registeredAccounts.map((acc) => {
                const status = calculateTrialStatus(acc.email);
                return (
                  <div 
                    key={acc.id} 
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition"
                    onClick={() => {
                      setActiveTab('sign_in');
                      setSignInIdentifier(acc.email);
                      setSignInPassword('password123');
                    }}
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{acc.username}</div>
                      <div className="text-[10px] text-slate-500">{acc.email}</div>
                    </div>
                    <div>
                      {status.isPremium ? (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                          PRO
                        </span>
                      ) : status.status === 'trial_active' ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {status.daysRemaining}d Left
                        </span>
                      ) : status.status === 'trial_expired' ? (
                        <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                          Expired
                        </span>
                      ) : (
                        <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Deactivated
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Development simulation buttons for testing 3-day trial lifecycle */}
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 pt-1">
              <span>Test Trial Age:</span>
              <button 
                type="button" 
                onClick={() => handleSimulateAge(1)}
                className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-700 hover:bg-slate-300 cursor-pointer"
              >
                Day 1
              </button>
              <button 
                type="button" 
                onClick={() => handleSimulateAge(4)}
                className="px-1.5 py-0.5 bg-amber-200 rounded text-amber-900 hover:bg-amber-300 cursor-pointer"
              >
                Day 4 (Expired)
              </button>
              <button 
                type="button" 
                onClick={() => handleSimulateAge(8)}
                className="px-1.5 py-0.5 bg-rose-200 rounded text-rose-900 hover:bg-rose-300 cursor-pointer"
              >
                Day 8 (Deleted)
              </button>
            </div>
          </div>
        )}

      </div>

      {/* OTP VERIFICATION MODAL */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-100 relative space-y-5">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0473b8] mx-auto">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Verify via {verifyMethod}
              </h3>
              <p className="text-xs text-slate-500">
                We sent a 4-digit verification code to <strong>{signUpEmail}</strong>.
              </p>
            </div>

            {otpError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
                {otpError}
              </div>
            )}

            <div className="space-y-3">
              <Input
                label="Enter 4-Digit Code"
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="1234 (Demo default)"
                className="text-center tracking-widest text-lg font-mono font-bold"
              />
              <div className="text-[11px] text-slate-400 text-center">
                Demo Code: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold text-slate-700">1234</code>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleConfirmOtp}
              className="w-full rounded-full bg-[#0473b8] hover:bg-[#03629e]"
            >
              Verify & Complete Registration
            </Button>
          </div>
        </div>
      )}

      {/* PREMIUM PLAN SELECTION MODAL (For Days 4-7 Trial Expiration) */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative space-y-6">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto border border-amber-200/60">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                3-Day Trial Period Expired
              </h3>
              <p className="text-xs text-slate-600">
                Your free trial for <strong>{pendingUserEmail}</strong> has ended. Select a Premium plan to continue accessing HRMS services and prevent account deletion on Day 7.
              </p>
            </div>

            {/* Plan Choice Options */}
            <div className="space-y-3">
              <div
                onClick={() => setSelectedPlan('pro')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPlan === 'pro'
                    ? 'border-[#0473b8] bg-blue-50/40 ring-2 ring-[#0473b8]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Pro HRMS Plan</span>
                    <span className="bg-[#0473b8] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">POPULAR</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Full HR management, attendance, payroll & recruitment tools</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">$49</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
              </div>

              <div
                onClick={() => setSelectedPlan('starter')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedPlan === 'starter'
                    ? 'border-[#0473b8] bg-blue-50/40 ring-2 ring-[#0473b8]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <span className="font-bold text-sm text-slate-900">Starter Plan</span>
                  <p className="text-[11px] text-slate-500">Essential employee directory & document management</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">$19</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleActivatePremium}
              className="w-full rounded-full bg-[#0473b8] hover:bg-[#03629e] py-3 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Activate Premium & Continue
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginPage;
