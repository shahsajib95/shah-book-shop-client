import React from "react";

const OrderDetails = ({ item}) => {
  const { createdAt, bookName, quantity, price, status } = item;
  return (
    <>
      <tr>
        <td>{createdAt}</td>
        <td>{bookName}</td>
        <td>{quantity}</td>
        <td>${price}</td>
        <td>{status}</td>
      </tr>
    </>
  );
};

export default OrderDetails;
