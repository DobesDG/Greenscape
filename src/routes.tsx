
import { Route, Routes } from "react-router";
import App from "./App";
import User from "./User";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/user/:user" element={<User />} />
    </Routes>
  );
}

export default MainRoutes;
