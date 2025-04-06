import { useState } from "react";
import { useLoginContext } from "../hooks/useLoginContext";

export default function AdminProfile() {
  const { userData } = useLoginContext();

  console.log("userData at Profile Page : ", userData);

  return (
    <div className="admin-profile">
      <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Username</td>
            <td>{userData.username}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{userData.phone}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{userData.email}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <button>Add More Information</button>
            </td>
            <td>
              <button>Update Information</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
