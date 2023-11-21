import { useState } from "react";
import "./projectLayout.css";
import { FaRegQuestionCircle } from "react-icons/fa";

function ProjectLayout({ selectedTimeline, setSelectedTimeline, children }) {

  return (
    <div>
      <div className="project-header">
        <div className="project-header-left">
          <h3 className="project-header-left-heading">Project statistics</h3>
          <FaRegQuestionCircle size={22} className="project-header-left-help" />
        </div>
        <div className="project-header-right">
          {["30 days", "90 days", "6 months", "12 months"].map((item) => {
            return (
              <button
                key={item}
                className={`project-header-right-item ${item === selectedTimeline && "selected"}`}
                onClick={() => setSelectedTimeline(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <div className="project-grid">
      {children}
      </div>
    </div>
  );
}

export default ProjectLayout;
