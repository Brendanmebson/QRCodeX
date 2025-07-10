import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Picker } from 'react-native';
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
    clipboard: '',
    geo: { latitude: '', longitude: '', altitude: '' },
    myqr: { customData: '' },
    // Barcode types
    ean8: '',
    ean13: '',
    upc_e: '',
    upc_a: '',
    code39: '',
    code93: '',
    code128: '',
    itf: '',
    pdf417: '',
    codabar: '',
    datamatrix: '',
    aztec: '',
  });

  const qrTypes = [
    // Basic QR Types
    { id: 'text', label: 'Text', icon: '📝', category: 'basic' },
    { id: 'url', label: 'URL', icon: '🔗', category: 'basic' },
    { id: 'clipboard', label: 'Clipboard', icon: '📋', category: 'basic' },
    
    // Communication
    { id: 'email', label: 'Email', icon: '📧', category: 'communication' },
    { id: 'sms', label: 'SMS', icon: '💬', category: 'communication' },
    { id: 'phone', label: 'Phone', icon: '📞', category: 'communication' },
    { id: 'contact', label: 'Contact', icon: '👤', category: 'communication' },
    
    // Location & Utility
    { id: 'wifi', label: 'WiFi', icon: '📶', category: 'utility' },
    { id: 'location', label: 'Location', icon: '📍', category: 'utility' },
    { id: 'geo', label: 'Geo', icon: '🌍', category: 'utility' },
    { id: 'calendar', label: 'Calendar', icon: '📅', category: 'utility' },
    { id: 'myqr', label: 'My QR', icon: '🔖', category: 'utility' },
    
    // Barcode Types
    { id: 'ean8', label: 'EAN-8', icon: '|||', category: 'barcode' },
    { id: 'ean13', label: 'EAN-13', icon: '|||', category: 'barcode' },
    { id: 'upc_e', label: 'UPC-E', icon: '|||', category: 'barcode' },
    { id: 'upc_a', label: 'UPC-A', icon: '|||', category: 'barcode' },
    { id: 'code39', label: 'Code 39', icon: '|||', category: 'barcode' },
    { id: 'code93', label: 'Code 93', icon: '|||', category: 'barcode' },
    { id: 'code128', label: 'Code 128', icon: '|||', category: 'barcode' },
    { id: 'itf', label: 'ITF', icon: '|||', category: 'barcode' },
    { id: 'pdf417', label: 'PDF 417', icon: '▦▦▦', category: 'barcode' },
    { id: 'codabar', label: 'CODABAR', icon: '|||', category: 'barcode' },
    { id: 'datamatrix', label: 'Data Matrix', icon: '▢▢▢', category: 'barcode' },
    { id: 'aztec', label: 'Aztec', icon: '◆◆◆', category: 'barcode' },
  ];

  const categories = [
    { id: 'basic', label: 'Basic', icon: '📝' },
    { id: 'communication', label: 'Communication', icon: '📧' },
    { id: 'utility', label: 'Utility', icon: '🔧' },
    { id: 'barcode', label: 'Barcodes', icon: '|||' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('basic');

  const formatQRData = () => {
    const currentData = qrData[selectedType];
    
    switch (selectedType) {
      case 'text':
        return currentData;
      case 'url':
        return currentData.startsWith('http') ? currentData : `https://${currentData}`;
      case 'email':
        return `mailto:${currentData.to}?subject=${encodeURIComponent(currentData.subject)}&body=${encodeURIComponent(currentData.body)}`;
      case 'sms':
        return `sms:${currentData.phone}?body=${encodeURIComponent(currentData.message)}`;
      case 'phone':
        return `tel:${currentData}`;
      case 'wifi':
        return `WIFI:T:${currentData.security};S:${currentData.ssid};P:${currentData.password};;`;
      case 'contact':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${currentData.name}\nTEL:${currentData.phone}\nEMAIL:${currentData.email}\nORG:${currentData.organization}\nEND:VCARD`;
      case 'location':
        return `geo:${currentData.latitude},${currentData.longitude}`;
      case 'geo':
        return `geo:${currentData.latitude},${currentData.longitude}${currentData.altitude ? `,${currentData.altitude}` : ''}`;
      case 'calendar':
        return `BEGIN:VEVENT\nSUMMARY:${currentData.title}\nDTSTART:${currentData.start}\nDTEND:${currentData.end}\nLOCATION:${currentData.location}\nDESCRIPTION:${currentData.description}\nEND:VEVENT`;
      case 'clipboard':
        return currentData;
      case 'myqr':
        return currentData.customData;
      // Barcode types - return the data as is for barcode generation
      case 'ean8':
      case 'ean13':
      case 'upc_e':
      case 'upc_a':
      case 'code39':
      case 'code93':
      case 'code128':
      case 'itf':
      case 'pdf417':
      case 'codabar':
      case 'datamatrix':
      case 'aztec':
        return currentData;
      default:
        return currentData;
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

  const getInputPlaceholder = (type) => {
    const placeholders = {
      ean8: 'Enter 8-digit EAN-8 code (e.g., 12345678)',
      ean13: 'Enter 13-digit EAN-13 code (e.g., 1234567890123)',
      upc_e: 'Enter 6-digit UPC-E code (e.g., 123456)',
      upc_a: 'Enter 12-digit UPC-A code (e.g., 123456789012)',
      code39: 'Enter Code 39 data (A-Z, 0-9, space, -, ., $, /, +, %)',
      code93: 'Enter Code 93 data (0-9, A-Z, space, -, ., $, /, +, %)',
      code128: 'Enter Code 128 data (any ASCII character)',
      itf: 'Enter ITF data (even number of digits)',
      pdf417: 'Enter PDF417 data (up to 1850 characters)',
      codabar: 'Enter CODABAR data (0-9, A-D, -, ., $, /, +, :)',
      datamatrix: 'Enter Data Matrix data (up to 2335 characters)',
      aztec: 'Enter Aztec data (up to 3832 characters)',
    };
    return placeholders[type] || 'Enter data';
  };

  const renderInputFields = () => {
    const currentData = qrData[selectedType];

    // Handle barcode types
    if (['ean8', 'ean13', 'upc_e', 'upc_a', 'code39', 'code93', 'code128', 'itf', 'pdf417', 'codabar', 'datamatrix', 'aztec'].includes(selectedType)) {
      return (
        <View>
          <Text style={styles.inputLabel}>Barcode Data</Text>
          <TextInput
            style={styles.input}
            placeholder={getInputPlaceholder(selectedType)}
            value={currentData}
            onChangeText={(value) => updateQRData(selectedType, value)}
            keyboardType={['ean8', 'ean13', 'upc_e', 'upc_a', 'itf'].includes(selectedType) ? 'numeric' : 'default'}
          />
          <Text style={styles.helperText}>
            {selectedType.toUpperCase()} format will be used for generation
          </Text>
        </View>
      );
    }

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

      case 'clipboard':
        return (
          <View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Content from clipboard..."
              value={currentData}
              onChangeText={(value) => updateQRData('clipboard', value)}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity 
              style={styles.clipboardButton}
              onPress={() => {
                // In a real app, you'd use @react-native-clipboard/clipboard
                Alert.alert('Clipboard', 'Clipboard content would be pasted here');
              }}
            >
              <Text style={styles.clipboardButtonText}>📋 Paste from Clipboard</Text>
            </TouchableOpacity>
          </View>
        );

      case 'url':
        return (
          <TextInput
            style={styles.input}
            placeholder="https://example.com"
            value={currentData}
            onChangeText={(value) => updateQRData('url', value)}
            keyboardType="url"
            autoCapitalize="none"
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
              autoCapitalize="none"
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
              autoCapitalize="none"
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
              placeholder="Latitude (e.g., 37.7749)"
              value={currentData.latitude}
              onChangeText={(value) => updateQRData('latitude', value)}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude (e.g., -122.4194)"
              value={currentData.longitude}
              onChangeText={(value) => updateQRData('longitude', value)}
              keyboardType="decimal-pad"
            />
            <TouchableOpacity 
              style={styles.locationButton}
              onPress={() => Alert.alert('Location', 'Current location would be fetched here')}
            >
              <Text style={styles.locationButtonText}>📍 Use Current Location</Text>
            </TouchableOpacity>
          </View>
        );

      case 'geo':
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Latitude (e.g., 37.7749)"
              value={currentData.latitude}
              onChangeText={(value) => updateQRData('latitude', value)}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude (e.g., -122.4194)"
              value={currentData.longitude}
              onChangeText={(value) => updateQRData('longitude', value)}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Altitude (optional)"
              value={currentData.altitude}
              onChangeText={(value) => updateQRData('altitude', value)}
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

      case 'myqr':
        return (
          <View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter your custom QR data..."
              value={currentData.customData}
              onChangeText={(value) => updateQRData('customData', value)}
              multiline
              numberOfLines={4}
            />
            <Text style={styles.helperText}>
              Create a personalized QR code with your custom data
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  const filteredTypes = qrTypes.filter(type => type.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create QR Code</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Category Selector */}
        <View style={styles.categorySelector}>
          <Text style={styles.sectionTitle}>Select Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.selectedCategoryLabel
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Type Selector */}
        <View style={styles.typeSelector}>
          <Text style={styles.sectionTitle}>Select Type</Text>
          <View style={styles.typeGrid}>
            {filteredTypes.map((type) => (
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

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Enter Details</Text>
          {renderInputFields()}
        </View>

        {/* QR Generator */}
        <QRGenerator qrValue={formatQRData()} barcodeType={selectedType} />
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
    padding: 20,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCategory: {
    backgroundColor: '#2196F3',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedCategoryLabel: {
    color: 'white',
    fontWeight: 'bold',
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
    fontSize: 20,
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 11,
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
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
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
  helperText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: -10,
    marginBottom: 15,
  },
  clipboardButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 15,
  },
  clipboardButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 15,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  securityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
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