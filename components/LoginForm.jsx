import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {LoginContext} from './LoginContext'; // ensure this exists
import {useNavigation} from '@react-navigation/native';
import useUserStore from '../store/useUserStore'; // adjust path if needed
import { ActivityIndicator } from 'react-native-paper';

const LoginForm = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {setIsLoggedIn} = useContext(LoginContext);
  const navigation = useNavigation();
  const setUser = useUserStore(state => state.setUser);
  //console.log("new user"+setUser);

  // useEffect(() => {
  //   axios
  //     .get('https://groceryshop-spring-backend.onrender.com/Signup/getAccounts')
  //     .then(response => {
  //       console.log('API Response:', response.data);
  //       setUsers(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const handleLogin = async () => {

    if (!username || !password) {
      Alert.alert('Validation', 'All fields are required!');
      return;
    }
     setIsLoading(true);
     setError('');
     try {
      const response  = await axios.get('https://groceryshop-spring-backend.onrender.com/Signup/getAccounts',
      {
          params: { username, password }, // Send as query params
          timeout: 1300000 // 130-second timeout
      }  
      
    );
    setUsers(response.data);

    const userFound = users.find(
      user => user.email === username && user.password === password,
    );

    if (userFound) {
      setUser(userFound); //  Save user globally
      setIsLoggedIn(userFound);
      navigation.navigate('BottomTabNavigator');
      setUsername('');
      setPassword('');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials.');
      setUsername('');
      setPassword('');
    }
  }
  catch(error){
    console.error('Login error:', error);
       Alert.alert('Login Failed', 'Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForget = () => {
    navigation.navigate('SetNewPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          value={username}
          onChangeText={setUsername}
          editable={!isLoading}
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="black"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
          required
        />

        {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />) 
        : 
        (
            <Button title="Login" onPress={handleLogin}  disabled={isLoading} color="#1976d2"/>
         )}

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={handleForget}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>
              <Text style={styles.link}> New User ? </Text>
                 Sign Up
              </Text>
          </TouchableOpacity>
        </View>
      </View>
       
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a1c4f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    color: 'black',
  },
  loader: {
    marginVertical: 20,
  },
   errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  link: {
    color: '#1976d2',
    textDecorationLine: 'underline',
  },
});
