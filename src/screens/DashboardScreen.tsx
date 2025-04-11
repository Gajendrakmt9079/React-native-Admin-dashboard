import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const DashboardScreen: React.FC = () => {
  // Dashboard metrics data
  const dashboardStats = [
    {
      id: '1',
      title: 'Total Orders',
      value: '1,245',
      icon: 'assignment',
      color: '#FF7043',
      trend: '12% ↑',
    },
    {
      id: '2',
      title: 'Active Users',
      value: '785',
      icon: 'people',
      color: '#42A5F5',
      trend: '5% ↑',
    },
    {
      id: '3',
      title: 'Sales Revenue',
      value: '₹12,450',
      icon: 'bar-chart',
      color: '#66BB6A',
      trend: '18% ↑',
    },
  ];

  // Recent orders data
  const recentOrders = [
    {
      id: '101',
      customer: 'John Doe',
      address: '123 Main St, New York, NY',
      total: '₹15.99',
      status: 'Completed',
      time: '10:30 AM',
      items: [
        { name: 'Green Tea', quantity: 1, price: '₹5.99' },
        { name: 'Masala Chai', quantity: 2, price: '₹5.00' },
      ],
    },
    {
      id: '102',
      customer: 'Jane Smith',
      address: '456 Oak Ave, Los Angeles, CA',
      total: '₹23.50',
      status: 'Pending',
      time: '11:45 AM',
      items: [
        { name: 'Black Coffee', quantity: 1, price: '₹8.50' },
        { name: 'Sandwich', quantity: 1, price: '₹15.00' },
      ],
    },
    {
      id: '103',
      customer: 'Alex Johnson',
      address: '789 Pine Rd, Chicago, IL',
      total: '₹9.75',
      status: 'Cancelled',
      time: '9:15 AM',
      items: [
        { name: 'Herbal Tea', quantity: 1, price: '₹9.75' },
      ],
    },
  ];

  const [filter, setFilter] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Convert time to minutes for sorting
  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(/[: ]/);
    const period = time.includes('AM') ? 0 : 12;
    return (parseInt(hours, 10) % 12 + period) * 60 + parseInt(minutes, 10);
  };

  // Sort and filter orders
  const sortedOrders = [...recentOrders].sort(
    (a, b) => convertTimeToMinutes(b.time) - convertTimeToMinutes(a.time)
  );

  const filteredOrders = filter === 'Last Hour'
    ? sortedOrders.filter(order => convertTimeToMinutes(order.time) >= convertTimeToMinutes('12:00 PM') - 60)
    : sortedOrders;

  // Handle view details button press
  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dashboard Overview</Text>
        <Text style={styles.subHeader}>Today's performance metrics</Text>
      </View>

      {/* Stats Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsContainer}
      >
        {dashboardStats.map((stat) => (
          <Card key={stat.id} style={[styles.card, { backgroundColor: stat.color }]}>
            <View style={styles.cardContent}>
              <View style={styles.cardIconContainer}>
                <MaterialIcons name={stat.icon} size={28} color="white" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{stat.title}</Text>
                <Text style={styles.cardValue}>{stat.value}</Text>
                <Text style={styles.cardTrend}>{stat.trend}</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      {/* Recent Orders Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === null && styles.activeFilter]}
            onPress={() => setFilter(null)}
          >
            <Text style={[styles.filterText, filter === null && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'Last Hour' && styles.activeFilter]}
            onPress={() => setFilter('Last Hour')}
          >
            <Text style={[styles.filterText, filter === 'Last Hour' && styles.activeFilterText]}>Last Hour</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderCustomer}>{item.customer}</Text>
                <Text style={styles.orderTime}>{item.time}</Text>
              </View>
              <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.orderItemsContainer}>
              {item.items.map((product, index) => (
                <Text key={index} style={styles.orderItem}>• {product.name} (x{product.quantity})</Text>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>{item.total}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => handleViewDetails(item)}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />

      {/* Order Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Order #{selectedOrder.id}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Customer Information</Text>
                  <Text style={styles.modalText}>Name: {selectedOrder.customer}</Text>
                  <Text style={styles.modalText}>Address: {selectedOrder.address}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Order Details</Text>
                  <Text style={styles.modalText}>Order Time: {selectedOrder.time}</Text>
                  <View style={[styles.statusBadge, getStatusStyle(selectedOrder.status)]}>
                    <Text style={styles.statusText}>Status: {selectedOrder.status}</Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Items</Text>
                  {selectedOrder.items.map((item: any, index: number) => (
                    <View key={index} style={styles.itemRow}>
                      <Text style={styles.itemName}>• {item.name}</Text>
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.modalFooter}>
                  <Text style={styles.totalAmount}>Total: {selectedOrder.total}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Status style helper
const getStatusStyle = (status: string) => {
  return {
    backgroundColor:
      status === 'Completed' ? 'rgba(76, 175, 80, 0.2)' :
      status === 'Pending' ? 'rgba(255, 152, 0, 0.2)' :
      'rgba(244, 67, 54, 0.2)',
  };
};

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
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeader: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  statsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 40,
  },
  card: {
    width: 200,
    height: 110,
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  cardIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cardTrend: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 8,
  },
  activeFilter: {
    backgroundColor: '#6200EE',
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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
  orderItemsContainer: {
    marginBottom: 10,
  },
  orderItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  detailsButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  detailsButtonText: {
    fontSize: 12,
    color: '#6200EE',
    fontWeight: '500',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalSection: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
    color: '#555',
    flex: 2,
  },
  itemDetails: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  modalFooter: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
  },
});

export default DashboardScreen;
