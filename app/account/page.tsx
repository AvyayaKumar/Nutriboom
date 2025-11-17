'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Utensils, User, Mail, Lock, ArrowLeft, LogOut,
  Camera, Edit, Save, X
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { updateProfile, updatePassword, signOut } from 'firebase/auth';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFormData({
          displayName: currentUser.displayName || '',
          email: currentUser.email || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleUpdateProfile = async () => {
    setError('');
    setSuccess('');

    try {
      if (user) {
        // Update display name
        await updateProfile(user, {
          displayName: formData.displayName
        });

        setSuccess('Profile updated successfully!');
        setEditMode(false);

        // Refresh user data
        await user.reload();
        setUser(auth.currentUser);
      }
    } catch (err: any) {
      setError('Failed to update profile: ' + err.message);
    }
  };

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      if (user) {
        await updatePassword(user, formData.newPassword);
        setSuccess('Password changed successfully!');
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        setError('Please log out and log in again before changing your password');
      } else {
        setError('Failed to change password: ' + err.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (err: any) {
      setError('Failed to log out: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Utensils className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">
                Indian<span className="text-emerald-500">NutriCare</span>
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-emerald-400 transition">
                Dashboard
              </Link>
              <Link href="/explore" className="text-gray-300 hover:text-emerald-400 transition">
                Explore
              </Link>
              <Link href="/account" className="text-emerald-400 font-medium">
                Account
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-gray-400">Manage your profile and account preferences</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-6 border border-gray-800">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-emerald-600 p-2 rounded-full hover:bg-emerald-700 transition">
                  <Camera className="h-4 w-4 text-white" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.displayName || 'User'}</h2>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {new Date(user.metadata.creationTime).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition"
            >
              {editMode ? (
                <>
                  <X className="h-5 w-5" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Edit className="h-5 w-5" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          {/* Profile Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Display Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                  disabled={!editMode}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 opacity-50"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {editMode && (
              <button
                onClick={handleUpdateProfile}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-semibold"
              >
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </button>
            )}
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6">Change Password</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
                  placeholder="Enter new password"
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
                  placeholder="Confirm new password"
                  minLength={8}
                />
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6">Account Actions</h3>

          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>

            <p className="text-sm text-gray-500">
              Last login: {new Date(user.metadata.lastSignInTime).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
