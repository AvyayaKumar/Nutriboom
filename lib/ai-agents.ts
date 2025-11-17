// Multi-Agent AI System for Indian NutriCare
// NOTE: Requires NEXT_PUBLIC_GEMINI_API_KEY to be set in .env.local for full functionality

import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

function getGeminiModel() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_GEMINI_API_KEY not set. AI features will be limited.');
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
}

function getLangChainModel() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GEMINI_API_KEY not set');
  }
  return new ChatGoogleGenerativeAI({
    apiKey,
    model: 'gemini-2.0-flash',
    temperature: 0.7,
  });
}

// Agent 1: Nutrition Expert Agent
export class NutritionExpertAgent {
  private systemPrompt = `You are a certified nutritionist specializing in Indian cuisine. 
  You provide evidence-based dietary guidance tailored to Indian dietary patterns.
  Consider regional variations, traditional cooking methods, and common health conditions in India.
  Always provide practical, culturally-appropriate advice.`;

  async analyze(query: string, userProfile?: any) {
    const model = getGeminiModel();
    if (!model) return 'AI features require API key to be configured.';
    
    const context = userProfile 
      ? `User Profile: Age ${userProfile.age}, Goal: ${userProfile.goal}, Health Conditions: ${userProfile.conditions || 'None'}`
      : '';
    
    const prompt = `${this.systemPrompt}\n\n${context}\n\nQuery: ${query}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async analyzeMeal(dishName: string, nutritionalInfo: any) {
    const model = getGeminiModel();
    if (!model) return 'AI features require API key to be configured.';
    
    const prompt = `${this.systemPrompt}\n\nAnalyze this Indian dish: ${dishName}
    Nutritional Info: ${JSON.stringify(nutritionalInfo)}
    
    Provide:
    1. Health benefits
    2. Potential concerns
    3. Who should/shouldn't eat this
    4. Serving size recommendations`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}

// Agent 2: Meal Recommendation Agent
export class MealRecommendationAgent {
  private chain: any;

  private getChain() {
    if (!this.chain) {
      const prompt = ChatPromptTemplate.fromMessages([
        ['system', `You are an AI meal planner specializing in Indian cuisine.
        You recommend dishes based on user preferences, health goals, dietary restrictions, and budget.
        Consider macronutrient balance, meal timing, and traditional Indian eating patterns.
        Always suggest authentic Indian dishes with regional variety.`],
        ['user', '{input}'],
      ]);

      const model = getLangChainModel();
      this.chain = prompt.pipe(model).pipe(new StringOutputParser());
    }
    return this.chain;
  }

  async recommendMeals(userProfile: any, dishes: any[]) {
    const input = `User Profile:
    - Goal: ${userProfile.goal}
    - Calorie Target: ${userProfile.calorieGoal}
    - Dietary Preference: ${userProfile.dietaryPreference || 'No preference'}
    - Budget: ${userProfile.budget || 'Moderate'}
    - Health Conditions: ${userProfile.conditions || 'None'}

    Available Dishes: ${dishes.map(d => `${d.name} (${d.calories} cal, ₹${d.price})`).join(', ')}

    Recommend a balanced daily meal plan (breakfast, lunch, dinner) with variety and nutritional balance.`;

    return await this.getChain().invoke({ input });
  }

  async suggestAlternatives(dishName: string, reason: string) {
    const input = `The user wants an alternative to ${dishName} because: ${reason}
    Suggest 3 similar Indian dishes that address their concern while maintaining similar taste profile or regional origin.`;

    return await this.getChain().invoke({ input });
  }
}

// Agent 3: Health Monitoring Agent
export class HealthMonitoringAgent {
  private chain: any;

  private getChain() {
    if (!this.chain) {
      const prompt = ChatPromptTemplate.fromMessages([
        ['system', `You are a health monitoring AI assistant focused on Indian dietary patterns.
        You track nutritional intake, identify deficiencies, and flag potential health concerns.
        You understand common health conditions in India like diabetes, hypertension, and PCOS.
        Provide actionable insights and early warnings based on dietary data.`],
        ['user', '{input}'],
      ]);

      const model = getLangChainModel();
      this.chain = prompt.pipe(model).pipe(new StringOutputParser());
    }
    return this.chain;
  }

  async analyzeProgress(userStats: any) {
    const input = `Analyze this user's nutritional progress:

    Daily Stats:
    - Calories Consumed: ${userStats.caloriesConsumed}/${userStats.calorieGoal}
    - Protein: ${userStats.protein}g
    - Carbs: ${userStats.carbs}g
    - Fat: ${userStats.fat}g
    - Fiber: ${userStats.fiber}g

    Recent Meals: ${userStats.recentMeals.join(', ')}
    Goal: ${userStats.goal}

    Provide:
    1. Progress assessment
    2. Nutritional gaps
    3. Recommendations for next meal
    4. Any health concerns`;

    return await this.getChain().invoke({ input });
  }

  async flagConcerns(mealLog: any[], healthConditions: string[]) {
    const input = `User has these health conditions: ${healthConditions.join(', ')}

    Recent meals consumed: ${mealLog.map(m => `${m.name} - ${m.calories} cal`).join(', ')}

    Are there any dietary concerns or conflicts with their health conditions?`;

    return await this.getChain().invoke({ input });
  }
}

// Agent 4: Recipe & Cooking Agent
export class RecipeAgent {
  private chain: any;

  private getChain() {
    if (!this.chain) {
      const prompt = ChatPromptTemplate.fromMessages([
        ['system', `You are an Indian cooking expert and recipe advisor.
        You provide detailed cooking instructions, ingredient substitutions, and cooking tips.
        You understand regional cooking techniques and can adapt recipes for different skill levels.
        You also suggest healthier cooking methods while maintaining authentic flavors.`],
        ['user', '{input}'],
      ]);

      const model = getLangChainModel();
      this.chain = prompt.pipe(model).pipe(new StringOutputParser());
    }
    return this.chain;
  }

  async getRecipe(dishName: string, servings: number = 2) {
    const input = `Provide a detailed recipe for ${dishName} (${servings} servings).
    Include:
    1. Ingredients with exact measurements
    2. Step-by-step cooking instructions
    3. Cooking time and difficulty
    4. Tips for better taste
    5. Healthier alternatives if applicable`;

    return await this.getChain().invoke({ input });
  }

  async suggestSubstitutions(ingredient: string, reason: string) {
    const input = `Suggest Indian pantry substitutes for ${ingredient} because: ${reason}
    Provide options that maintain authentic flavor and are commonly available in India.`;

    return await this.getChain().invoke({ input });
  }

  async modifyForHealthCondition(dishName: string, condition: string) {
    const input = `How can I modify ${dishName} to make it suitable for someone with ${condition}?
    Provide specific ingredient swaps and cooking method changes while maintaining authenticity.`;

    return await this.getChain().invoke({ input });
  }
}

// Agent 5: Nutrition Education Agent
export class NutritionEducationAgent {
  private chain: any;

  private getChain() {
    if (!this.chain) {
      const prompt = ChatPromptTemplate.fromMessages([
        ['system', `You are a nutrition educator specializing in Indian dietary concepts.
        You explain nutritional science in simple terms relevant to Indian food culture.
        You debunk common myths and provide evidence-based information.
        You make complex nutritional concepts easy to understand for everyday Indians.`],
        ['user', '{input}'],
      ]);

      const model = getLangChainModel();
      this.chain = prompt.pipe(model).pipe(new StringOutputParser());
    }
    return this.chain;
  }

  async explainConcept(concept: string) {
    const input = `Explain "${concept}" in the context of Indian cuisine and dietary patterns.
    Use simple language and Indian food examples.
    Include practical tips for application in daily life.`;

    return await this.getChain().invoke({ input });
  }

  async debunkMyth(myth: string) {
    const input = `Address this common Indian dietary myth: "${myth}"
    Provide scientific facts and practical guidance.`;

    return await this.getChain().invoke({ input });
  }
}

// Multi-Agent Coordinator
export class NutriCareAISystem {
  private nutritionExpert: NutritionExpertAgent;
  private mealRecommender: MealRecommendationAgent;
  private healthMonitor: HealthMonitoringAgent;
  private recipeAgent: RecipeAgent;
  private educationAgent: NutritionEducationAgent;

  constructor() {
    this.nutritionExpert = new NutritionExpertAgent();
    this.mealRecommender = new MealRecommendationAgent();
    this.healthMonitor = new HealthMonitoringAgent();
    this.recipeAgent = new RecipeAgent();
    this.educationAgent = new NutritionEducationAgent();
  }

  async processQuery(query: string, userProfile: any, context?: any) {
    // Determine which agent(s) to use based on query intent
    const lowerQuery = query.toLowerCase();

    // Recipe-related queries
    if (lowerQuery.includes('recipe') || lowerQuery.includes('how to cook') || lowerQuery.includes('how to make')) {
      return await this.recipeAgent.getRecipe(query, context?.servings || 2);
    }

    // Meal recommendation queries
    if (lowerQuery.includes('recommend') || lowerQuery.includes('suggest meal') || lowerQuery.includes('what should i eat')) {
      return await this.mealRecommender.recommendMeals(userProfile, context?.dishes || []);
    }

    // Health monitoring queries
    if (lowerQuery.includes('progress') || lowerQuery.includes('how am i doing') || lowerQuery.includes('check my')) {
      return await this.healthMonitor.analyzeProgress(userProfile.stats);
    }

    // Education queries
    if (lowerQuery.includes('what is') || lowerQuery.includes('explain') || lowerQuery.includes('tell me about')) {
      return await this.educationAgent.explainConcept(query);
    }

    // Default to nutrition expert
    return await this.nutritionExpert.analyze(query, userProfile);
  }

  // Get all agents for direct access
  getAgents() {
    return {
      nutritionExpert: this.nutritionExpert,
      mealRecommender: this.mealRecommender,
      healthMonitor: this.healthMonitor,
      recipeAgent: this.recipeAgent,
      educationAgent: this.educationAgent,
    };
  }
}

// Export singleton instance
export const nutriCareAI = new NutriCareAISystem();
