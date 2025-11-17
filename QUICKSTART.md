# Quick Start Guide - IndianNutriCare

## 🚀 Getting the App Running in 5 Minutes

### Step 1: Start the Development Server
```bash
cd /Users/avyayakumar/Desktop/indian-nutricare
npm run dev
```

### Step 2: Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 What You Can Do Right Now

### Without Any Configuration:
1. **Browse the Landing Page** - See all features and testimonials
2. **Explore Meals** - Click "Explore Meals" to browse 12 Indian dishes
3. **Filter Dishes** - Filter by category, region, or vegetarian options
4. **View Mock Dashboard** - Navigate to `/dashboard` to see the UI

### Pages Available:
- `/` - Beautiful landing page with all features
- `/explore` - Browse and filter Indian dishes
- `/login` - Login page (UI only - needs Firebase setup)
- `/signup` - Registration page (UI only - needs Firebase setup)
- `/dashboard` - User dashboard with health metrics

## 🔧 To Enable Full Functionality

### 1. Set Up Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Google)
4. Create a Firestore Database
5. Copy your configuration

### 2. Set Up Gemini AI
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Copy the key

### 3. Add Environment Variables
Create `.env.local` file:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Restart the Server
```bash
# Stop the server (Ctrl+C)
npm run dev
```

## 📦 What's Included

### ✅ Complete UI/UX
- Modern, responsive design
- Dark mode with emerald green accents
- Smooth animations and transitions
- Mobile-friendly layout

### ✅ Pages
- Landing page with hero, features, testimonials
- Authentication pages (login/signup)
- Meal exploration with search and filters
- User dashboard with health metrics
- AI chatbot modal (UI ready)

### ✅ Data
- 12 Indian dishes with full nutritional info
- Categories: Dal, Curry, Rice, Breakfast, Snacks, Sabzi, Street Food
- Regions: North, South, East, West India
- Dietary tags: Vegetarian, Vegan, Gluten-free

### ✅ Features (UI Ready)
- Health metrics tracking
- Meal recommendations
- Calorie counting
- Meal planning interface
- AI chatbot interface

## 🎨 Customization

### Change Colors
Edit `app/page.tsx`, `explore/page.tsx`, etc.
- Primary: `emerald-600` (green)
- Secondary: `blue-600`
- Accent: `purple-600`

### Add More Dishes
Edit `data/indian-dishes.json` and add more entries following the same structure.

### Modify Dashboard
Edit `app/dashboard/page.tsx` to customize:
- Health metrics
- Meal recommendations
- Quick actions

## 🐛 Troubleshooting

### Port 3000 Already in Use?
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors?
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### TypeScript Errors?
The app is fully typed and should compile without errors. If you see errors, make sure all dependencies are installed.

## 📚 Next Steps

1. **Set up Firebase** - Enable authentication and database
2. **Integrate Gemini AI** - Connect the chatbot to actual AI
3. **Add more dishes** - Expand the Indian dishes database
4. **Implement user profiles** - Store user preferences in Firestore
5. **Build meal planner** - Create weekly meal planning feature
6. **Add image recognition** - Use AI to identify dishes from photos

## 💡 Tips

- The app is fully responsive - test on mobile!
- All icons are from Lucide React
- Tailwind CSS classes are used throughout
- Firebase and AI integration are set up but need API keys
- The dishes database is in JSON format for easy editing

## 🎯 Demo Data

The app includes mock data for:
- User profile (Rajesh Kumar)
- Health metrics (calories, meals logged)
- 12 Indian dishes with full nutritional info
- Sample testimonials

## 📞 Need Help?

Check the main README.md for:
- Full feature list
- Detailed tech stack
- Architecture overview
- Roadmap

---

**Happy Coding!** 🇮🇳 Built with ❤️ for Indian nutrition and health.
