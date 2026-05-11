import { useEffect, useState } from "react";
import {
  getPayments,
  refundPayment,
} from "../services/paymentService";

function PaymentDashboard() {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await getPayments();
    setPayments(res.data);
  };

  const handleRefund = async (id) => {

    if (window.confirm("Refund this payment?")) {

      await refundPayment(id);

      fetchPayments();
    }
  };

  return (
    <div className="container mt-4">

      <h2>Payment Dashboard</h2>

      <table className="table table-bordered mt-3">

        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {payments.map((p) => (

            <tr key={p.paymentId}>

              <td>{p.paymentId}</td>
              <td>{p.orderId}</td>
              <td>₹{p.amount}</td>
              <td>{p.paymentMethod}</td>
              <td>{p.paymentStatus}</td>

              <td>

                {p.paymentStatus !== "Refunded" && (
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleRefund(p.paymentId)
                    }
                  >
                    Refund
                  </button>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PaymentDashboard;