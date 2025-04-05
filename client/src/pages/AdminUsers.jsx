import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch();
        const data = await response.json();
        console.log(data.response);
        setUsers(data.response);
        toast.success("Data fetched successfully");
      } catch (error) {
        toast.error("Failed to fetch");
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="admin-users-container">
      <div className="users-container">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users === null ? (
              <tr>
                <td colSpan="4">No Users Found..</td>
              </tr>
            ) : (
              services.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <input type="checkbox" />
                    {u.isAdmin}
                  </td>
                  <td>
                    <button>Send Mail</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
