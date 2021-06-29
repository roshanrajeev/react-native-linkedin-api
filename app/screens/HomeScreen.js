import React from 'react'
import { View, Text, Button, StyleSheet, Platform, StatusBar,SafeAreaView, TouchableOpacity, Image } from 'react-native'

export default function HomeScreen({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
                <Image source={require('../assets/linkedin.png')} style={styles.buttonImage}/>
                <Text style={styles.buttonText}>Sign in with Linkedin</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: "#0B66C2",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        flexDirection: 'row',
        padding: 12,
    },
    buttonImage: {
        width: 28,
        height: 28,
    },
    buttonText: {
        color: "white"
    }
})
