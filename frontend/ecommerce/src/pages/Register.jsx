import { useState } from "react";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUser(user);
    alert("Registration Successful");

navigate("/products");
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-6 mx-auto">
        <h3 className="text-center">Customer Registration</h3>

        <form onSubmit={handleSubmit}>

          <label className="form-label">First Name</label>
          <input
            name="firstName"
            placeholder="First Name"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            placeholder="Last Name"
            className="form-control mb-2"
            onChange={handleChange}
          />
            <label className="form-label">Email</label> 
          <input
            name="email"
            placeholder="Email"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <label className="form-label">Phone</label>
          <input
            name="phone"
            placeholder="Phone"
            className="form-control mb-2"
            onChange={handleChange}
          />
                    
          <button className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;