import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { HomeStackParamList } from '../../navigations/HomeStackNavigator'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

type homeStackProps = StackNavigationProp<HomeStackParamList, 'businessDetailByHome'>

const BusinessListItemSmall = ({ business }: any) => {

  const home_navigation = useNavigation<homeStackProps>()

  return business && (
    <TouchableOpacity style={styles.container}
      onPress={() => home_navigation.navigate('businessDetailByHome', { business })}
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.img} />
      <View style={styles.info_container}>
        <Text style={styles.txt_name}>{business?.name}</Text>
        <Text style={styles.txt_contact}>{business?.contactPerson}</Text>
        <Text style={styles.txt_category}>{business?.category?.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BusinessListItemSmall

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.WHITE
  },
  img: {
    width: 160,
    height: 100,
    borderRadius: 15,
    marginBottom: 5
  },
  info_container: {
    padding: 3,
    display: 'flex',
    gap: 5
  },
  txt_name: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
  },
  txt_contact: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.GRAY
  },
  txt_category: {
    fontFamily: 'outfit',
    fontSize: 10,
    color: Colors.PRIMARY,
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 7
  },
})
