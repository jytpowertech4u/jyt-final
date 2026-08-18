import React, { useState } from 'react';
import { Loader2, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AccountTab = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({ variant: 'destructive', title: 'Password must be at least 6 characters' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ variant: 'destructive', title: 'Passwords do not match' });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      toast({ variant: 'destructive', title: 'Could not update password', description: error.message });
      return;
    }

    setPassword('');
    setConfirmPassword('');
    toast({ title: 'Password updated successfully' });
  };

  return (
    <div className="max-w-md">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <KeyRound size={18} /> Change Password
        </h3>
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
            <label className="block text-gray-700 font-medium mb-1 text-sm">Confirm New Password</label>
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
          <Button type="submit" disabled={submitting} className="green-gradient text-white">
            {submitting ? <Loader2 className="animate-spin" size={18} /> : 'Update Password'}
          </Button>
        </form>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Alternatively, an existing admin can reset any user's password directly from the Supabase
        dashboard: Authentication → Users → select the user → Reset Password — no email required.
      </p>
    </div>
  );
};

export default AccountTab;
