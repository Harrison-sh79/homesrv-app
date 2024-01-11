import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Heading from '../../components/Heading';
import Colors from '../../utils/Colors';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigations/HomeStackNavigator';
import { bookingStackParams } from '../../navigations/BookingStackNavigator';
import { useNavigation } from '@react-navigation/native';

type homeStackProps = StackNavigationProp<HomeStackParamList, 'home'>;
type bookingStackProps = StackNavigationProp<bookingStackParams, 'booking'>

const ProfileScreen = () => {

  const { user } = useUser()

  const home_navigation = useNavigation<homeStackProps>()
  const booking_navigation = useNavigation<bookingStackProps>()

  const { isLoaded, signOut } = useAuth();

  if (!isLoaded) {
    return null;
  }


  return (
    <View>
      <View style={styles.heading_container}>
        <Heading text={'Profile'} />
        <View style={styles.sub_heading_container}>
          <Image source={{ uri: user?.imageUrl }} style={styles.img} />
          <Text style={styles.txt_name}>{user?.fullName}</Text>
          <Text style={styles.txt_email}>{user?.primaryEmailAddress?.emailAddress}</Text>
        </View>

      </View>
      <GestureHandlerRootView style={styles.icon_container}>
        <TouchableOpacity style={styles.sub_icon_container}
          onPress={() => home_navigation.navigate('home')}
        >
          <Ionicons name="home-outline" size={36} color={Colors.PRIMARY} />
          <Text style={styles.txt_icon}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sub_icon_container}
          onPress={() => booking_navigation.navigate('booking')}
        >
          <Ionicons name="bookmark-outline" size={38} color={Colors.PRIMARY} />
          <Text style={styles.txt_icon}>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sub_icon_container}>
          <AntDesign name="contacts" size={36} color={Colors.PRIMARY} />
          <Text style={styles.txt_icon}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sub_icon_container}
          onPress={() => {
            signOut();
          }}
        >
          <Ionicons name="log-out-outline" size={38} color={Colors.PRIMARY} />
          <Text style={styles.txt_icon}>Logout</Text>
        </TouchableOpacity>
      </GestureHandlerRootView>

    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  heading_container: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    height: 300,
    paddingTop: 60
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.PRIMARY
  },
  sub_heading_container: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  txt_name: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: Colors.WHITE
  },
  txt_email: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: Colors.WHITE
  },
  icon_container: {
    display: 'flex',
    alignSelf: 'flex-start',
    gap: 30,
    padding: 60,
    marginLeft: 60,
  },
  sub_icon_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt_icon: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    marginLeft: 15
  }
})
