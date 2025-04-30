import { createContext, useEffect, useState } from "react";
import { food_list as initialFoodList } from "../assets/assets";
import axios from "axios";

export const StoreContex = createContext(null);

const StoreContexProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState(initialFoodList);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // ✅ Add review to specific food item
  const addReviewToItem = (itemId, review) => {
    setFoodList((prevList) =>
      prevList.map((item) =>
        item._id === itemId
          ? {
              ...item,
              reviews: [...(item.reviews || []), review],
              rating: calcAvgRating([...(item.reviews || []), review])
            }
          : item
      )
    );
  };

  // ✅ Calculate average rating
  const calcAvgRating = (reviews) => {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    setCartItems,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    addReviewToItem, // ✅ added
  };

  return (
    <StoreContex.Provider value={contextValue}>
      {props.children}
    </StoreContex.Provider>
  );
};

export default StoreContexProvider;
