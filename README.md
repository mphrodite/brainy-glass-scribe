
# BrainyNotes - AI-Powered Note-Taking App

BrainyNotes is a modern web application for creating, organizing, and enhancing notes with AI capabilities. Built with React, TypeScript, and Supabase for authentication and data storage.

## Getting Started

### Prerequisites

- Node.js (v16+) & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
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
The app uses Supabase for authentication and data storage. All configuration is already set up in the project.

4. Start the development server
```sh
npm run dev
```

## Key Features

- ✍️ Create and edit notes with rich text capabilities
- 🧠 AI-powered summaries and suggestions
- 📱 Responsive design for desktop and mobile use
- 🔒 Secure authentication with email/password
- 🌙 Dark mode support

## Authentication

The app uses Supabase authentication. Email verification is disabled for easier testing.

To create your own user:
1. Navigate to the Auth page by clicking "Login" or "Sign Up"
2. Choose to sign up and enter your details to create an account
3. You'll be automatically logged in after successful account creation

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **State Management**: React Context API
- **Styling**: Tailwind CSS with custom theming

## Project Structure

- `/src/components` - Reusable UI components
- `/src/contexts` - React context providers
- `/src/hooks` - Custom React hooks
- `/src/pages` - Main application pages
- `/src/integrations` - Third-party integrations (Supabase)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
