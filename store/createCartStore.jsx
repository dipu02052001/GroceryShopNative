import {createStore} from 'zustand/vanilla';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import useUserStore from './useUserStore';

const stores = {};

const createCartStore = userId => {
  const user = useUserStore(state => state.user);

  let userSignUpID = user?.signup_id;
  console.log('User used in CreateCartStore ', user?.signup_id);
  if (!stores[userId]) {
    const store = createStore(
      persist(
        (set, get) => ({
          cartItems: [],

          fetchCart: async () => {
            try {
              const res = await axios.get(
                `https://groceryshop-spring-backend.onrender.com/Cart/${userSignUpID}`,
              );
              set({cartItems: res.data});
            } catch (err) {
              console.error('Error fetching cart:', err.message);
            }
          },

          addItem: async (userId, item) => {
            console.log('Adding item for user:', userId);
            console.log('Payload:', JSON.stringify(item));
            try {
              await axios.post(
                `https://groceryshop-spring-backend.onrender.com/Cart/add/${userSignUpID}`,
                item,
              );
              const exists = get().cartItems.find(i => i.id === item.id);
              if (exists) {
                set({
                  cartItems: get().cartItems.map(i =>
                    i.id === item.id
                      ? {...i, quantity: i.quantity + item.quantity}
                      : i,
                  ),
                });
              } else {
                set({cartItems: [...get().cartItems, item]});
              }
            } catch (err) {
              console.error('Error adding item:', err.message);
            }
          },
          

          getUniqueItemCount: () => get().cartItems.length,
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
