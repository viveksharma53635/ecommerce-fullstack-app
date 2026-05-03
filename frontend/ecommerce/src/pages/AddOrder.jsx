import { useState } from "react";
import { placeOrder } from "../services/orderService";

function AddOrder() {
  const [order, setOrder] = useState({
    customerId: "",
    shippingAddress: "",
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customerId: Number(order.customerId),
      shippingAddress: order.shippingAddress,
    };

    await placeOrder(orderData);
    alert("Order Placed");

    setOrder({
      customerId: "",
      shippingAddress: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h3>Place Order</h3>

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