import {  Text, View } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';

const Home = () => {

    const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate('SignUp')}>
        Go to SignUp!!!
      </Button>
    </View>
  )
}

export default Home
