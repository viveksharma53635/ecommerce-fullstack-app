import { useEffect, useState } from "react";
import { getProducts, deactivateProduct } from "../services/productService";
import { useNavigate } from 'react-router-dom';
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

  const handleDeactivate = async (id) => {
    if (window.confirm("Deactivate this product?")) {
      await deactivateProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Product Dashboard</h2>

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDashboard;
