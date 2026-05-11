import { useState } from "react";
import { processPayment } from "../services/paymentService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PaymentPage() {

  const location = useLocation();

  const orderId = location.state?.orderId || "";
  const amount = location.state?.amount || "";
 const navigate = useNavigate();

  const [payment, setPayment] = useState({
    orderId: orderId,
    amount: amount,
    paymentMethod: "",
  });

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const paymentData = {
      orderId: Number(payment.orderId),
      amount: Number(payment.amount),
      paymentMethod: payment.paymentMethod,
    };

    await processPayment(paymentData);

    alert("Payment Successful");
    
navigate("/orders");

    setPayment({
      orderId: "",
      amount: "",
      paymentMethod: "",
    });
  };

  if (!location.state) {
    return (
      <div className="container mt-5">
        <h3>No Order Found</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card p-4 col-md-6 mx-auto">

        <h3 className="text-center mb-4">
          Payment Processing
        </h3>

        <form onSubmit={handleSubmit}>

          <input
            type="number"
            name="orderId"
            placeholder="Order ID"
            className="form-control mb-3"
            value={payment.orderId}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="form-control mb-3"
            value={payment.amount}
            onChange={handleChange}
            required
          />

          <select
            name="paymentMethod"
            className="form-select mb-3"
            value={payment.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          <button className="btn btn-success w-100">
            Pay Now
          </button>

        </form>

      </div>

    </div>
  );
}

export default PaymentPage;