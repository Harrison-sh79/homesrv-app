import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Heading = ({text, isViewAll=false}:any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{text}</Text>
      {isViewAll && (<Text>View All</Text>)}
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  txt: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
})