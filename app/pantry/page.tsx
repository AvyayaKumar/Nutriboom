'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Package, Plus, Minus, ShoppingCart, Utensils, LayoutDashboard, AlertCircle, Check } from 'lucide-react';

interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
  lowStock: boolean;
}

export default function PantryPage() {
  const initialItems = [
    { id: '1', name: 'Basmati Rice', category: 'Grains', quantity: 2, unit: 'kg', lowStock: false },
    { id: '2', name: 'Toor Dal', category: 'Lentils', quantity: 0.5, unit: 'kg', lowStock: true },
    { id: '3', name: 'Turmeric Powder', category: 'Spices', quantity: 100, unit: 'g', lowStock: false },
    { id: '4', name: 'Garam Masala', category: 'Spices', quantity: 50, unit: 'g', lowStock: true },
    { id: '5', name: 'Ghee', category: 'Fats', quantity: 500, unit: 'ml', lowStock: false },
    { id: '6', name: 'Paneer', category: 'Dairy', quantity: 200, unit: 'g', expiryDate: '2025-01-25', lowStock: false },
    { id: '7', name: 'Tomatoes', category: 'Vegetables', quantity: 1, unit: 'kg', expiryDate: '2025-01-22', lowStock: false },
    { id: '8', name: 'Onions', category: 'Vegetables', quantity: 2, unit: 'kg', lowStock: false },
  ];

  const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialItems);

  // Load pantry from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('pantryItems');
    if (stored) {
      try {
        setPantryItems(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading pantry:', e);
      }
    }
  }, []);

  // Save to localStorage whenever pantry changes
  useEffect(() => {
    localStorage.setItem('pantryItems', JSON.stringify(pantryItems));
  }, [pantryItems]);

  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Grains',
    quantity: 0,
    unit: 'kg'
  });

  const categories = ['All', 'Grains', 'Lentils', 'Spices', 'Fats', 'Dairy', 'Vegetables', 'Other'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = pantryItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const lowStockItems = pantryItems.filter(item => item.lowStock);

  const addItem = () => {
    if (newItem.name && newItem.quantity > 0) {
      setPantryItems([...pantryItems, {
        id: Date.now().toString(),
        ...newItem,
        lowStock: false
      }]);
      setNewItem({ name: '', category: 'Grains', quantity: 0, unit: 'kg' });
      setShowAddItem(false);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setPantryItems(pantryItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
  };

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
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-emerald-400 transition">
                Dashboard
              </Link>
              <Link href="/explore" className="text-gray-300 hover:text-emerald-400 transition">
                Explore
              </Link>
              <Link href="/news" className="text-gray-300 hover:text-emerald-400 transition">
                News
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Package className="h-10 w-10 text-white" />
                <h1 className="text-4xl font-bold text-white">Pantry Tracker</h1>
              </div>
              <p className="text-purple-100">
                Manage your Indian ingredients and never run out of essentials
              </p>
            </div>
            <button
              onClick={() => setShowAddItem(true)}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Item</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="bg-orange-600/20 border border-orange-600 rounded-xl p-4 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-orange-400 font-semibold mb-2">Low Stock Alert</h3>
                <p className="text-orange-300 text-sm mb-2">
                  {lowStockItems.length} item(s) running low:
                </p>
                <div className="flex flex-wrap gap-2">
                  {lowStockItems.map(item => (
                    <span key={item.id} className="px-3 py-1 bg-orange-600/30 text-orange-200 text-sm rounded-full">
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="h-8 w-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">{pantryItems.length}</span>
            </div>
            <p className="text-gray-400">Total Items</p>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="h-8 w-8 text-orange-400" />
              <span className="text-3xl font-bold text-white">{lowStockItems.length}</span>
            </div>
            <p className="text-gray-400">Low Stock</p>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Check className="h-8 w-8 text-emerald-400" />
              <span className="text-3xl font-bold text-white">{categories.length - 1}</span>
            </div>
            <p className="text-gray-400">Categories</p>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="h-8 w-8 text-blue-400" />
              <span className="text-3xl font-bold text-white">{lowStockItems.length}</span>
            </div>
            <p className="text-gray-400">Shopping List</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Pantry Items */}
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Pantry</h2>
            
            <div className="space-y-4">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-white font-semibold">{item.name}</h3>
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">
                        {item.category}
                      </span>
                      {item.lowStock && (
                        <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>Low</span>
                        </span>
                      )}
                    </div>
                    {item.expiryDate && (
                      <p className="text-gray-400 text-sm">Expires: {item.expiryDate}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 bg-gray-700 rounded-lg px-4 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, -0.1)}
                        className="text-gray-400 hover:text-white transition"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-white font-semibold min-w-[80px] text-center">
                        {item.quantity} {item.unit}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 0.1)}
                        className="text-gray-400 hover:text-white transition"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shopping List */}
        {lowStockItems.length > 0 && (
          <div className="mt-8 bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6 text-blue-400" />
                <span>Shopping List</span>
              </h2>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                Export List
              </button>
            </div>
            
            <div className="space-y-3">
              {lowStockItems.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 rounded border-2 border-gray-600" />
                    <span className="text-white">{item.name}</span>
                  </div>
                  <span className="text-gray-400">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Add Pantry Item</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., Basmati Rice"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Unit</label>
                  <select
                    value={newItem.unit}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="l">l</option>
                    <option value="ml">ml</option>
                    <option value="pcs">pcs</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddItem(false)}
                className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-medium"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
