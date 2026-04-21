import { useEffect, useState } from "react";
import { addProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    sku: "",
    inventoryCount: "",
  });

  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadCategories() {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to load categories", error);
      alert("Unable to load categories");
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      price: Number(product.price),
      inventoryCount: Number(product.inventoryCount),
    };

    try {
      setIsSubmitting(true);
      await addProduct(payload, categoryId);
      alert("Product Added");
      setProduct({
        productName: "",
        description: "",
        price: "",
        sku: "",
        inventoryCount: "",
      });
      setCategoryId("");
    } catch (error) {
      console.error("Failed to add product", error);
      alert("Unable to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="productName"
          placeholder="Product Name"
          className="form-control mb-2"
          value={product.productName}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={product.description}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="form-control mb-2"
          value={product.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />

        <input
          name="sku"
          placeholder="SKU"
          className="form-control mb-2"
          value={product.sku}
          onChange={handleChange}
          required
        />

        <input
          name="inventoryCount"
          type="number"
          placeholder="Stock"
          className="form-control mb-2"
          value={product.inventoryCount}
          onChange={handleChange}
          min="0"
          required
        />

        <select
          className="form-control mb-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
