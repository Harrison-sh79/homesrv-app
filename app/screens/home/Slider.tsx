import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSliders } from '../../api/HyGraphQL'
import Colors from '../../utils/Colors'
import Heading from '../../components/Heading'

const Slider = () => {

  const [sliders, setSliders] = useState([])

  useEffect(() => {
    getSliders_()
  }, [])

  const getSliders_ = async () => {
    const result: any = await getSliders()
    setSliders(result?.sliders)
  }


  return sliders && (
    <View style={styles.container}>
      <Heading text={'Offers For You'} />
      <FlatList
        data={sliders}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // pagingEnabled
        renderItem={({item, index}:any) => (
          <View key={index} style={styles.slider_container} >
            <Image source={{uri:item?.image?.url}} style={styles.slider_img}/>
            {/* <Text style={styles.slider_txt}>{item?.name}</Text> */}
          </View>
        )}
      />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
  container:{
  },
  slider_img: {
    width: Dimensions.get('screen').width * 0.6,
    height: 150,
    borderRadius: 15
  },
  slider_container:{
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
    marginTop: 10
  },
  slider_txt: {
    fontFamily: 'outfit-semibold',
    fontSize: 20,
    color: Colors.BLACK,
    textAlign: 'center',
    marginTop:5
  }
})

