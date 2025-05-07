import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUp from '../screens/SignUp'
import Home from '../screens/Home';

const Stack = createNativeStackNavigator()

const AppNagivator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNagivator

const styles = StyleSheet.create({})