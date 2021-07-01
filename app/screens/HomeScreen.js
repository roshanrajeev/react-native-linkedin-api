import React from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';
// import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  AppState,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

// const discovery = {
//   authorizationEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
//   tokenEndpoint: "https://accounts.spotify.com/api/token",
// };

export default function HomeScreen({ navigation }) {
  const [user, setUser] = React.useState({})

  const handleRedirect = async (e) => {
    WebBrowser.dismissBrowser()
  }

  const addLinkingListener = () => {
    Linking.addEventListener('url', handleRedirect)
  }

  const removeLinkingListener = () => {
    Linking.removeEventListener('url', handleRedirect)
  }

  const handleAuth = async () => {
    const redirectUrl = await Linking.getInitialURL()
    // console.log(redirectUrl)
    const authUrl = `http://10.0.2.2:3000/auth/linkedin`
    // addLinkingListener()
    try {
      const authResult = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl)
      if(authResult.type === 'success'){
        try {
          const res = Linking.parse(authResult.url)
          const {accessToken, email, firstName, lastName, image} = res.queryParams
          navigation.navigate('Profile', {
            email,
            firstName,
            lastName,
            image
          })
        } catch (error) {
          console.log(error)
        }

      }
      setUser(authResult)
    } catch (error) {
      console.log("Error: ", error)
    }
    // removeLinkingListener()
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Image
          source={require("../assets/linkedin.png")}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Sign in with Linkedin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#0B66C2",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    flexDirection: "row",
    padding: 12,
  },
  buttonImage: {
    width: 28,
    height: 28,
  },
  buttonText: {
    color: "white",
  },
});
