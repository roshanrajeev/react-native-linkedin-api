import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, Image } from 'react-native'

export default function ProfileScreen() {
    return(
        <SafeAreaView style={styles.container}>
            <Image source={{uri: "https://randomuser.me/api/portraits/women/56.jpg"}} style={styles.userImage}/>
            <Text style={styles.userName}>Stacy Joe</Text>
            <Text style={styles.userEmail}>stacyjoe@gmail.com</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight : 0) + 50,
        alignItems: 'center',
    },
    userImage: {
        width: 100,
        height: 100,
    },
    userName: {
        fontSize: 18
    },
    userEmail: {
        fontSize: 18
    }
})