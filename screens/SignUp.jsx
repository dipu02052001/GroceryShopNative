import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigation = useNavigation();
  const validateEmail = email => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSignUp = () => {
    const {name, email, mobile, password, confirmPassword} = form;

    if (!name || !email || !mobile || !password || !confirmPassword) {
      Alert.alert('Validation', 'All fields are required!');
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      Alert.alert('Validation', 'Mobile number must be exactly 10 digits!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match!');
      return;
    }

    if (!validateEmail(form.email)) {
      setEmailError('Invalid email format');
      return;
    }
    

    axios
      .post(
        'https://groceryshop-spring-backend.onrender.com/Signup/createAccount',
        form,
      )
      .then(response => {
        console.log('Signup Success:', response.data);
        Alert.alert('Success', 'Customer registered successfully!');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Signup Error:', error);
        Alert.alert('Error', 'Failed to register. Please try again.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      <TextInput
        label="Full Name"
        value={form.name}
        mode="outlined"
        style={styles.input}
        onChangeText={name => setForm({...form, name})}
      />
      <TextInput
        label="Email Address"
        value={form.email}
        mode="outlined"
        keyboardType="email-address"
        style={styles.input}
        error={!!emailError}
        onChangeText={email => {
          setForm({...form, email});

          if (!validateEmail(email)) {
            setEmailError('Invalid email format');
          } else {
            setEmailError('');
          }
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        label="Mobile Number"
        value={form.mobile}
        mode="outlined"
        keyboardType="phone-pad"
        style={styles.input}
        error={!!mobileError}
        maxLength={10} // ⬅️ This limits input to 10 characters
        onChangeText={mobile => {
          if (/^\d*$/.test(mobile)) {
            // allow only digits
            setForm({...form, mobile});

            if (mobile.length < 10) {
              setMobileError('Mobile number must be 10 digits');
            } else {
              setMobileError('');
            }
          }
        }}
      />
      {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}

      <TextInput
        label="Password"
        value={form.password}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        onChangeText={password => setForm({...form, password})}
      />
      <TextInput
        label="Confirm Password"
        value={form.confirmPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        error={!!passwordError}
        onChangeText={confirmPassword => {
          setForm({...form, confirmPassword});

          if (form.password && confirmPassword !== form.password) {
            setPasswordError('Passwords do not match');
          } else {
            setPasswordError('');
          }
        }}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSignUp}
        contentStyle={{paddingVertical: 6}}>
        Sign Up
      </Button>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.link}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#a1c4f0',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
    color: '#1b1c1e',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  loginText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
  },
  link: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 12,
  },
});

export default SignUp;
