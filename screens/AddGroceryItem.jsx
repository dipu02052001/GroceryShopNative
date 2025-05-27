import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Text, TextInput, Button, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import useCartStore from '../store/useCartStore';
import createCartStore from '../store/createCartStore';
import useUserStore from '../store/useUserStore';


const AddGroceryItem = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [weight, setAmount] = useState('100 gm');
  const [menuVisible, setMenuVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [comments, setComments] = useState('');
  const navigation = useNavigation();
  const user = useUserStore(state => state.user);
  let userSignUpID = user?.signup_id;
  console.log('User used in Add groceryItem ', userSignUpID);
  const adItem = useCartStore(state => state.addItem);
  const cartStore = createCartStore(userSignUpID)
  const addItem = cartStore.getState().addItem;

  const priceMap = {
    '100 gm': 10,
    '200 gm': 20,
    '500 gm': 40,
    '1 kg': 70,
    '2 kg': 130,
  };

  useEffect(() => {
    const unitPrice = priceMap[weight] || 0;
    const qty = parseInt(quantity);
    setTotalPrice(!isNaN(qty) ? unitPrice * qty : 0);
  }, [quantity, weight]);

  const redTextTheme = {
    colors: {
      text: 'black',
      primary: 'black', // active indicator color
    },
  };

  // const handleAddItem = () => {
  //   alert('item Added to cart!');
  //   navigation.navigate('BottomTabNavigator');
  // };
  const handleAddItem = () => {
    if (!itemName.trim()) {
      alert('Item Name cannot be empty.');
      return;
    }

    if (!quantity || parseInt(quantity) === 0) {
      alert('Quantity must be greater than 0.');
      return;
    }

    if (!weight) {
      alert('Please select an amount.');
      return;
    }

    const item = {
      itemName,
      quantity: parseInt(quantity),
      weight,
      comments,
      // totalPrice,
    };

    addItem(userSignUpID, item);
    alert('Item added to cart!');
    navigation.navigate('BottomTabNavigator');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Add Grocery Item</Text>

        {/* Item Name Input */}
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          value={itemName}
          onChangeText={setItemName}
          mode="outlined"
          textColor="black" // 🔥 This explicitly sets the input text color
          style={styles.input}
          theme={{
            colors: {
              text: 'black', // Input text color
              primary: 'black', // Outline and cursor
              background: 'white', // Background of input
              placeholder: 'black', // Label/floating label
            },
          }}
        />

        {/* Quantity Input */}
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          value={quantity}
          onChangeText={text => {
            if (/^\d*$/.test(text)) setQuantity(text); // allow only digits
          }}
          mode="outlined"
          keyboardType="numeric" // shows number keypad
          textColor="black"
          style={styles.input}
          theme={{
            colors: {text: 'black', primary: 'black', background: 'white'},
          }}
        />

        {/* Weight Dropdown */}
        <Text style={styles.label}>Weight</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={styles.dropdownWrapper}>
              <TextInput
                value={weight}
                editable={false}
                mode="outlined"
                textColor="black"
                style={styles.input}
                right={<TextInput.Icon icon="menu-down" />}
                theme={{
                  colors: {
                    text: 'black',
                    primary: 'black',
                    background: 'white',
                  },
                }}
                pointerEvents="none"
              />
            </TouchableOpacity>
          }>
          {Object.keys(priceMap).map(option => (
            <Menu.Item
              key={option}
              onPress={() => {
                setAmount(option);
                setMenuVisible(false);
              }}
              title={option}
            />
          ))}
        </Menu>

        {/* Comments */}
        <Text style={styles.label}>Comments</Text>
        <TextInput
          value={comments}
          onChangeText={setComments}
          mode="outlined"
          multiline
          numberOfLines={4}
          placeholder="Add any special instructions..."
          style={styles.textArea}
          textColor="black"
        />

        {/* Add Button */}
        <TouchableOpacity onPress={handleAddItem}>
          <Button mode="contained" style={styles.button}>
            ADD ITEM
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 15,
  },
  dropdownWrapper: {
    marginBottom: 15,
  },
  button: {
    marginTop: 30,
    borderRadius: 6,
    paddingVertical: 4,
  },
});

export default AddGroceryItem;
