import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Alert, 
  Share,
  Linking,
  Platform,
  Vibration
} from 'react-native';

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

  const [historyCount, setHistoryCount] = useState(0);

  // Load settings from storage on component mount
  useEffect(() => {
    loadSettings();
    getHistoryCount();
  }, []);

  const loadSettings = async () => {
    try {
      // In a real app, you'd load from AsyncStorage
      // For now, we'll just use the initial state
      console.log('Settings loaded');
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      // In a real app, you'd save to AsyncStorage
      // AsyncStorage.setItem('settings', JSON.stringify(newSettings));
      console.log('Settings saved:', newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const getHistoryCount = () => {
    // In a real app, this would count items from your history storage
    setHistoryCount(Math.floor(Math.random() * 50) + 1); // Mock count
  };

  const toggleSetting = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    saveSettings(newSettings);
    
    // Handle specific setting changes
    handleSettingChange(key, newSettings[key]);
  };

  const handleSettingChange = (key, value) => {
    switch (key) {
      case 'vibration':
        if (value && Platform.OS === 'ios') {
          Vibration.vibrate(100);
        } else if (value && Platform.OS === 'android') {
          Vibration.vibrate(100);
        }
        Alert.alert(
          'Vibration Setting',
          `Vibration ${value ? 'enabled' : 'disabled'} for QR code scanning`
        );
        break;
        
      case 'sound':
        Alert.alert(
          'Sound Setting',
          `Sound ${value ? 'enabled' : 'disabled'} for QR code scanning`
        );
        break;
        
      case 'darkMode':
        Alert.alert(
          'Dark Mode',
          `Dark mode ${value ? 'enabled' : 'disabled'}. App will restart to apply changes.`,
          [
            { text: 'OK', onPress: () => {
              // In a real app, you'd implement theme switching
              console.log('Dark mode toggled:', value);
            }}
          ]
        );
        break;
        
      case 'notifications':
        if (value) {
          requestNotificationPermission();
        } else {
          Alert.alert('Notifications', 'Notifications disabled');
        }
        break;
        
      case 'autoSave':
        Alert.alert(
          'Auto Save',
          `Generated QR codes will ${value ? 'automatically be saved' : 'not be saved automatically'}`
        );
        break;
        
      case 'highQuality':
        Alert.alert(
          'High Quality',
          `QR codes will be generated in ${value ? 'high' : 'standard'} quality`
        );
        break;
        
      case 'autoShare':
        Alert.alert(
          'Auto Share',
          `Share options will ${value ? 'automatically appear' : 'not appear'} after QR code generation`
        );
        break;
        
      case 'keepHistory':
        if (!value) {
          Alert.alert(
            'Keep History',
            'History tracking disabled. Previously scanned QR codes will no longer be saved.',
            [
              { text: 'Cancel', onPress: () => {
                // Revert the setting
                setSettings(prev => ({ ...prev, keepHistory: true }));
              }},
              { text: 'Confirm', onPress: () => {
                console.log('History tracking disabled');
              }}
            ]
          );
        } else {
          Alert.alert('Keep History', 'History tracking enabled');
        }
        break;
    }
  };

  const requestNotificationPermission = async () => {
    try {
      // In a real app, you'd request notification permissions
      Alert.alert(
        'Notifications Enabled',
        'You will now receive notifications for QR code activities'
      );
    } catch (error) {
      Alert.alert('Error', 'Unable to enable notifications');
    }
  };

  const clearHistory = () => {
    Alert.alert(
      'Clear History',
      `Are you sure you want to clear all ${historyCount} QR code entries from history?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive', 
          onPress: () => {
            // Clear history logic
            performClearHistory();
          }
        },
      ]
    );
  };

  const performClearHistory = () => {
    // In a real app, you'd clear from AsyncStorage or database
    setTimeout(() => {
      setHistoryCount(0);
      Alert.alert('Success', 'History cleared successfully');
    }, 500);
  };

  const exportData = () => {
    Alert.alert(
      'Export Data',
      'Choose export format:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'JSON', onPress: () => performExport('json') },
        { text: 'CSV', onPress: () => performExport('csv') },
        { text: 'Share', onPress: () => shareData() },
      ]
    );
  };

  const performExport = (format) => {
    // Simulate export process
    Alert.alert(
      'Exporting...',
      `Exporting data in ${format.toUpperCase()} format...`
    );
    
    setTimeout(() => {
      Alert.alert(
        'Export Complete',
        `Data exported successfully as ${format.toUpperCase()} file`
      );
    }, 1500);
  };

  const shareData = async () => {
    try {
      const exportData = {
        settings: settings,
        historyCount: historyCount,
        exportDate: new Date().toISOString(),
        appVersion: '1.0.0'
      };
      
      await Share.share({
        message: `QRCodeX Data Export\n\nSettings: ${JSON.stringify(settings, null, 2)}\nHistory Count: ${historyCount}\nExport Date: ${new Date().toLocaleDateString()}`,
        title: 'QRCodeX Data Export'
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share data');
    }
  };

  const resetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive', 
          onPress: () => {
            const defaultSettings = {
              autoSave: true,
              vibration: true,
              sound: false,
              darkMode: false,
              highQuality: true,
              autoShare: false,
              keepHistory: true,
              notifications: true,
            };
            setSettings(defaultSettings);
            saveSettings(defaultSettings);
            Alert.alert('Settings Reset', 'All settings have been reset to default values');
          }
        },
      ]
    );
  };

  const showAbout = () => {
    Alert.alert(
      'About QRCodeX',
      'Version 1.0.0\n\nA powerful QR code generator and scanner app built with React Native.\n\nFeatures:\n• Generate QR codes for text, URLs, contacts, and more\n• Scan QR codes with camera\n• History tracking\n• Export and share functionality\n\nDeveloped with ❤️ using React Native',
      [
        { text: 'OK' },
        { text: 'Rate App', onPress: () => rateApp() },
      ]
    );
  };

  const rateApp = () => {
    // In a real app, you'd open the app store
    Alert.alert(
      'Rate QRCodeX',
      'Thank you for using QRCodeX! Please rate us on the App Store.',
      [
        { text: 'Later' },
        { text: 'Rate Now', onPress: () => {
          // Open app store
          const storeUrl = Platform.OS === 'ios' 
            ? 'https://apps.apple.com/app/id123456789' 
            : 'https://play.google.com/store/apps/details?id=com.qrcodex';
          Linking.openURL(storeUrl).catch(() => {
            Alert.alert('Error', 'Unable to open app store');
          });
        }}
      ]
    );
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://example.com/privacy-policy').catch(() => {
      Alert.alert('Error', 'Unable to open privacy policy');
    });
  };

  const openSupport = () => {
    const email = 'support@qrcodex.com';
    const subject = 'QRCodeX Support Request';
    const body = `App Version: 1.0.0\nDevice: ${Platform.OS}\n\nDescribe your issue:\n`;
    
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`).catch(() => {
      Alert.alert('Error', 'Unable to open email client');
    });
  };

  const checkForUpdates = () => {
    Alert.alert(
      'Checking for Updates...',
      'Looking for app updates...'
    );
    
    setTimeout(() => {
      Alert.alert(
        'Up to Date',
        'You are using the latest version of QRCodeX!',
        [{ text: 'OK' }]
      );
    }, 1500);
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

  const ActionItem = ({ title, subtitle, onPress, color = '#333', showBadge = false, badgeText = '' }) => (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color }]}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.actionRight}>
        {showBadge && badgeText && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
        <Text style={[styles.arrow, { color }]}>›</Text>
      </View>
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
              subtitle={`Remove all ${historyCount} saved QR codes`}
              onPress={clearHistory}
              color="#f44336"
              showBadge={historyCount > 0}
              badgeText={historyCount.toString()}
            />
            <ActionItem
              title="Reset Settings"
              subtitle="Restore default settings"
              onPress={resetSettings}
              color="#ff9800"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Info</Text>
          <View style={styles.sectionContent}>
            <ActionItem
              title="Check for Updates"
              subtitle="Look for app updates"
              onPress={checkForUpdates}
            />
            <ActionItem
              title="Contact Support"
              subtitle="Get help with the app"
              onPress={openSupport}
            />
            <ActionItem
              title="Privacy Policy"
              subtitle="View privacy policy"
              onPress={openPrivacyPolicy}
            />
            <ActionItem
              title="Rate App"
              subtitle="Rate QRCodeX on the App Store"
              onPress={rateApp}
            />
            <ActionItem
              title="About"
              subtitle="App version and information"
              onPress={showAbout}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    paddingHorizontal: 4,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  actionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 8,
  },
});

export default SettingsScreen;