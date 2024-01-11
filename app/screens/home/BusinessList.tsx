import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import { getBusinessList } from '../../api/HyGraphQL'
import BusinessListItemSmall from './BusinessListItemSmall'

const BusinessList = () => {

  const [businessLists, setBusinessLists] = useState([])

  useEffect(() => {
    getBusinessList_()
  }, [])

  const getBusinessList_ = async ()=>{
    const resp:any = await getBusinessList()
    setBusinessLists(resp?.businessLists)
  }

  return businessLists && (
    <View style={styles.container}>
      <Heading text={'Latest Business'} isViewAll={true} />
      <FlatList 
      data={businessLists}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}:any) =>(
        <View key={index} style={{marginRight: 10, marginTop: 15}}>
          <BusinessListItemSmall business={item} />
        </View>
      )}
      />
    </View>
  )
}

export default BusinessList

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  }
})
