import { useState } from "react";
import { updateUser } from "../services/userService";

function AccountSettings() {

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

    await updateUser(1, user);

    alert("Profile Updated");
  };

  return (
    <div className="container mt-4">

      <h2 className="fw-bold mb-4">
        Account Settings
      </h2>
      <form onSubmit={handleSubmit}>

        <input
          name="firstName"
          placeholder="First Name"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Update Profile
        </button>

      </form>

    </div>
  );
}

export default AccountSettings;