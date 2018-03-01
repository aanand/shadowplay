import React, { Component } from "react";
import Dropzone from "react-dropzone";

import readData from "./readData";
import Chart from "./Chart";
import "./App.css";

const localStorageKey = "data";

class App extends Component {
  constructor() {
    super();
    this.onDrop = this.onDrop.bind(this);
    this.onReadFile = this.onReadFile.bind(this);

    this.state = {};

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

  render() {
    return (
      <div className="App">
        <div className="App-controls">
          <Dropzone onDrop={this.onDrop} />
        </div>

        {this.state.data && (
          <div className="App-chart">
            <Chart data={this.state.data} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
