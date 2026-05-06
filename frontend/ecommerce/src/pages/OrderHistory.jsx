import { useEffect, useState } from "react";
import { getCustomerOrders } from "../services/orderService";

function OrderHistory() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    const customerId = 1;

    const res = await getCustomerOrders(customerId);

    setOrders(res.data);
  };

  return (
    <div className="container mt-4">

      <h2>Order History</h2>

      <table className="table table-bordered mt-3">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.userId}>
              <td>{o.userId}</td>
              <td>₹{o.totalAmount}</td>
              <td>{o.orderStatus}</td>
              <td>{o.shippingAddress}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default OrderHistory;