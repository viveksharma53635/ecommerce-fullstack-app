import { useEffect, useState } from "react";

import {
  getAllShipping,
  updateShippingStatus,
} from "../services/shippingService";

function ShippingDashboard() {

  const [shipping, setShipping] =
    useState([]);

  useEffect(() => {
    fetchShipping();
  }, []);

  const fetchShipping = async () => {

    const res = await getAllShipping();

    setShipping(res.data);
  };

  const handleStatus = async (
    id,
    status
  ) => {

    await updateShippingStatus(
      id,
      status
    );

    fetchShipping();
  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4">
        Shipping Dashboard
      </h2>

      <table className="table table-bordered">

        <thead className="table-dark">

          <tr>
            <th>Order ID</th>
            <th>Courier</th>
            <th>Tracking Number</th>
            <th>Status</th>
            <th>Shipping Cost</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {shipping.map((item) => (

            <tr key={item.shippingId}>

              <td>{item.orderId}</td>

              <td>{item.courierService}</td>

              <td>{item.trackingNumber}</td>

              <td>

                <span className="badge bg-primary">
                  {item.shippingStatus}
                </span>

              </td>

              <td>
                ₹{item.shippingCost}
              </td>

              <td>

                <select
                  className="form-select"
                  onChange={(e) =>
                    handleStatus(
                      item.shippingId,
                      e.target.value
                    )
                  }
                >

                  <option>
                    Update Status
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="In Transit">
                    In Transit
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                </select>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ShippingDashboard;