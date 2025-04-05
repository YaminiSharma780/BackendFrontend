import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminContacts() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch();
        const data = await response.json();
        console.log(data.response);
        setContacts(data.response);
        toast.success("Data fetched successfully");
      } catch (error) {
        toast.error("Failed to fetch");
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="admin-contacts-container">
      <div className="contacts-container">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Query</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts === null ? (
              <tr>
                <td colSpan="3">No Contacts Found..</td>
              </tr>
            ) : (
              services.map((c) => (
                <tr key={c._id}>
                  <td>{c.username}</td>
                  <td>{c.email}</td>
                  <td>{c.query}</td>
                  <td>
                    <button>Reply</button>
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
