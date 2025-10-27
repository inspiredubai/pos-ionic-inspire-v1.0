import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.inspiresystems.pointofsale',
  appName: 'PointOfSales',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: ['http://194.233.95.37:8080/api/*'],
  },
};
export default config;
