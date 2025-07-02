# PinPoint AI 🤖

PinPoint AI is an AI-powered full-stack chatbot built using **Next.js**, **Node.js**, and **Gemini API**. It features user authentication, real-time AI responses, and stores conversation history with complete session management.

🔗 **Live Demo:** [pinpointai.vercel.app](https://pinpointai.vercel.app)  
🛠️ **GitHub Repo:** [github.com/mr-devloper005/PinPoint-Ai](https://github.com/mr-devloper005/PinPoint-Ai)

---

## 🚀 Features

- ✨ Gemini API integration for real-time smart replies  
- 🔐 Google OAuth & JWT authentication  
- 💬 Persistent chat history for each user  
- 🧠 Memory support using last 5 messages in prompt  
- 🎯 Role-based logic to isolate user sessions  
- ⚡ Powered by Redux Toolkit (Async Thunks)  
- 🌐 Deployed with Vercel (frontend) & Render (backend)

---

## 🧰 Tech Stack

**Frontend:**  
- React.js, Next.js (App Router)  
- Tailwind CSS for modern UI  
- Redux Toolkit for state management  
- Axios for API communication

**Backend:**  
- Node.js, Express.js  
- MongoDB with Mongoose  
- JWT for session tokens  
- Google OAuth2 integration  
- dotenv for secure configs

---

## 🛠️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/mr-devloper005/PinPoint-Ai.git
cd PinPoint-Ai

# Backend
cd backend
npm install
# Set up .env variables for MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID etc.
npm start

# Frontend
cd ../frontend
npm install
# Set up .env.local for NEXT_PUBLIC_BACKEND_URL and GEMINI_API_KEY
npm run dev

