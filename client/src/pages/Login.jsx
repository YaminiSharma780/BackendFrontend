import { useState } from "react";
import { useLoginContext } from "../hooks/useLoginContext";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../api";
import { toast } from "react-toastify";

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
      const data = await response.json();
      console.log(data.message, " + ", data.extraDetails);
      if (response.ok) {
        console.log("check 1 token : ",data);
        login(data.token);
        toast.success("Successfully logged In");
        navigate("/profile");
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
