import { useEffect, useState } from "react";
import { getUsers, deactivateUser } from "../services/userService";

function CustomerDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleDeactivate = async (id) => {
    if (window.confirm("Deactivate this customer?")) {
      await deactivateUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Customer Dashboard</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.userId}>
              <td>{u.userId}</td>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.status ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeactivate(u.userId)}
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

export default CustomerDashboard;