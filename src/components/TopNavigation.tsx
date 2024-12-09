import React from 'react';
import { Button } from './ui/button';
import { HelpCircle, LogIn, Rocket, Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const TopNavigation = () => {
  return (
    <nav className="bg-editor-bg border-b border-editor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="font-sans text-sm font-light tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 hover:scale-105 transition-transform duration-300 cursor-default">
              WEDDING TEMPLATEZ
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-300 hover:text-white flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Language
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-editor-panel border border-editor-border"
              >
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  English
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-editor-border" />
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  Italiano
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-editor-border" />
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  Português
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-editor-border" />
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  日本語
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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