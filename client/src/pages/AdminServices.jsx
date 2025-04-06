import { useEffect, useState } from "react";
import { allServicesAPI, deleteServiceAPI } from "../api";

export default function AdminServices() {
  const [services, setServices] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(allServicesAPI);
        const data = await response.json();
        console.log(data.response);
        setServices(data.response);
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
      const response = await fetch(`${deleteServiceAPI}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = response.json();
        console.log("AdminService : ", data, response);
        setServices(services.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.log("Tried deleting service, but failed ", error);
    }
  }

  return (
    <div className="admin-services-container">
      <div className="services-container">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Provider</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services === null ? (
              <tr>
                <td colSpan="3">No Services Found..</td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s._id}>
                  <td>{s.service}</td>
                  <td>{s.price}</td>
                  <td>{s.provider}</td>
                  <td>
                    <button onClick={() => handleEdit(s._id)}>Edit</button>
                    <button onClick={() => handleDelete(s._id)}>Delete</button>
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
