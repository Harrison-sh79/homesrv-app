import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import Heading from '../../../components/Heading'

const BusinessPhotos = ({ business }: any) => {
  return business?.images && (
    <View>
      <Heading text={'Photos'} />
      <FlatList
        data={business?.images}
        numColumns={2}
        renderItem={({ item, index }: any) => (
            <Image source={{ uri: item?.url }} style={styles.img} />
        )}
      />
    </View>
  )
}

export default BusinessPhotos

const styles = StyleSheet.create({
  img: {
    width: '100%',
    flex: 1,
    height: 120,
    borderRadius: 15,
    margin: 7
  },
})
