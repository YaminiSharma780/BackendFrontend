import { Link, useNavigate } from "react-router-dom";
import { useLoginContext } from "../hooks/useLoginContext";

export default function Header() {
  let navigate = useNavigate();
  const { loggedIn, logout } = useLoginContext();
  return (
    <header>
      <div className="header">
        <span className="app-name">
          <Link to="/">AppName</Link>
        </span>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        {loggedIn === true ? (
          <span
            onClick={() => {
              let ans = confirm("Do you want to logout");
              console.log(ans);
              if (ans === true) {
                logout();
                navigate("/login");
              }
            }}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {loggedIn === true ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/register">Register</Link>
        )}
      </div>
    </header>
  );
}
