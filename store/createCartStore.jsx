import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const stores = {};

const createCartStore = userId => {
  const userSignUpID = userId;
  console.log('User used in CreateCartStore ', userSignUpID);
  if (!stores[userId]) {
    const store = createStore(
      persist(
        (set, get) => ({
          cartItems: [],

          fetchCart: async () => {
            try {
              const res = await axios.get(
                `https://groceryshop-spring-backend.onrender.com/api/Cart/${userSignUpID}`,
              );
              set({ cartItems: [...res.data] });
            } catch (err) {
              console.error('Error fetching cart:', err.message);
            }
          },

          addItem: async (userSignUpID, item) => {
            try {
              await axios.post(
                `https://groceryshop-spring-backend.onrender.com/api/Cart/add/${userSignUpID}`,
                item,
              );
              // Always refresh the cart from the backend
              await get().fetchCart();
            } catch (err) {
              console.error('Error adding item:', err.message);
            }
          },

          updateItem: async (cart_id, updatedItem) => {
            try {
              await axios.patch(
                `https://groceryshop-spring-backend.onrender.com/api/Cart/update/${cart_id}`,
              );
              await get().fetchCart(); // refresh after update
            } catch (err) {
              console.error('Error updating item:', err.message);
            }
          },

          removeItem: async cart_id => {
            try {
              await axios.delete(
                `https://groceryshop-spring-backend.onrender.com/api/Cart/remove/${cart_id}`,
              );
              await get().fetchCart(); // refresh after delete
            } catch (err) {
              console.error('Error removing item:', err.message);
            }
          },

          getUniqueItemCount: async () => get().cartItems.length,
        }),
        {
          name: `cart-${userSignUpID}`,
          storage: {
            getItem: async name => {
              const item = await AsyncStorage.getItem(name);
              return item ? JSON.parse(item) : null;
            },
            setItem: async (name, value) => {
              await AsyncStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: async name => {
              await AsyncStorage.removeItem(name);
            },
          },
        },
      ),
    );

    stores[userSignUpID] = store;
  }

  return stores[userSignUpID];
};

export default createCartStore;
