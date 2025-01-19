import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.qztemplates.videoeditor',
  appName: 'QZ TEMPLATEZ VIDEO EDITOR',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'automatic'
  },
  mac: {
    contentInset: 'automatic'
  }
};

export default config;