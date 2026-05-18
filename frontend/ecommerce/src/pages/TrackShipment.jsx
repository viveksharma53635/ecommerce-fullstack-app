import { useState } from "react";

import {
  trackShipment,
} from "../services/shippingService";

function TrackShipment() {

  const [trackingNumber, setTrackingNumber] =
    useState("");

  const [shipment, setShipment] =
    useState(null);

  const handleTrack = async () => {

    try {

      const res = await trackShipment(
        trackingNumber
      );

      setShipment(res.data);

    } catch (error) {

      alert("Tracking Number Not Found");
    }
  };

  return (

    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2 className="mb-4">
          Track Shipment
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Tracking Number"
          value={trackingNumber}
          onChange={(e) =>
            setTrackingNumber(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={handleTrack}
        >
          Track
        </button>

        {shipment && (

          <div className="mt-4">

            <h5>
              Courier:
              {" "}
              {shipment.courierService}
            </h5>

            <h5>
              Status:
              {" "}
              <span className="badge bg-success">
                {shipment.shippingStatus}
              </span>
            </h5>

            <h5>
              Shipping Cost:
              {" "}
              ₹{shipment.shippingCost}
            </h5>

          </div>
        )}

      </div>

    </div>
  );
}

export default TrackShipment;