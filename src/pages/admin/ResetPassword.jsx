import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Loader2, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const ResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    toast({ title: 'Password updated', description: 'You can now log in with your new password.' });
    navigate('/admin');
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | JYT PowerTech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center">
              <KeyRound className="text-white" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Set New Password</h1>
          <p className="text-gray-500 text-center mb-6 text-sm">Choose a new password for your admin account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                placeholder="Re-enter new password"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-full green-gradient text-white">
              {submitting ? <Loader2 className="animate-spin" size={20} /> : 'Update Password'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
