import { useEffect, useRef, useState } from "react";
import drawGraphOnCanvas from "./drawGraphOnCanvas";
import "./lineGraph.css";

function LineGraph({ id, data, leftMargin, bottomMargin, noOfYIndicators, animationTime }) {
  const animationIntervalIdRef = useRef(null);
  const graphRef = useRef(null);
  const canvasRef = useRef(null);
  const toolTipRef = useRef(null);

  useEffect(() => {
    if (graphRef.current) {
      const graphRect = graphRef.current.getBoundingClientRect();
      canvasRef.current.height = Math.max(graphRect.height, 50);
      canvasRef.current.width = Math.max(graphRect.width, 100);
    }
    if (canvasRef.current && toolTipRef.current && data) {
      const dataX = data.map((item) => item[0]);
      const dataY = data.map((item) => item[1]);
      if (animationIntervalIdRef.current) {
        clearTimeout(animationIntervalIdRef.current);
        animationIntervalIdRef.current = null;
      }
      const newIntervalId = drawGraphOnCanvas({
        canvasRef,
        toolTipRef,
        dataX,
        dataY,
        leftMargin: leftMargin,
        bottomMargin: bottomMargin,
        YIndicators: noOfYIndicators,
        animationTime,
      });
      animationIntervalIdRef.current = newIntervalId;
    }

    return (() => clearTimeout(animationIntervalIdRef.current))
  }, [canvasRef, data, toolTipRef]);

  return (
    <div ref={graphRef} className="graph" id={id}>
      <canvas ref={canvasRef} id="canvas" />
      <div ref={toolTipRef} className="canvas-tooltip" />
    </div>
  );
}

export default LineGraph;
