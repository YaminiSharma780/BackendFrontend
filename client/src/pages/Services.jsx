import { useEffect, useState } from "react";
import { allServicesAPI } from "../api";

export default function Services() {
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

  return (
    <div className="services-container">
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
            <th>Provider</th>
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
