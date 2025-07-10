import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  FlatList,
  RefreshControl 
} from 'react-native';

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'generated', 'scanned'

  // Sample data - in a real app, this would come from storage
  const sampleHistory = [
    {
      id: '1',
      type: 'generated',
      data: 'https://example.com',
      qrType: 'URL',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: '2',
      type: 'scanned',
      data: 'Contact: John Doe\nPhone: +1234567890',
      qrType: 'Contact',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
    },
    {
      id: '3',
      type: 'generated',
      data: 'WIFI:T:WPA;S:MyNetwork;P:password123;;',
      qrType: 'WiFi',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '4',
      type: 'scanned',
      data: 'This is a text message from QR code',
      qrType: 'Text',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3,
    },
  ];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    // In a real app, load from AsyncStorage or SQLite
    setHistoryData(sampleHistory);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadHistory();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getFilteredData = () => {
    if (filter === 'all') return historyData;
    return historyData.filter(item => item.type === filter);
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleItemPress = (item) => {
    Alert.alert(
      'QR Code Details',
      `Type: ${item.qrType}\nData: ${item.data}`,
      [
        { text: 'Copy', onPress: () => copyToClipboard(item.data) },
        { text: 'Share', onPress: () => shareItem(item) },
        { text: 'Delete', onPress: () => deleteItem(item.id), style: 'destructive' },
        { text: 'Close', style: 'cancel' },
      ]
    );
  };

  const copyToClipboard = (text) => {
    // In a real app, use @react-native-clipboard/clipboard
    Alert.alert('Copied', 'Text copied to clipboard');
  };

  const shareItem = (item) => {
    // In a real app, use React Native Share
    Alert.alert('Share', 'Sharing functionality would be implemented here');
  };

  const deleteItem = (id) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          setHistoryData(prev => prev.filter(item => item.id !== id));
        }},
      ]
    );
  };

  const clearAllHistory = () => {
    Alert.alert(
      'Clear All History',
      'Are you sure you want to clear all history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: () => {
          setHistoryData([]);
        }},
      ]
    );
  };

  const getItemIcon = (type, qrType) => {
    if (type === 'generated') {
      switch (qrType) {
        case 'URL': return '🔗';
        case 'WiFi': return '📶';
        case 'Contact': return '👤';
        case 'Text': return '📝';
        case 'Email': return '📧';
        case 'SMS': return '💬';
        case 'Phone': return '📞';
        default: return '📱';
      }
    } else {
      return '📷';
    }
  };

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity style={styles.historyItem} onPress={() => handleItemPress(item)}>
      <View style={styles.itemHeader}>
        <View style={styles.itemIcon}>
          <Text style={styles.iconText}>{getItemIcon(item.type, item.qrType)}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemType}>{item.qrType}</Text>
          <Text style={styles.itemAction}>
            {item.type === 'generated' ? 'Generated' : 'Scanned'} • {formatDate(item.date)}
          </Text>
        </View>
        <View style={[styles.typeIndicator, item.type === 'generated' ? styles.generated : styles.scanned]}>
          <Text style={styles.typeText}>{item.type === 'generated' ? 'GEN' : 'SCAN'}</Text>
        </View>
      </View>
      <Text style={styles.itemData} numberOfLines={2}>
        {item.data}
      </Text>
    </TouchableOpacity>
  );

  const FilterButton = ({ filterType, label }) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterType && styles.activeFilter]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[styles.filterText, filter === filterType && styles.activeFilterText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        {historyData.length > 0 && (
          <TouchableOpacity onPress={clearAllHistory} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        <FilterButton filterType="all" label="All" />
        <FilterButton filterType="generated" label="Generated" />
        <FilterButton filterType="scanned" label="Scanned" />
      </View>

      {getFilteredData().length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>No History Yet</Text>
          <Text style={styles.emptyText}>
            {filter === 'all' 
              ? 'Your generated and scanned QR codes will appear here'
              : `No ${filter} QR codes yet`
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={getFilteredData()}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2196F3']}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 20,
  },
  title: {
    marginTop: 20,  
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  clearText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  listContainer: {
    padding: 20,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  itemInfo: {
    flex: 1,
  },
  itemType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemAction: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  typeIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  generated: {
    backgroundColor: '#e8f5e8',
  },
  scanned: {
    backgroundColor: '#e8f0ff',
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  itemData: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HistoryScreen;