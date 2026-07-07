# CaliX - Project Context

## What is this?
A browser-based calisthenics AI form checker and progression tracker.
Users point their webcam at themselves while exercising and get real-time
pose detection, automatic rep counting, and post-rep form feedback.
Built to be shareable via a link — no app install required.

## Links
- Live: https://cali-x-one.vercel.app/
- GitHub: https://github.com/arjunca24/CaliX

## Tech stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- MediaPipe Tasks Vision (WASM) for pose detection
- Vercel for deployment

## Collaboration dynamic
Arjun writes all code himself. AI explains concepts and reviews code.
AI does not generate code — the goal is genuine understanding, not a
vibe coded product. Concept first, Arjun implements, then review.

## Purpose
Portfolio piece for Tier 1 software engineering internship applications
(summer 2027). Tech stack chosen to reflect current industry demand.
Goal is to understand every line deeply enough to discuss it in an interview.

## Project structure
src/
├── app/
│   ├── page.tsx                 — landing page
│   ├── layout.tsx               — navbar, global layout
│   └── pushups/
│       └── page.tsx             — pushups page, rep counting, form feedback
├── hooks/
│   └── usePoseDetection.ts      — MediaPipe loading, camera setup, render loop, landmarks ref
├── lib/
│   ├── poseUtils.ts             — draw() function for skeleton overlay
│   └── formUtils.ts             — elbowAngle(), bodyAngle(), feedbackMessage()

## Current state
- Deployed and live at https://cali-x-one.vercel.app/
- Camera feed working via getUserMedia, starts on user click
- MediaPipe pose landmarker loading and running detectForVideo in render loop
- Skeleton overlay on canvas with visibility filtering
- Elbow angle calculated via dot product method
- Body alignment (shoulder/hip/ankle) tracked per rep
- Phase detection state machine (Up/Down) counting reps
- Post-rep feedback from worst elbow angle and worst body angle per rep
- Full refactor complete — hook/lib/page separation
- Light warm theme (#faf9f6), green accent (#16a34a), glassmorphism overlays
- Navbar in layout.tsx, landing page at /

## Next tasks (post-MVP)
- Improve skeleton overlay — kite shapes between joints for anatomical look
- Add more exercises (squats, plank)
- Progression system — unlock harder variations at rep targets
- Workout history and session logging
- Mobile PWA support