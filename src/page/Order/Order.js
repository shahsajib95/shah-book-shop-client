import React, { useCallback, useContext, useEffect, useState } from "react";
import { getData } from "../../component/utils/api/api";
import { DataContext } from "../../store/globaStore";
import { BiCart } from "react-icons/bi";
import OrderDetails from "./OrderDetails";

const Order = () => {
  const { state } = useContext(DataContext);
  const { auth } = state;
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const getOrders = useCallback(async () => {
    setLoading(true);
    const res = await getData(`user/getOrder/${auth.user.user_id}`, auth.token);
    setOrderData(res);
    setLoading(false);
  }, [auth]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return (
    <div className="checkout top-margin">
      <div className="container my-5">
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <h3 className="fw-bold">Orders</h3>
        <div className="cart">
          {orderData.length > 0 ? (
            <>
              <table className="table table-responsive">
                <thead>
                  <tr className="text-secondary">
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody className="fw-bold">
                  {orderData?.map((item) => (
                    <OrderDetails item={item} key={item._id} />
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="text-center text-secondary">
              <h1>
                <BiCart />
              </h1>
              No Orders Yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
