import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.regulus.riteschool',
  appName: 'RITeSchool',
  webDir: 'build',
  bundledWebRuntime: false,
  server:{
    androidScheme:"http",
    cleartext: true,
    //allowNavigation:["https://schooltempapi.riteschool.com/"]
    allowNavigation:["http://schoolappapi.aaditechnology.com/"]
  }
};

export default config;
