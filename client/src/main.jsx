import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MyLoginContext } from "./contexts/LoginContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <MyLoginContext>
    <App />
    <ToastContainer />
  </MyLoginContext>
);
