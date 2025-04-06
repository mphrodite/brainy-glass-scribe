
# BrainyNotes - AI-Powered Note-Taking App

BrainyNotes is a streamlined, modern web application for creating and organizing notes with AI capabilities. Built with React, TypeScript, and Supabase for authentication and data storage.

## Getting Started

### Prerequisites

- Node.js (v16+) & npm installed
- A Supabase account (free tier works fine)

### Setup

1. Clone the repository
```sh
git clone <repository-url>
cd brainynotes
```

2. Install dependencies
```sh
npm install
```

3. Start the development server
```sh
npm run dev
```

## Key Features

- ✍️ Create and edit notes with rich text
- 🧠 AI-powered summaries and suggestions
- 📱 Responsive design for all devices
- 🔒 Secure authentication with email/password

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **State Management**: React Context API

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── hooks/          # Custom React hooks
├── integrations/   # Third-party integrations (Supabase)
├── lib/            # Utility functions
└── pages/          # Main application pages
```

## Authentication

The app uses Supabase authentication with email verification disabled for easier testing.

## License

This project is licensed under the MIT License.
