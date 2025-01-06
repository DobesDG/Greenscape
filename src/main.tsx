import ReactDOM from "react-dom/client";
import MainRoutes from "./routes.jsx";
import { BrowserRouter } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root as HTMLElement).render(
  <BrowserRouter>
    <MainRoutes />
  </BrowserRouter>
);