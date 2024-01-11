import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../../components/Heading';
import Colors from '../../../utils/Colors';

const BusinessAboutMe = ({ business }: any) => {

  const [isReadMore, setIsReadMore] = useState(false);
  return business && (
    <View>
      <Heading text={'About Me'} />
      <Text style={styles.about} numberOfLines={isReadMore ? 20 : 5} >{business.abount}</Text>
      <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
        <Text style={styles.readmore}>{isReadMore ? 'Read Less <<' : 'Read More >>'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BusinessAboutMe

const styles = StyleSheet.create({
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
  }
})