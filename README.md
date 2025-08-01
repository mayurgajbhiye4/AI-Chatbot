# TechLander: AI-Powered Landing Page Generator

TechLander is a full-stack web application that uses AI to generate beautiful, production-ready HTML/CSS landing pages for a variety of industries. Users can chat with the AI, preview generated pages live, and download the code instantly. Built with Next.js, Prisma, PostgreSQL, and ShadcnUI components.

## Features

- **AI Chatbot**: Describe your landing page and get a complete, responsive HTML/CSS page generated by AI.
- **Live Preview**: Instantly preview the generated landing page in your browser.
- **Download & Copy**: Download the generated HTML file or copy the code to your clipboard.
- **Authentication**: Sign up and log in with email and password (securely hashed with bcryptjs).
- **Dark/Light Mode**: Toggle between light, dark, or system themes.
- **Modern UI**: Built with ShadcnUI and Radix UI for a polished, accessible experience.
- **Configurable AI Creativity**: The AI generation supports a "temperature" parameter, allowing you to control how creative or deterministic the responses are. (Higher values = more creative, lower = more focused)

## Extra Features & Bonus Implementations

- **Industry-Specific Templates**: AI is prompted to use best-practice templates for tech, food, e-commerce, portfolios, events, and more.
- **No Fake Images**: All image containers use valid placeholders and best-fit CSS (object-fit: cover).
- **Production-Ready Output**: The AI is instructed to output only a complete HTML file with internal CSS—no markdown, no explanations.
- **Responsive & Accessible**: All generated pages are designed to be mobile-friendly and accessible.
- **User Experience**: Toast notifications for errors, success, and actions (copy/download).
- **Panel Layout**: Resizable panels for chat and preview, inspired by modern design tools.
- **Session Management**: JWT-based sessions for secure authentication.
- **AI Temperature Control**: You can adjust the "temperature" parameter in the backend code (see "/src/app/api/chat/route.ts") to make the AI more creative (e.g., "temperature: 0.8") or more deterministic (e.g.,"temperature: 0.2").

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/) database or use supabase

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd chatbot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory with the following:
```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXTAUTH_SECRET=your-random-secret
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
```
Replace the values with your actual PostgreSQL credentials and a random secret string.

### 4. Set up the database
Run Prisma migrations to set up the database schema:
```bash
npx prisma migrate deploy
```

### 5. Generate Prisma client
```bash
npx prisma generate
```

### 6. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- **Sign up** for a new account or log in with your credentials.
- Enter a prompt describing your desired landing page (e.g., "A landing page for a yoga studio with class schedule and pricing").
- View the generated page in the live preview panel.
- Copy the code or download the HTML file.
- Toggle between light and dark mode as you wish.

## Tech Stack
- **Frontend**: Next.js App Router, React 19, ShadcnUI, Radix UI, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **AI**: Google Gemini 2.0 Flash (via ai-sdk)
- **Auth**: NextAuth.js (credentials provider, JWT sessions)
