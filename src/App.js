import React, { Component } from "react";
import Dropzone from "react-dropzone";

import readData from "./readData";
import ControlPanel from "./ControlPanel";
import Chart from "./Chart";
import "./App.css";

const localStorageKey = "data";

class App extends Component {
  constructor() {
    super();

    this.onDrop = this.onDrop.bind(this);
    this.onReadFile = this.onReadFile.bind(this);
    this.onConfigChange = this.onConfigChange.bind(this);

    this.state = {
      config: {
        hourOffset: -5,
        hourPad: 5,
        amplitude: 0.2,
        backgroundColor: "#000000",
        foregroundColor: "#ffffff"
      }
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

  onConfigChange(config) {
    this.setState({ config });
  }

  render() {
    const { data, config } = this.state;
    return (
      <div className="App" style={{ backgroundColor: config.backgroundColor }}>
        <div className="App-controls">
          <div className="App-dropzone">
            <Dropzone
              className="App-dropzone-inner"
              activeClassName="App-dropzone-inner-active"
              onDrop={this.onDrop}
            >
              Drop tweets.csv here
            </Dropzone>
          </div>

          {data && (
            <ControlPanel config={config} onChange={this.onConfigChange} />
          )}
        </div>

        {data && (
          <div className="App-chart">
            <Chart data={data} config={config} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
