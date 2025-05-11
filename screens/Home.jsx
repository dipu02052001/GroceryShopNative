import {View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LoginForm from '../components/LoginForm';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', width: '100%'}}>
      <LoginForm />
    </View>
  );
};

export default Home;
