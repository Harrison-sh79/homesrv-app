import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../utils/Colors'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

const Header = () => {
  const { user } = useUser()
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.user_container}>
          <Image source={{ uri: user?.imageUrl }} style={styles.img} />
          <View style={styles.user_txt_container}>
            <Text style={styles.user_txt}>Welcome to:</Text>
            <Text style={styles.user_txt}>{user?.fullName}</Text>
          </View>
        </View>
        <View>
          <Ionicons name="bookmark-outline" size={26} color={Colors.WHITE} />
        </View>
      </View>
      <View style={styles.searchview}>
        <TextInput placeholder='search' style={styles.searchtext} clearButtonMode={'while-editing'} />
        <View style={styles.searchicon} >
          <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 215,
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    paddingTop: 70,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  subcontainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_txt_container: {
    marginLeft: 10,
  },
  user_txt: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: Colors.WHITE,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  searchview: {
    width: '85%',
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  searchtext: {
    width: '100%',
    padding: 14,
    fontSize: 18,
    fontFamily: 'outfit'
  },
  searchicon: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
  }
})