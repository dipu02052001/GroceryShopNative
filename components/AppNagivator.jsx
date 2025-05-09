import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUp from '../screens/SignUp'
import Home from '../screens/Home';
import LoggedInHome from '../screens/LoggedInHome';
import ProductCatelogue from '../screens/ProductCatelogue';
import ForgetPassword from './ForgetPassword';

const Stack = createNativeStackNavigator()

const AppNagivator = () => {
  return (
    // <NavigationContainer>
    //     <Stack.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: '#1e81b0' ,color:'white'} }}>
    //     <Stack.Screen name="Home" component={Home}/>
    //     <Stack.Screen name="LoggedInHome" component={LoggedInHome}/>
    //     <Stack.Screen name="ProductCatelogue" component={ProductCatelogue}/>
    //     <Stack.Screen name="SignUp" component={SignUp}/>
    //     </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: { backgroundColor: '#1e81b0' },
      headerTintColor: 'white', // default title color
    }}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home', // Optional: change title text if needed
        //headerStyle: { backgroundColor: '#1870db' }, // red background
        headerTintColor: 'white', // white text/icons
      }}
    />
    <Stack.Screen name="LoggedInHome" component={LoggedInHome} />
    <Stack.Screen name="ProductCatelogue" component={ProductCatelogue} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SetNewPassword" component={ForgetPassword} />
    
  </Stack.Navigator>
</NavigationContainer>

  )
}

export default AppNagivator

const styles = StyleSheet.create({
  textwhite: {
    color:'white'
  },
})