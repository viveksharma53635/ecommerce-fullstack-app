import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateProduct, getProducts } from "../services/productService";

function EditProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    sku: "",
    inventoryCount: "",
  });

  useEffect(() => {
    getProducts().then((res) => {
      const existing = res.data.find((p) => p.productId === Number(id));
      if (existing) {
        setProduct(existing);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, product);
    alert("Product Updated");
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
  Edit Product
</h2>
     

      <form onSubmit={handleSubmit}>
        <input name="productName" value={product.productName} onChange={handleChange} className="form-control mb-2" />
        <input name="price" value={product.price} onChange={handleChange} className="form-control mb-2" />
        <input name="inventoryCount" value={product.inventoryCount} onChange={handleChange} className="form-control mb-2" />

        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;
