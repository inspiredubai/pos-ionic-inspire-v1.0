import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.inspiresystems.pointofsale',
  appName: 'PointOfSales',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: [
      "http://103.74.54.207:8181/api/*"
    ]
  }
};

export default config;
