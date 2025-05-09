import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// export default SignUp
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SignUp = () => {
  const [form, setForm] = useState({
    name : '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword:''
});
  const navigation = useNavigation();
  const handleSignUp = () => {
    if (!form.name || !form.email || !form.mobile || !form.confirmPassword || !form.password) {
      Alert.alert('Validation', 'All fields are required!');
      return;
    }
    // Signup logic
    console.log(name, email, mobile, password, confirmPassword);
    axios.post('https://groceryshop-spring-backend.onrender.com/customers/createCustomers', form)
      .then(response => {
        console.log('Signup Success:', response.data);
        Alert.alert('Success', 'Customer registered successfully!');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error('Signup Error:', error);
        Alert.alert('Error', 'Failed to register. Please try again.');
      });
  };
  const handleLogin = () => {
    navigation.navigate('Home')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      <TextInput
        label="Full Name"
        value={form.name}
        mode="outlined"
        style={styles.input}
        onChangeText={name => setForm({ ...form, name })}
        
      />
      <TextInput
        label="Email Address"
        value={form.email}
        mode="outlined"
        keyboardType="email-address"
        style={styles.input}
        onChangeText={name => setForm({ ...form, mobile })}
      />
      <TextInput
        label="Mobile Number"
        value={form.mobile}
        mode="outlined"
        keyboardType="phone-pad"
        style={styles.input}
        onChangeText={name => setForm({ ...form, email })}
      />
      <TextInput
        label="Password"
        value={form.password}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        onChangeText={name => setForm({ ...form, password })}
      />
      <TextInput
        label="Confirm Password"
        value={form.confirmPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        onChangeText={name => setForm({ ...form, confirmPassword })}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSignUp}
        contentStyle={{ paddingVertical: 6 }}
      >
        Sign Up
      </Button>

      <TouchableOpacity onPress={handleLogin}>
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
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#4CAF50', // Green premium tone
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
});

export default SignUp;