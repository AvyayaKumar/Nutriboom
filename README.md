# IndianNutriCare 🥘

An innovative, multi-agent, AI-powered nutrition advisory system designed for Indian cuisine. This platform provides personalized dietary guidance tailored to individual health needs, cultural preferences, and regional variations in Indian cooking.

![IndianNutriCare](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Firebase](https://img.shields.io/badge/Firebase-Latest-orange) ![AI](https://img.shields.io/badge/AI-Gemini-green)

## 🌟 Overview

IndianNutriCare addresses the unique dietary needs and health challenges faced by Indians through cutting-edge AI technologies including:
- Google Gemini AI for intelligent recommendations
- Multi-agent system architecture
- Real-time nutritional analysis
- Personalized meal planning

## ✨ Features

### 🧠 AI-Powered Recommendations
- Multi-agent AI system analyzes health data, dietary preferences, and budget
- Personalized meal suggestions from authentic Indian cuisine
- Real-time nutritional guidance

### 📊 Health Tracking
- Monitor nutritional intake and calories
- Track macros and micronutrients  
- Easy-to-understand dashboards and insights
- Health metrics visualization

### 🍛 Regional Indian Dishes
- Comprehensive database of dishes from all regions:
  - North India (Dal Tadka, Chole Bhature, Butter Chicken)
  - South India (Idli Sambar, Masala Dosa)
  - East India (Bengali Fish Curry)
  - West India (Dhokla)
- Complete nutritional information for each dish
- Health benefits and ingredient breakdowns

### 💊 Health Condition Support
- Dietary guidance for specific conditions:
  - Type 2 Diabetes
  - Hypertension
  - Cardiovascular disease
  - Digestive issues
  - Weight management

### 🤖 AI Nutrition Chatbot
- Ask questions about nutrition
- Get recipe suggestions
- Receive personalized advice
- Voice input support (planned)

### 📅 Meal Planning & Tracking
- Weekly meal planning
- Pantry tracking (planned)
- Shopping list generation (planned)
- Budget optimization

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations

### Backend & Services
- **Firebase Authentication** - User management
- **Firestore Database** - Real-time data storage
- **Firebase Cloud Functions** - Serverless backend
- **Firebase Cloud Storage** - Media storage

### AI & Machine Learning
- **Google Gemini AI** - Advanced language model
- **LangChain** - Multi-agent orchestration
- **@langchain/google-genai** - Gemini integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Firebase account
- Google Gemini API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. Configure your `.env.local` file with your credentials:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
indian-nutricare/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/page.tsx        # Login page
│   ├── signup/page.tsx       # Signup page
│   ├── dashboard/page.tsx    # User dashboard
│   ├── explore/page.tsx      # Meal exploration
│   └── layout.tsx            # Root layout
├── data/
│   └── indian-dishes.json    # Indian dishes database
├── lib/
│   └── firebase.ts           # Firebase configuration
├── components/               # Reusable components
├── public/                   # Static assets
└── styles/                   # Global styles
```

## 🍽️ Indian Dishes Database

The app includes a comprehensive database of 12+ Indian dishes with:
- Nutritional information (calories, protein, carbs, fat, fiber)
- Ingredients and serving sizes
- Regional classifications
- Dietary tags (vegetarian, vegan, gluten-free)
- Health benefits
- Preparation time and difficulty
- Pricing in INR

### Sample Dishes
- **Dal Tadka** - 190 cal, 12g protein, North India
- **Chicken Tikka Masala** - 380 cal, 28g protein, North India
- **Palak Paneer** - 265 cal, 15g protein, North India
- **Idli Sambar** - 180 cal, 6g protein, South India
- **Masala Dosa** - 320 cal, 8g protein, South India
- And more...

## 🎯 Key Pages

### 1. Landing Page (`/`)
- Hero section with value proposition
- Feature showcase
- User testimonials
- Call-to-action

### 2. Authentication Pages
- **Login** (`/login`) - Email/password and Google authentication
- **Signup** (`/signup`) - New user registration

### 3. Explore Page (`/explore`)
- Browse all Indian dishes
- Filter by category, region, and dietary preferences
- Search by ingredients
- View nutritional information

### 4. Dashboard (`/dashboard`)
- Personalized nutrition dashboard
- Health metrics tracking
- Daily meal recommendations
- Quick actions and AI chatbot
- Progress visualization

## 🤖 AI Features (Planned)

### Multi-Agent System
- **Nutrition Expert Agent** - Provides evidence-based dietary guidance
- **Meal Recommendation Agent** - Suggests dishes based on preferences
- **Health Monitoring Agent** - Tracks progress and flags concerns
- **Recipe Agent** - Provides cooking instructions and alternatives

### Voice Support
- Speech-to-text for voice queries
- Text-to-speech for responses
- Hands-free interaction while cooking

## 🔮 Roadmap

- [ ] Complete Firebase authentication integration
- [ ] Implement AI chatbot with Gemini
- [ ] Add voice input/output support
- [ ] Create pantry tracker feature
- [ ] Build meal planner with calendar
- [ ] Add recipe recognition from images
- [ ] Integrate Google Maps for restaurant recommendations
- [ ] Create nutrition news/blog section
- [ ] Add social features (meal sharing)
- [ ] Mobile app (React Native)

## 🛠️ Development

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

## 🎨 Design Philosophy

- **Cultural Sensitivity** - Respects Indian dietary traditions and regional variations
- **Accessibility** - Designed for users of all technical abilities
- **Evidence-Based** - Recommendations grounded in nutritional science
- **Privacy-First** - User data stays secure and private
- **Mobile-Responsive** - Works seamlessly on all devices

## 📊 Color Palette

- **Primary** - Emerald Green (#10b981) - Represents health and vitality
- **Secondary** - Blue (#3b82f6) - Trust and reliability
- **Accent** - Purple (#8b5cf6) - Innovation and AI
- **Dark** - Gray-900/950 - Modern, sleek interface
- **Success** - Green (#22c55e)
- **Warning** - Orange (#f59e0b)
- **Error** - Red (#ef4444)

## 🤝 Contributing

Contributions are welcome! This project is designed to help improve nutrition and health outcomes for Indians.

## 📝 License

This project is open source and available for educational and personal use.

## 🙏 Acknowledgments

- Inspired by NutriCare Vietnam (GDGOC Hackathon Vietnam 2025)
- Adapted for Indian cuisine and dietary needs
- Built with modern web technologies and AI

---

**IndianNutriCare** - *Personalized Nutrition for Indian Cuisine* 🇮🇳
