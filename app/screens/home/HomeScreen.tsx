import { View, Text } from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Categories from './Categories'
import BusinessList from './BusinessList'

const HomeScreen = () => {
  return (
    <View>
      <Header />
      <View style={{padding: 15}}>
        <Slider />
        <Categories />
        <BusinessList />
      </View>
    </View>
  )
}

export default HomeScreen