import { useEffect, useRef, useState } from "react";
import "./projectVisits.css";
import useAnimatedComponent from "../../hooks/useAnimatedComponent";
import LineGraph from "../LineGraph/lineGraph";
import { fetchFullYearProjectVisitsData, fetchSixMonthsProjectVisitsData } from "../../api/project";

function ProjectVisits({ selectedTimeline }) {
  const cardRef = useRef();
  const [visitsData, setVisitsData] = useState();
  useAnimatedComponent(cardRef);

  useEffect(() => {
    if (selectedTimeline === "6 months") {
      fetchSixMonthsProjectVisitsData().then((data) => {
        setVisitsData(data);
      });
    } else if (selectedTimeline === "12 months") {
      fetchFullYearProjectVisitsData().then((data) => {
        setVisitsData(data);
      });
    }
  }, [selectedTimeline]);

  return (
    <div ref={cardRef} className="project-visits hidden">
      <div className="project-visits-header">
        <div className="project-visits-header-title">Total Visits</div>
        <div className="project-visits-header-value">{visitsData?.totalVisits}</div>
      </div>
      <div className="graph-container">
        <LineGraph
          id={"visits-graph"}
          data={visitsData?.visitDataPoints}
          leftMargin={selectedTimeline === "12 months" ? 55 : 70}
          animationTime={selectedTimeline === "12 months" ? 150 : 200}
          bottomMargin={20}
          noOfYIndicators={4}
        />
      </div>
    </div>
  );
}

export default ProjectVisits;
