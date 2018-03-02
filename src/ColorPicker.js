import React, { Component } from "react";
import { SwatchesPicker } from "react-color";

class ColorPicker extends Component {
  constructor() {
    super();

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);

    this.state = { open: false };
  }

  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        {this.state.open && (
          <div
            className="ColorPicker-picker"
            style={{ position: "absolute", zIndex: 2, top: "-244px" }}
          >
            <div
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }}
              onClick={this.onClose}
            />
            <div style={{ position: "relative" }}>
              <SwatchesPicker
                color={this.props.color}
                onChange={this.props.onChange}
                width={320}
                height={240}
              />
            </div>
          </div>
        )}
        <div
          onClick={this.onOpen}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px"
          }}
        >
          <div
            style={{
              backgroundColor: this.props.color,
              height: "20px",
              borderRadius: "2px"
            }}
          />
        </div>
      </div>
    );
  }
}

export default ColorPicker;
