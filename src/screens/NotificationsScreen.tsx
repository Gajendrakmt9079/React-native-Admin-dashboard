import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
  { id: '1', title: 'New Order Received', message: 'Order #1234 has been placed.', time: 'Just now' },
  { id: '2', title: 'Order Dispatched', message: 'Order #1233 is out for delivery.', time: '5 min ago' },
  { id: '3', title: 'Payment Received', message: 'Payment for Order #1232 confirmed.', time: '10 min ago' },
  { id: '4', title: 'New User Signup', message: 'A new user has registered.', time: '20 min ago' },
];

const NotificationScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  notificationCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  time: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
    textAlign: 'right',
  },
});

export default NotificationScreen;
