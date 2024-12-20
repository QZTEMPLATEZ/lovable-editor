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
          
          // Handle deep links
          CapacitorApp.addListener('appUrlOpen', ({ url }) => {
            console.log('Deep link URL:', url);
            // Handle deep link here
          });

          // Handle app state changes
          CapacitorApp.addListener('appStateChange', ({ isActive }) => {
            console.log('App state changed. Is active?', isActive);
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