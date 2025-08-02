import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import axios from 'axios'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

   const handleSubmit = async (e) => {

    if (!formData.name) {
          Alert.alert('Validation', 'All fields are required!');
          return;
        }
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://groceryshop-spring-backend.onrender.com/api/contacts/createMessage",
        formData
      );

      // Clear the form
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        alert("Message sent successfully!");
      }, 10);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.centered}>Contact Us</Text>

      <Text variant="bodyMedium" style={styles.paragraph}>
        We'd love to hear from you! Whether you have questions, feedback, or just want to say hello — we're here to help.
      </Text>

      <View style={styles.form}>
        <TextInput
          label="Name"
          value={formData.name}
          mode="outlined"
          onChangeText={(text) => handleChange('name', text)}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={formData.email}
          mode="outlined"
          keyboardType="email-address"
          onChangeText={(text) => handleChange('email', text)}
          style={styles.input}
        />
        <TextInput
          label="Message"
          value={formData.message}
          mode="outlined"
          multiline
          numberOfLines={4}
          onChangeText={(text) => handleChange('message', text)}
          style={[styles.input, styles.textArea]}
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
        </Button>
      </View>

      <Divider style={styles.divider} />

     <Text variant="titleMedium" style={[styles.subtitle, styles.boldBlack]}>Office Address</Text>
     <Text variant="bodySmall" style={styles.boldBlack}>TRIGROCERY HQ</Text>
     <Text variant="bodySmall" style={styles.boldBlack}>Canning Bridge Road, Kolkata, West Bengal, India</Text>
     <Text variant="bodySmall" style={[styles.contactInfo, styles.boldBlack]}>📞 +91-9593907036</Text>
    <Text variant="bodySmall" style={styles.boldBlack}>📧 trigo8323@gmail.com</Text>

    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 39,
    backgroundColor: '#a1c4f0',
  },
  centered: {
    textAlign: 'center',
    marginBottom: 10,
    color:'black'
  },
  paragraph: {
    textAlign: 'justify',
    marginBottom: 20,
    fontSize:18,
    color:'black'
  },
  form: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  textArea: {
    height: 100,
  },
  button: {
    marginTop: 10,
  },
  divider: {
    marginVertical: 20,
  },
  boldBlack: {
  fontWeight: 'bold',
  color: 'black',
},
  subtitle: {
    marginBottom: 10,
     fontSize:18,
     color:'black'
  },
  contactInfo: {
    marginTop: 10,
  },
});
