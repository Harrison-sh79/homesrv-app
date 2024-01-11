import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/home/HomeScreen'
import BusinessListByCategory from '../screens/home/buness/BusinessListByCategory'
import BusinessDetail from '../screens/home/buness/BusinessDetail'

export type HomeStackParamList = {
  home: undefined,
  businessByCategory: {
    category: any
  },
  businessDetailByHome: {
    business: any
  }
}

const Stack = createStackNavigator<HomeStackParamList>()

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }} initialRouteName='home' >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="businessByCategory" component={BusinessListByCategory} options={{
        animationEnabled: true,
      }}/>
      <Stack.Screen name="businessDetailByHome" component={BusinessDetail} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator