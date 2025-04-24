
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.511b2c9af6d141b9be6db619940b8980',
  appName: 'lend-it-tracker-buddy',
  webDir: 'dist',
  server: {
    url: 'https://511b2c9a-f6d1-41b9-be6d-b619940b8980.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: "#FFFFFF"
  }
};

export default config;
