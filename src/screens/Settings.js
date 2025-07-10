import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    autoSave: true,
    vibration: true,
    sound: false,
    darkMode: false,
    highQuality: true,
    autoShare: false,
    keepHistory: true,
    notifications: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const clearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all QR code history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => {
          // Clear history logic here
          Alert.alert('Success', 'History cleared successfully');
        }},
      ]
    );
  };

  const exportData = () => {
    Alert.alert('Export Data', 'QR code data exported successfully');
  };

  const showAbout = () => {
    Alert.alert(
      'About QRCodeX',
      'Version 1.0.0\n\nA powerful QR code generator and scanner app.\n\nDeveloped with React Native',
      [{ text: 'OK' }]
    );
  };

  const SettingItem = ({ title, subtitle, value, onToggle, showSwitch = true }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showSwitch && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#2196F3' : '#f4f3f4'}
        />
      )}
    </View>
  );

  const ActionItem = ({ title, subtitle, onPress, color = '#333' }) => (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color }]}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Text style={[styles.arrow, { color }]}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QR Code Settings</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="Auto Save"
              subtitle="Automatically save generated QR codes"
              value={settings.autoSave}
              onToggle={() => toggleSetting('autoSave')}
            />
            <SettingItem
              title="High Quality"
              subtitle="Generate high resolution QR codes"
              value={settings.highQuality}
              onToggle={() => toggleSetting('highQuality')}
            />
            <SettingItem
              title="Auto Share"
              subtitle="Show share options after generation"
              value={settings.autoShare}
              onToggle={() => toggleSetting('autoShare')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scanner Settings</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="Vibration"
              subtitle="Vibrate when QR code is scanned"
              value={settings.vibration}
              onToggle={() => toggleSetting('vibration')}
            />
            <SettingItem
              title="Sound"
              subtitle="Play sound when QR code is scanned"
              value={settings.sound}
              onToggle={() => toggleSetting('sound')}
            />
            <SettingItem
              title="Keep History"
              subtitle="Save scanned QR codes to history"
              value={settings.keepHistory}
              onToggle={() => toggleSetting('keepHistory')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="Dark Mode"
              subtitle="Enable dark theme"
              value={settings.darkMode}
              onToggle={() => toggleSetting('darkMode')}
            />
            <SettingItem
              title="Notifications"
              subtitle="Allow app notifications"
              value={settings.notifications}
              onToggle={() => toggleSetting('notifications')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <View style={styles.sectionContent}>
            <ActionItem
              title="Export Data"
              subtitle="Export QR codes and settings"
              onPress={exportData}
            />
            <ActionItem
              title="Clear History"
              subtitle="Remove all saved QR codes"
              onPress={clearHistory}
              color="#f44336"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.section