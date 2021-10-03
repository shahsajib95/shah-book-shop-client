import React, { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart } from "../../store/Actions";
import { DataContext } from "../../store/globaStore";

const CheckOutDetails = ({ item }) => {
  const { _id, bookName, quantity, price } = item;
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  return (
    <>
      <tr>
        <td>
          <FaTrashAlt
            className="text-danger m-2"
            onClick={() => dispatch(removeFromCart(_id, cart))}
            style={{ cursor: "pointer" }}
          />{bookName}
        </td>
        <td>{quantity}</td>
        <td>${price}</td>
      </tr>
    </>
  );
};

export default CheckOutDetails;
