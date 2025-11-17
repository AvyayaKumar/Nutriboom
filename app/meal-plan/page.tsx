'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Utensils, ArrowLeft, Sparkles, Calendar, Loader, Check, Plus } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dishes from '@/data/indian-dishes.json';

interface SavedMealPlan {
  generatedDate: string;
  days: string;
  goal: string;
  calorieTarget: string;
  plan: string;
}

export default function MealPlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<string>('');
  const [savedMealPlan, setSavedMealPlan] = useState<SavedMealPlan | null>(null);
  const [pantryItems, setPantryItems] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    goal: 'weight-loss',
    calorieTarget: '1800',
    dietaryPreference: 'vegetarian',
    budget: 'moderate',
    days: '7'
  });

  useEffect(() => {
    // Load pantry items from localStorage
    const storedPantry = localStorage.getItem('pantryItems');
    if (storedPantry) {
      try {
        const pantry = JSON.parse(storedPantry);
        const itemNames = pantry.map((item: any) => item.name);
        setPantryItems(itemNames);
      } catch (e) {
        console.error('Error loading pantry:', e);
      }
    }

    // Load saved meal plan
    const savedPlan = localStorage.getItem('savedMealPlan');
    if (savedPlan) {
      try {
        setSavedMealPlan(JSON.parse(savedPlan));
      } catch (e) {
        console.error('Error loading saved plan:', e);
      }
    }
  }, []);

  const saveMealPlan = (plan: string) => {
    // Save to old format for backward compatibility
    const planToSave: SavedMealPlan = {
      generatedDate: new Date().toLocaleDateString(),
      days: formData.days,
      goal: formData.goal,
      calorieTarget: formData.calorieTarget,
      plan
    };
    setSavedMealPlan(planToSave);

    // Save to new multi-plan format
    const existingPlans = localStorage.getItem('mealPlans');
    const mealPlans = existingPlans ? JSON.parse(existingPlans) : [];

    // Create new plan with unique ID
    const newPlan = {
      id: Date.now().toString(),
      name: `${formData.goal.charAt(0).toUpperCase() + formData.goal.slice(1).replace('-', ' ')} Plan`,
      generatedDate: new Date().toLocaleDateString(),
      days: formData.days,
      goal: formData.goal,
      calorieTarget: formData.calorieTarget,
      plan,
      isActive: mealPlans.length === 0 // First plan is active by default
    };

    // Add new plan and save
    mealPlans.push(newPlan);
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
  };

  const generateMealPlan = async () => {
    setLoading(true);
    setMealPlan('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        setMealPlan('Error: Gemini API key not configured');
        setLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Filter dishes based on dietary preference
      const filteredDishes = formData.dietaryPreference === 'vegetarian'
        ? dishes.filter(d => d.vegetarian)
        : formData.dietaryPreference === 'vegan'
        ? dishes.filter(d => d.vegan)
        : dishes;

      const dishList = filteredDishes.map(d =>
        `${d.name} (${d.calories} cal, ₹${d.price}, ${d.region}, ${d.protein}g protein, Ingredients: ${d.ingredients.slice(0, 3).join(', ')})`
      ).join('\n');

      const pantryInfo = pantryItems.length > 0
        ? `\n\nUser's Pantry Items: ${pantryItems.join(', ')}\nPrioritize dishes that use these pantry items when possible.`
        : '';

      const prompt = `You are a nutrition expert specializing in Indian cuisine. Create a detailed ${formData.days}-day meal plan.

**User Requirements:**
- Goal: ${formData.goal}
- Daily Calorie Target: ${formData.calorieTarget} calories
- Dietary Preference: ${formData.dietaryPreference}
- Budget: ${formData.budget}${pantryInfo}

**Available Dishes (USE ONLY THESE):**
${dishList}

**Instructions:**
1. Create a ${formData.days}-day plan with breakfast, lunch, and dinner
2. Each day should total approximately ${formData.calorieTarget} calories (±100)
3. Use ONLY dishes from the available list above
4. Provide variety - don't repeat the same dish on consecutive days
5. Balance macronutrients appropriately for the goal
6. Consider the budget constraint
7. If pantry items are provided, try to use dishes containing those ingredients

**Format (IMPORTANT - Follow this EXACT format):**

**Day 1**
- **Breakfast:** [Exact Dish Name from list] - [Calories] cal
- **Lunch:** [Exact Dish Name from list] - [Calories] cal
- **Dinner:** [Exact Dish Name from list] - [Calories] cal
- **Total:** [Sum] cal

**Day 2**
[Same format...]

[Continue for all ${formData.days} days]

**Nutritional Tips:**
[2-3 specific tips based on the goal]

**Key Ingredients to Buy:**
[List main ingredients needed, highlighting items from user's pantry if applicable]`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedPlan = response.text();
      setMealPlan(generatedPlan);
      saveMealPlan(generatedPlan);
    } catch (error: any) {
      console.error('Error generating meal plan:', error);
      setMealPlan('Error generating meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logMealFromPlan = (mealName: string) => {
    // Store the meal to be logged
    localStorage.setItem('mealToLog', mealName);
    router.push('/log-meal');
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
              <Link href="/dashboard" className="text-gray-300 hover:text-emerald-400 transition">
                Dashboard
              </Link>
              <Link href="/meal-plans" className="text-gray-300 hover:text-emerald-400 transition">
                My Meal Plans
              </Link>
              <Link href="/pantry" className="text-gray-300 hover:text-emerald-400 transition">
                Pantry
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
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="h-10 w-10 text-purple-500" />
            <h1 className="text-4xl font-bold text-white">AI Meal Plan Generator</h1>
          </div>
          <p className="text-gray-400">
            Get a personalized meal plan using dishes from our database
            {pantryItems.length > 0 && ` and your pantry (${pantryItems.length} items tracked)`}
          </p>
        </div>

        {savedMealPlan && (
          <div className="bg-emerald-600/10 border border-emerald-600/30 rounded-xl p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-400 font-semibold">Active Meal Plan</p>
                  <p className="text-emerald-300 text-sm">
                    {savedMealPlan.days}-day plan for {savedMealPlan.goal} • Generated {savedMealPlan.generatedDate}
                  </p>
                </div>
              </div>
              <Link
                href="/meal-plans"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-medium whitespace-nowrap"
              >
                View All Plans
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-6">Preferences</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Health Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="diabetes">Diabetes Management</option>
                    <option value="heart-health">Heart Health</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Daily Calorie Target</label>
                  <input
                    type="number"
                    value={formData.calorieTarget}
                    onChange={(e) => setFormData({...formData, calorieTarget: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                    placeholder="1800"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Dietary Preference</label>
                  <select
                    value={formData.dietaryPreference}
                    onChange={(e) => setFormData({...formData, dietaryPreference: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="any">Any</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="low">Low Budget</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Plan Duration</label>
                  <select
                    value={formData.days}
                    onChange={(e) => setFormData({...formData, days: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="3">3 Days</option>
                    <option value="5">5 Days</option>
                    <option value="7">7 Days (1 Week)</option>
                  </select>
                </div>

                <button
                  onClick={generateMealPlan}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Plan</span>
                    </>
                  )}
                </button>

                {pantryItems.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                    <p className="text-blue-300 text-sm">
                      Using {pantryItems.length} items from your pantry
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Meal Plan Display */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 min-h-[600px]">
              {!mealPlan && !loading && !savedMealPlan && (
                <div className="text-center py-20">
                  <Calendar className="h-20 w-20 text-gray-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Meal Plan Yet</h3>
                  <p className="text-gray-400">
                    Set your preferences and click "Generate Plan" to get started
                  </p>
                </div>
              )}

              {!mealPlan && !loading && savedMealPlan && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Your Saved Meal Plan</h3>
                    <button
                      onClick={() => {
                        setMealPlan(savedMealPlan.plan);
                      }}
                      className="text-emerald-400 hover:text-emerald-300 text-sm"
                    >
                      View Full Plan
                    </button>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-400 mb-4">
                      Click "Generate Plan" to create a new plan or view your current plan above.
                    </p>
                  </div>
                </div>
              )}

              {loading && (
                <div className="text-center py-20">
                  <Loader className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-spin" />
                  <h3 className="text-xl font-semibold text-white mb-2">Creating Your Meal Plan...</h3>
                  <p className="text-gray-400">
                    Analyzing {dishes.length} dishes and {pantryItems.length > 0 ? 'your pantry items' : 'creating'} a personalized plan
                  </p>
                </div>
              )}

              {mealPlan && !loading && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Your Personalized Meal Plan</h3>
                    <Link
                      href="/log-meal"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Log Meal</span>
                    </Link>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                      {mealPlan}
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-emerald-600/10 border border-emerald-600/30 rounded-lg">
                    <p className="text-emerald-300 text-sm">
                      <Check className="h-4 w-4 inline mr-1" />
                      Meal plan saved! You can now log meals from this plan in the Log Meal page.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
