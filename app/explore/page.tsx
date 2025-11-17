'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Utensils, Search, Filter, LayoutDashboard, Flame, Beef } from 'lucide-react';
import indianDishes from '@/data/indian-dishes.json';

type Dish = typeof indianDishes[0];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);

  const categories = ['All', ...Array.from(new Set(indianDishes.map(d => d.category)))];
  const regions = ['All', ...Array.from(new Set(indianDishes.map(d => d.region)))];

  const filteredDishes = indianDishes.filter((dish: Dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dish.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All' || dish.region === selectedRegion;
    const matchesVegetarian = !vegetarianOnly || dish.vegetarian;
    
    return matchesSearch && matchesCategory && matchesRegion && matchesVegetarian;
  });

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Utensils className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">
                Indian<span className="text-emerald-500">NutriCare</span>
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link 
                href="/login" 
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Explore Indian Dishes
          </h1>
          <p className="text-gray-400">
            Discover nutritional information for authentic Indian cuisine
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes or ingredients..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vegetarianOnly}
                  onChange={(e) => setVegetarianOnly(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-gray-300">Vegetarian Only</span>
              </label>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedRegion('All');
                  setVegetarianOnly(false);
                }}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-400">
            Showing {filteredDishes.length} of {indianDishes.length} dishes
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish: Dish) => (
            <div key={dish.id} className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition group">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center">
                <Utensils className="h-16 w-16 text-white opacity-50 group-hover:opacity-100 transition" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white">{dish.name}</h3>
                  <span className="text-emerald-400 font-semibold">₹{dish.price}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded-full">
                    {dish.category}
                  </span>
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                    {dish.region}
                  </span>
                  {dish.vegetarian && (
                    <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">
                      Veg
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Flame className="h-4 w-4 text-orange-400 mr-1" />
                      <span className="text-white font-semibold text-sm">{dish.calories}</span>
                    </div>
                    <span className="text-gray-500 text-xs">Calories</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Beef className="h-4 w-4 text-red-400 mr-1" />
                      <span className="text-white font-semibold text-sm">{dish.protein}g</span>
                    </div>
                    <span className="text-gray-500 text-xs">Protein</span>
                  </div>
                  <div className="text-center">
                    <span className="text-white font-semibold text-sm block mb-1">{dish.carbs}g</span>
                    <span className="text-gray-500 text-xs">Carbs</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {dish.healthBenefits}
                </p>

                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No dishes found matching your filters.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
