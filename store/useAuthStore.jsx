import { create } from 'zustand';
import createCartStore from './createCartStore';

const useAuthStore = create(set => ({
  user: null,

  login: async user => {
    // Set current user
    set({ user });

    // Fetch cart from backend
    const cartStore = createCartStore(user.signup_id);
    await cartStore.getState().fetchCart();
  },

  logout: () => {
    // Just clear the current user
    set({ user: null });

    // Don't clear the cart store — cart remains on backend!
  },
}));

export default useAuthStore;