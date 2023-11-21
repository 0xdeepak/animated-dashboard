import { useEffect, useRef, useState } from "react";
import "./totalShares.css";
import useAnimatedComponent from "../../hooks/useAnimatedComponent";
import LineGraph from "../LineGraph/lineGraph";
import { fetchTotalSharesData } from "../../api/project";

function TotalShares() {
  const cardRef = useRef();
  const [sharesData, setSharesData] = useState();
  useAnimatedComponent(cardRef);

  useEffect(() => {
    fetchTotalSharesData().then((data) => {
      setSharesData(data);
    });
  }, []);

  return (
    <div ref={cardRef} className="totalShares hidden">
      <div className="totalShares-header">
        <div className="totalShares-header-title">Total Shares</div>
        <div className="totalShares-header-value">{sharesData?.totalShares}</div>
      </div>
      <div className="graph-container">
        <LineGraph
          id={"visits-graph"}
          data={sharesData?.shareDataPoints}
          leftMargin={55}
          animationTime={200}
          bottomMargin={20}
          noOfYIndicators={4}
        />
      </div>
    </div>
  );
}

export default TotalShares;
