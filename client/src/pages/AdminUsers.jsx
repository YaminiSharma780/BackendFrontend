import { useEffect, useState } from "react";
import { allUsersAPI, deleteUserAPI } from "../api";

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

  function handleEdit(id) {
    console.log("to be edited : ", id);
  }
  async function handleDelete(id) {
    console.log("to be deleted : ", id);

    try {
      const response = await fetch(`${deleteUserAPI}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = response.json();
        console.log("AdminUsers : ", data, response);
        setUsers(users.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.log("Tried deleting user, but failed ", error);
    }
  }

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
                    <button
                      onClick={() => {
                        window.open(
                          `https://mail.google.com/mail/?view=cm&fs=1&to=${u.email}`,
                          "_blank"
                        );
                      }}
                    >
                      Mail
                    </button>
                    <button onClick={() => handleDelete(u._id)}>Delete</button>
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
