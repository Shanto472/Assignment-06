# FitLog — Workout Library

FitLog is a responsive, dark-themed workout companion built for focused training. Browse a curated exercise library, inspect clear instructions and workout specs, assemble a five-lift daily plan, save movements for later, and track live workout totals from any device.

## Live project

- Local development: `http://localhost:3000`
- Production URL: add your Vercel, Netlify, or Cloudflare Pages URL after deployment.

## Technologies

- Next.js 15 with the App Router and TypeScript
- React 19 and Context API
- Tailwind CSS
- Font Awesome icons
- React Hot Toast
- FitLog REST API
- Browser `localStorage`

## Key features

1. Responsive 12-workout library with API data, loading states, and offline fallback data.
2. Live search plus sorting by duration, calories, or rating.
3. Detailed workout pages with tags, specifications, instructions, and plan/save actions.
4. Persistent Today's Plan and Saved collections with synchronized navbar counters.
5. Five-workout plan cap, live exercise/minute/calorie metrics, mark-as-done, and remove actions.
6. Toast feedback for every meaningful action and disabled duplicate controls.
7. Mobile, tablet, and desktop layouts, custom metadata, and a branded 404 page.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Data source

Workout data comes from `https://api.abcz.workers.dev/api/fitlog`. A matching local fallback keeps the library useful during a temporary API outage.
