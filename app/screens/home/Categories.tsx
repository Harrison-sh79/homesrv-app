import { View, Text, StyleSheet, FlatList, Image, Animated, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategory } from '../../api/HyGraphQL'
import Heading from '../../components/Heading'
import Colors from '../../utils/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import HomeStackNavigator, { HomeStackParamList } from '../../navigations/HomeStackNavigator'

type HomeStackProp = StackNavigationProp<HomeStackParamList, 'businessByCategory'>

const Categories = () => {

  const [categories, setCategories] = useState([])
  const navigation = useNavigation<HomeStackProp>()

  // const animatedValue = new Animated.Value(0);

  useEffect(() => {
    getCategory_()
  }, [])

  // useEffect(() => {
  //   const listener = animatedValue.addListener(({ value }) => {
  //     // Handle the animated value update here
  //     console.log('Animated value updated:', value);
  //   });

  //   // Cleanup the listener when the component is unmounted
  //   return () => {
  //     animatedValue.removeListener(listener);
  //   };
  // }, [animatedValue]);

  const getCategory_ = async () => {
    const result: any = await getCategory()
    setCategories(result?.categories)

  }

  return categories && (
    <View style={styles.container}>
      <Heading text={'Categories'} isViewAll={true} />
      {categories && (
        <FlatList
          data={categories}
          numColumns={4}
          renderItem={({ item, index }: any):any => index <=2 && (
            <Pressable key={index} style={styles.fl_container} 
            onPress={()=>navigation.navigate('businessByCategory', {
              category: item?.name
            })}>
              <View style={styles.fl_container1}>
                <Image source={{ uri: item?.icon?.url }} style={styles.fl_image} />
              </View>
              <Text style={styles.fl_txt}>{item?.name}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  fl_container: {
    flex: 1,
    alignItems: 'center',
  }, 
  fl_container1: {
    padding: 10,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 99,
  },
  fl_image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  fl_txt: {
    fontFamily: 'outfit-medium',
    fontSize: 15,
    marginTop: 5,
  }
})