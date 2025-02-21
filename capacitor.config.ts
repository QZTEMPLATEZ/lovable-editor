
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.qztemplates.videoeditor',
  appName: 'QZ TEMPLATEZ VIDEO EDITOR',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'http://localhost:8080',
    cleartext: true
  },
  electron: {
    deepLinkingEnabled: true,
    customUrlScheme: 'qzvideoeditor'
  },
  mac: {
    contentInset: 'automatic',
    backgroundColor: '#000000',
    windowStyle: 'fullscreen',
    tintColor: '#000000',
    appearance: 'dark'
  }
};

export default config;
