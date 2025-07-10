
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [qrRef, setQrRef] = useState(null);

  const generateQR = () => {
    if (inputText.trim()) {
      setQrValue(inputText.trim());
    } else {
      Alert.alert('Error', 'Please enter text or URL to generate QR code');
    }
  };

  const clearQR = () => {
    setInputText('');
    setQrValue('');
  };

  const shareQR = () => {
    if (qrRef) {
      qrRef.toDataURL((dataURL) => {
        Share.share({
          message: `QR Code for: ${qrValue}`,
          url: `data:image/png;base64,${dataURL}`,
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter text or URL:</Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type your text or URL here..."
        multiline
        numberOfLines={3}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={generateQR}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearQR}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {qrValue ? (
        <View style={styles.qrContainer}>
          <QRCode
            value={qrValue}
            size={200}
            color="black"
            backgroundColor="white"
            getRef={(c) => setQrRef(c)}
          />
          <Text style={styles.qrText}>{qrValue}</Text>

          <TouchableOpacity style={styles.shareButton} onPress={shareQR}>
            <Text style={styles.buttonText}>Share QR Code</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#f44336',
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  qrText: {
    marginTop: 15,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default QRGenerator;
