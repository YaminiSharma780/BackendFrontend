import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MyLoginContext } from "./contexts/LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <MyLoginContext>
    <App />
  </MyLoginContext>
);
