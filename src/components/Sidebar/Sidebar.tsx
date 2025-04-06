
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Settings, History, Info, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
