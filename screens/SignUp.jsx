import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Alert
  } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
 const [form, setForm] = useState({
     name : '',
     email: '',
     password: '',
   });
   const navigation = useNavigation();
   const handleSignUp = () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Validation', 'All fields are required!');
      return;
    }

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
   return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
       <View style={styles.container}>
         <View style={styles.header}>
           <Image
             alt="App Logo"
             resizeMode="contain"
             style={styles.headerImg}
             source={require('../assets/app_icon.jpg')} />
 
           <Text style={styles.title}>
             Sign in to <Text style={{ color: '#075eec' }}>GroceryShop</Text>
           </Text>
 
           <Text style={styles.subtitle}>
             Get access to some FRESH Products and more!!!
           </Text>
         </View>
 
         <View style={styles.form}>
         <View style={styles.input}>
             <Text style={styles.inputLabel}>Name </Text>

             <TextInput
               autoCapitalize="none"
               autoCorrect={true}
               clearButtonMode="while-editing"
               keyboardType="Name"
               onChangeText={name => setForm({ ...form, name })}
               placeholder="John"
               placeholderTextColor="#6b7280"
               style={styles.inputControl}
               value={form.namel} />
           </View>
           <View style={styles.input}>
             <Text style={styles.inputLabel}>Email address</Text>

             <TextInput
               autoCapitalize="none"
               autoCorrect={false}
               clearButtonMode="while-editing"
               keyboardType="email-address"
               onChangeText={email => setForm({ ...form, email })}
               placeholder="john@example.com"
               placeholderTextColor="#6b7280"
               style={styles.inputControl}
               value={form.email} />
           </View>
 
           <View style={styles.input}>
             <Text style={styles.inputLabel}>Password</Text>
 
             <TextInput
               autoCorrect={false}
               clearButtonMode="while-editing"
               onChangeText={password => setForm({ ...form, password })}
               placeholder="********"
               placeholderTextColor="#6b7280"
               style={styles.inputControl}
               secureTextEntry={true}
               value={form.password} />
           </View>
 
           <View style={styles.formAction}>
             <TouchableOpacity onPress={handleSignUp}>
               <View style={styles.btn}>
                 <Text style={styles.btnText}>Sign Up</Text>
               </View>
             </TouchableOpacity>
           </View>
         </View>
       </View>
 
     </SafeAreaView>
   );
 }

 const styles = StyleSheet.create({
   container: {
     flexGrow: 1,
     flexShrink: 1,
     flexBasis: 0,
     padding: 24,
   },
   title: {
     fontSize: 31,
     fontWeight: '700',
     color: '#1D2A32',
     marginBottom: 6,
   },
   subtitle: {
     fontSize: 15,
     fontWeight: '500',
     color: '#929292',
   },
   /** Header */
   header: {
     alignItems: 'center',
     justifyContent: 'center',
     marginVertical: 36,
   },
   headerImg: {
     width: 160,
     height: 80,
     alignSelf: 'center',
     marginBottom: 36,
   },
   /** Form */
   form: {
     flexGrow: 1,
     flexShrink: 1,
     flexBasis: 0,
   },
   formAction: {
     marginTop: 4,
     marginBottom: 16,
   },
   formLink: {
     fontSize: 16,
     fontWeight: '600',
     color: '#075eec',
     textAlign: 'center',
   },
   formFooter: {
     paddingVertical: 24,
     fontSize: 15,
     fontWeight: '600',
     color: '#222',
     textAlign: 'center',
     letterSpacing: 0.15,
   },
   /** Input */
   input: {
     marginBottom: 16,
   },
   inputLabel: {
     fontSize: 17,
     fontWeight: '600',
     color: '#222',
     marginBottom: 8,
   },
   inputControl: {
     height: 50,
     backgroundColor: '#fff',
     paddingHorizontal: 16,
     borderRadius: 12,
     fontSize: 15,
     fontWeight: '500',
     color: '#222',
     borderWidth: 1,
     borderColor: '#C9D3DB',
     borderStyle: 'solid',
   },
   /** Button */
   btn: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     borderRadius: 30,
     paddingVertical: 10,
     paddingHorizontal: 20,
     borderWidth: 1,
     backgroundColor: '#075eec',
     borderColor: '#075eec',
   },
   btnText: {
     fontSize: 18,
     lineHeight: 26,
     fontWeight: '600',
     color: '#fff',
   },
 });
 
export default SignUp