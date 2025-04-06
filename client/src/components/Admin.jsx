import { Link, Outlet } from "react-router-dom";
import { useLoginContext } from "../hooks/useLoginContext";

export default function Admin() {
  const { loggedIn, logout } = useLoginContext();
  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="admin-content">
          <Link to="/admin/services">Services</Link>
          <Link to="/admin/contacts">Contacts</Link>
          <Link to="/admin/users">Users</Link>
          {loggedIn === true ? (
            <span
              onClick={() => {
                let ans = confirm("Do you want to logout");
                console.log(ans);
                if (ans === true) {
                  logout();s
                  navigate("/admin/login");
                }
              }}
              style={{ cursor: "pointer" }}
            >
              Logout
            </span>
          ) : (
            <Link to="/admin/login">Login</Link>
          )}
          {loggedIn === true ? (
            <Link to="/admin/profile">Profile</Link>
          ) : (
            <Link to="/admin/register">Register</Link>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  );
}
