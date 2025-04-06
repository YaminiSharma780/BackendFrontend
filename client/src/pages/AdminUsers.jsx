import { useEffect, useState } from "react";
import { allUsersAPI } from "../api";

export default function AdminUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(allUsersAPI);
        const data = await response.json();
        console.log(data.response);
        setUsers(data.response);
      } catch (error) {
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
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.isAdmin === true ? "Yes" : "No"}</td>
                  <td>
                    <button>Mail</button>
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
