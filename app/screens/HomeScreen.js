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

// WebBrowser.maybeCompleteAuthSession();

// const discovery = {
//   authorizationEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
//   tokenEndpoint: "https://accounts.spotify.com/api/token",
// };

export default function HomeScreen({ navigation }) {
  const [user, setUser] = React.useState({})

//   const handleAuth = async () => {
    // const clientId = "86nimnzj98zbg7";
    // const callbackUrl = "https://auth.expo.io/@roshanrjv/linkedin-api";
    // let redirectUrl = AuthSession.makeRedirectUri({
    //     useProxy: true
    // });
    // let results = await AuthSession.startAsync({
    //   authUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    //     callbackUrl
    //   )}&state=foobar&scope=r_liteprofile%20r_emailaddress`,
    // });
    // console.log(results);

    // const [request, response, promptAsync] = useAuthRequest(
    //     {
    //         clientId: clientId,
    //         scopes: ['r_liteprofile', '20r_emailaddress'],
    //         usePKCE: false,
    //         redirectUri: makeRedirectUri({
    //             scheme: "myapp"
    //         })
    //     },
    //     discovery
    // )


//   };

  // const handleAuth = async () => {
  //   const clientId = "86nimnzj98zbg7";
  //   const callbackUrl = "https://auth.expo.io/@roshanrjv/linkedin-api";
  //   const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&state=foobar&scope=r_liteprofile%20r_emailaddress`
  //   let result = await WebBrowser.openAuthSessionAsync(url);
  //   console.log(result)
  // };

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
    console.log(redirectUrl)
    const authUrl = `http://10.0.2.2:3000/auth/linkedin`
    addLinkingListener()
    try {
      const authResult = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl)

      console.log("%%%%%%%%%%%%%5555")
      if(authResult.type === 'success'){
        console.log("@@@@@@@@@@@@@@")
        try {
          const res = await fetch('http://10.0.2.2:3000/user', {
            credentials: true
          })
          const data = await res.json()
          console.log(data)
        } catch (error) {
          console.log(error)
        }

        console.log("###########")

      }

      setUser(authResult)
    } catch (error) {
      console.log("Error: ", error)
    }
    removeLinkingListener()
  }


  // const handleAuth = async () => {
  //   const clientId = "86nimnzj98zbg7";
  //   const callbackUrl = "https://auth.expo.io/@roshanrjv/linkedin-api";
  //   const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&state=foobar&scope=r_liteprofile%20r_emailaddress`
    
  //   const redirectURI = AuthSession.getRedirectUrl({useProxy: true});
  //   const result = await AuthSession.startAsync({authUrl: url})
  //   console.log(result)
  // };

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
