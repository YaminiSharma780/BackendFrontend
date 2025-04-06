import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Admin from "./components/Admin";
import AdminContacts from "./pages/AdminContacts";
import AdminServices from "./pages/AdminServices";
import AdminUsers from "./pages/AdminUsers";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminProfile from "./pages/AdminProfile";
import { useLoginContext } from "./hooks/useLoginContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import NotLoggedIn from "./pages/NotLoggedIn";

function App() {
  const { loggedIn, adminLoggedIn } = useLoginContext();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin"
          element={loggedIn && adminLoggedIn ? <Admin /> : <NotLoggedIn />}
        >
          <Route
            path="contacts"
            element={<ProtectedRoute element={<AdminContacts />} />}
          />
          <Route
            path="services"
            element={<ProtectedRoute element={<AdminServices />} />}
          />
          <Route
            path="users"
            element={<ProtectedRoute element={<AdminUsers />} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute element={<AdminProfile />} />}
          />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
