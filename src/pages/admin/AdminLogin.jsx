import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/useAuth';

const AdminLogin = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotSubmitting, setForgotSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/admin" replace />;
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setForgotSubmitting(false);
    // Always show success (don't reveal whether the email exists)
    setForgotSent(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);

    if (error) {
      setError('Invalid email or password.');
      return;
    }

    navigate('/admin');
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | JYT PowerTech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center">
              <Lock className="text-white" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Admin Login</h1>
          <p className="text-gray-500 text-center mb-6 text-sm">JYT PowerTech Dashboard</p>

          {!showForgot ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <Button type="submit" disabled={submitting} className="w-full green-gradient text-white">
                  {submitting ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                </Button>
              </form>

              <button
                onClick={() => setShowForgot(true)}
                className="text-sm text-green-600 hover:underline mt-4 block mx-auto"
              >
                Forgot password?
              </button>

              <p className="text-xs text-gray-400 text-center mt-6">
                Admin accounts are created from the Supabase dashboard (Authentication → Users).
              </p>
            </>
          ) : forgotSent ? (
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                If an account exists for that email, a password reset link has been sent. Check the inbox (and spam folder).
              </p>
              <button
                onClick={() => { setShowForgot(false); setForgotSent(false); }}
                className="text-sm text-green-600 hover:underline"
              >
                Back to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-gray-500 text-sm text-center mb-2">
                Enter your admin email — we'll send a link to reset your password.
              </p>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Email</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                  placeholder="admin@example.com"
                />
              </div>
              <Button type="submit" disabled={forgotSubmitting} className="w-full green-gradient text-white">
                {forgotSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Send Reset Link'}
              </Button>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="text-sm text-gray-500 hover:underline block mx-auto"
              >
                Back to login
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
