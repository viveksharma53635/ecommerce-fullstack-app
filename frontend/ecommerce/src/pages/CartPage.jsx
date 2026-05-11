import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";
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