'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Book, HelpCircle, Utensils, Brain, Sparkles } from 'lucide-react';
import { nutriCareAI } from '@/lib/ai-agents';

export default function ExplainerPage() {
  const [topic, setTopic] = useState('What are complex carbs?');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const explain = async () => {
    setLoading(true);
    try {
      const res = await nutriCareAI.getAgents().educationAgent.explainConcept(topic);
      setAnswer(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold text-white">Indian<span className="text-emerald-500">NutriCare</span></span>
          </Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-emerald-400">Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Brain className="h-10 w-10 text-emerald-500" />
            <h1 className="text-4xl font-bold text-white">AI Explainer</h1>
          </div>
          <p className="text-gray-400">Learn nutrition concepts in simple terms with Indian food examples.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl mb-8">
          <label className="block text-gray-300 mb-2">Ask a nutrition question</label>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g., What is a balanced Indian meal?"
            />
            <button
              onClick={explain}
              disabled={loading}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold"
            >
              {loading ? 'Explaining...' : 'Explain'}
            </button>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <Book className="h-6 w-6 text-emerald-400" />
            <h2 className="text-white font-semibold">Answer</h2>
          </div>
          {answer ? (
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-gray-200">{answer}</pre>
            </div>
          ) : (
            <p className="text-gray-400">Your answer will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
