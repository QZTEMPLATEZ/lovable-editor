import React from 'react';
import { Button } from './ui/button';
import { HelpCircle, LogIn, Rocket } from 'lucide-react';

const TopNavigation = () => {
  return (
    <nav className="bg-editor-bg border-b border-editor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="brand-text text-2xl font-bold">
              QZ Templatez
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Log In
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Help
            </Button>
            <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;