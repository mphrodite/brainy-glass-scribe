
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname === '/signup' ? 'signup' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: name },
        },
      });
      if (error) throw error;

      toast({
        title: "Signup Successful",
        description: "Your account has been created!",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "An error occurred during signup.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-foreground p-6" style={{ backgroundImage: 'radial-gradient(circle at center top, #432a99 0%, #1a103e 100%)' }}>
      <div className="glass-card max-w-lg w-full rounded-2xl shadow-lg">
        <div className="p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/80 flex items-center justify-center shadow-md">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-brainy-text mt-2">BrainyNotes</h1>
          </div>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/20 rounded-lg">
              <TabsTrigger value="login" className="tabs-trigger hover:bg-primary/30">Login</TabsTrigger>
              <TabsTrigger value="signup" className="tabs-trigger hover:bg-primary/30">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <div className="text-sm">
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full py-3 bg-brainy-accent hover:bg-brainy-accent/80 transition-colors rounded-md font-medium">
                  Login
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Not a member?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('signup');
                  }}
                  className="text-primary hover:underline"
                >
                  Signup now
                </a>
              </div>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus-visible:ring-primary"
                />
                <Button type="submit" className="w-full py-3 bg-brainy-accent hover:bg-brainy-accent/80 transition-colors rounded-md font-medium">
                  Create Account
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('login');
                  }}
                  className="text-primary hover:underline"
                >
                  Login
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="fixed bottom-4 left-4">
        <Link to="/" className="glass-button flex items-center gap-2 hover:bg-primary/20">
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
