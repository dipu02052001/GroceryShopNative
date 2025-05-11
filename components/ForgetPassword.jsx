import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert('Validation', 'Email field is required!');
      return;
    }

    axios.post('https://groceryshop-spring-backend.onrender.com/customers/resetPassword', { email })
      .then(response => {
        console.log('Reset Response:', response.data);
        Alert.alert('Success', 'Password reset link sent to your email!');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error('Reset Error:', error);
        Alert.alert('Error', 'Failed to send reset link. Please check your email.');
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.card}>
              <Text style={styles.title}>Forgot Password</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Button title="Reset Password" onPress={handlePasswordReset} color="#667eea" />

              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.link}>Back to Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#a1c4f0',
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    color: '#000',
  },
  linksContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  link: {
    color: '#667eea',
    textDecorationLine: 'underline',
  },
});
