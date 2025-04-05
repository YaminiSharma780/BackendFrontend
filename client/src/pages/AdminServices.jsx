import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { allServicesAPI } from "../api";

export default function AdminServices() {
  const [services, setServices] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(allServicesAPI);
        const data = await response.json();
        console.log(data.response);
        setServices(data.response);
        toast.success("Data fetched successfully");
      } catch (error) {
        toast.error("Failed to fetch");
        console.log(error);
      }
    }
    fetchData();
  }, []);
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
                    <button>Edit</button>
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
