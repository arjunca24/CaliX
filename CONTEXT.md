# CaliX - Project Context

## What is this?
A browser-based calisthenics AI form checker and progression tracker. 
Users point their webcam at themselves while exercising and get real-time 
pose detection, automatic rep counting, and post-rep form feedback. 
Built to be shareable via a link — no app install required.

## Tech stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- MediaPipe Tasks Vision (WASM) for pose detection
- Vercel for deployment

## Collaboration dynamic
Arjun writes the code, AI explains concepts and reviews.
AI does not generate code for him — the goal is genuine understanding,
not a vibe coded product. Concept first, then Arjun implements, then review.

## Purpose
This project is a portfolio piece for Arjun's UK software engineering 
internship applications (summer 2027). It addresses the "what have you built" 
gap on his CV. The goal is to build something real, understand it deeply, 
and be able to talk confidently about every technical decision in an interview.
Tech stack was chosen to reflect current industry demand.

## Current state
- Next.js project scaffolded and pushed to GitHub
- Camera feed working via getUserMedia
- MediaPipe pose landmarker loading and running detectForVideo in a render loop
- 33 landmarks printing to console successfully

## Next task
Draw the skeleton overlay on a <canvas> element positioned on top of the 
video feed. Dots for each visible landmark (visibility > 0.5), converting 
normalised 0-1 coordinates to canvas pixel coordinates. Then connect dots 
with lines to form the skeleton. Once verified visually, move to angle 
calculation and form scoring.