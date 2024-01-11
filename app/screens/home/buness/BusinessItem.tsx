import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Colors from '../../../utils/Colors'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../../navigations/HomeStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { bookingStackParams } from '../../../navigations/BookingStackNavigator';

type homeStackProps = StackNavigationProp<HomeStackParamList, 'businessDetailByHome'>;
type bookingStackProps =StackNavigationProp<bookingStackParams, 'businessDetailByBooking'>

const BusinessItem = ({ business, booking, from }: any) => {

  const home_navigation = useNavigation<homeStackProps>()
  const booking_navigation = useNavigation<bookingStackProps>()

  return business && (
    <TouchableOpacity style={styles.container} onPress={() => {
      if (from === 'home') {
        home_navigation.navigate('businessDetailByHome', { business: business })
      } else {
        booking_navigation.navigate('businessDetailByBooking', { business: business })
      }
    }}>
      <Image source={{ uri: business?.images[0]?.url }} style={styles.img} />
      <View style={styles.sub_container}>
        <Text style={styles.txt_contact}>{business.contactPerson}</Text>
        <Text style={styles.txt_name}>{business.name}</Text>
        <>
          {booking?.id && (
            <View style={[styles.booking_container, 
              booking?.bookingStatus == 'Completed' && {backgroundColor: Colors.LIGHT_GREEN},
              booking?.bookingStatus == 'Cancelled' && {backgroundColor: Colors.LIGHT_RED}, 
              booking?.bookingStatus == 'InProgress' && {backgroundColor: Colors.LIGHT_YELLOW}, 
            ]}>
              <Text style={[styles.booking,
              , 
              booking?.bookingStatus == 'Completed' && {color: Colors.GREEN},
              booking?.bookingStatus == 'Cancelled' && {color: Colors.RED}, 
              booking?.bookingStatus == 'InProgress' && {color: Colors.YELLOW}, 
              ]}>{booking?.bookingStatus}</Text>
            </View>
          )}
        </>
        <View>
          {booking?.id ?
            <Text style={styles.txt_address}>
              <AntDesign name="calendar" size={20} color={Colors.PRIMARY} />
              {booking?.date} at {booking?.time}
            </Text>
            :
            <Text style={styles.txt_address}>
              <Ionicons name="ios-location-sharp" size={20} color={Colors.PRIMARY} />
              {business.address}
            </Text>
          }
        </View>

      </View>
    </TouchableOpacity>
  )
}

export default BusinessItem

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  sub_container: {
    display: 'flex',
    gap: 7,
  },
  txt_contact: {
    fontFamily: 'outfit-light',
    fontSize: 15,
    color: Colors.GRAY
  },
  txt_name: {
    fontFamily: 'outfit-bold',
    fontSize: 19
  },
  txt_address: {
    fontFamily: 'outfit-semibold',
    fontSize: 18,
    color: Colors.GRAY
  },
  booking: {
    fontFamily: 'outfit',
    fontSize: 12,
    padding: 5,
    color: Colors.PRIMARY,
    alignSelf: 'center'
  },
  booking_container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 6,
    width: 70
  }
})