import React, { Component } from "react";
import Dropzone from "react-dropzone";

import Loader from "./Loader";
import ControlPanel from "./ControlPanel";
import Chart from "./Chart";
import "./App.css";

const localStorageKeys = ["data", "config"];

class App extends Component {
  constructor() {
    super();

    this.onDrop = this.onDrop.bind(this);
    this.onReadFile = this.onReadFile.bind(this);
    this.onLoaderComplete = this.onLoaderComplete.bind(this);
    this.onConfigChange = this.onConfigChange.bind(this);
    this.clear = this.clear.bind(this);

    this.state = {
      loading: false,
      data: null,
      config: {
        hourOffset: -5,
        hourPad: 5,
        amplitude: 0.2,
        backgroundColor: "#000000",
        foregroundColor: "#ffffff"
      }
    };

    localStorageKeys.forEach(key => {
      const savedData = window.localStorage.getItem(key);
      if (savedData) {
        this.state[key] = JSON.parse(savedData);
      }
    });
  }

  componentDidUpdate() {
    localStorageKeys.forEach(key => {
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
    this.setState({ loading: false, data });
  }

  onConfigChange(config) {
    this.setState({ config });
  }

  clear() {
    this.setState({ data: null });
  }

  render() {
    const { loading, data, config } = this.state;
    return (
      <div className="App" style={{ backgroundColor: config.backgroundColor }}>
        <div className="App-controls">
          {!loading && (
            <div>
              {data ? (
                <div className="App-clear">
                  <button type="button" onClick={this.clear}>
                    Start again
                  </button>
                </div>
              ) : (
                <div className="App-dropzone">
                  <Dropzone
                    className="App-dropzone-inner"
                    activeClassName="App-dropzone-inner-active"
                    onDrop={this.onDrop}
                  >
                    Drop tweets.csv here
                  </Dropzone>
                </div>
              )}

              {data && (
                <ControlPanel config={config} onChange={this.onConfigChange} />
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="App-loading">Loading</div>
        ) : data ? (
          <div className="App-chart">
            <Chart data={data} config={config} />
          </div>
        ) : (
          <Welcome />
        )}
      </div>
    );
  }
}

const Welcome = () => (
  <div className="App-welcome">
    <div className="App-welcome-inner">
      <h1>Shadowplay</h1>
      <p>Make a nice graph of your Twitter activity.</p>
      <ol>
        <li>
          <b>Request your Twitter archive.</b> Go to “Settings and privacy”,
          scroll down and click “Request your archive”. Twitter will email you a
          link to a zip file.
        </li>
        <li>
          <b>Download the archive.</b>
        </li>
        <li>
          <b>Open it and find tweets.csv.</b>
        </li>
        <li>
          <b>Drop it over there on the left.</b>
        </li>
      </ol>
    </div>
  </div>
);

export default App;
