import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

const Cart = () => {
  // Sample items in the cart (you can dynamically populate this from your app's state)
  const [cartItems, setCartItems] = useState([
    {id: '1', name: 'Apple', price: 2.5, quantity: 1},
    {id: '2', name: 'Banana', price: 1.2, quantity: 2},
    {id: '3', name: 'Carrot', price: 1.8, quantity: 1},
  ]);

  // Function to remove an item from the cart
  const removeItem = itemId => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Calculate total price of items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemPrice}>Price: ${item.price}</Text>
              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ${getTotalPrice().toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
  },
  cartItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
    color: 'gray',
  },
  itemPrice: {
    fontSize: 16,
    color: '#4CAF50',
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  totalContainer: {
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkoutButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Cart;
