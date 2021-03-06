import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { line, area, curveBasis } from "d3-shape";

const boundsWidth = 1000;
const boundsHeight = 1000;
const padding = 100;

const getMax = (a, b) => Math.max(a, b);

const wrap = (array, offset) =>
  array.slice(offset).concat(array.slice(0, offset));

const pad = (array, pad) => {
  if (pad === 0) return array;
  const before = array.slice(-pad).map((d, i) => 0);
  const after = array.slice(0, pad).map((d, i) => 0);
  return before.concat(array).concat(after);
};

class Chart extends Component {
  toDataURL() {
    if (this._svg) {
      const serializer = new XMLSerializer();
      const source = encodeURIComponent(
        serializer.serializeToString(this._svg)
      );
      const url = `data:image/svg+xml;charset=utf-8,${source}`;
      return url;
    }
    return "";
  }

  render() {
    const {
      data,
      config: {
        hourOffset,
        hourPad,
        amplitude,
        backgroundColor,
        foregroundColor
      }
    } = this.props;

    const maxVolume = data
      .map(hours => hours.reduce(getMax, 0))
      .reduce(getMax, 0);

    const pathY = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, boundsHeight]);

    const pointX = scaleLinear()
      .domain([0, 23 + hourPad * 2])
      .range([0, boundsWidth]);

    const pointY = scaleLinear()
      .domain([0, maxVolume])
      .range([0, -boundsHeight * amplitude]);

    const lineRenderer = line()
      .curve(curveBasis)
      .x((_, i) => pointX(i))
      .y(d => pointY(d));

    const areaRenderer = area()
      .curve(curveBasis)
      .x((_, i) => pointX(i))
      .y0(0)
      .y1(d => pointY(d));

    return (
      <svg
        viewBox={`0 0 ${boundsWidth} ${boundsHeight}`}
        style={{ overflow: "visible", backgroundColor: backgroundColor }}
        ref={svg => {
          this._svg = svg;
        }}
      >
        <g
          transform={`translate(${padding}, ${padding}) scale(${(boundsWidth -
            padding * 2) /
            boundsWidth}, ${(boundsHeight - padding * 2) / boundsHeight})`}
        >
          {data.map((entry, index) => {
            let hours = entry;
            hours = wrap(hours, -hourOffset);
            hours = pad(hours, hourPad);

            return (
              <g key={index} transform={`translate(0, ${pathY(index)})`}>
                <path
                  fill={backgroundColor}
                  stroke="none"
                  d={areaRenderer(hours)}
                />
                <path
                  fill="none"
                  stroke={foregroundColor}
                  strokeWidth="2"
                  d={lineRenderer(hours)}
                />
              </g>
            );
          })}
        </g>
      </svg>
    );
  }
}

export default Chart;
