# Mindly – Azinhack'25

Mindly is a student-focused mental wellness platform built for Azinhack'25. It offers an empathetic AI chatbot, personal wellness tools, and booking assistance to encourage reflection, early support, and professional care when needed.

## Features

- Chatbot (empathetic assistant)
  - Responds with supportive guidance for stress, anxiety, loneliness, motivation, academics, and finances
  - Extracts wellness metrics (stress, anxiety, loneliness, motivation, financial burden, academic pressure)
  - Health endpoint for service monitoring

- Questionnaire (interactive assessments)
  - PHQ (Depression), GHQ (Anxiety), PSS (Stress), UCLA (Social Connection)
  - Financial Stress Index, Academic Motivation Scale
  - Animated progress, section badges, summary with per-section averages
  - Local persistence: draft auto-saves; completed runs saved for history
  - Clear history + retake flow

- Booking
  - Quick “Book a counselor” call-to-action from multiple places

- Responsive UI/UX
  - Light/dark theme with high-contrast buttons and readable navigation
  - Tailwind-based design with subtle animations (Framer Motion)

## Tech Stack

- Frontend
  - React 18 + Vite + TypeScript
  - React Router 6
  - Tailwind CSS (custom CSS variables for theming)
  - Framer Motion
  - Chart.js (for admin analytics – optional)

- Backend
  - Python + Flask (+ CORS)
  - Google Gemini model integration for chatbot (flash)
  - `.env` for keys (GEMINI_API_KEY)

## Repository Structure

```
backend/
  requirements.txt
  script.py                  # Flask app (chatbot + metrics + health)
frontend/
  src/
    pages/
      Home.tsx, Chatbot.tsx, Resources.tsx, About.tsx, Booking.tsx
      Questionnaire.tsx      # Interactive assessments
    shared/
      RootLayout.tsx         # Navigation + layout
    api/
      questionnaire.ts       # Save/fetch latest questionnaire JSON to backend
    main.tsx                 # Router configuration
    index.css                # Global styles and button classes
  package.json
```

## Setup & Running

1) Backend

```
cd backend
pip install -r requirements.txt
python script.py   # runs on http://localhost:5000
```

Environment:

```
GEMINI_API_KEY=...  # required for chatbot responses
```

2) Frontend

```
cd frontend
npm install
npm run dev         # runs on http://localhost:5173
```

Configure backend URL (optional):

```
# frontend/.env
VITE_BACKEND_URL=http://localhost:5000
```

## API Summary

Existing (backend/script.py):
- POST `/api/chat` → chatbot reply + inferred metrics
- GET `/api/metrics/:session_id` → metrics history for a session
- GET `/api/health` → service health

New (frontend helper only – backend route to be added by you):
- POST `/api/questionnaire/latest` → save `{ userId?, timestamp, responses }`
- GET `/api/questionnaire/latest?userId=...` → fetch latest saved JSON

See `frontend/src/api/questionnaire.ts` for request shapes. No chatbot changes are required to use this helper.

## Development Notes

- Styling
  - Global buttons: `.btn`, `.btn-outline`, `.btn-ghost`
  - High-contrast light mode borders and dark mode readability for nav/buttons
  - Use `bg-card`, `border-border`, and `text-foreground` for consistent theming

- Questionnaire Data
  - Draft saved to `localStorage` (`mindly_questionnaire_draft`)
  - Completed runs saved to `localStorage` (`mindly_questionnaire_runs`)
  - “Clear history” removes saved runs only

## Roadmap Ideas

- Server-side storage of questionnaire runs and analytics
- Personalized recommendations based on trends
- Admin analytics dashboards for anonymized insights
- Multi-language support

## License

This repository is for Azinhack'25; licensing/usage may be limited. Please check with project authors before reuse.

