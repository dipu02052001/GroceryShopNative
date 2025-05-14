import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import BottomTabNavigator from './BottomTabNavigator';
import About from '../screens/About';
import Contact from '../screens/Contact';
import HeaderMenu from './HeaderMenu';

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
        initialRouteName="LoggedInHome"
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
            title: 'Grocery Store',
            headerBackVisible: false,
            gestureEnabled: false,
            headerRight: () => <HeaderMenu navigation={navigation} />,
            headerStyle: {
              backgroundColor: '#1e81b0',
            },
            headerTintColor: 'white',
          })}
        />
        {/* <Stack.Screen
          name="LoggedInHome"
          component={BottomTabNavigator} // ✅ use tabs here
          options={{
            headerShown: false, // disable header for tabs
          }}
        /> */}

        <Stack.Screen name="ProductCatelogue" component={ProductCatelogue} />
        <Stack.Screen name="AddGroceryItem" component={AddGroceryItem} />
        {/* <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            title: 'Grocery Store', // Optional: change title text if needed
            //headerStyle: { backgroundColor: '#1870db' }, // red background
            headerTintColor: 'white', // white text/icons
            headerBackVisible: false,
            // headerShown: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  });
                }}>
                <Text style={{color: 'white', marginRight: 15}}>Logout</Text>
              </TouchableOpacity>
            ),
          }}
        /> */}
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={({navigation}) => ({
            title: 'Grocery Store',
            headerTintColor: 'white',
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: '#1e81b0',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Logout Confirmation',
                    'Do you want to logout from Shopping?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          navigation.reset({
                            index: 0,
                            routes: [{name: 'LoggedInHome'}],
                          });
                        },
                      },
                    ],
                    {cancelable: true},
                  );
                }}>
                <Text style={{color: 'white', marginRight: 15}}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SetNewPassword" component={ForgetPassword} />
        <Stack.Screen name="ProductCategory" component={ProductCategories} />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ContactUs"
          component={Contact}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
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
