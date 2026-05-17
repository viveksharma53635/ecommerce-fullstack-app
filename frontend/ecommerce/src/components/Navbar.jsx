import { Link } from "react-router-dom";

function Navbar() {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        {/* Logo */}
        <Link
          className="navbar-brand"
          to="/products"
        >
          Ecommerce Admin
        </Link>

        {/* Navigation Buttons */}
        <div>

          {/* Products */}
          <Link
            className="btn btn-light me-2"
            to="/products"
          >
            Products
          </Link>

          {/* Add Product */}
          <Link
            className="btn btn-success me-2"
            to="/add-product"
          >
            Add Product
          </Link>

          {/* Cart */}
          <Link
            className="btn btn-outline-light me-2"
            to="/cart"
          >
            Cart
          </Link>

          <Link
            className="btn btn-outline-warning me-2"
            to="/wishlist"
          >
            Wishlist
          </Link>

          {/* Orders */}
          <Link
            className="btn btn-warning me-2"
            to="/orders"
          >
            Orders
          </Link>

          {/* Payments */}
          <Link
            className="btn btn-info me-2"
            to="/payments"
          >
            Payments
          </Link>

          {/* Customers */}
          <Link
            className="btn btn-light me-2"
            to="/customers"
          >
            Customers
          </Link>

          {/* Register */}
          <Link
            className="btn btn-primary"
            to="/register"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;