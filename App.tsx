/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import WebView from 'react-native-webview';
import About from './screens/About';
import LoginForm from './screens/LoginForm';
import HomeScreen from './screens/HomeScreen';
import AppHeader from './screens/AppHeader';
import AppFooter from './screens/AppFooter';
import AppNavigator from './navigation/AppNavigator';
// import { NavigationContainer } from '@react-navigation/native';


function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppHeader/>
      {/* <About /> */}
      {/* <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer> */}
      <HomeScreen/>
      {/* <LoginForm/> */}
      <AppFooter/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 0,
    backgroundColor:'white'
  },
 
});

export default App;
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { LoginProvider } from './src/LoginContext';
// import AppNavigator from './navigation/AppNavigator'; // or wherever your navigation is

// export default function App() {
//   return (
//     <LoginProvider>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </LoginProvider>
//   );
// }

