import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import useCartStore from '../store/useCartStore';

const Cart = () => {
  const cartItems = useCartStore(state => state.cartItems);
  const removeItem = useCartStore(state => state.removeItem);
  const updateItem = useCartStore(state => state.updateItem);

  const [editingItemId, setEditingItemId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedQuantity, setEditedQuantity] = useState('');
  const [editedComments, setEditedComments] = useState('');

  const startEditing = item => {
    setEditingItemId(item.id);
    setEditedName(item.name);
    setEditedQuantity(String(item.quantity));
    setEditedComments(item.comments || '');
  };

  const saveEdit = id => {
    const quantityNum = parseInt(editedQuantity);
    if (!isNaN(quantityNum) && quantityNum > 0 && editedName.trim() !== '') {
      updateItem(id, {
        name: editedName.trim(),
        quantity: quantityNum,
        comments: editedComments.trim(),
      });
    }
    setEditingItemId(null);
    setEditedQuantity('');
    setEditedName('');
    setEditedComments('');
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
              {editingItemId === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editedName}
                    onChangeText={setEditedName}
                    placeholder="Product name"
                  />
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={editedQuantity}
                    onChangeText={setEditedQuantity}
                    placeholder="Quantity"
                  />
                  <TextInput
                    style={styles.input}
                    value={editedComments}
                    onChangeText={setEditedComments}
                    placeholder="Comments"
                  />
                  <TouchableOpacity
                    onPress={() => saveEdit(item.id)}
                    style={styles.saveButton}>
                    <Text style={styles.saveText}>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.itemName}>Product: {item.name}</Text>
                  <Text style={styles.itemQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                  {item.comments ? (
                    <Text style={styles.itemComments}>
                      Comments: {item.comments}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => startEditing(item)}
                      style={[styles.editButton, {marginRight: 15}]}>
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeItem(item.id)}
                      style={styles.removeButton}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, backgroundColor: '#f5f5f5', flex: 1},
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {fontSize: 18, textAlign: 'center', color: 'gray'},
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
  itemName: {fontSize: 18, fontWeight: 'bold'},
  itemQuantity: {fontSize: 16, color: 'gray'},
  itemComments: {fontSize: 14, color: '#666', marginTop: 4},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  editButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  editText: {color: 'white', fontSize: 16},
  saveButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  saveText: {color: 'white', fontSize: 16, textAlign: 'center'},
  removeButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeText: {color: 'white', fontSize: 16},
  totalContainer: {
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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
