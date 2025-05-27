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

const LoginForm = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setIsLoggedIn} = useContext(LoginContext);
  const navigation = useNavigation();
  const setUser = useUserStore(state => state.setUser);
  //console.log("new user"+setUser);

  useEffect(() => {
    axios
      .get('https://groceryshop-spring-backend.onrender.com/Signup/getAccounts')
      .then(response => {
        console.log('API Response:', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleLogin = () => {

    setLoading(true);
    if (!username || !password) {
      Alert.alert('Validation', 'All fields are required!');
      return;
    }
    const userFound = users.find(
      user => user.email === username && user.password === password,
    );

    if (userFound) {
      setIsLoggedIn(true);
      setUser(userFound); //  Save user globally
      navigation.navigate('BottomTabNavigator');
      setUsername('');
      setPassword('');
    } else {
      setLoading(true);
      Alert.alert('Login Failed', 'Invalid credentials.');
      setUsername('');
      setPassword('');
    }
    setLoading(false);
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
          required
        />

        <Button title="Login" onPress={handleLogin} color="#667eea" />

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={handleForget}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Sign Up</Text>
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
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  link: {
    color: '#667eea',
    textDecorationLine: 'underline',
  },
});
