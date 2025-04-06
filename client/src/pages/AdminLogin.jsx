import { useState } from "react";
import { useLoginContext } from "../hooks/useLoginContext";
import { useNavigate } from "react-router-dom";
import { adminLoginAPI } from "../api";
import { toast } from "react-toastify";

export default function AdminLogin() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    isAdmin: true,
  });

  const { login } = useLoginContext();

  function handleInput(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
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
      const response = await fetch(adminLoginAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data.message, " + ", data.extraDetails);
      if (response.ok) {
        console.log("check 1 token : ", data);
        login(data.token);
        toast.success("Successfully logged In");
        navigate("/admin/services");
      } else {
        if (data.extraDetails) {
          toast.error(data.message);
          console.log(data.extraDetails);
        } else {
          toast.error("Invalid Credentials");
        }
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log("error from frontend {login}", error);
    }
  };

  return (
    <div className="admin-main-container">
      <div className="registration-form">
        <h1 className="form-h1">Login to your Admin Account</h1>
        <form>
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
            <button onClick={(e) => handleSubmit(e)}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
