import React, { Component } from "react";
import download from "downloadjs";

import Welcome from "./Welcome";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import Chart from "./Chart";

import "./App.css";

const LOCAL_STORAGE_KEYS = ["data", "config"];

const DEFAULT_CONFIG = {
  hourOffset: -5,
  hourPad: 5,
  amplitude: 0.2,
  backgroundColor: "#000000",
  foregroundColor: "#ffffff"
};

class App extends Component {
  constructor() {
    super();

    this.onDrop = this.onDrop.bind(this);
    this.onReadFile = this.onReadFile.bind(this);
    this.onLoaderComplete = this.onLoaderComplete.bind(this);
    this.onConfigChange = this.onConfigChange.bind(this);
    this.download = this.download.bind(this);
    this.clear = this.clear.bind(this);

    this.state = {
      loading: false,
      error: null,
      data: null,
      config: DEFAULT_CONFIG
    };

    LOCAL_STORAGE_KEYS.forEach(key => {
      const savedData = window.localStorage.getItem(key);
      if (savedData) {
        this.state[key] = JSON.parse(savedData);
      }
    });
  }

  componentDidUpdate() {
    LOCAL_STORAGE_KEYS.forEach(key => {
      window.localStorage.setItem(key, JSON.stringify(this.state[key]));
    });
  }

  onDrop(acceptedFiles) {
    this.setState({ loading: true });
    const reader = new FileReader();
    reader.onload = this.onReadFile;
    reader.readAsText(acceptedFiles[0]);
  }

  onReadFile(event) {
    const rawData = event.target.result;
    const loader = new Loader();
    loader.onComplete = this.onLoaderComplete;
    loader.load(rawData);
  }

  onLoaderComplete(data) {
    if (data.length === 0) {
      this.setState({
        loading: false,
        error: "Couldn't parse the file you uploaded, sorry."
      });
    } else {
      this.setState({ loading: false, error: null, data });
    }
  }

  onConfigChange(config) {
    this.setState({ config });
  }

  download() {
    if (this._chart) {
      const uri = this._chart.toDataURL();
      if (uri) {
        download(uri, "shadowplay.svg", "data:image/svg+xml");
      }
    }
  }

  clear() {
    this.setState({ data: null, config: DEFAULT_CONFIG });
  }

  render() {
    const { loading, error, data, config } = this.state;
    return (
      <div className="App" style={{ backgroundColor: config.backgroundColor }}>
        <div className="App-sidebar">
          <Sidebar
            onDropFile={this.onDrop}
            onConfigChange={this.onConfigChange}
            onDownload={this.download}
            onClear={this.clear}
            loading={loading}
            data={data}
            config={config}
          />
        </div>

        <div className="App-main">
          {data && (
            <div className="App-chart">
              <Chart
                data={data}
                config={config}
                ref={chart => {
                  this._chart = chart;
                }}
              />
            </div>
          )}
          {error && <div className="App-error">{error}</div>}
          {!data && !error && <Welcome />}
        </div>
      </div>
    );
  }
}

export default App;
