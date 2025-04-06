
# BrainyNotes - AI-Powered PDF Summarizer

BrainyNotes is a modern web application for summarizing PDF documents with AI capabilities. Built with React, TypeScript, and Supabase for authentication and data storage.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Step-by-Step Tutorial to Build This Project](#step-by-step-tutorial-to-build-this-project)
  - [1. Project Setup](#1-project-setup)
  - [2. Installing Dependencies](#2-installing-dependencies)
  - [3. Setting Up Styling](#3-setting-up-styling)
  - [4. Supabase Integration](#4-supabase-integration)
  - [5. Building Components](#5-building-components)
  - [6. Setting Up Routing](#6-setting-up-routing)
  - [7. Configuring Supabase](#7-configuring-supabase)
- [Running the Project](#running-the-project)

## Overview

BrainyNotes helps users extract key information from PDF documents using AI. The app allows you to upload PDFs and get AI-generated summaries, making it easier to digest lengthy documents.

## Features

- ✅ PDF Upload and Preview
- 🧠 AI-Powered PDF Summarization
- 📱 Responsive Design for All Devices
- 🔒 User Authentication
- 🌙 Modern UI with Glass Morphism Design

## Step-by-Step Tutorial to Build This Project

### 1. Project Setup

Start by creating a new Vite project with React and TypeScript:

```bash
# Create a new project with Vite
npm create vite@latest brainynotes -- --template react-ts

# Navigate to the project directory
cd brainynotes

# Install initial dependencies
npm install
```

### 2. Installing Dependencies

Install all the required dependencies:

```bash
# UI Component Library and Utilities
npm install @radix-ui/react-accordion @radix-ui/react-aspect-ratio @radix-ui/react-avatar
npm install @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label
npm install @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group
npm install @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slider
npm install @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs
npm install @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group
npm install @radix-ui/react-tooltip

# Authentication and Backend
npm install @supabase/supabase-js

# State Management and Routing
npm install @tanstack/react-query react-router-dom

# UI Utilities
npm install class-variance-authority clsx lucide-react tailwind-merge
npm install sonner recharts

# Form and Date Management
npm install react-hook-form zod @hookform/resolvers
npm install date-fns react-day-picker
```

Set up TailwindCSS:

```bash
# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Setting Up Styling

Configure `tailwind.config.js`:

```js
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brainy: {
          darkPurple: "#1a103e",
          lightPurple: "#9b87f5",
          text: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

Create `src/index.css` for global styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 260 60% 15%;
    --foreground: 270 25% 95%;

    --card: 260 60% 15%;
    --card-foreground: 270 25% 95%;

    --popover: 260 60% 15%;
    --popover-foreground: 270 25% 95%;

    --primary: 270 67% 73%;
    --primary-foreground: 270 50% 15%;

    --secondary: 260 40% 25%;
    --secondary-foreground: 270 25% 95%;

    --muted: 260 40% 25%;
    --muted-foreground: 270 25% 75%;

    --accent: 270 67% 73%;
    --accent-foreground: 270 50% 15%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 270 25% 95%;

    --border: 270 25% 30%;
    --input: 270 25% 30%;
    --ring: 270 67% 73%;

    --radius: 0.75rem;

    --sidebar-background: 260 60% 15%;
    --sidebar-foreground: 270 25% 95%;
    --sidebar-primary: 270 67% 73%;
    --sidebar-primary-foreground: 270 50% 15%;
    --sidebar-accent: 260 40% 25%;
    --sidebar-accent-foreground: 270 25% 95%;
    --sidebar-border: 270 25% 30%;
    --sidebar-ring: 270 67% 73%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-brainy-darkPurple text-foreground;
    background-image: radial-gradient(circle at center top, #432a99 0%, #1a103e 100%);
    min-height: 100vh;
  }
}

@layer components {
  .glass {
    @apply backdrop-blur-md bg-white/10 border border-white/20 shadow-lg;
  }
  
  .glass-darker {
    @apply backdrop-blur-md bg-black/20 border border-white/10 shadow-lg;
  }
  
  .glass-card {
    @apply rounded-xl glass p-6;
  }

  .glass-button {
    @apply glass-darker hover:bg-white/20 transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-2;
  }
  
  .glass-button-accent {
    @apply bg-brainy-lightPurple/70 hover:bg-brainy-lightPurple/90 text-white backdrop-blur-md transition-all duration-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2;
  }

  .sidebar-item {
    @apply flex items-center gap-3 px-4 py-2 rounded-lg text-brainy-text hover:bg-white/10 transition-all duration-300;
  }

  .sidebar-item.active {
    @apply bg-white/10;
  }
}
```

### 4. Supabase Integration

Create a Supabase project and integrate it with the app:

1. Sign up at [Supabase](https://supabase.com) and create a new project.
2. Copy your Supabase URL and anon key.
3. Create an integration folder:

```bash
mkdir -p src/integrations/supabase
```

4. Create `src/integrations/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "your-anon-key";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
```

### 5. Building Components

Create the main components for the application:

#### Auth Context

Create `src/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // This disables email confirmation
          data: {
            confirmed: true,
          },
        },
      });
      if (error) throw error;
      
      // Auto sign in the user after signup
      await signIn(email, password);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

#### Protected Route Component

Create `src/components/ProtectedRoute.tsx`:

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

#### Sidebar Component

Create `src/components/Sidebar/Sidebar.tsx`:

```typescript
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Settings, Home, FileText, Info, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, signOut } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:z-0 glass-darker flex flex-col`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">BrainyNotes</h1>
          <button 
            onClick={toggleSidebar} 
            className="md:hidden p-1 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
                end
              >
                <Home size={20} />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/history" 
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <FileText size={20} />
                <span>History</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <Settings size={20} />
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <Info size={20} />
                <span>About</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        
        {user ? (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-brainy-lightPurple/30 flex items-center justify-center">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={() => signOut()} 
              className="w-full glass-button"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="p-4 border-t border-white/10">
            <NavLink to="/login" className="w-full glass-button-accent">
              Sign In
            </NavLink>
          </div>
        )}
      </aside>
      
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 left-4 z-30 md:hidden glass-darker p-2 rounded-full"
      >
        <Menu size={24} />
      </button>
    </>
  );
};

export default Sidebar;
```

#### PDF Uploader Component

Create `src/components/PDFUploader/PDFUploader.tsx`:

```typescript
import React, { useState, useCallback } from 'react';
import { FileUp } from 'lucide-react';

interface PDFUploaderProps {
  onFileUpload: (file: File) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const files = e.dataTransfer.files;
    processFile(files[0]);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    onFileUpload(file);
  };

  return (
    <div
      className={`glass-card mt-6 p-8 text-center ${
        isDragging ? 'border-brainy-lightPurple border-2' : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="pdf-upload"
        className="hidden"
        accept="application/pdf"
        onChange={handleFileInput}
      />
      <label
        htmlFor="pdf-upload"
        className="cursor-pointer flex flex-col items-center justify-center py-10"
      >
        <div className="rounded-full bg-brainy-lightPurple/30 p-4 mb-4">
          <FileUp size={40} className="text-brainy-lightPurple" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Upload PDF File</h3>
        <p className="text-sm text-gray-300 mb-4">
          Drag and drop your file here or click to browse
        </p>
        <button className="glass-button-accent">
          Choose PDF
        </button>
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </label>
    </div>
  );
};

export default PDFUploader;
```

#### Other Components

Create the rest of the necessary components like PDF Preview, Summary, Login pages, etc. following the same pattern.

### 6. Setting Up Routing

Create `src/App.tsx`:

```typescript
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import History from "./pages/History";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/history" element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

Create `src/main.tsx`:

```typescript
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
```

### 7. Configuring Supabase

Create necessary tables in Supabase:

```sql
-- Create a profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Set up row level security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Create a trigger to create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (new.id, coalesce(new.raw_user_meta_data->>'username', new.email), new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Running the Project

After completing all the steps above, you can run the project:

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:5173` in your browser to see your application in action!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
