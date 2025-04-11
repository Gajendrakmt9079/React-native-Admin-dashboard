import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const SalesReportsScreen: React.FC = () => {
  // Sample Revenue Data (Monthly)
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [5000, 7000, 6000, 8000, 7500, 9000],
      },
    ],
  };

  // Sample Order Distribution Data
  const pieChartData = [
    { name: 'Tea', population: 45, color: '#FF6B6B', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Coffee', population: 30, color: '#4ECDC4', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Juices', population: 15, color: '#45B7D1', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Others', population: 10, color: '#FFA07A', legendFontColor: '#333', legendFontSize: 14 },
  ];

  // Summary data
  const summaryData = [
    { title: 'Total Revenue', value: '₹42,500', icon: '₹' },
    { title: 'Total Orders', value: '200', icon: '📦' },
    { title: 'Top Selling', value: 'Tea', icon: '🏆' },
    { title: 'Avg. Order Value', value: '₹212.50', icon: '📊' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sales Analytics</Text>
        <Text style={styles.subHeader}>June 2023 Report</Text>
      </View>

      {/* Monthly Revenue Bar Chart */}
      <View style={styles.card}>
        <Text style={styles.chartTitle}>Monthly Revenue</Text>
        <BarChart
          data={revenueData}
          width={screenWidth - 40}
          height={240}
          yAxisLabel="₹"
          chartConfig={barChartConfig}
          verticalLabelRotation={0}
          fromZero
          style={styles.chart}
          yAxisSuffix={''}
          showBarTops={true}
          withInnerLines={true}
        />
      </View>

      {/* Order Distribution Pie Chart */}
      <View style={styles.card}>
        <Text style={styles.chartTitle}>Product Distribution</Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={pieChartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
          hasLegend={true}
        />
      </View>

      {/* Sales Summary Cards */}
      <Text style={styles.sectionTitle}>Key Metrics</Text>
      <View style={styles.summaryGrid}>
        {summaryData.map((item, index) => (
          <View key={index} style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>{item.icon}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
            <Text style={styles.summaryLabel}>{item.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Chart Configurations
const barChartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  fillShadowGradient: '#6200EE',
  fillShadowGradientOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.7,
  decimalPlaces: 0,
  propsForBackgroundLines: {
    strokeWidth: 0.5,
    strokeDasharray: '',
    stroke: '#e0e0e0',
  },
  propsForLabels: {
    fontSize: 12,
    fontWeight: '500',
  },
};

const pieChartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 30,
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
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 8,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 5,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default SalesReportsScreen;
