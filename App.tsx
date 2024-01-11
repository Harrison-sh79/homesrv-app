import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/login/LoginScreen';
import {
  useFonts, Outfit_100Thin, Outfit_200ExtraLight,
  Outfit_300Light, Outfit_400Regular, Outfit_500Medium,
  Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold,
  Outfit_900Black
} from '@expo-google-fonts/outfit';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './app/navigations/TabNavigator';

export default function App() {

  let [fontsLoaded, fontError] = useFonts({
    'outfit-thin': Outfit_100Thin,
    'outfit-extralight': Outfit_200ExtraLight,
    'outfit-light': Outfit_300Light,
    'outfit': Outfit_400Regular,
    'outfit-medium': Outfit_500Medium,
    'outfit-semibold': Outfit_600SemiBold,
    'outfit-bold': Outfit_700Bold,
    'outfit-extrabold': Outfit_800ExtraBold,
    'outfit-black': Outfit_900Black
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={'pk_test_YXdha2UtYmVhZ2xlLTgxLmNsZXJrLmFjY291bnRzLmRldiQ'}
    >
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
