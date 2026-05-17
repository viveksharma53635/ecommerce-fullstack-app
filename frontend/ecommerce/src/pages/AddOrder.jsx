import { useState } from "react";
import { placeOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

function AddOrder() {
  const [order, setOrder] = useState({
    customerId: "",
    shippingAddress: "",
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();

    const orderData = {
      customerId: Number(order.customerId),
      shippingAddress: order.shippingAddress,
    };

    const res = await placeOrder(orderData);

    alert("Order Placed");

    navigate("/payment", {
      state: {
        orderId: res.data.userId,
        amount: res.data.totalAmount,
      },
    });

    setOrder({
      customerId: "",
      shippingAddress: "",
    });
  };


  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="fw-bold mb-4">
          Place Order
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="customerId"
            value={order.customerId}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Customer ID"
          />

          <textarea
            name="shippingAddress"
            value={order.shippingAddress}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Shipping Address"
          />

          <button className="btn btn-primary">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default AddOrder;