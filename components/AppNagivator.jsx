import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import LoggedInHome from '../screens/LoggedInHome';
import ProductCatelogue from '../screens/ProductCatelogue';
import ForgetPassword from './ForgetPassword';
import ProductCategories from '../screens/ProductCategories';
import AddGroceryItem from '../screens/AddGroceryItem';

const Stack = createNativeStackNavigator();

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
          headerStyle: {backgroundColor: '#1e81b0'},
          headerTintColor: 'white', // default title color
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home', // Optional: change title text if needed
            //headerStyle: { backgroundColor: '#1870db' }, // red background
            headerTintColor: 'white', // white text/icons
          }}
        />
        {/* <Stack.Screen name="LoggedInHome" component={LoggedInHome} /> */}
        <Stack.Screen
          name="LoggedInHome"
          component={LoggedInHome}
          options={({navigation}) => ({
            title: 'Welcome',
            headerBackVisible: false,
            gestureEnabled: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  // Handle logout logic
                  navigation.goBack('Home'); // or navigation.navigate('Home')
                }}>
                <Text style={{color: 'white', marginRight: 15}}>Logout</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#1e81b0',
            },
            headerTintColor: 'white',
          })}
        />

        <Stack.Screen name="ProductCatelogue" component={ProductCatelogue} />
        <Stack.Screen name="AddGroceryItem" component={AddGroceryItem} />

        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SetNewPassword" component={ForgetPassword} />
        <Stack.Screen name="ProductCategory" component={ProductCategories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNagivator;

const styles = StyleSheet.create({
  textwhite: {
    color: 'white',
  },
});
