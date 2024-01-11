import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/warmUpBrowser"


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive }: any =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }

  return (
    <View style={styles.img_container}>
      <Image source={require('../../../assets/images/unnamed.webp')} style={styles.img} />
      <View style={styles.sub_container}>
        <Text style={styles.txt_1}>Let's Fint <Text style={styles.txt_1_1}>Professional Clearning and Repairing</Text> Service </Text>
        <Text style={styles.txt_2}>Best App to find services near you whick deliver you a professional service</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.button_txt}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  img: {
    width: 240,
    height: 450,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15,
    marginTop: 80
  },
  img_container: {
    alignItems: 'center'
  },
  sub_container: {
    width: '100%',
    height: '70%',
    backgroundColor: Colors.PRIMARY,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },
  txt_1: {
    fontFamily: 'outfit',
    fontSize: 25,
    color: Colors.WHITE,
    textAlign: 'center'
  },
  txt_1_1: {
    fontWeight: 'bold',
    fontFamily: 'outfit-semibold'
  },
  txt_2: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: 'center',
    marginTop: 20
  },
  button: {
    width: '90%',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    marginTop: 50,
    alignSelf: 'center',
    padding: 20
  },
  button_txt: {
    fontFamily: 'outfit',
    fontSize: 21,
    color: Colors.PRIMARY,
  }
})