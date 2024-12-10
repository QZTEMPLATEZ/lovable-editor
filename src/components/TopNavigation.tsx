import React from 'react';
import { Button } from './ui/button';
import { Gift, HelpCircle, LogIn, Users, Building2, LogOut } from 'lucide-react';
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
            <h1 className="font-['Cinzel'] text-lg font-semibold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 hover:scale-105 transition-transform duration-300 cursor-default">
              OSÍRIS EDITION
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-300 hover:text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-editor-accent flex items-center justify-center text-white font-medium">
                    GQ
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-64 bg-editor-panel border border-editor-border"
              >
                <div className="px-4 py-3 border-b border-editor-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-editor-text">PRO</span>
                  </div>
                  <div className="mt-1 text-sm text-editor-text/70">
                    user@example.com
                  </div>
                </div>
                
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  <Gift className="w-4 h-4 mr-3" />
                  Refer a Friend
                </DropdownMenuItem>
                
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  My Account
                </DropdownMenuItem>
                
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  Clearlist
                </DropdownMenuItem>
                
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  <Users className="w-4 h-4 mr-3" />
                  Team
                </DropdownMenuItem>
                
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  <Building2 className="w-4 h-4 mr-3" />
                  Business
                </DropdownMenuItem>
                
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  <HelpCircle className="w-4 h-4 mr-3" />
                  Help
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-editor-border" />
                
                <DropdownMenuItem className="px-4 py-2.5 text-sm text-editor-text hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400">
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;