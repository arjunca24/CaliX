# CaliX

A browser-based AI form checker for calisthenics. Point your webcam at yourself, and CaliX detects your pose in real time, counts reps automatically, and gives feedback on your form after each rep — no app install required.

**[Try it live →](https://cali-x-one.vercel.app/)**

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| AI / ML | MediaPipe Tasks Vision (WASM) |
| Deployment | Vercel |

---

## How it works

MediaPipe runs a pose landmarker model in the browser via WebAssembly — no server, no uploads. Elbow angles are calculated using the dot product method, body alignment is tracked per rep (shoulder/hip/ankle), and a phase detection state machine handles rep counting. Post-rep feedback is generated from the worst elbow and body angle recorded during each rep.

---

## Run locally

```bash
npm install
npm run dev
```

---

## Author

**Arjun Anish**
