import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';

interface Product {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  customer: string;
  address: string;
  total: string;
  products: Product[];
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Delivered';
  time: string;
  deliveryTime: string | null;
}

const OrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '101',
      customer: 'John Doe',
      address: '123 Street, New York, NY',
      total: '₹15.99',
      products: [{ name: 'Green Tea', quantity: 1 }, { name: 'Masala Chai', quantity: 2 }],
      status: 'Pending',
      time: '10:30 AM',
      deliveryTime: null,
    },
    {
      id: '102',
      customer: 'Jane Smith',
      address: '456 Avenue, Los Angeles, CA',
      total: '₹23.50',
      products: [{ name: 'Black Coffee', quantity: 1 }, { name: 'Ginger Tea', quantity: 1 }],
      status: 'Pending',
      time: '11:45 AM',
      deliveryTime: null,
    },
    {
      id: '103',
      customer: 'Robert Johnson',
      address: '789 Boulevard, Chicago, IL',
      total: '₹32.75',
      products: [{ name: 'Cold Brew', quantity: 2 }, { name: 'Herbal Tea', quantity: 1 }],
      status: 'Accepted',
      time: '09:15 AM',
      deliveryTime: '15 min',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editableOrder, setEditableOrder] = useState<Order | null>(null);

  const updateOrderStatus = (id: string, newStatus: 'Accepted' | 'Rejected' | 'Delivered', deliveryTime?: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status: newStatus, deliveryTime: deliveryTime || order.deliveryTime } : order
      )
    );
    setModalVisible(false);
  };

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const openEditModal = (order: Order) => {
    setEditableOrder({ ...order });
    setEditModalVisible(true);
  };

  const updateProductQuantity = (index: number, quantity: number) => {
    if (!editableOrder) {return;}

    const updatedProducts = [...editableOrder.products];
    updatedProducts[index].quantity = quantity > 0 ? quantity : 1;

    setEditableOrder({ ...editableOrder, products: updatedProducts });
  };

  const saveOrderChanges = () => {
    if (!editableOrder) {return;}

    setOrders(prevOrders =>
      prevOrders.map(order => (order.id === editableOrder.id ? editableOrder : order))
    );
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Order Management</Text>
        <Text style={styles.subHeader}>Manage customer orders</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={[styles.orderCard, getStatusCardStyle(item.status)]}>
            <Card.Content>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{item.id}</Text>
                <View style={[styles.statusBadge, getStatusBadgeStyle(item.status)]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.customerInfo}>
                <Text style={styles.orderCustomer}>{item.customer}</Text>
                <Text style={styles.orderTotal}>{item.total}</Text>
              </View>

              <Text style={styles.orderAddress}>{item.address}</Text>

              <View style={styles.timeContainer}>
                <Text style={styles.orderTime}>Placed: {item.time}</Text>
                {item.deliveryTime && (
                  <Text style={styles.deliveryTime}>Est. Delivery: {item.deliveryTime}</Text>
                )}
              </View>

              <View style={styles.productsContainer}>
                <Text style={styles.productsHeader}>Items:</Text>
                {item.products.map((product, index) => (
                  <View key={index} style={styles.productItem}>
                    <Text style={styles.productName}>• {product.name}</Text>
                    <Text style={styles.productQuantity}>x{product.quantity}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.buttonContainer}>
                {item.status === 'Pending' && (
                  <>
                    <Button
                      mode="contained"
                      style={styles.acceptButton}
                      labelStyle={styles.buttonLabel}
                      onPress={() => openModal(item)}
                    >
                      Accept
                    </Button>
                    <Button
                      mode="outlined"
                      style={styles.rejectButton}
                      labelStyle={styles.rejectButtonLabel}
                      onPress={() => updateOrderStatus(item.id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}

                {item.status === 'Accepted' && (
                  <>
                    <Button
                      mode="outlined"
                      style={styles.editButton}
                      labelStyle={styles.editButtonLabel}
                      onPress={() => openEditModal(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      mode="contained"
                      style={styles.deliverButton}
                      labelStyle={styles.buttonLabel}
                      onPress={() => updateOrderStatus(item.id, 'Delivered')}
                    >
                      Deliver
                    </Button>
                  </>
                )}
              </View>
            </Card.Content>
          </Card>
        )}
      />

      {/* Delivery Time Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Delivery Time</Text>
            <View style={styles.timeButtonsContainer}>
              {['5 min', '10 min', '15 min', '20 min', '30 min'].map(time => (
                <TouchableOpacity
                  key={time}
                  style={styles.timeButton}
                  onPress={() => selectedOrder && updateOrderStatus(selectedOrder.id, 'Accepted', time)}
                >
                  <Text style={styles.timeButtonText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              mode="text"
              style={styles.cancelButton}
              labelStyle={styles.cancelButtonLabel}
              onPress={() => setModalVisible(false)}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

      {/* Edit Order Modal */}
      <Modal visible={editModalVisible} animationType="fade" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Order Items</Text>

            {editableOrder && editableOrder.products.map((product, index) => (
              <View key={index} style={styles.editRow}>
                <Text style={styles.editProductName}>{product.name}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateProductQuantity(index, product.quantity - 1)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    value={String(product.quantity)}
                    onChangeText={text => updateProductQuantity(index, parseInt(text, 10) || 1)}
                  />
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateProductQuantity(index, product.quantity + 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <Button
              mode="contained"
              style={styles.saveButton}
              labelStyle={styles.buttonLabel}
              onPress={saveOrderChanges}
            >
              Save Changes
            </Button>
            <Button
              mode="text"
              style={styles.cancelButton}
              labelStyle={styles.cancelButtonLabel}
              onPress={() => setEditModalVisible(false)}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Style helper functions
const getStatusCardStyle = (status: string) => {
  return {
    borderLeftWidth: 4,
    borderLeftColor:
      status === 'Accepted' ? '#4CAF50' :
      status === 'Pending' ? '#FFC107' :
      status === 'Rejected' ? '#F44336' :
      '#2196F3',
  };
};

const getStatusBadgeStyle = (status: string) => {
  return {
    backgroundColor:
      status === 'Accepted' ? 'rgba(76, 175, 80, 0.2)' :
      status === 'Pending' ? 'rgba(255, 193, 7, 0.2)' :
      status === 'Rejected' ? 'rgba(244, 67, 54, 0.2)' :
      'rgba(33, 150, 243, 0.2)',
  };
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 15,
    backgroundColor: '#6200EE',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
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
    paddingBottom: 20,
  },
  orderCard: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  orderAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderTime: {
    fontSize: 13,
    color: '#666',
  },
  deliveryTime: {
    fontSize: 13,
    color: '#6200EE',
    fontWeight: '600',
  },
  productsContainer: {
    marginBottom: 15,
  },
  productsHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  productName: {
    fontSize: 14,
    color: '#555',
  },
  productQuantity: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  rejectButton: {
    flex: 1,
    marginLeft: 5,
    borderColor: '#F44336',
    borderRadius: 8,
  },
  rejectButtonLabel: {
    color: '#F44336',
  },
  editButton: {
    flex: 1,
    marginRight: 5,
    borderColor: '#FF9800',
    borderRadius: 8,
  },
  editButtonLabel: {
    color: '#FF9800',
  },
  deliverButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  timeButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  timeButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  timeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  editRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  editProductName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 5,
    marginHorizontal: 5,
    width: 50,
    textAlign: 'center',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6200EE',
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonLabel: {
    color: '#6200EE',
  },
});

export default OrdersScreen;
