
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BookText, 
  Home, 
  PlusCircle, 
  Settings, 
  ChevronDown,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/notes", label: "My Notes", icon: BookText },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || "U";
  };

  return (
    <div className="w-64 h-screen border-r bg-card flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">BrainyNotes</h1>
      </div>
      
      <div className="mt-4 flex-1">
        {navItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <Button
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 mb-1",
                isActive(item.path) ? "bg-secondary font-medium" : ""
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
        
        <Separator className="my-4" />
        
        <Link to="/new-note">
          <Button className="w-full justify-start gap-3">
            <PlusCircle className="h-5 w-5" />
            Create New Note
          </Button>
        </Link>
      </div>
      
      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary cursor-pointer">
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(user?.email || "")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.email || "User"}</p>
                <p className="text-xs text-muted-foreground">Free plan</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
