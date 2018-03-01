import React, { Component } from "react";
import Dropzone from "react-dropzone";
import readData from "./read-data";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.onDrop = this.onDrop.bind(this);
    this.onReadFile = this.onReadFile.bind(this);
  }

  onDrop(acceptedFiles) {
    const reader = new FileReader();
    reader.onload = this.onReadFile;
    reader.readAsText(acceptedFiles[0]);
  }

  onReadFile(event) {
    const rawData = event.target.result;
    const data = readData(rawData);
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <Dropzone onDrop={this.onDrop} />
      </div>
    );
  }
}

export default App;
