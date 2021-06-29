import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './app/screens/HomeScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './app/screens/SignupScreen';

const Stack = createStackNavigator() 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}