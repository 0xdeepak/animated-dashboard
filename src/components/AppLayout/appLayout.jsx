import Sidebar from "../Sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import "./appLayout.css";

function AppLayout() {
  const openSidebar = () => {
    document.getElementById("sidebar").classList.add("mobile-active");
  };

  return (
    <div className="App app-container">
      <Sidebar />
      <button onClick={openSidebar} className="sidebar-opener">
        <MdArrowForwardIos className="icon" />{" "}
      </button>
      <div className="routes-container">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
