import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getBusinessListByCategory } from '../../../api/HyGraphQL';
import BusinessItem from './BusinessItem';
import Colors from '../../../utils/Colors';
import GoBack from '../../../components/GoBack';

const BusinessListByCategory = ({ navigation, route }: any) => {

  const [businessList, setBusinessList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (route.params.category) {
      getBusinessListByCategory_(route.params.category)
    }
  }, [])

  const getBusinessListByCategory_ = async (category: string) => {
    setIsLoading(true)
    const resp: any = await getBusinessListByCategory(category)
    setBusinessList(resp?.businessLists)
    setIsLoading(false)
  }

  return route?.params && (
    <View style={styles.container}>
      <GoBack navigation={navigation} name={route?.params?.category} />
      {isLoading && (
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={{marginTop: 70}}/>
      )}
      {!isLoading && businessList && businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          renderItem={({ item, index }: any) => (
            <View key={index}>
              <BusinessItem business={item} from={'home'} />
            </View>
          )}
        />
      ) : (
        <Text style={isLoading ? [styles.txt_loading]: [styles.nobuss]}>{isLoading ? 'Loading...' : 'No Business Found'}</Text>
      )}
    </View>
  )
}

export default BusinessListByCategory

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20
  },
  nobuss: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 80
  },
  txt_loading: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 8
  }
})
