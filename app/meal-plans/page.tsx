'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Utensils, ArrowLeft, Calendar, Trash2, Edit, Check,
  Plus, X, Save, Eye, Star
} from 'lucide-react';

interface MealPlan {
  id: string;
  name: string;
  generatedDate: string;
  days: string;
  goal: string;
  calorieTarget: string;
  plan: string;
  isActive: boolean;
}

export default function MealPlansPage() {
  const router = useRouter();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<MealPlan | null>(null);
  const [viewingPlan, setViewingPlan] = useState<MealPlan | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    loadMealPlans();
  }, []);

  const loadMealPlans = () => {
    const stored = localStorage.getItem('mealPlans');
    if (stored) {
      try {
        setMealPlans(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading meal plans:', e);
        // Try migrating old format
        migrateOldPlan();
      }
    } else {
      // Try migrating old format
      migrateOldPlan();
    }
  };

  const migrateOldPlan = () => {
    const oldPlan = localStorage.getItem('savedMealPlan');
    if (oldPlan) {
      try {
        const parsed = JSON.parse(oldPlan);
        const migrated: MealPlan = {
          id: Date.now().toString(),
          name: `${parsed.goal} Plan`,
          generatedDate: parsed.generatedDate || new Date().toLocaleDateString(),
          days: parsed.days,
          goal: parsed.goal,
          calorieTarget: parsed.calorieTarget,
          plan: parsed.plan,
          isActive: true
        };
        const plans = [migrated];
        localStorage.setItem('mealPlans', JSON.stringify(plans));
        setMealPlans(plans);
        localStorage.removeItem('savedMealPlan');
      } catch (e) {
        console.error('Error migrating:', e);
      }
    }
  };

  const saveMealPlans = (plans: MealPlan[]) => {
    localStorage.setItem('mealPlans', JSON.stringify(plans));
    setMealPlans(plans);
  };

  const deletePlan = (id: string) => {
    const updated = mealPlans.filter(p => p.id !== id);
    saveMealPlans(updated);
  };

  const setActivePlan = (id: string) => {
    const updated = mealPlans.map(p => ({
      ...p,
      isActive: p.id === id
    }));
    saveMealPlans(updated);
  };

  const startEditing = (plan: MealPlan) => {
    setEditingPlan(plan);
    setEditedContent(plan.plan);
    setEditedName(plan.name);
    setViewingPlan(null);
  };

  const saveEdit = () => {
    if (!editingPlan) return;

    const updated = mealPlans.map(p =>
      p.id === editingPlan.id
        ? { ...p, plan: editedContent, name: editedName }
        : p
    );
    saveMealPlans(updated);
    setEditingPlan(null);
  };

  const cancelEdit = () => {
    setEditingPlan(null);
    setEditedContent('');
    setEditedName('');
  };

  const activePlan = mealPlans.find(p => p.isActive);

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
              <Link href="/meal-plan" className="text-emerald-400 font-medium">
                Generate New Plan
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="h-10 w-10 text-purple-500" />
                <h1 className="text-4xl font-bold text-white">My Meal Plans</h1>
              </div>
              <p className="text-gray-400">View, edit, and manage all your saved meal plans</p>
            </div>
            <Link
              href="/meal-plan"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Plan</span>
            </Link>
          </div>
        </div>

        {activePlan && (
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">Active Plan: {activePlan.name}</h3>
                  <p className="text-emerald-200">
                    {activePlan.days}-day plan • {activePlan.calorieTarget} cal/day • {activePlan.goal}
                  </p>
                  <p className="text-emerald-100 text-sm mt-1">
                    Generated on {activePlan.generatedDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingPlan(activePlan)}
                className="bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition font-semibold flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View</span>
              </button>
            </div>
          </div>
        )}

        {/* Meal Plans Grid */}
        {mealPlans.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-16 text-center">
            <Calendar className="h-20 w-20 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Meal Plans Yet</h3>
            <p className="text-gray-400 mb-6">
              Create your first AI-generated meal plan to get started
            </p>
            <Link
              href="/meal-plan"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              <Plus className="h-5 w-5" />
              <span>Create Meal Plan</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-gray-900 rounded-xl p-6 border-2 transition ${
                  plan.isActive
                    ? 'border-emerald-500'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      {plan.isActive && (
                        <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded-full flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>Active</span>
                        </span>
                      )}
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">
                        {plan.days} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Goal:</span>
                    <span className="text-white capitalize">{plan.goal.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Calories:</span>
                    <span className="text-white">{plan.calorieTarget} cal/day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{plan.generatedDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewingPlan(plan)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center space-x-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => startEditing(plan)}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  {!plan.isActive && (
                    <button
                      onClick={() => setActivePlan(plan.id)}
                      className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition"
                      title="Set as active"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm('Delete this meal plan?')) {
                        deletePlan(plan.id);
                      }
                    }}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
                    title="Delete plan"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewingPlan && !editingPlan && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{viewingPlan.name}</h2>
                <p className="text-gray-400 text-sm">
                  {viewingPlan.days}-day plan • {viewingPlan.calorieTarget} cal/day
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setViewingPlan(null);
                    startEditing(viewingPlan);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setViewingPlan(null)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                  {viewingPlan.plan}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingPlan && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-2xl font-bold text-white bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-purple-500"
                  placeholder="Plan name"
                />
                <p className="text-gray-400 text-sm mt-1">
                  {editingPlan.days}-day plan • {editingPlan.calorieTarget} cal/day
                </p>
              </div>
              <button
                onClick={cancelEdit}
                className="text-gray-400 hover:text-white p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-full min-h-[500px] bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-200 font-mono text-sm focus:outline-none focus:border-purple-500 resize-none"
                placeholder="Edit your meal plan..."
              />
            </div>
            <div className="p-6 border-t border-gray-800 flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Make changes to your meal plan content
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={cancelEdit}
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
