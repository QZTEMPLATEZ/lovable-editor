import React from 'react';
import { Button } from './ui/button';
import { HelpCircle, LogIn, Rocket, Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopNavigation = () => {
  return (
    <nav className="bg-editor-bg border-b border-editor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="font-sans text-3xl font-light tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 hover:scale-105 transition-transform duration-300 cursor-default">
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
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Italiano</DropdownMenuItem>
                <DropdownMenuItem>Português</DropdownMenuItem>
                <DropdownMenuItem>日本語</DropdownMenuItem>
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