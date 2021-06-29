import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const checkLinkedinAuth = () => {
        return true
    }

    const validate = () => {
        const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if(!re.test(email)){
            Alert.alert("Invalid email")
            return false
        }
        
        if(password == ""){
            Alert.alert("Invalid password")
            return false
        }

        if(!checkLinkedinAuth()){
            Alert.alert("Invalid email or password")
            return false
        }

        return true
    }

    const submit = () => {
        if(validate()){
            navigation.navigate('Profile')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput placeholder="Email" style={[styles.inputField]} onChangeText={(text) => setEmail(text)}/>
            <TextInput placeholder="Password" style={[styles.inputField]} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            <TouchableOpacity style={styles.submitBtn} onPress={submit}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 20
    },
    inputField: {
        fontSize: 18,
        borderBottomWidth: 1,
        marginBottom: 15
    },
    submitBtn: {
        width: 80,
        height: 40,
        backgroundColor: "orange",
        alignItems: 'center',
        justifyContent: 'center'
    }
})
