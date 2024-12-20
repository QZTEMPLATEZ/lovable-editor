import { useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';

const App = () => {
  useEffect(() => {
    const initApp = async () => {
      try {
        if (window?.Capacitor?.getPlatform() === 'ios') {
          await StatusBar.setStyle({ style: Style.Dark });
          
          // Handle deep links with improved error handling
          CapacitorApp.addListener('appUrlOpen', ({ url }) => {
            console.log('Deep link URL:', url);
            try {
              const urlObj = new URL(url);
              // Handle deep link navigation here
              console.log('Processing deep link path:', urlObj.pathname);
            } catch (error) {
              console.error('Error processing deep link:', error);
            }
          });

          // Enhanced app state management for iOS
          CapacitorApp.addListener('appStateChange', ({ isActive }) => {
            console.log('App state changed. Is active?', isActive);
            if (isActive) {
              // Resume app functionality
              StatusBar.setStyle({ style: Style.Dark });
            } else {
              // Pause app functionality, save state if needed
              console.log('App entering background state');
            }
          });

          // Handle back button for iOS
          CapacitorApp.addListener('backButton', ({ canGoBack }) => {
            if (canGoBack) {
              window.history.back();
            } else {
              CapacitorApp.exitApp();
            }
          });
        }
      } catch (error) {
        console.error('Error initializing iOS app:', error);
      }
    };

    initApp();

    return () => {
      if (window?.Capacitor?.getPlatform() === 'ios') {
        CapacitorApp.removeAllListeners();
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Index />
      </div>
    </BrowserRouter>
  );
};

export default App;