import Sidebar from "../Sidebar/sidebar";
import { Outlet } from "react-router-dom";
import "./appLayout.css";

function AppLayout() {
  return (
    <div className="App app-container">
      <Sidebar />
      <div className="routes-container">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
