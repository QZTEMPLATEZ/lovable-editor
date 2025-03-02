/// <reference types="vite/client" />

interface Window {
  Capacitor?: {
    getPlatform: () => string;
    isNative: boolean;
  };
}