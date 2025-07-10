import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import QRGenerator from '../components/QRGenerator';

const CreateScreen = () => {
  const [selectedType, setSelectedType] = useState('text');
  const [qrData, setQrData] = useState({
    text: '',
    url: '',
    email: { to: '', subject: '', body: '' },
    sms: { phone: '', message: '' },
    phone: '',
    wifi: { ssid: '', password: '', security: 'WPA' },
    contact: { name: '', phone: '', email: '', organization: '' },
    location: { latitude: '', longitude: '' },
    calendar: { title: '', start: '', end: '', location: '', description: '' },
  });

  const qrTypes = [
    { id: 'text', label: 'Text', icon: '📝' },
    { id: 'url', label: 'URL', icon: '🔗' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'sms', label: 'SMS', icon: '💬' },
    { id: 'phone', label: 'Phone', icon: '📞' },
    { id: 'wifi', label: 'WiFi', icon: '📶' },
    { id: 'contact', label: 'Contact', icon: '👤' },
    { id: 'location', label: 'Location', icon: '📍' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
  ];

  const formatQRData = () => {
    switch (selectedType) {
      case 'text':
        return qrData.text;
      case 'url':
        return qrData.url.startsWith('http') ? qrData.url : `https://${qrData.url}`;
      case 'email':
        return `mailto:${qrData.email.to}?subject=${qrData.email.subject}&body=${qrData.email.body}`;
      case 'sms':
        return `sms:${qrData.sms.phone}?body=${qrData.sms.message}`;
      case 'phone':
        return `tel:${qrData.phone}`;
      case 'wifi':
        return `WIFI:T:${qrData.wifi.security};S:${qrData.wifi.ssid};P:${qrData.wifi.password};;`;
      case 'contact':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${qrData.contact.name}\nTEL:${qrData.contact.phone}\nEMAIL:${qrData.contact.email}\nORG:${qrData.contact.organization}\nEND:VCARD`;
      case 'location':
        return `geo:${qrData.location.latitude},${qrData.location.longitude}`;
      case 'calendar':
        return `BEGIN:VEVENT\nSUMMARY:${qrData.calendar.title}\nDTSTART:${qrData.calendar.start}\nDTEND:${qrData.calendar.end}\nLOCATION:${qrData.calendar.location}\nDESCRIPTION:${qrData.calendar.description}\nEND:VEVENT`;
      default:
        return qrData.text;
    }
  };

  const updateQRData = (field, value) => {
    if (typeof qrData[selectedType] === 'object') {
      setQrData(prev => ({
        ...prev,
        [selectedType]: { ...prev[selectedType], [field]: value }
      }));
    } else {
      setQrData(prev => ({ ...prev, [selectedType]: value }));
    }
  };

  const renderInputFields = () => {
    const currentData = qrData[selectedType];

    switch (selectedType) {
      case 'text':
        return (
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter your text here..."
            value={currentData}
            onChangeText={(value) => updateQRData('text', value)}
            multiline
            numberOfLines={4}
          />
        );

      case 'url':
        return (
          <TextInput
            style={styles.input}
            placeholder="https://example.com"
            value={currentData}
            onChangeText={(value) => updateQRData('url', value)}
            keyboardType="url"
          />
        );

      case 'email':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="To email address"
              value={currentData.to}
              onChangeText={(value) => updateQRData('to', value)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Subject"
              value={currentData.subject}
              onChangeText={(value) => updateQRData('subject', value)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Email body"
              value={currentData.body}
              onChangeText={(value) => updateQRData('body', value)}
              multiline
              numberOfLines={3}
            />
          </View>
        );

      case 'sms':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              value={currentData.phone}
              onChangeText={(value) => updateQRData('phone', value)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Message"
              value={currentData.message}
              onChangeText={(value) => updateQRData('message', value)}
              multiline
              numberOfLines={3}
            />
          </View>
        );

      case 'phone':
        return (
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={currentData}
            onChangeText={(value) => updateQRData('phone', value)}
            keyboardType="phone-pad"
          />
        );

      case 'wifi':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Network name (SSID)"
              value={currentData.ssid}
              onChangeText={(value) => updateQRData('ssid', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={currentData.password}
              onChangeText={(value) => updateQRData('password', value)}
              secureTextEntry
            />
            <View style={styles.securityContainer}>
              {['WPA', 'WEP', 'Open'].map((security) => (
                <TouchableOpacity
                  key={security}
                  style={[
                    styles.securityButton,
                    currentData.security === security && styles.securityButtonActive
                  ]}
                  onPress={() => updateQRData('security', security)}
                >
                  <Text style={[
                    styles.securityText,
                    currentData.security === security && styles.securityTextActive
                  ]}>
                    {security}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'contact':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              value={currentData.name}
              onChangeText={(value) => updateQRData('name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              value={currentData.phone}
              onChangeText={(value) => updateQRData('phone', value)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              value={currentData.email}
              onChangeText={(value) => updateQRData('email', value)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Organization"
              value={currentData.organization}
              onChangeText={(value) => updateQRData('organization', value)}
            />
          </View>
        );

      case 'location':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              value={currentData.latitude}
              onChangeText={(value) => updateQRData('latitude', value)}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              value={currentData.longitude}
              onChangeText={(value) => updateQRData('longitude', value)}
              keyboardType="decimal-pad"
            />
          </View>
        );

      case 'calendar':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Event title"
              value={currentData.title}
              onChangeText={(value) => updateQRData('title', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Start date (YYYYMMDDTHHMMSS)"
              value={currentData.start}
              onChangeText={(value) => updateQRData('start', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="End date (YYYYMMDDTHHMMSS)"
              value={currentData.end}
              onChangeText={(value) => updateQRData('end', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={currentData.location}
              onChangeText={(value) => updateQRData('location', value)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={currentData.description}
              onChangeText={(value) => updateQRData('description', value)}
              multiline
              numberOfLines={3}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create QR Code</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.typeSelector}>
          <Text style={styles.sectionTitle}>Select QR Type</Text>
          <View style={styles.typeGrid}>
            {qrTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeItem,
                  selectedType === type.id && styles.selectedType
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text style={[
                  styles.typeLabel,
                  selectedType === type.id && styles.selectedTypeLabel
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Enter Details</Text>
          {renderInputFields()}
        </View>

        <QRGenerator qrValue={formatQRData()} />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  typeSelector: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeItem: {
    width: '30%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedType: {
    backgroundColor: '#2196F3',
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedTypeLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputSection: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  securityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  securityButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  securityButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  securityText: {
    color: '#666',
    fontSize: 14,
  },
  securityTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateScreen;