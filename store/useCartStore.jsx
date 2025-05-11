import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist} from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addItem: item => {
        const existingItem = get().cartItems.find(i => i.id === item.id);
        if (existingItem) {
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
      },
      removeItem: id =>
        set({
          cartItems: get().cartItems.filter(item => item.id !== id),
        }),
      clearCart: () => set({cartItems: []}),
      updateItem: updatedItem =>
        set({
          cartItems: get().cartItems.map(item =>
            item.id === updatedItem.id ? updatedItem : item,
          ),
        }),
      // ⬇ Add this selector
      getUniqueItemCount: () => get().cartItems.length,
    }),
    {
      name: 'cart-storage',
      storage: AsyncStorage,
    },
  ),
);

export default useCartStore;
