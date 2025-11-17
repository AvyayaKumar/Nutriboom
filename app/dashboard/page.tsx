'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  Utensils, User, Activity, TrendingUp, Calendar,
  MessageSquare, Sparkles, LogOut, Menu
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const userData = {
    name: user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    age: 32,
    goal: 'Weight Loss',
    calorieGoal: 1800,
    caloriesConsumed: 0,
    waterIntake: 0,
    mealsLogged: 0
  };

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
              <Link href="/dashboard" className="text-emerald-400 font-medium">
                Dashboard
              </Link>
              <Link href="/explore" className="text-gray-300 hover:text-emerald-400 transition">
                Explore Meals
              </Link>
              <Link href="/meal-plans" className="text-gray-300 hover:text-emerald-400 transition">
                My Meal Plans
              </Link>
              <Link href="/pantry" className="text-gray-300 hover:text-emerald-400 transition">
                Pantry Tracker
              </Link>
              <Link href="/explainer" className="text-gray-300 hover:text-emerald-400 transition">
                AI Explainer
              </Link>
              <Link href="/news" className="text-gray-300 hover:text-emerald-400 transition">
                NutriNews
              </Link>
              <div className="flex items-center space-x-2">
                <Link href="/account" className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center hover:bg-emerald-700 transition cursor-pointer">
                  <User className="h-6 w-6 text-white" />
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white" title="Logout">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Personalized Nutrition Guidance
          </h1>
          <p className="text-gray-400">
            Optimize your diet with AI-powered insights. Your health and nutrition goals are within reach.
          </p>
        </div>

        {/* User Profile Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                <p className="text-emerald-200">{userData.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                    Age: {userData.age}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                    Goal: {userData.goal}
                  </span>
                </div>
              </div>
            </div>
            <Link href="/explainer" className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition">
              Ask NutriCare AI
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Today's Progress</h3>
            <p className="text-3xl font-bold text-white mb-1">{userData.mealsLogged}</p>
            <p className="text-emerald-400 text-sm">Meals Logged</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Calories Consumed</h3>
            <p className="text-3xl font-bold text-white mb-1">
              {userData.caloriesConsumed}
              <span className="text-lg text-gray-400">/{userData.calorieGoal}</span>
            </p>
            <p className="text-gray-400 text-sm">N/A remaining</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Meal Plan Status</h3>
            <p className="text-3xl font-bold text-white mb-1">N/A</p>
            <p className="text-gray-400 text-sm">No plan set</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-teal-600/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Health Score</h3>
            <p className="text-3xl font-bold text-white mb-1">--</p>
            <p className="text-teal-400 text-sm">Start tracking</p>
          </div>
        </div>

        {/* Recommended Meals */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Today's Recommended Meals</h2>
            <Link 
              href="/explore"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              View All →
            </Link>
          </div>
          
          <p className="text-gray-400 mb-4">
            Here are personalized meal suggestions for you based on your health goals and dietary preferences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Dal Tadka', calories: 190, protein: 12, type: 'Breakfast', price: 850 },
              { name: 'Palak Paneer', calories: 265, protein: 15, type: 'Lunch', price: 1254 },
              { name: 'Idli Sambar', calories: 180, protein: 6, type: 'Dinner', price: 625 }
            ].map((meal, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
                <div className="h-32 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                  <Utensils className="h-12 w-12 text-white opacity-50" />
                </div>
                <h3 className="text-white font-bold mb-2">{meal.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>{meal.calories} cal</span>
                  <span>{meal.protein}g protein</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-semibold">₹{meal.price}</span>
                  <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/explainer"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-medium flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Chat with NutriCare AI</span>
              </Link>
              <Link href="/log-meal" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center">
                Log Today's Meal
              </Link>
              <Link href="/meal-plan" className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center">
                Generate Meal Plan
              </Link>
              <Link href="/meal-plans" className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium flex items-center justify-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>View My Meal Plans</span>
              </Link>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Health Tips</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400 mt-2"></div>
                <p className="text-gray-300">
                  Start your day with a glass of warm water to boost metabolism
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-400 mt-2"></div>
                <p className="text-gray-300">
                  Include at least 5 servings of vegetables in your daily diet
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-purple-400 mt-2"></div>
                <p className="text-gray-300">
                  Combine protein with complex carbs for sustained energy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Chat Button */}
      <Link
        href="/explainer"
        className="fixed bottom-8 right-8 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 transition z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </Link>
    </div>
  );
}
