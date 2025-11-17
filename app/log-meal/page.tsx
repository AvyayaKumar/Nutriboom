'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Utensils, ArrowLeft, Plus, Check } from 'lucide-react';
import dishes from '@/data/indian-dishes.json';

export default function LogMealPage() {
  const router = useRouter();
  const [selectedDish, setSelectedDish] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [portion, setPortion] = useState(1);
  const [loggedMeals, setLoggedMeals] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);

  const handleLogMeal = () => {
    const dish = dishes.find(d => d.id === selectedDish);
    if (!dish) return;

    const mealLog = {
      id: Date.now(),
      dish: dish.name,
      mealType,
      portion,
      calories: dish.calories * portion,
      protein: dish.protein * portion,
      carbs: dish.carbs * portion,
      fat: dish.fat * portion,
      timestamp: new Date().toLocaleTimeString()
    };

    setLoggedMeals([...loggedMeals, mealLog]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

    // Reset form
    setSelectedDish('');
    setPortion(1);
  };

  const totalCalories = loggedMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = loggedMeals.reduce((sum, meal) => sum + meal.protein, 0);

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
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Log Today's Meal</h1>
          <p className="text-gray-400">Track your meals and monitor your daily nutrition intake</p>
        </div>

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>Meal logged successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Log Meal Form */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Add Meal</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Meal Type</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Select Dish</label>
                <select
                  value={selectedDish}
                  onChange={(e) => setSelectedDish(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Choose a dish...</option>
                  {dishes.map((dish) => (
                    <option key={dish.id} value={dish.id}>
                      {dish.name} ({dish.calories} cal)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Portion Size</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setPortion(Math.max(0.5, portion - 0.5))}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                  >
                    -
                  </button>
                  <span className="text-white text-xl font-bold">{portion}x</span>
                  <button
                    onClick={() => setPortion(portion + 0.5)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {selectedDish && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Nutrition Info</h3>
                  {(() => {
                    const dish = dishes.find(d => d.id === selectedDish);
                    if (!dish) return null;
                    return (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-400">Calories:</span>
                          <span className="text-white ml-2 font-semibold">{dish.calories * portion}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Protein:</span>
                          <span className="text-white ml-2 font-semibold">{dish.protein * portion}g</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Carbs:</span>
                          <span className="text-white ml-2 font-semibold">{dish.carbs * portion}g</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Fat:</span>
                          <span className="text-white ml-2 font-semibold">{dish.fat * portion}g</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              <button
                onClick={handleLogMeal}
                disabled={!selectedDish}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-5 w-5" />
                <span>Log Meal</span>
              </button>
            </div>
          </div>

          {/* Today's Meals */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Today's Meals</h2>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Total Calories</p>
                <p className="text-3xl font-bold text-white">{Math.round(totalCalories)}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Total Protein</p>
                <p className="text-3xl font-bold text-emerald-400">{Math.round(totalProtein)}g</p>
              </div>
            </div>

            {/* Meal List */}
            <div className="space-y-3">
              {loggedMeals.length === 0 ? (
                <div className="text-center py-8">
                  <Utensils className="h-12 w-12 text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-400">No meals logged yet</p>
                  <p className="text-gray-500 text-sm">Start by logging your first meal!</p>
                </div>
              ) : (
                loggedMeals.map((meal) => (
                  <div key={meal.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{meal.dish}</h4>
                        <p className="text-emerald-400 text-sm capitalize">{meal.mealType}</p>
                      </div>
                      <span className="text-gray-400 text-sm">{meal.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{meal.calories} cal</span>
                      <span>•</span>
                      <span>{meal.protein}g protein</span>
                      <span>•</span>
                      <span>{meal.portion}x portion</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
