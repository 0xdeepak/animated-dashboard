import { useEffect, useRef, useState } from "react";
import "./shareOfVoice.css";
import useAnimatedComponent from "../../hooks/useAnimatedComponent";
import { fetchShareOfVoiceData } from "../../api/project";
import LineGraph from "../LineGraph/lineGraph";

function ShareofVoice() {
  const cardRef = useRef();
  useAnimatedComponent(cardRef);
  const [type, setType] = useState("Search");
  const [data, setData] = useState();

  useEffect(() => {
    fetchShareOfVoiceData().then((data) => setData(data));
  });

  return (
    <div ref={cardRef} className="shareOfVoice hidden">
      <div className="shareOfVoice-header">
        <div className="shareOfVoice-header-title">Share Of Voice</div>
        <div className="shareOfVoice-header-right">
          {["All", "Search", "Social"].map((item) => {
            return (
              <button
                key={item}
                className={`shareOfVoice-header-right-item ${item === type && "selected"}`}
                onClick={() => setType(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <div className="shareOfVoice-content">
        <div className="shareOfVoice-content-left">
          <div className="shareOfVoice-content-left-list">
            <div className="shareOfVoice-content-left-list-header">
              <div className="col-1"></div>
              <div className="col-2">Topic Name</div>
              <div className="col-3">SOV %</div>
            </div>
            <div className="shareOfVoice-content-left-list-container">
              {data?.listData.map((item, index) => (
                <div key={item.topicName} className="shareOfVoice-content-left-list-item">
                  <div className="col-1">{index + 1}</div>
                  <div className="col-2">{item.topicName}</div>
                  <div className="col-3">{item.sov}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="shareOfVoice-content-left-chart"></div>
        </div>
        <div className="shareOfVoice-content-right">
          <LineGraph
            id={"visits-graph"}
            data={data?.graphData}
            leftMargin={50}
            animationTime={200}
            bottomMargin={20}
            noOfYIndicators={3}
          />
        </div>
      </div>
    </div>
  );
}

export default ShareofVoice;
