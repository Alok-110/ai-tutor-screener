# Cuemath AI Tutor Screener

> **AI Builder Challenge — Problem 3: The AI Tutor Screener**

Live demo: [https://ai-tutor-screener-brown.vercel.app/ ](https://ai-tutor-screener-brown.vercel.app/)
Video walkthrough: [your-loom-link](https://loom.com)

---

## What I Built

An AI voice interviewer that conducts natural 8-minute screening calls with tutor candidates and delivers a structured soft-skill assessment the moment the call ends.

Candidates visit the link, enter their details, and have a real voice conversation with "Aria" — an AI interviewer powered by Groq's LLaMA 3.3 70B. No typing, no forms. Just a conversation.

When the interview ends, a full assessment is automatically generated and available in the recruiter dashboard — scored across 5 dimensions with supporting quotes from the transcript.

---

## Key Features

**Candidate side**
- Voice-first interview — speaks naturally, no typing required
- 5 carefully designed questions that reveal soft skills
- AI follows up on vague answers and redirects tangents
- Clean done page with experience feedback collection

**Recruiter side**
- Password-protected admin dashboard (`/admin`)
- All candidates with AI suggestion, avg score, date
- Admin sets final decision (Shortlisted / Rejected / Maybe / Pending)
- Full report with radar chart, bar chart, score breakdown, transcript
- One-click email report to admin with optional recruiter note

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| AI (conversation + assessment) | Groq API — LLaMA 3.3 70B |
| Speech-to-text | Web Speech API (Chrome) |
| Text-to-speech | Web Speech Synthesis API |
| Email | Resend |
| Frontend deploy | Vercel |
| Backend deploy | Render |

---

## Key Decisions & Tradeoffs

**Groq over Gemini or OpenAI**  
Gemini's free tier is geo-restricted in India — I hit quota: 0 errors immediately. Groq provides genuinely free access to LLaMA 3.3 70B with 1500 req/day, no region restrictions, and is significantly faster than alternatives. For a voice interview where latency matters, this was the right call.

**Web Speech API over Whisper**  
Whisper would require recording audio, uploading to a server, and waiting for transcription — adding 2-3 seconds of latency per turn. Web Speech API transcribes in real time, in the browser, for free. The tradeoff is Chrome-only support, which I document clearly. For a demo and for Cuemath's recruiting workflow (desktop Chrome), this is acceptable.

**Password gate over full auth**  
JWT auth with user accounts would take a day to build correctly. A password gate takes 10 lines and achieves the same security for a single-team use case. The admin password is stored in sessionStorage and never exposed to candidates. This is the right scope for a take-home project.

**AI suggestion vs admin decision separation**  
The AI generates a recommendation but the recruiter makes the final call. This is intentional — the admin dashboard clearly labels AI output as "AI Suggestion 🤖" and provides a separate dropdown for the recruiter's own decision. Hiring decisions should never be fully automated.

**No candidate auth / no candidate report access**  
Candidates don't see their report. This is realistic — in a real hiring process, assessment data is internal. Candidates provide their email and receive a confirmation; recruiters review the report and decide whether to share feedback.

---

## Interesting Challenges

**Double report generation**  
React StrictMode double-invokes useEffect in development, which meant two sessions and two assessments were being created per interview. Fixed by removing StrictMode and adding `useRef` guards (`sendingRef`, `endedRef`) to prevent duplicate API calls.

**Speech recognition stopping silently**  
Chrome's Web Speech API stops on silence. Switched from reusing a single recognition instance to creating a fresh instance on every recording session, which eliminated the silent abort errors and made recognition reliable.

**Gemini free tier blocked in India**  
Discovered mid-build that Gemini's free tier returns `limit: 0` for Indian IPs. Pivoted to Groq in under an hour — swapped the SDK, rewrote both service files, and the conversation quality actually improved.

**ElevenLabs free tier flagged**  
Attempted to use ElevenLabs for a more human AI voice but their fraud detection blocked the free account. Fell back to Web Speech Synthesis with voice preference ordering (Microsoft Natural voices on Windows, Samantha on Mac) which sounds acceptable. ElevenLabs integration is documented and ready — just needs a paid key.

---

## What I'd Improve With More Time

- **Whisper transcription** — for non-Chrome browsers and better accuracy
- **ElevenLabs voice** — the paid tier would make Aria sound genuinely human
- **Candidate email report** — currently sends to admin only due to Resend free tier domain restrictions; a verified domain would enable direct candidate emails
- **Question bank randomisation** — currently 5 fixed questions; a larger bank with randomisation would reduce gaming
- **Admin analytics** — cohort views, score distributions over time, funnel metrics
- **Mobile support** — currently desktop Chrome only; a native mobile app would reach more candidates

---

## Running Locally

### Backend
```bash
cd backend
npm install
# Create .env with MONGO_URI, GROQ_API_KEY, RESEND_API_KEY, ADMIN_EMAIL, PORT=5000
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Create .env with VITE_API_URL=http://localhost:5000
npm run dev
```

### Admin access
Navigate to `/admin` — password is `cuemath2024`

---

## Notes

- Interview requires **Google Chrome** (Web Speech API)
- AI voice uses browser's built-in speech synthesis — Microsoft Aria Natural on Windows sounds best
- ElevenLabs integration is built and documented but requires a paid key due to free tier geo-restrictions
