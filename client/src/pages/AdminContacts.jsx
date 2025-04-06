import { useEffect, useState } from "react";
import { allContactsAPI, deleteContactAPI } from "../api";

export default function AdminContacts() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(allContactsAPI);
        const data = await response.json();
        console.log(data.response);
        setContacts(data.response);
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
      const response = await fetch(`${deleteContactAPI}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = response.json();
        console.log("AdminContacts : ", data, response);
        setContacts(contacts.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.log("Tried deleting contact, but failed ", error);
    }
  }

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
              contacts.map((c) => (
                <tr key={c._id}>
                  <td>{c.username}</td>
                  <td>{c.email}</td>
                  <td>{c.query}</td>
                  <td>
                    <button
                      onClick={() => {
                        window.open(
                          `https://mail.google.com/mail/?view=cm&fs=1&to=${c.email}`,
                          "_blank"
                        );
                      }}
                    >
                      Mail
                    </button>
                    <button onClick={() => handleDelete(c._id)}>Delete</button>
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
