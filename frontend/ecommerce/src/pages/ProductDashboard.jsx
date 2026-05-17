import { useEffect, useState } from "react";
import { getProducts, deactivateProduct } from "../services/productService";
import { useNavigate } from 'react-router-dom';
import { addToCart } from "../services/cartService";
import { addWishlist } from "../services/wishlistService";

function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  async function fetchProducts() {
    const res = await getProducts();
    setProducts(res.data);
  }

  const handleAddToCart = async (productId) => {
    const data = {
      userId: 1,
      productId: productId,
      quantity: 1,
    };

    await addToCart(data);
    alert("Added to cart");
  };
  const handleDeactivate = async (id) => {
    if (window.confirm("Deactivate this product?")) {
      await deactivateProduct(id);
      fetchProducts();
    }
  };
  const handleWishlist = async (productId) => {

    const wishlistData = {
      customerId: 1,
      productId: productId,
    };

    await addWishlist(wishlistData);

    alert("Added to Wishlist");
  };

  return (
    <div className="container mt-4">
     <h2 className="fw-bold mb-4">
  Product Dashboard
</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.productId}>
              <td>{p.productName}</td>
              <td>{p.price}</td>
              <td>{p.inventoryCount}</td>
              <td>{p.status ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/edit-product/${p.productId}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeactivate(p.productId)}
                >
                  Deactivate
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleAddToCart(p.productId)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-warning btn-sm ms-2"
                  onClick={() =>
                    handleWishlist(p.productId)
                  }
                >
                  Wishlist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDashboard;
