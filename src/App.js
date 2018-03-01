import React, { Component } from "react";
import Dropzone from "react-dropzone";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import readData from "./readData";
import Chart from "./Chart";
import "./App.css";

const localStorageKey = "data";

class App extends Component {
  constructor() {
    super();

    this.onDrop = this.onDrop.bind(this);
    this.onReadFile = this.onReadFile.bind(this);
    this.onHourOffsetChange = this.onHourOffsetChange.bind(this);
    this.onHourPadChange = this.onHourPadChange.bind(this);

    this.state = {
      hourOffset: 0,
      hourPad: 5
    };

    const savedData = window.localStorage.getItem(localStorageKey);
    if (savedData) {
      this.state.data = JSON.parse(savedData);
    }
  }

  onDrop(acceptedFiles) {
    const reader = new FileReader();
    reader.onload = this.onReadFile;
    reader.readAsText(acceptedFiles[0]);
  }

  onReadFile(event) {
    const rawData = event.target.result;
    const data = readData(rawData);
    this.setState({ data });
    window.localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  onHourOffsetChange(value) {
    this.setState({ hourOffset: value });
  }

  onHourPadChange(value) {
    this.setState({ hourPad: value });
  }

  render() {
    const { data, hourOffset, hourPad } = this.state;
    return (
      <div className="App">
        <div className="App-controls">
          <Dropzone onDrop={this.onDrop} />
          {data && (
            <div>
              <label>Hour offset</label>
              <Slider
                min={-12}
                max={12}
                value={hourOffset}
                onChange={this.onHourOffsetChange}
              />

              <label>Pad</label>
              <Slider
                min={0}
                max={12}
                value={hourPad}
                onChange={this.onHourPadChange}
              />
            </div>
          )}
        </div>

        {data && (
          <div className="App-chart">
            <Chart data={data} hourOffset={hourOffset} hourPad={hourPad} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
