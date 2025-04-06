
# BrainyNotes - AI-Powered Note-Taking App

BrainyNotes is a modern web application for creating, organizing, and enhancing notes with AI capabilities. Built with React, TypeScript, Tailwind CSS, and Supabase for authentication and data storage.

## Features

- ✍️ Create and edit notes with rich text capabilities
- 🧠 AI-powered summaries and suggestions
- 📱 Responsive design for desktop and mobile use
- 🔒 Secure authentication with email/password
- 🌙 Dark mode support
- 🎨 Beautiful UI built with shadcn/ui components

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

3. Environment setup

Create a `.env` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** Email verification is disabled for easier testing. Users will be automatically logged in after registration.

4. Start the development server
```sh
npm run dev
```

## Authentication

The app uses Supabase authentication with email/password login. For easier development and testing, email verification has been disabled.

To create a new user:
1. Click "Sign Up" from the login page
2. Enter your email and password
3. You'll be automatically logged in

## Project Structure

- `/src/components` - Reusable UI components
- `/src/contexts` - React context providers for auth and state management
- `/src/hooks` - Custom React hooks
- `/src/pages` - Main application pages
- `/src/integrations` - Third-party integrations (Supabase)
- `/src/lib` - Utility functions

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **State Management**: React Context API
- **Styling**: Tailwind CSS with shadcn/ui

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
