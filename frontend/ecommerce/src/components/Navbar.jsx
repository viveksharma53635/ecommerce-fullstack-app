import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/products">
          Ecommerce Admin
        </Link>

        <div>
          <Link className="btn btn-light me-2" to="/products">
            Products
          </Link>

          <Link className="btn btn-success" to="/add-product">
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;