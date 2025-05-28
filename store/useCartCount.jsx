// hooks/useCartCount.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useCartCount = (userId) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    console.log("userid:"+userId)

    const fetchCartCount = async () => {
      try {
        const res = await axios.get(`https://groceryshop-spring-backend.onrender.com/Cart/count?signup_id=${userId}`);
        setCount(res.data); // or res.data.count depending on your API response
      } catch (err) {
        console.error('Error fetching cart count:', err);
      }
    };

    fetchCartCount();
  }, [userId]);

  return count;
};

export default useCartCount;
