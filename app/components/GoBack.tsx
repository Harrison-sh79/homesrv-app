import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const GoBack = ({navigation, name }:any) => {
  return (
    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={25} color="black" />
      <Text style={styles.txt_back}>{name}</Text>
    </TouchableOpacity>
  )
}

export default GoBack

const styles = StyleSheet.create({
  back: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  txt_back: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    paddingLeft: 5
  },
})