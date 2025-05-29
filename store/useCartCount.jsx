// hooks/useCartCount.js
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const useCartCount = (userId) => {
  const [count, setCount] = useState(0);

  const fetchCartCount = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await axios.get(
        `https://groceryshop-spring-backend.onrender.com/Cart/count?signup_id=${userId}`
      );
      setCount(res.data); // Adjust if API returns { count: number }
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  return { count, refresh: fetchCartCount };
};

export default useCartCount;
