import React, { useContext } from "react";
import { DataContext } from "../../store/globaStore";
import CheckOutDetails from "./CheckOutDetails";
import { BiCart } from "react-icons/bi";
import { postData } from "../../component/utils/api/api";
import { useHistory } from "react-router";

const CheckOut = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const total = cart.reduce((total, book) => total + book.price, 0);
  const handleCheckout = async () =>{
    dispatch({ type: 'NOTIFY', payload: {loading: true} })
    const res = await postData('user/postOrder', cart, auth.token)
    dispatch({ type: 'NOTIFY', payload: {loading: false} })
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
    localStorage.removeItem('cart_item')
    history.push("/orders")
    return dispatch({ type: "ADD_CART", payload: [] })
  }
  return (
    <div className="checkout top-margin">
      <div className="container my-5">
        <h3 className="fw-bold mb-5">Checkout</h3>
        <div className="cart shadow p-3 rounded">
          {cart.length > 0 ? (
            <>
              <table className="table table-responsive">
                <thead>
                  <tr className="text-secondary">
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody className="fw-bold">
                  {cart.map((item) => (
                    <CheckOutDetails item={item} key={item._id} />
                  ))}
                  <td>
                    <h5 className="fw-bold">Total</h5>
                  </td>
                  <td></td>
                  <td>
                    <h5 className="fw-bold">${total}</h5>
                  </td>
                </tbody>
              </table>
              <div className="float-right d-flex flex-row-reverse" > 
                <button className="btn bg-color" onClick={handleCheckout}>Checkout</button>
              </div>
            </>
          ) : (
            <div className="text-center text-secondary">
              <h1>
                <BiCart />
              </h1>
              Your cart is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
