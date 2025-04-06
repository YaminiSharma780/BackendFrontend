import { createContext, useEffect, useState } from "react";
import { useDataAPI } from "../api";

export const LoginContext = createContext(null);

export const MyLoginContext = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  const userAuthentication = async (authToken) => {
    console.log("Using token:", authToken);
    try {
      const response = await fetch(useDataAPI, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data from get api in LoginContext : ", data);
        setUserData({
          id: data.userData._id,
          username: data.userData.username,
          email: data.userData.email,
          phone: data.userData.phone,
          isAdmin: data.userData.isAdmin,
        });
        setLoggedIn(true);
        if (data.userData.isAdmin === true) {
          setAdminLoggedIn(true);
        }
      } else {
        console.error("Failed to fetch user data:", response.statusText);
        setLoggedIn(false);
      }
    } catch (error) {
      console.log("Error fetching user data at LoginContext:", error);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      userAuthentication(lsToken);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    storeTokenLS(token);
    setLoggedIn(true);
    if (token) {
      userAuthentication(token);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUserData({
      username: "",
      email: "",
      password: "",
      phone: "",
    });
    removeTokenLS();
  };

  const removeTokenLS = () => {
    return localStorage.removeItem("token");
  };

  const storeTokenLS = (token) => {
    return localStorage.setItem("token", token);
  };

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        adminLoggedIn,
        userData,
        token,
        login,
        logout,
        storeTokenLS,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
