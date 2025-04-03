import { useState } from "react";
import { useLoginContext } from "../hooks/useLoginContext";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../api";

export default function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, storeTokenLS } = useLoginContext();

  function handleInput(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(loginAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.token);
      } else {
        alert("invalid credentials");
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log("error from frontend {login}", error);
    }
  };

  return (
    <div className="main-container">
      <div className="registration-form">
        <h1 className="form-h1">Login to your Account</h1>
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
            <button onClick={(e) => handleSubmit(e)}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
