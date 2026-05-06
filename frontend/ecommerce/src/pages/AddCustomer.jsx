import { useState } from "react";
import { createUser } from "../services/userService";

function AddCustomer() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(user);
    alert("Customer Added");

    setUser({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add Customer</h2>

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" className="form-control mb-2" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" className="form-control mb-2" onChange={handleChange} />
        <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
        <input name="phone" placeholder="Phone" className="form-control mb-2" onChange={handleChange} />

        <button className="btn btn-primary">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;