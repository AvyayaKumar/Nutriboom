'use client';

import Link from 'next/link';
import { Newspaper, Clock, User, TrendingUp, Heart, Utensils, LayoutDashboard, Tag } from 'lucide-react';
import { useState } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: '1',
    title: 'The Complete Guide to Indian Superfoods for Better Health',
    excerpt: 'Discover the power of traditional Indian ingredients like turmeric, amla, and moringa that have been used for centuries in Ayurvedic medicine.',
    content: 'Full article content here...',
    category: 'Nutrition Science',
    author: 'Dr. Priya Sharma',
    date: 'Jan 18, 2025',
    readTime: '5 min read',
    image: '/images/superfoods.jpg',
    tags: ['Superfoods', 'Ayurveda', 'Traditional Medicine']
  },
  {
    id: '2',
    title: 'Managing Diabetes with Traditional Indian Diet',
    excerpt: 'Learn how to control blood sugar levels while enjoying authentic Indian cuisine. Practical tips for diabetics from leading nutritionists.',
    content: 'Full article content here...',
    category: 'Health Conditions',
    author: 'Dr. Rajesh Kumar',
    date: 'Jan 16, 2025',
    readTime: '7 min read',
    image: '/images/diabetes.jpg',
    tags: ['Diabetes', 'Blood Sugar', 'Health Management']
  },
  {
    id: '3',
    title: 'South Indian Breakfast: The Healthiest Start to Your Day',
    excerpt: 'Why idli, dosa, and upma are considered some of the healthiest breakfast options in the world, backed by nutritional science.',
    content: 'Full article content here...',
    category: 'Regional Cuisine',
    author: 'Chef Meera Nair',
    date: 'Jan 15, 2025',
    readTime: '4 min read',
    image: '/images/south-indian-breakfast.jpg',
    tags: ['South India', 'Breakfast', 'Fermented Foods']
  },
  {
    id: '4',
    title: 'The Truth About Ghee: Debunking Common Myths',
    excerpt: 'Is ghee really bad for your heart? We separate fact from fiction about this traditional Indian cooking fat.',
    content: 'Full article content here...',
    category: 'Nutrition Myths',
    author: 'Dr. Amit Patel',
    date: 'Jan 14, 2025',
    readTime: '6 min read',
    image: '/images/ghee.jpg',
    tags: ['Ghee', 'Myths', 'Heart Health']
  },
  {
    id: '5',
    title: 'Plant-Based Protein Sources in Indian Cuisine',
    excerpt: 'Complete guide to getting adequate protein from vegetarian Indian dishes. Perfect for vegetarians and vegans.',
    content: 'Full article content here...',
    category: 'Vegetarian Nutrition',
    author: 'Nutritionist Kavita Singh',
    date: 'Jan 12, 2025',
    readTime: '8 min read',
    image: '/images/plant-protein.jpg',
    tags: ['Protein', 'Vegetarian', 'Plant-Based']
  },
  {
    id: '6',
    title: 'Spices That Boost Your Metabolism Naturally',
    excerpt: 'How everyday Indian spices like cinnamon, black pepper, and ginger can help with weight management.',
    content: 'Full article content here...',
    category: 'Weight Management',
    author: 'Dr. Sneha Verma',
    date: 'Jan 10, 2025',
    readTime: '5 min read',
    image: '/images/spices.jpg',
    tags: ['Spices', 'Metabolism', 'Weight Loss']
  }
];

const categories = ['All', 'Nutrition Science', 'Health Conditions', 'Regional Cuisine', 'Nutrition Myths', 'Vegetarian Nutrition', 'Weight Management'];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
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
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
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

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Newspaper className="h-10 w-10 text-white" />
            <h1 className="text-5xl font-bold text-white">NutriNews</h1>
          </div>
          <p className="text-xl text-emerald-100 mb-6">
            Latest insights on Indian nutrition, health, and wellness
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search articles, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-white text-lg font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-white text-2xl font-bold mb-6 flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
              <span>Featured Article</span>
            </h2>
            <div className="bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition group">
              <div className="md:flex">
                <div className="md:w-1/2 h-80 bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center">
                  <Newspaper className="h-32 w-32 text-white opacity-50 group-hover:opacity-100 transition" />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 text-sm rounded-full">
                      {filteredArticles[0].category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {filteredArticles[0].readTime}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {filteredArticles[0].title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    {filteredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <User className="h-5 w-5" />
                      <span>{filteredArticles[0].author}</span>
                      <span>•</span>
                      <span>{filteredArticles[0].date}</span>
                    </div>
                    <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map(article => (
              <div key={article.id} className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition group">
                <div className="h-48 bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center">
                  <Newspaper className="h-16 w-16 text-white opacity-50 group-hover:opacity-100 transition" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 text-xs rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map(tag => (
                      <span key={tag} className="flex items-center space-x-1 text-xs text-gray-500">
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <button className="text-emerald-400 hover:text-emerald-300 font-medium text-sm">
                      Read →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <Newspaper className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No articles found matching your search.</p>
            <p className="text-gray-500 mt-2">Try a different search term or category.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-center">
          <Heart className="h-12 w-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to NutriNews
          </h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Get the latest nutrition insights, healthy recipes, and wellness tips delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
