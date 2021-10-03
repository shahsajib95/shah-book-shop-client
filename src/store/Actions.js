export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
};

export const addToCart = (book, cart, user_id) => {
  const check = cart.every((item) => {
    return item._id !== book._id;
  });
  if (!check)
    return {
      type: "NOTIFY",
      payload: { error: "This book has been added to cart." },
    };

  return { type: "ADD_CART", payload: [...cart, { ...book, quantity: 1, user_id: user_id }] }
  
};

export const removeFromCart = (_id, cart) => {
  const remove = cart.filter((item) => item._id !== _id);
  return { type: "ADD_CART", payload: remove };
};
