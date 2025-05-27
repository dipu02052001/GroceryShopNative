import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View, Text, StyleSheet} from 'react-native';

// Import your screens
import LoggedInHome from '../screens/LoggedInHome';
import ProductCategories from '../screens/ProductCategories';
import Cart from './Cart';
//import useCartStore from '../store/useCartStore';
import Profile from '../screens/Profile';
import useUserStore from '../store/useUserStore';
import createCartStore from '../store/createCartStore';

const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
const user = useUserStore(state => state.user);
// console.log("Current user:", userId);
// console.log("User ID being used:", user?.signup_id);
  const uniqueCount = createCartStore(state => state.getUniqueItemCount());

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
           else if (route.name === 'Profile')
            imageSource = require('../assets/grocery_1.jpg');

          return (
            <View>
              <Image source={imageSource} style={{width: 25, height: 25}} />
              {route.name === 'Cart' && uniqueCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{uniqueCount}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#133f87',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={LoggedInHome} />
      {user?.name === 'Test1' && (
        <Tab.Screen name="Category" component={ProductCategories} />
      )}
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
