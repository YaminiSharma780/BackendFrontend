import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminRegisterAPI } from "../api";
import { toast } from "react-toastify";

export default function AdminRegister() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    isAdmin: false,
  });

  function handleInput(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checked") {
      setUser({
        ...user,
        isAdmin: checked,
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(adminRegisterAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data.message, " + ", data.extraDetails);
      if (response.ok) {
        // storeTokenLS(data.token);
        toast.success("Successfully Registered");
        navigate("/admin/login");
      } else {
        toast.error(data.extraDetails);
        console.log(data.extraDetails);
      }
    } catch (error) {
      toast.error("Registration Unsuccessful");
      console.log("error from frontend {registration}", error);
    }
  };

  return (
    <div className="admin-main-container">
      <div className="registration-form">
        <h1 className="form-h1">Create an Account</h1>
        <form>
          <div className="form-content">
            <label htmlFor="username">Enter Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              id="username"
              required
              autoComplete="off"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-content">
            <label htmlFor="email">Enter Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              id="email"
              required
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-content">
            <label htmlFor="password">Enter Password</label>
            <input
              type="text"
              name="password"
              placeholder="password"
              id="password"
              required
              autoComplete="off"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-content">
            <label htmlFor="phone">Enter Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="phone"
              id="phone"
              required
              autoComplete="off"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-content">
            <label htmlFor="checkbox">Are you Admin ?</label>
            <input
              type="checkbox"
              name="checkbox"
              size="100px"
              placeholder="checkbox"
              id="checkbox"
              className="checkbox"
              required
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-content">
            <button onClick={(e) => handleSubmit(e)}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
