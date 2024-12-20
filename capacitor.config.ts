import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovablewedding.app',
  appName: 'Lovable Wedding',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'lovablewedding',
    backgroundColor: '#000000',
    webViewConfiguration: {
      allowsInlineMediaPlayback: true,
      mediaTypesRequiringUserActionForPlayback: 'none',
      allowsPictureInPictureMediaPlayback: true
    }
  },
  plugins: {
    Filesystem: {
      ios: {
        usesIcloudStorage: true
      }
    }
  }
};

export default config;