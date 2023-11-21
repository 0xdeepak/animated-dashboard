import { useEffect, useRef, useState } from "react";
import "./competitors.css";
import useAnimatedComponent from "../../hooks/useAnimatedComponent";
import { fetchCompetitorsData } from "../../api/project";
import LineGraph from "../LineGraph/lineGraph";

function Competitors() {
  const cardRef = useRef();
  useAnimatedComponent(cardRef);
  const [competitorsData, setCompetitorsData] = useState();

  useEffect(() => {
    fetchCompetitorsData().then((data) => setCompetitorsData(data));
  });

  return (
    <div ref={cardRef} className="competitors hidden">
      <div className="competitors-header">
        <div className="competitors-header-title">Top Business and Content Competitors</div>
        <button className="competitors-header-right">View competitors analytics</button>
      </div>
      <div className="competitors-content">
        <div className="competitors-content-list-header">
          <div className="col-1">Domain</div>
          <div className="col-2">Articles</div>
          <div className="col-3">Organic Search Traffic</div>
          <div className="col-4">Social Shares</div>
          <div className="col-5">Good or Bad source</div>
          <div className="col-6">Word Length</div>
          <div className="col-7">CPC Value</div>
        </div>
        <div className="competitors-content-list-container">
          {competitorsData?.map((item, index) => (
            <div key={item.topicName} className="competitors-content-list-item">
              <div className="col-1">{item.domain}</div>
          <div className="col-2">{item.articles}</div>
          <div className="col-3">{item.searchTraffic}</div>
          <div className="col-4">{item.socialShares}</div>
          <div className="col-5">{item.goodOrBadSources}</div>
          <div className="col-6">{item.wordLength}</div>
          <div className="col-7">{item.cpc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Competitors;
