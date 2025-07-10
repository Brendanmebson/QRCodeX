import { Alert, Linking, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';

// Camera permissions for QR scanning
export const requestCameraPermission = async () => {
  try {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Camera permission error:', error);
    return false;
  }
};

export const checkCameraPermission = async () => {
  try {
    const { status } = await Camera.getCameraPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Camera permission check error:', error);
    return false;
  }
};

// Media library permissions for saving QR codes
export const requestMediaLibraryPermission = async () => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Media library permission error:', error);
    return false;
  }
};

export const checkMediaLibraryPermission = async () => {
  try {
    const { status } = await MediaLibrary.getPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Media library permission check error:', error);
    return false;
  }
};

// Location permissions for location QR codes
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Location permission error:', error);
    return false;
  }
};

export const checkLocationPermission = async () => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Location permission check error:', error);
    return false;
  }
};

// Contacts permissions for contact QR codes
export const requestContactsPermission = async () => {
  try {
    const { status } = await Contacts.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Contacts permission error:', error);
    return false;
  }
};

export const checkContactsPermission = async () => {
  try {
    const { status } = await Contacts.getPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Contacts permission check error:', error);
    return false;
  }
};

// Generic permission handler with user-friendly messages
export const handlePermissionRequest = async (permissionType, customMessage = null) => {
  const permissions = {
    camera: {
      request: requestCameraPermission,
      check: checkCameraPermission,
      message: customMessage || 'Camera access is required to scan QR codes. Please enable camera permission in your device settings.',
      title: 'Camera Permission Required'
    },
    mediaLibrary: {
      request: requestMediaLibraryPermission,
      check: checkMediaLibraryPermission,
      message: customMessage || 'Media library access is required to save QR codes to your device. Please enable media library permission in your device settings.',
      title: 'Media Library Permission Required'
    },
    location: {
      request: requestLocationPermission,
      check: checkLocationPermission,
      message: customMessage || 'Location access is required to create location-based QR codes. Please enable location permission in your device settings.',
      title: 'Location Permission Required'
    },
    contacts: {
      request: requestContactsPermission,
      check: checkContactsPermission,
      message: customMessage || 'Contacts access is required to create contact QR codes. Please enable contacts permission in your device settings.',
      title: 'Contacts Permission Required'
    }
  };

  const permission = permissions[permissionType];
  if (!permission) {
    console.error('Unknown permission type:', permissionType);
    return false;
  }

  try {
    // First check if permission is already granted
    const hasPermission = await permission.check();
    if (hasPermission) {
      return true;
    }

    // Request permission
    const granted = await permission.request();
    if (granted) {
      return true;
    }

    // Show alert if permission denied
    Alert.alert(
      permission.title,
      permission.message,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() }
      ]
    );

    return false;
  } catch (error) {
    console.error(`Error handling ${permissionType} permission:`, error);
    return false;
  }
};

// Batch permission checker for multiple permissions
export const checkMultiplePermissions = async (permissionTypes) => {
  const results = {};
  
  for (const type of permissionTypes) {
    try {
      switch (type) {
        case 'camera':
          results[type] = await checkCameraPermission();
          break;
        case 'mediaLibrary':
          results[type] = await checkMediaLibraryPermission();
          break;
        case 'location':
          results[type] = await checkLocationPermission();
          break;
        case 'contacts':
          results[type] = await checkContactsPermission();
          break;
        default:
          results[type] = false;
      }
    } catch (error) {
      console.error(`Error checking ${type} permission:`, error);
      results[type] = false;
    }
  }
  
  return results;
};

// Request multiple permissions at once
export const requestMultiplePermissions = async (permissionTypes) => {
  const results = {};
  
  for (const type of permissionTypes) {
    results[type] = await handlePermissionRequest(type);
  }
  
  return results;
};

// Get current location (requires location permission)
export const getCurrentLocation = async () => {
  try {
    const hasPermission = await handlePermissionRequest('location');
    if (!hasPermission) {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    Alert.alert('Error', 'Unable to get current location. Please try again.');
    return null;
  }
};

// Save QR code image to device (requires media library permission)
export const saveQRCodeToDevice = async (imageUri, filename = 'qrcode') => {
  try {
    const hasPermission = await handlePermissionRequest('mediaLibrary');
    if (!hasPermission) {
      return false;
    }

    const asset = await MediaLibrary.createAssetAsync(imageUri);
    await MediaLibrary.createAlbumAsync('QRCodeX', asset, false);
    
    Alert.alert('Success', 'QR code saved to your device successfully!');
    return true;
  } catch (error) {
    console.error('Error saving QR code:', error);
    Alert.alert('Error', 'Failed to save QR code to your device.');
    return false;
  }
};

// Permission status constants
export const PERMISSION_STATUS = {
  GRANTED: 'granted',
  DENIED: 'denied',
  UNDETERMINED: 'undetermined',
  RESTRICTED: 'restricted', // iOS only
};

// Check if app has all required permissions
export const hasAllRequiredPermissions = async () => {
  const permissions = await checkMultiplePermissions(['camera', 'mediaLibrary']);
  return permissions.camera && permissions.mediaLibrary;
};

// Show permission rationale
export const showPermissionRationale = (permissionType) => {
  const rationales = {
    camera: {
      title: 'Camera Permission',
      message: 'QRCodeX needs camera access to scan QR codes. This permission is essential for the core functionality of the app.',
    },
    mediaLibrary: {
      title: 'Media Library Permission',
      message: 'QRCodeX needs access to your photo library to save generated QR codes so you can use them later.',
    },
    location: {
      title: 'Location Permission',
      message: 'QRCodeX needs location access to create location-based QR codes that can share your current position.',
    },
    contacts: {
      title: 'Contacts Permission',
      message: 'QRCodeX needs contacts access to create contact QR codes from your address book.',
    },
  };

  const rationale = rationales[permissionType];
  if (rationale) {
    Alert.alert(rationale.title, rationale.message);
  }
};

export default {
  requestCameraPermission,
  checkCameraPermission,
  requestMediaLibraryPermission,
  checkMediaLibraryPermission,
  requestLocationPermission,
  checkLocationPermission,
  requestContactsPermission,
  checkContactsPermission,
  handlePermissionRequest,
  checkMultiplePermissions,
  requestMultiplePermissions,
  getCurrentLocation,
  saveQRCodeToDevice,
  hasAllRequiredPermissions,
  showPermissionRationale,
  PERMISSION_STATUS,
};