import React, { Component } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import ColorPicker from "./ColorPicker";
import "./ControlPanel.css";

class ControlPanel extends Component {
  constructor() {
    super();

    this.onHourOffsetChange = this.onHourOffsetChange.bind(this);
    this.onHourPadChange = this.onHourPadChange.bind(this);
    this.onAmplitudeChange = this.onAmplitudeChange.bind(this);
    this.onBackgroundColorChange = this.onBackgroundColorChange.bind(this);
    this.onForegroundColorChange = this.onForegroundColorChange.bind(this);
  }

  onHourOffsetChange(value) {
    this.props.onChange(
      Object.assign(this.props.config, { hourOffset: value })
    );
  }

  onHourPadChange(value) {
    this.props.onChange(Object.assign(this.props.config, { hourPad: value }));
  }

  onAmplitudeChange(value) {
    this.props.onChange(Object.assign(this.props.config, { amplitude: value }));
  }

  onBackgroundColorChange(value) {
    this.props.onChange(
      Object.assign(this.props.config, { backgroundColor: value.hex })
    );
  }

  onForegroundColorChange(value) {
    this.props.onChange(
      Object.assign(this.props.config, { foregroundColor: value.hex })
    );
  }

  render() {
    const {
      onDownload,
      onClear,

      config: {
        hourOffset,
        hourPad,
        amplitude,
        backgroundColor,
        foregroundColor
      }
    } = this.props;

    return (
      <div className="ControlPanel">
        <div className="ControlPanel-config">
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
            max={16}
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
            color={backgroundColor}
            onChange={this.onBackgroundColorChange}
          />

          <label>Lines</label>
          <ColorPicker
            color={foregroundColor}
            onChange={this.onForegroundColorChange}
          />
        </div>

        <div className="ControlPanel-download">
          <button type="button" onClick={onDownload}>
            Download
          </button>
        </div>

        <div className="ControlPanel-clear">
          <button type="button" onClick={onClear}>
            Start again
          </button>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
