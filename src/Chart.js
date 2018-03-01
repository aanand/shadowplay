import React, { Component } from "react";
import NodeGroup from "react-move/NodeGroup";
import { scaleLinear } from "d3-scale";
import { line, area, curveBasis } from "d3-shape";

const boundsWidth = 1000;
const boundsHeight = 1000;

const padHours = 5;

const getMax = (a, b) => Math.max(a, b);

const wrap = (array, offset) =>
  array.slice(offset).concat(array.slice(0, offset));

const pad = (array, pad) => {
  const before = array.slice(-pad).map((d, i) => d * (i / pad));
  const after = array.slice(0, pad).map((d, i) => d * ((pad - i - 1) / pad));
  return before.concat(array).concat(after);
};

class Chart extends Component {
  render() {
    const { data, hourOffset } = this.props;

    const maxVolume = data
      .map(hours => hours.reduce(getMax, 0))
      .reduce(getMax, 0);

    const pathY = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, boundsHeight]);

    const pointX = scaleLinear()
      .domain([0, 23 + padHours * 2])
      .range([0, boundsWidth]);

    const pointY = scaleLinear()
      .domain([0, maxVolume])
      .range([0, -boundsHeight * 0.2]);

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
      <NodeGroup data={data} keyAccessor={(d, i) => i} start={() => {}}>
        {nodes => (
          <svg
            viewBox={`0 0 ${boundsWidth} ${boundsHeight}`}
            style={{ overflow: "visible" }}
          >
            {nodes.map(({ key, data, state }) => {
              let hours = data;
              hours = wrap(hours, -hourOffset);
              hours = pad(hours, padHours);

              return (
                <g key={key} transform={`translate(0, ${pathY(key)})`}>
                  <path fill="white" stroke="none" d={areaRenderer(hours)} />
                  <path
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    d={lineRenderer(hours)}
                  />
                </g>
              );
            })}
          </svg>
        )}
      </NodeGroup>
    );
  }
}

export default Chart;
