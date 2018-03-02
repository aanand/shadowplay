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
    if (this.state.open) {
      return (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <div
            style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}
            onClick={this.onClose}
          />
          <SwatchesPicker
            color={this.props.color}
            onChange={this.props.onChange}
          />
        </div>
      );
    } else {
      return (
        <div className={this.props.className} onClick={this.onOpen}>
          <div style={{ backgroundColor: this.props.color }} />
        </div>
      );
    }
  }
}

export default ColorPicker;
