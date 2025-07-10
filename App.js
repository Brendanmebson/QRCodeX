import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/screens/SplashScreen';
import MainApp from './src/screens/MainApp';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <StatusBar style="light" />
      {isLoading ? <SplashScreen /> : <MainApp />}
    </>
  );
}
// This is the main entry point of the app.