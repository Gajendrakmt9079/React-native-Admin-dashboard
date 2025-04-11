import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Card, Button, IconButton} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Order {
  id: string;
  total: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Delivered';
  time: string;
}

interface User {
  id: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  orders: Order[];
}

const UsersScreen: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      address: '123 Street, New York, NY',
      contact: '+1 234 567 890',
      email: 'john@example.com',
      orders: [
        {id: '101', total: '₹15.99', status: 'Delivered', time: '10:30 AM'},
        {id: '102', total: '₹23.50', status: 'Pending', time: '11:45 AM'},
      ],
    },
    {
      id: '2',
      name: 'Jane Smith',
      address: '456 Avenue, Los Angeles, CA',
      contact: '+1 987 654 321',
      email: 'jane@example.com',
      orders: [
        {id: '103', total: '₹10.50', status: 'Accepted', time: '09:15 AM'},
      ],
    },
    {
      id: '3',
      name: 'Robert Johnson',
      address: '789 Boulevard, Chicago, IL',
      contact: '+1 555 123 4567',
      email: 'robert@example.com',
      orders: [
        {id: '104', total: '₹32.75', status: 'Delivered', time: 'Yesterday'},
        {id: '105', total: '₹18.20', status: 'Rejected', time: '2 days ago'},
      ],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const openModal = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return '#FFA500';
      case 'Accepted':
        return '#4CAF50';
      case 'Rejected':
        return '#F44336';
      case 'Delivered':
        return '#2196F3';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Users</Text>
        <Text style={styles.subHeader}>Manage your customers</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => openModal(item)} activeOpacity={0.9}>
            <Card style={styles.userCard} elevation={3}>
              <Card.Content>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {item.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </Text>
                  </View>
                  <View style={styles.userTextContainer}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                  </View>
                  <View style={styles.orderBadge}>
                    <Text style={styles.orderBadgeText}>
                      {item.orders.length}
                    </Text>
                  </View>
                </View>
                <View style={styles.contactInfo}>
                  <MaterialIcons name="phone" size={16} color="#555" />
                  <Text style={styles.contactText}>{item.contact}</Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button
                  mode="outlined"
                  onPress={() => openModal(item)}
                  style={styles.viewButton}
                  labelStyle={styles.viewButtonText}>
                  View Details
                </Button>
              </Card.Actions>
            </Card>
          </TouchableOpacity>
        )}
      />

      {/* Modal for User Details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}>
        <Animated.View style={[styles.modalContainer, {opacity: fadeAnim}]}>
          <View style={styles.modalContent}>
            {selectedUser && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalAvatar}>
                    <Text style={styles.modalAvatarText}>
                      {selectedUser.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </Text>
                  </View>
                  <Text style={styles.modalTitle}>{selectedUser.name}</Text>
                  <IconButton
                    icon="close"
                    onPress={closeModal}
                    style={styles.closeButton}
                    size={24}
                  />
                </View>

                <View style={styles.detailSection}>
                  <MaterialIcons name="email" size={20} color="#555" />
                  <Text style={styles.modalText}>{selectedUser.email}</Text>
                </View>

                <View style={styles.detailSection}>
                  <MaterialIcons name="phone" size={20} color="#555" />
                  <Text style={styles.modalText}>{selectedUser.contact}</Text>
                </View>

                <View style={styles.detailSection}>
                  <MaterialIcons name="location-on" size={20} color="#555" />
                  <Text style={styles.modalText}>{selectedUser.address}</Text>
                </View>

                <Text style={styles.sectionTitle}>Order History</Text>
                <View style={styles.ordersContainer}>
                  {selectedUser.orders.map(order => (
                    <View key={order.id} style={styles.orderCard}>
                      <View style={styles.orderHeader}>
                        <Text style={styles.orderId}>Order #{order.id}</Text>
                        <Text
                          style={[
                            styles.orderStatus,
                            {backgroundColor: getStatusColor(order.status)},
                          ]}>
                          {order.status}
                        </Text>
                      </View>
                      <View style={styles.orderDetails}>
                        <Text style={styles.orderTotal}>
                          Total: {order.total}
                        </Text>
                        <Text style={styles.orderTime}>{order.time}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}
            <Button
              mode="contained"
              onPress={closeModal}
              style={styles.closeModalButton}
              labelStyle={styles.closeModalButtonText}>
              Close
            </Button>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#6200ee',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeader: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  listContent: {
    padding: 15,
    paddingTop: 10,
  },
  userCard: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'center',
  },
  modalAvatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  userTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  orderBadge: {
    backgroundColor: '#ff4081',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  contactText: {
    marginLeft: 5,
    color: '#555',
    fontSize: 14,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },
  viewButton: {
    borderColor: '#6200ee',
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#6200ee',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  closeButton: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  detailSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  ordersContainer: {
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderId: {
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTotal: {
    color: '#555',
  },
  orderTime: {
    color: '#777',
    fontSize: 12,
  },
  closeModalButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 5,
    marginTop: 10,
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UsersScreen;
