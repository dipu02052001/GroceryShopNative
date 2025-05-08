import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUp from '../screens/SignUp'
import Home from '../screens/Home';
import LoggedInHome from '../screens/LoggedInHome';
import ProductCatelogue from '../screens/ProductCatelogue';

const Stack = createNativeStackNavigator()

const AppNagivator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: 'blue' } }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="LoggedInHome" component={LoggedInHome}/>
        <Stack.Screen name="ProductCatelogue" component={ProductCatelogue}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNagivator

const styles = StyleSheet.create({})