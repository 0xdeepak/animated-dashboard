export default function drawGraphOnCanvas({
  canvasRef,
  toolTipRef,
  dataX,
  dataY,
  leftMargin,
  bottomMargin,
  YIndicators,
  animationTime=250
}) {
  const canvas = canvasRef.current;
  let height = canvas.height;
  let width = canvas.width;
  let ctx = canvas.getContext("2d", {"willReadFrequently": true});
  ctx.clearRect(0,0, height, width);
  let stepY = Math.round((Math.max(...dataY) - Math.min(...dataY)) / (YIndicators - 1));
  let stepXPx = (width - leftMargin - 10) / (dataX.length - 1);
  const stepYPx = (height - bottomMargin) / (YIndicators + 1);
  const sumTotalDataY = stepY * (YIndicators + 1);
  const upperDataYBound = Math.max(...dataY) + stepY;
  const lowerDataYBound = Math.min(...dataY) - stepY;
  let dataPoints = [];

  function drawBackGrid() {
    let x = leftMargin;
    let y = 0;
    ctx.strokeStyle = "#c2c2c2";
    ctx.lineWidth = 0.25;
    while (x < width) {
      ctx.beginPath();
      ctx.moveTo(x - 0.5, 0.5);
      ctx.lineTo(x, height - bottomMargin - 0.5);
      ctx.stroke();
      x += stepXPx;
    }
    // while (y < height - bottomMargin) {
    //   ctx.beginPath();
    //   ctx.moveTo(leftMargin - 0.5, y - 0.5);
    //   ctx.lineTo(width - 10.5, y - 0.5);
    //   ctx.stroke();
    //   y += stepYPx;
    // }
  }
  function drawChartBoundaries() {
    ctx.lineWidth = 0.25;
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(leftMargin - 0.5, 0.5);
    ctx.lineTo(leftMargin - 0.5, height - bottomMargin - 0.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width, height - 30);
    ctx.lineTo(60, height - 30);
    ctx.stroke();
  }

  function drawDataLine() {
    ctx.save();
    dataPoints.push([
      leftMargin,
      ((height - bottomMargin) / sumTotalDataY) * (upperDataYBound - dataY[0]) - 0.5,
    ]);

    ctx.strokeStyle = "#00bffe";
    ctx.lineJoin = "round";

    let i = 2;
    const intervalId = setInterval(
      function () {
        ctx.beginPath();
        ctx.moveTo(dataPoints[i - 2][0], dataPoints[i - 2][1]);
        const x = leftMargin + stepXPx * (i - 1) - 0.5;
        const y = ((height - bottomMargin) / sumTotalDataY) * (upperDataYBound - dataY[i - 1]) - 0.5;
        ctx.lineTo(x, y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#00bffe";
        ctx.stroke();
        drawDot(dataPoints[i - 2][0], dataPoints[i - 2][1]);
        i += 1;
        dataPoints.push([x, y]);
        showHideTooltip(x,y, true);
        if (i === dataY.length + 1) {
          drawDot(x, y);
          ctx.restore();
          clearInterval(intervalId);
        }
      },
      [animationTime],
    );
    return intervalId;
  }

  function drawDataParameters() {
    let x = leftMargin - 10;
    let y = (height - bottomMargin) / (YIndicators + 1);
    let n = Math.max(...dataY);
    let i = 1;
    for (let xdata of dataX) {
      ctx.font = "300 12px Poppins";
      ctx.fillStyle = "#919191";
      ctx.fillText(xdata, x - 0.5, height - (bottomMargin - 15.5), stepXPx);
      x += stepXPx - 0.5;
    }
    while (i < YIndicators + 1) {
      ctx.fillStyle = "#919191";
      ctx.font = "300 12px Poppins";
      ctx.fillText(n, 0, y, leftMargin - 10);
      n = n - stepY;
      i += 1;
      y += stepYPx;
    }
  }

  function drawDot(x, y) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#00bffe";
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }

  canvas.onmousemove = function (e) {
    const canvasRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.x;
    const y = e.clientY - canvasRect.y;
    showHideTooltip(x,y)
  }

  function showHideTooltip (x, y, flag) {
    const imageData = ctx.getImageData(x, y, 1,1).data;
    if (flag || (imageData[3] === 255 && imageData[0] === 0 && imageData[1] === 191 && imageData[2] === 254)) {
      const value = Math.round(upperDataYBound - (sumTotalDataY / (height - bottomMargin)) * y);
      toolTipRef.current.style.zIndex = "999";
      toolTipRef.current.innerHTML = value;
      const tooltipRect = toolTipRef.current.getBoundingClientRect();
      toolTipRef.current.style.left = (x - tooltipRect.width/2) + "px";
      toolTipRef.current.style.top = (y - tooltipRect.height - 20) + "px";
      toolTipRef.current.style.opacity = "1";
    }
    else {
      toolTipRef.current.style.opacity = "0";
      toolTipRef.current.style.zIndex = "-100";
    }
  }

  function range(start, end) {
    let range = [...Array(end + 1).keys()].filter((value) => end >= value && start <= value);
    return range;
  }

  drawBackGrid();
  drawDataParameters();
  const animationIntervalId = drawDataLine();

  return animationIntervalId;
}
