import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import HistoryScreen from './HistoryScreen';
import CreateScreen from './CreateScreen';
import BottomNavigation from '../components/BottomNavigation';

const MainApp = () => {
  const [activeScreen, setActiveScreen] = useState('home');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'create':
        return <CreateScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <BottomNavigation 
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});

export default MainApp;