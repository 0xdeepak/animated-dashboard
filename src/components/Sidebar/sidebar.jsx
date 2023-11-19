import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { FiGrid } from "react-icons/fi";
import { PiRocketBold } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";
import { TbBookmark } from "react-icons/tb";
import { RiNewspaperLine } from "react-icons/ri";
import { SlEqualizer } from "react-icons/sl";
import { TbHelpSquare } from "react-icons/tb";
import { useEffect, useRef } from "react";

function Sidebar() {
  const location = useLocation();
  const sidebarRef = useRef(null);

  const matchRoute = (route) => {
    return location.pathname === "/" + route;
  };
  const getIconColor = (route) => {
    return matchRoute(route) ? "#00bffe" : "#919191";
  };

  useEffect(() => {
    sidebarRef.current.classList.add("sidebar-visible");
  },[])

  return (
    <div className="sidebar" ref={sidebarRef}>
      <h1 className="app-logo">
        c<span>o</span>ncured
      </h1>
      <div className="links-container">
        <div className="links-container-top">
          <Link to="/" className={`links-container-link ${matchRoute("") && "active"}`}>
            <div className="links-container-link-left">
              <FiGrid color={getIconColor("")} fontSize={16} className="links-container-link-icon" />
              Overview
            </div>
            {matchRoute("") && <span>&#8226;</span>}
          </Link>
          <Link to="/analytics" className={`links-container-link ${matchRoute("analytics") && "active"}`}>
            <div className="links-container-link-left">
              <PiRocketBold
                color={getIconColor("analytics")}
                fontSize={16}
                className="links-container-link-icon"
              />
              Analytics
            </div>
            {matchRoute("analytics") && <span>&#8226;</span>}
          </Link>
          <Link to="/strategy" className={`links-container-link ${matchRoute("strategy") && "active"}`}>
            <div className="links-container-link-left">
              <GrGroup
                color={getIconColor("strategy")}
                fontSize={16}
                className="links-container-link-icon"
              />
              Strategy
            </div>
            {matchRoute("strategy") && <span>&#8226;</span>}
          </Link>
          <Link to="/briefs" className={`links-container-link ${matchRoute("briefs") && "active"}`}>
            <div className="links-container-link-left">
              <LuClipboardList
                color={getIconColor("briefs")}
                fontSize={16}
                className="links-container-link-icon"
              />
              Briefs
            </div>
            {matchRoute("briefs") && <span>&#8226;</span>}
          </Link>
          <Link to="/saved" className={`links-container-link ${matchRoute("saved") && "active"}`}>
            <div className="links-container-link-left">
              <TbBookmark
                color={getIconColor("saved")}
                fontSize={16}
                className="links-container-link-icon"
              />
              Saved
            </div>
            {matchRoute("saved") && <span>&#8226;</span>}
          </Link>
          <Link to="/library" className={`links-container-link ${matchRoute("library") && "active"}`}>
            <div className="links-container-link-left">
              <RiNewspaperLine
                color={getIconColor("library")}
                fontSize={16}
                className="links-container-link-icon"
              />
              Library
            </div>
            {matchRoute("library") && <span>&#8226;</span>}
          </Link>
        </div>
        <div className="links-container-bottom">
          <Link to="/settings" className={`links-container-link ${matchRoute("settings") && "active"}`}>
            <div className="links-container-link-left">
              <SlEqualizer color={getIconColor("settings")} fontSize={16} className="links-container-link-icon" />
              Settings
            </div>
            {matchRoute("settings") && <span>&#8226;</span>}
          </Link>
          <Link to="/help" className={`links-container-link ${matchRoute("help") && "active"}`}>
            <div className="links-container-link-left">
              <TbHelpSquare color={getIconColor("help")} fontSize={16} className="links-container-link-icon" />
              Help
            </div>
            {matchRoute("help") && <span>&#8226;</span>}
          </Link>
          <div className="links-container-link logout">
            <div className="links-container-link-left">
              <FiGrid color="#919191" fontSize={16} className="links-container-link-icon" />
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
