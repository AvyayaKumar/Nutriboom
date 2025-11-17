import Link from 'next/link';
import { Utensils, Brain, Activity, TrendingUp, Sparkles, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Utensils className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">
                Indian<span className="text-emerald-600">NutriCare</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Personalized Nutrition for{' '}
            <span className="text-emerald-600">Indian Cuisine</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-powered nutrition guidance tailored to your health needs. 
            Get personalized meal recommendations based on authentic Indian dishes, 
            your dietary preferences, and health goals.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/signup"
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition font-semibold text-lg shadow-lg"
            >
              Start Your Journey →
            </Link>
            <Link 
              href="/explore"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition font-semibold text-lg shadow-lg border-2 border-emerald-600"
            >
              Explore Meals
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose IndianNutriCare?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI-Powered Recommendations
            </h3>
            <p className="text-gray-600">
              Our multi-agent AI system analyzes your health data, dietary preferences, 
              and budget to provide personalized meal suggestions from authentic Indian cuisine.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Track Your Health Metrics
            </h3>
            <p className="text-gray-600">
              Monitor your nutritional intake, track calories, macros, and micronutrients 
              with easy-to-understand dashboards and insights.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Utensils className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Regional Indian Dishes
            </h3>
            <p className="text-gray-600">
              Explore dishes from North, South, East, and West India with complete 
              nutritional information and health benefits for each recipe.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Health Condition Support
            </h3>
            <p className="text-gray-600">
              Get dietary guidance tailored to specific health conditions like 
              diabetes, hypertension, digestive issues, and heart health.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI Nutrition Chatbot
            </h3>
            <p className="text-gray-600">
              Ask questions about nutrition, get recipe suggestions, and receive 
              personalized advice through our intelligent chatbot with voice support.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Meal Planning & Tracking
            </h3>
            <p className="text-gray-600">
              Plan your weekly meals, track your pantry, and get shopping lists 
              optimized for your nutritional goals and budget.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-white text-lg mb-4">
                "IndianNutriCare has completely transformed my approach to healthy eating. 
                The AI recommendations are spot-on and the regional dish variety is amazing!"
              </p>
              <div>
                <p className="text-white font-semibold">Priya Sharma</p>
                <p className="text-emerald-200">Health & Wellness Coach</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-white text-lg mb-4">
                "As someone managing diabetes, this app has been invaluable. The meal 
                suggestions are practical, delicious, and perfectly suited to my health needs."
              </p>
              <div>
                <p className="text-white font-semibold">Rajesh Kumar</p>
                <p className="text-emerald-200">Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Nutrition?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of Indians who are already on their journey to better health 
          with personalized nutrition guidance.
        </p>
        <Link 
          href="/signup"
          className="inline-block bg-emerald-600 text-white px-10 py-4 rounded-lg hover:bg-emerald-700 transition font-semibold text-lg shadow-lg"
        >
          Create Your Account →
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Utensils className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-bold">IndianNutriCare</span>
              </div>
              <p className="text-gray-400">
                AI-powered nutrition guidance for Indian cuisine
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Meal Recommendations</li>
                <li>Health Tracking</li>
                <li>AI Chatbot</li>
                <li>Meal Planner</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Nutrition News</li>
                <li>Recipe Library</li>
                <li>Health Articles</li>
                <li>FAQs</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IndianNutriCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
