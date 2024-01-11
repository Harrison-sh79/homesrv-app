import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';
import Heading from '../../../components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import { ScrollView } from 'react-native-virtualized-view'
import BookingModal from './BookingModal';
import Toast, {BaseToast , ErrorToast } from 'react-native-toast-message'
import * as Linking from 'expo-linking'

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props:any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
        fontFamily: 'outfit-bold',
        
        color: Colors.WHITE
      }}
      text2Style={{
        fontSize: 15
      }}
      contentContainerStyle={{ 
        paddingHorizontal: 15, 
        backgroundColor: Colors.BLACK, 
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }: any) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

const BusinessDetail = ({ navigation, route }: any) => {

  const [showModal, setShowModal] = useState(false)

  const encodedSubject = encodeURIComponent('Need Service Support')
  const encodedBody = encodeURIComponent('body');

  return route?.params?.business && (
    <View>
      <ScrollView style={styles.container}>
        <Image source={{ uri: route?.params?.business?.images[0]?.url }} style={styles.img} />
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <View style={styles.back_container}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.info_container}>
          <Text style={styles.txt_name}>{route.params.business.name}</Text>
          <View style={styles.sub_info_container}>
            <Text style={styles.txt_contact}>{route.params.business.contactPerson} 🌟</Text>
            <View style={styles.category_container}>
              <Text style={styles.txt_category}> {route.params.business.category.name}</Text>
            </View>
          </View>
          <Text style={styles.txt_address}>
            <Ionicons name="ios-location-sharp" size={23} color={Colors.PRIMARY} />
            {route.params.business.address}
          </Text>
          <View style={styles.line}></View>
          <BusinessAboutMe business={route?.params?.business} />
          <View style={styles.line}></View>
          <BusinessPhotos business={route?.params?.business} />
        </View>
      </ScrollView>
      <View style={styles.bottom_container}>
        <TouchableOpacity style={styles.btn_message} 
        onPress={()=>{
          // Linking.openURL(`mailto:${route?.params?.business?.primaryEmailAddress?.emailAddress}?subject=${encodedSubject}&body=${encodedBody}`)
          Linking.openURL('mailto:sunnysunny012012@163.com?subject=11&body=222')
        }}
        >
          <Text style={styles.btn_message_txt}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_booking} onPress={()=>setShowModal(true)}>
          <Text style={styles.btn_booking_txt}>Book Now</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} presentationStyle='pageSheet' animationType='slide' >
        <Toast config={toastConfig}/>
        <BookingModal hideModal={()=>setShowModal(false)} businessid={route?.params?.business?.id} />
      </Modal>
    </View>
  )
}

export default BusinessDetail

const styles = StyleSheet.create({
  container: {
    height: '93%'
  },
  img: {
    width: '100%',
    height: 300,
    objectFit: 'fill',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  back_container: {
    width: 50,
    height: 50,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  back: {
    position: 'absolute',
    padding: 30,
  },
  info_container: {
    padding: 20,
    display: 'flex',
    gap: 10
  },
  txt_contact: {
    fontFamily: 'outfit-semibold',
    fontSize: 20,
    color: Colors.PRIMARY
  },
  sub_info_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  category_container: {
    borderRadius: 10,
    backgroundColor: Colors.LIGHT_PRIMARY,
  },
  txt_category: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: Colors.PRIMARY,
    padding: 8,
  },
  txt_name: {
    fontFamily: 'outfit-bold',
    fontSize: 25
  },
  txt_address: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: Colors.GRAY
  },
  line: {
    borderWidth: 0.4,
    borderColor: Colors.GRAY,
    marginTop: 10,
    marginBottom: 10
  },
  about: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
    lineHeight: 25
  },
  readmore: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.PRIMARY,
    marginTop: 5
  },
  bottom_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10
  },
  btn_message: {
    // width: '100%',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 25,
    flex: 1
  },
  btn_message_txt: {
    fontFamily: 'outfit-semibold',
    fontSize: 16,
    textAlign: 'center',
  },
  btn_booking: {
    // width: '100%',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 25,
    flex: 1
  },
  btn_booking_txt: {
    fontFamily: 'outfit-semibold',
    fontSize: 16,
    color: Colors.WHITE,
    textAlign: 'center',
  }
})
