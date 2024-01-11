import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Heading from '../../components/Heading'
import { useUser } from '@clerk/clerk-expo'
import { getUserBookings } from '../../api/HyGraphQL'
import BusinessItem from '../home/buness/BusinessItem'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const BookingScreen = () => {

  const { user } = useUser()
  const [bookingList, setBookingList] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    getUserBookings_()
  }, [])

  const getUserBookings_ = async () => {
    setLoading(true)
    const resp: any = await getUserBookings(user?.primaryEmailAddress?.emailAddress)
    setBookingList(resp?.bookings)
    setLoading(false)
  }

  return bookingList && (
    <View style={styles.container}>
      <Heading text={'My Bookings'} />
      <FlatList
        data={bookingList}
        onRefresh={()=>getUserBookings_()}
        refreshing={loading}
        renderItem={({ item, index }: any) => (
          <GestureHandlerRootView>
            <BusinessItem business={item?.businessList} 
            booking={item}
            from={'booking'}
            />
          </GestureHandlerRootView>
        )}
      />
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 20,
  }
})
