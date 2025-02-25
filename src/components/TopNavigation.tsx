
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from 'lucide-react';
import LoginModal from './auth/LoginModal';
import { useToast } from "@/components/ui/use-toast";

const TopNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    toast({
      title: "Desconectado com sucesso",
      description: "Volte sempre!",
    });
    navigate('/');
  };

  const handlePlanSelect = () => {
    setShowLoginModal(false);
    navigate('/duration');
  };

  return (
    <nav className="w-full bg-editor-panel">
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onPlanSelect={handlePlanSelect}
      />
      
      <div className="container mx-auto flex justify-between items-center py-6 px-8">
        <span 
          onClick={() => navigate('/duration')}
          className="font-italiana text-lg tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 hover:scale-105 transition-transform duration-300 cursor-pointer uppercase"
        >
          WEDDING TEMPLATEZ
        </span>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-white hover:text-purple-300 transition-colors"
            onClick={() => setShowLoginModal(true)}
          >
            Pricing
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-purple-400 text-white hover:bg-purple-400/10">
                <User className="h-4 w-4 mr-2" />
                {isLoggedIn ? 'Admin' : 'Account'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-editor-glass-dark border-editor-border">
              <DropdownMenuLabel className="text-white">
                {isLoggedIn ? 'Admin Panel' : 'My Account'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-editor-border" />
              
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem 
                    className="text-white hover:bg-purple-400/10 cursor-pointer"
                    onClick={() => navigate('/duration')}
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-400 hover:bg-red-400/10 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem 
                    className="text-white hover:bg-purple-400/10 cursor-pointer"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-purple-400/10 cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-editor-border" />
                  <DropdownMenuItem 
                    className="text-white hover:bg-purple-400/10 cursor-pointer"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Log in
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
