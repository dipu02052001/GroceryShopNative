import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

// Import your screens
import LoggedInHome from '../screens/LoggedInHome';
import ProductCategories from '../screens/ProductCategories';
import Cart from './Cart';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let imageSource;
          if (route.name === 'Home')
            imageSource = require('../assets/home.png');
          else if (route.name === 'Category')
            imageSource = require('../assets/category.png');
          else if (route.name === 'Cart')
            imageSource = require('../assets/cart.jpeg');

          // Return Image component and apply the color to the image tint
          return (
            <Image
              source={imageSource}
              style={{
                width: 25, // Adjust the width and height of the image as per your needs
                height: 25,
                // tintColor: 'red', // Apply active/inactive tint color
              }}
            />
          );
        },
        tabBarActiveTintColor: '#133f87', // Active color
        tabBarInactiveTintColor: 'gray', // Inactive color
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={LoggedInHome} />
      <Tab.Screen name="Category" component={ProductCategories} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
