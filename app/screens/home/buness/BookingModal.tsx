import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker'
import Colors from '../../../utils/Colors';
import Heading from '../../../components/Heading';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { createBooking } from '../../../api/HyGraphQL';
import { useUser } from '@clerk/clerk-expo';
// import Toast from 'react-native-root-toast'
import Toast from 'react-native-toast-message'
import moment from 'moment';
import { milliseconds } from 'date-fns';
// import DateTimePicker from '@react-native-community/datetimepicker'
// import RNDateTimePicker from '@react-native-community/datetimepicker';


const BookingModal = ({ navigation, hideModal, businessid }: any) => {

  const [timeList, setTimeList] = useState<any>([])
  const [selectTime, setSelectTime] = useState<any>()
  const [selectDate, setSelectDate] = useState<any>()
  const [note, setNote] = useState<any>()
  const { user } = useUser()

  const minDate = new Date();

  const onDateChange = (date: any) => {
    setSelectDate(date)
  }

  useEffect(() => {
    getTime()
  }, [])

  const getTime = () => {
    const timeList = []
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM'
      })
      timeList.push({
        time: i + ':30 AM'
      })
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ':00 PM'
      })
      timeList.push({
        time: i + ':30 PM'
      })
    }
    setTimeList(timeList)
  }

  const createNewBooking = async () => {
    if (!selectDate || !selectTime) {
      Toast.show(
        {
          type: 'error',
          text1: 'Please select a date and time',
          visibilityTime: 1000,
          position: 'bottom',
          text1Style: { color: Colors.BLACK, fontFamily: 'outfit' },
          
        })
      return
    }
    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      date: moment(selectDate).format('DD-MM-yyyy'),
      time: selectTime,
      note: note,
      businessid: businessid
    }
    await createBooking(data)
    Toast.show(
      {
        type: 'success',
        text1: 'Booking created successfully',
        visibilityTime: 2000,
        position: 'bottom',
        text1Style: { color: Colors.BLACK, fontFamily: 'outfit' },
        onShow: () => {
          setTimeout(() => {
            hideModal()
          }, 1500)
        }
      })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => hideModal()}>
          <Ionicons name="arrow-back-outline" size={25} color="black" />
          <Text style={styles.txt_back}>Booking</Text>
        </TouchableOpacity>
        <Heading text={'Select Date'} />
        <View style={styles.calendar_container}>
          <CalendarPicker onDateChange={onDateChange} width={350}
            minDate={minDate}
            todayBackgroundColor={Colors.BLACK}
            todayTextStyle={{ color: Colors.WHITE }}
            selectedDayColor={Colors.PRIMARY}
            selectedDayTextColor={Colors.WHITE}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <Heading text={'Select Time Slot'} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }): any => (
              <TouchableOpacity key={index} style={[styles.time_container, (selectTime && selectTime == item.time) && { backgroundColor: Colors.PRIMARY }]}
                onPress={() => setSelectTime(item.time)}
              >
                <Text style={[(selectTime && selectTime == item.time) ? styles.time_select : styles.time_unselect]}>{item.time}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ marginTop: 10 }} >
          <Heading text={'Any Suggestion Note'} />
          <TextInput placeholder='note' multiline={true} numberOfLines={4}
            style={styles.textinput}
            onChangeText={(text) => {
              setNote(text)
            }}
          />
        </View>
        <TouchableOpacity style={styles.btn_submit_container}
          onPress={() => createNewBooking()}
        >
          <Text style={styles.btn_submit}>Confirm & Book</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default BookingModal

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20
  },
  back: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  txt_back: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    paddingLeft: 5
  },
  calendar_container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 15,
    padding: 15
  },
  time_container: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    marginRight: 15,
    // backgroundColor: Colors.PRIMARY,
  },
  time_unselect: {
    fontFamily: 'outfit',
    fontSize: 14,
    padding: 10,
    color: Colors.PRIMARY,
  },
  time_select: {
    fontFamily: 'outfit',
    fontSize: 14,
    padding: 10,
    color: Colors.WHITE,
  },
  textinput: {
    height: 100,
    borderWidth: 1,
    borderRadius: 9,
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 16,
    fontFamily: 'outfit',
    borderColor: Colors.PRIMARY
  },
  btn_submit_container: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 15,
    elevation: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  btn_submit: {
    padding: 15,
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
})