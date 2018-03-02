import React, { Component } from "react";

import Dropzone from "react-dropzone";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import readData from "./readData";
import ColorPicker from "./ColorPicker";
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
    this.onAmplitudeChange = this.onAmplitudeChange.bind(this);
    this.onBackgroundColorChange = this.onBackgroundColorChange.bind(this);
    this.onForegroundColorChange = this.onForegroundColorChange.bind(this);

    this.state = {
      hourOffset: -5,
      hourPad: 5,
      amplitude: 0.2,
      backgroundColor: "#000000",
      foregroundColor: "#ffffff"
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

  onAmplitudeChange(value) {
    this.setState({ amplitude: value });
  }

  onBackgroundColorChange(value) {
    this.setState({ backgroundColor: value.hex });
  }

  onForegroundColorChange(value) {
    this.setState({ foregroundColor: value.hex });
  }

  render() {
    const {
      data,
      hourOffset,
      hourPad,
      amplitude,
      backgroundColor,
      foregroundColor
    } = this.state;
    return (
      <div className="App" style={{ backgroundColor }}>
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
            <div className="App-sliders">
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

              <label>Amplitude</label>
              <Slider
                min={0}
                max={0.5}
                step={0.01}
                value={amplitude}
                onChange={this.onAmplitudeChange}
              />

              <label>Background</label>
              <ColorPicker
                className="App-color-picker"
                color={backgroundColor}
                onChange={this.onBackgroundColorChange}
              />

              <label>Lines</label>
              <ColorPicker
                className="App-color-picker"
                color={foregroundColor}
                onChange={this.onForegroundColorChange}
              />
            </div>
          )}
        </div>

        {data && (
          <div className="App-chart">
            <Chart
              data={data}
              hourOffset={hourOffset}
              hourPad={hourPad}
              amplitude={amplitude}
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
