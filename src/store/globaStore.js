/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer } from "react";
import { getData } from "../component/utils/api/api";
import reducers from "./Reducers";

export const DataContext = createContext();

export const token =  localStorage.getItem("token");
export const DataProvider = ({ children }) => {

  const initialState = {
    notify: {},
    auth: {},
    cart: [],
  };
 
  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    const token =  localStorage.getItem("token");
    if(token){
      getData(`user/getUserbyToken`, token)
      .then(res=> 
        {
          if(res.email){
            dispatch({type: 'AUTH', payload: {user: res, token: token}})
          }else{
            localStorage.removeItem("token");
            dispatch({type: 'NOTIFY', payload: { error: "Expired or Invalid token" } })
          }
        })
    }
  }, []);

  const { cart } = state

  useEffect(() => {
    const cart_item = JSON.parse(
      localStorage.getItem("cart_item")
    );
    if (cart_item)
      dispatch({ type: "ADD_CART", payload: cart_item });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_item", JSON.stringify(cart));
  }, [cart]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
