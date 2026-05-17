import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, cancelOrder } from "../services/orderService";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";
function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };

  const fetchFiltered = async (status) => {
    if (status === "") {
      fetchOrders();
    } else {
      const res = await apiClient.get(`/orders/status?status=${status}`);
      setOrders(res.data);
    }
  };
  const handleCancel = async (id) => {
    if (window.confirm("Cancel this order?")) {
      await cancelOrder(id);
      fetchOrders();
    }
  };

  navigate("/payments");
  return (


    <div className="container mt-2">
      <h2 className="fw-bold mb-4">
  Order Dashboard
</h2>
    <div className="container mt-3">
        <div className="row">
          <div className="col-6 col-sm-4">
            <select
              className="form-select mb-3"
              onChange={(e) => fetchFiltered(e.target.value)}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* <table className="table table-bordered mt-3"> */}
      <table className="table table-striped shadow">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.userId}>
              <td>{o.userId}</td>
              <td>{o.customerName}</td>
              <td>₹{o.totalAmount}</td>
              <td>
                <span className={`badge 
    ${o.orderStatus === "Pending" ? "bg-warning" : ""}
    ${o.orderStatus === "Shipped" ? "bg-info" : ""}
    ${o.orderStatus === "Delivered" ? "bg-success" : ""}
    ${o.orderStatus === "Cancelled" ? "bg-danger" : ""}
  `}>
                  {o.orderStatus}
                </span>
              </td>
              <td>{o.shippingAddress}</td>
              <td>
                <select
                  className="form-select mb-2"
                  onChange={(e) =>
                    handleStatusChange(o.userId, e.target.value)
                  }
                >
                  <option value="">Update Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <button
                  className="btn btn-danger"
                  onClick={() => handleCancel(o.userId)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}
export default OrderDashboard;