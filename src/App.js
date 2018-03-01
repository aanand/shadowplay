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
    this.onhourOffsetChange = this.onhourOffsetChange.bind(this);

    this.state = {
      hourOffset: 0
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

  onhourOffsetChange(value) {
    this.setState({ hourOffset: value });
  }

  render() {
    const { data, hourOffset } = this.state;
    return (
      <div className="App">
        <div className="App-controls">
          <Dropzone onDrop={this.onDrop} />
          {data && (
            <Slider
              min={-12}
              max={12}
              value={hourOffset}
              onChange={this.onhourOffsetChange}
            />
          )}
        </div>

        {data && (
          <div className="App-chart">
            <Chart data={data} hourOffset={hourOffset} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
