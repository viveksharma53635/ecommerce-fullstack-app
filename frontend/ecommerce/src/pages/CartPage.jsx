import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await getCart(1);
    setCart(res.data);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Cart</h2>

      <table className="table table-striped shadow">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((c) => (
            <tr key={c.cartId}>
              <td>{c.productName}</td>
              <td>₹{c.price}</td>
              <td>{c.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartPage;