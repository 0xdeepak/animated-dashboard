import { SiLightning } from "react-icons/si";
import { RiArrowDropDownFill } from "react-icons/ri";
import { PiPlusCircleBold } from "react-icons/pi";
import "./navbar.css";
import { useEffect, useRef } from "react";

function Navbar({ currentUser, currentProject }) {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarRef.current.classList.add("navbar-visible");
  }, []);

  return (
    <div className="home-nvabar-container" ref={navbarRef}>
      <div className="home-navbar">
        <div className="home-navbar-left">
          <button className="home-navbar-left-drop-down">
            <SiLightning size={32} className="start-icon" />
            <span>{currentProject}</span>
            <RiArrowDropDownFill size={18} className="end-icon" />
          </button>
          <PiPlusCircleBold size={28} className="home-navbar-left-add" />
        </div>
        <button className="home-navbar-user">
          <img src={currentUser.photoUrl} className="start-icon" alt="user-profile" />
          <span>{currentUser.name}</span>
          <RiArrowDropDownFill size={18} className="end-icon" />
        </button>
      </div>
      <div className="home-divider" />
    </div>
  );
}

export default Navbar;
