
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FileText, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome{user ? `, ${user.email?.split('@')[0]}` : ''}!</h1>
          <p className="text-muted-foreground">
            Create, organize and enhance your notes with AI assistance.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Create New Note</CardTitle>
              <CardDescription>Start writing a new note with AI-powered suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <PlusCircle className="h-16 w-16 text-primary/70" />
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/new-note" className="w-full">
                <Button className="w-full">Create Note</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">My Notes</CardTitle>
              <CardDescription>Browse and manage your existing notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <FileText className="h-16 w-16 text-primary/70" />
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/notes" className="w-full">
                <Button variant="outline" className="w-full">View Notes</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">AI Features</CardTitle>
              <CardDescription>Discover AI-powered note-taking features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Brain className="h-16 w-16 text-primary/70" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Explore</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
            <CardDescription>Your recently edited notes will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-muted-foreground">
              <p>You haven't created any notes yet</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/new-note" className="w-full">
              <Button variant="outline" className="w-full">Create Your First Note</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};
