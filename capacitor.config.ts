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
      allowsPictureInPictureMediaPlayback: true,
      allowsAirPlayForMediaPlayback: true,
      suppressesIncrementalRendering: true
    }
  },
  plugins: {
    Filesystem: {
      ios: {
        usesIcloudStorage: true
      }
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: false,
      androidSpinnerStyle: "large",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;