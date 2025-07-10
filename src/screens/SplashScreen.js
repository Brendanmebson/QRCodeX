import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.qrIcon}>
          <View style={styles.qrGrid}>
            {[...Array(9)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.qrSquare,
                  (i === 0 || i === 2 || i === 4 || i === 6 || i === 8) && styles.qrSquareFilled,
                ]}
              />
            ))}
          </View>
        </View>
        <Text style={styles.appName}>QRCodeX</Text>
        <Text style={styles.tagline}>Generate • Scan • Share</Text>
      </Animated.View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by React Native</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  qrIcon: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  qrGrid: {
    width: 80,
    height: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  qrSquare: {
    width: 24,
    height: 24,
    margin: 2,
    backgroundColor: 'transparent',
  },
  qrSquareFilled: {
    backgroundColor: '#2196F3',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
});

export default SplashScreen;