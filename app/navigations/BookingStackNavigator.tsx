import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BookingScreen from '../screens/booking/BookingScreen'
import BusinessDetail from '../screens/home/buness/BusinessDetail'

export type bookingStackParams = {
  booking: undefined,
  businessDetailByBooking: { business: any }
}

const Stack = createStackNavigator<bookingStackParams>()

const BookingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="booking" component={BookingScreen} />
      <Stack.Screen name="businessDetailByBooking" component={BusinessDetail} />
    </Stack.Navigator>
  )
}

export default BookingStackNavigator