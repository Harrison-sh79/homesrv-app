import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import BookingScreen from '../screens/booking/BookingScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import BookingStackNavigator from './BookingStackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.PRIMARY,
      tabBarItemStyle: {marginTop: 8}
    }}>
      <Tab.Screen name="homestack" component={HomeStackNavigator} options={{
        tabBarLabel: ({ color }) => (
          <Text style={[{ color: color }, styles.txt]}>Home</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="booking" component={BookingStackNavigator} options={{
        tabBarLabel: ({ color }) => (
          <Text style={[{ color: color }, styles.txt]}>Booking</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="bookmark" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="profile" component={ProfileScreen} options={{
        tabBarLabel:({ color }) => (
          <Text style={[{ color: color }, styles.txt]}>Profile</Text>
        ),
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={size} color={color} />
        ),
      }} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  txt: {
    fontSize: 14,
    fontFamily: 'outfit',
    marginBottom: -8
  }
})
