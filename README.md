# IndianNutriCare

A Next.js and TypeScript nutrition-planning application centered on Indian cuisine. The project combines meal tracking, a structured dish database, pantry-aware planning, Firebase authentication, and Gemini-powered meal generation.

## Features

- email/password and Google authentication with Firebase
- meal logging with calorie and macronutrient tracking
- searchable Indian-dish dataset with regional and dietary metadata
- pantry tracking used as context for meal planning
- saved multi-day meal plans
- Gemini-generated meal plans constrained by calorie targets, dietary preferences, budget, and available dishes
- reusable AI-agent utilities built with Gemini and LangChain
- dashboard, account, meal-plan, pantry, news, and exploration views

## Stack

- Next.js 16
- React 19
- TypeScript
- Firebase Authentication and Firestore
- Google Gemini
- LangChain
- Tailwind CSS
- Framer Motion

## Project structure

```text
app/
  account/
  dashboard/
  explore/
  log-meal/
  login/
  meal-plan/
  meal-plans/
  pantry/
  signup/
data/
  indian-dishes.json
lib/
  ai-agents.ts
  firebase.ts
```

## AI meal planning

The meal-plan workflow sends a filtered list of dishes and user constraints to Gemini. Generated plans are constrained to dishes in the local dataset and can incorporate pantry items when available.

The `lib/ai-agents.ts` module also contains reusable agents for meal recommendations, nutrition analysis, recipe assistance, and nutrition education.

## Local development

Install dependencies:

```bash
npm install
```

Create `.env.local` and add the Firebase and Gemini environment variables required by the app.

Start the development server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Notes

This is a software project, not a substitute for individualized medical or dietary care. AI-generated recommendations should be treated as informational output and reviewed in context.
