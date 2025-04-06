
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

## Tutorial: Building BrainyNotes from Scratch

Follow this step-by-step guide to recreate the BrainyNotes application from the ground up.

### Step 1: Set Up the Project

```bash
# Create a new Vite project with React and TypeScript
npm create vite@latest brainynotes -- --template react-ts

# Navigate to the project directory
cd brainynotes

# Install dependencies
npm install
```

### Step 2: Install Required Packages

```bash
# Install core UI packages
npm install tailwindcss postcss autoprefixer
npm install class-variance-authority clsx tailwind-merge lucide-react

# Install Supabase client
npm install @supabase/supabase-js

# Install routing
npm install react-router-dom

# Install ShadCN/UI components and dependencies
npm install @radix-ui/react-dialog
npm install @radix-ui/react-toast
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-slot
npm install @radix-ui/react-separator

# Install state management
npm install @tanstack/react-query
```

### Step 3: Configure Tailwind CSS

Create a `tailwind.config.ts` file:

```typescript
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brainy-darkPurple': '#1a103e',
        'brainy-lightPurple': '#9b66ea',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

Create a `postcss.config.js` file:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Step 4: Set Up Supabase

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Create a new file `src/integrations/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
```

### Step 5: Create the Authentication Context

Create `src/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
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
      });
      if (error) throw error;
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

### Step 6: Create UI Components

1. Create a basic Sidebar component (`src/components/Sidebar/Sidebar.tsx`):

```typescript
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Settings, History, Info, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: '/', label: 'PDF Summarizer', icon: FileText },
    { path: '/history', label: 'History', icon: History },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleSidebar} 
          className="p-2 bg-brainy-lightPurple/70 rounded-lg text-white"
        >
          <Menu size={24} />
        </button>
      </div>
      
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />

      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 glass-darker transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">BrainyNotes</h2>
          <button onClick={toggleSidebar} className="lg:hidden text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${
                  location.pathname === item.path ? 'active' : ''
                }`}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          {user ? (
            <div className="space-y-2">
              <div className="text-sm text-white/70">{user.email}</div>
              <button 
                onClick={() => signOut()} 
                className="w-full glass-button text-center justify-center"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="w-full glass-button-accent text-center">
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
```

2. Create a Protected Route component:

```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brainy-lightPurple"></div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
```

### Step 7: Create Page Components

1. Home page (`src/pages/Index.tsx`):

```typescript
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import PDFUploader from '../components/PDFUploader/PDFUploader';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import PDFPreview from '../components/PDFPreview/PDFPreview';
import Summary from '../components/Summary/Summary';
import { ArrowLeft } from 'lucide-react';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleCloseFile = () => {
    setUploadedFile(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            {uploadedFile ? (
              <button 
                onClick={handleCloseFile} 
                className="flex items-center gap-2 glass-button"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
            ) : (
              <div>
                <h1 className="text-3xl font-bold">PDF Summarizer</h1>
                <p className="text-gray-400">Upload a PDF to get an AI-powered summary</p>
              </div>
            )}
          </div>

          {!uploadedFile ? (
            <>
              <PDFUploader onFileUpload={handleFileUpload} />
              <HowItWorks />
            </>
          ) : (
            <>
              <PDFPreview file={uploadedFile} onClose={handleCloseFile} />
              <Summary file={uploadedFile} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
```

2. Login page (`src/pages/Login.tsx`):

```typescript
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        
        {error && (
          <div className="p-3 mb-4 rounded-lg bg-red-500/20 border border-red-500/50 text-white">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brainy-lightPurple/50"
              required
            />
          </div>
          
          <div>
            <label className="block text-white/70 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brainy-lightPurple/50"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button-accent p-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-white/70">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brainy-lightPurple hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

3. Signup page (`src/pages/Signup.tsx`):

```typescript
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        
        {error && (
          <div className="p-3 mb-4 rounded-lg bg-red-500/20 border border-red-500/50 text-white">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brainy-lightPurple/50"
              required
            />
          </div>
          
          <div>
            <label className="block text-white/70 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brainy-lightPurple/50"
              required
            />
            <p className="text-xs text-white/50 mt-1">Password must be at least 6 characters long</p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button-accent p-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto"></div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-white/70">
            Already have an account?{' '}
            <Link to="/login" className="text-brainy-lightPurple hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
```

### Step 8: Set Up Routing

Update `src/App.tsx`:

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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
    <AuthProvider>
      <BrowserRouter>
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
  </QueryClientProvider>
);

export default App;
```

### Step 9: CSS Styling

Update `src/index.css`:

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
    @apply flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300;
  }

  .sidebar-item.active {
    @apply bg-white/10;
  }
}
```

### Step 10: Update Supabase Settings

For development purposes, it's recommended to disable email verification in the Supabase project settings:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Providers
3. Disable "Confirm email" for the Email provider

### Step 11: Create Essential Components

You'll need to create these additional components:

1. PDFUploader: For uploading PDF files
2. PDFPreview: For displaying uploaded PDFs
3. Summary: For showing AI-generated summaries
4. HowItWorks: For explaining the application's features

### Step 12: Run and Test the Application

```bash
npm run dev
```

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

## License

This project is licensed under the MIT License.
