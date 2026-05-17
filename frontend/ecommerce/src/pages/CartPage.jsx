import { useEffect, useState } from "react";
import {
  getCart,
  updateCart,
  removeCartItem
} from "../services/cartService";

import { useNavigate } from "react-router-dom";

function CartPage() {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await getCart(1);
    setCart(res.data);
  };

  const handleQuantity = async (id, quantity) => {

    if (quantity < 1) return;

    await updateCart(id, quantity);

    fetchCart();
  };

  const handleRemove = async (id) => {

    if (window.confirm("Remove item from cart?")) {

      await removeCartItem(id);

      fetchCart();
    }
  };

  // Calculate Grand Total
  const grandTotal = cart.reduce(
    (total, item) =>
      total + Number(item.totalPrice),
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        My Cart
      </h2>
      <table className="table table-striped shadow">

        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {cart.map((c) => (

            <tr key={c.cartId}>

              <td>{c.productName}</td>

              <td>₹{c.price}</td>

              <td>

                <button
                  className="btn btn-sm btn-secondary me-2"
                  onClick={() =>
                    handleQuantity(
                      c.cartId,
                      c.quantity - 1
                    )
                  }
                >
                  -
                </button>

                {c.quantity}

                <button
                  className="btn btn-sm btn-secondary ms-2"
                  onClick={() =>
                    handleQuantity(
                      c.cartId,
                      c.quantity + 1
                    )
                  }
                >
                  +
                </button>

              </td>

              <td>
                ₹{c.totalPrice}
              </td>

              <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleRemove(c.cartId)
                  }
                >
                  Remove
                </button>

              </td>

            </tr>
          ))}

        </tbody>
      </table>

      <h4 className="mt-3">
        Grand Total: ₹{grandTotal}
      </h4>

      <div className="mt-3">

        <button
          className="btn btn-success"
          onClick={() => navigate("/add-order")}
        >
          Proceed to Checkout
        </button>

      </div>
    </div>
  );
}

export default CartPage;