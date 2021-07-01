import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, Image } from 'react-native'

export default function ProfileScreen({route, navigation}) {
    const {firstName, lastName, email, image} = route.params
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <Image source={{uri: image}} style={styles.userImage}/>
                <Text style={styles.userName}>{firstName} {lastName}</Text>
                <Text style={styles.userEmail}>{email}</Text>
            </View>
            <Text style={styles.footer}>Connected Via Linkedin</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 35
    },
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight : 0) + 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        overflow: 'hidden',
        marginBottom: 10
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    userEmail: {
        fontSize: 18,
    },
    footer: {
        // alignSelf: 'flex-end'
        marginBottom: 40,
        color: 'rgba(0,0,0,0.4)'
    }
})