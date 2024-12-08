import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Globe, HelpCircle } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

const TopNavigation = () => {
  return (
    <div className="w-full bg-editor-bg border-b border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Brand */}
          <div className="flex-shrink-0">
            <span className="text-white font-semibold">VideoEditor</span>
          </div>

          {/* Right side - Navigation items */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-purple-500/10">
                    <Globe className="w-4 h-4 mr-2" />
                    Language
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-1 p-2">
                      {languages.map((lang) => (
                        <li key={lang.code}>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                // Language selection logic here
                              }}
                            >
                              {lang.name}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Help Button */}
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-purple-500/10"
              onClick={() => {
                // Help logic here
              }}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>

            {/* Login Button */}
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-purple-500/10"
              onClick={() => {
                // Login logic here
              }}
            >
              Login
            </Button>

            {/* Upgrade Button */}
            <Button
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6"
              onClick={() => {
                // Upgrade logic here
              }}
            >
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;