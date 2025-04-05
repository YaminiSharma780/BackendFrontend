import { Link, Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="admin-content">
          <Link to="/admin/services">Services</Link>
          <Link to="/admin/contacts">Contacts</Link>
          <Link to="/admin/users">Users</Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
