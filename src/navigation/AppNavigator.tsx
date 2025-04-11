/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import Screens
import DashboardScreen from '../screens/DashboardScreen';
import OrdersScreen from '../screens/OrdersScreen';
import UsersScreen from '../screens/UsersScreen';
import SalesReportsScreen from '../screens/ReportsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NotifyScreen from '../screens/NotifyScreen';




// Define types for navigation
export type RootStackParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Users: undefined;
  Reports: undefined;
  NotifyStack: undefined; // Stack screen for notifications
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const NotifyStack = createStackNavigator();

const NotifyStackNavigator: React.FC = () => {
  return (
    <NotifyStack.Navigator>
      <NotifyStack.Screen
        name="NotifyScreen"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <NotifyStack.Screen
        name="NotifyDetailsScreen"
        component={NotifyScreen}
        options={{ title: 'Notification Details' }}
      />
    </NotifyStack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="dashboard" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="assignment" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Users"
          component={UsersScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="people" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Reports"
          component={SalesReportsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="bar-chart" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="NotifyStack"
          component={NotifyStackNavigator}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="notifications" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
