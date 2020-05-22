import React from "react";
import Dropzone from "react-dropzone";
import ControlPanel from "./ControlPanel";

import "./Sidebar.css";

export default ({
  onDropFile,
  onConfigChange,
  onDownload,
  onClear,
  loading,
  data,
  config,
}) => (
  <div className="Sidebar">
    {loading ? (
      <div className="Sidebar-loading">Loading</div>
    ) : data ? (
      <ControlPanel
        config={config}
        onChange={onConfigChange}
        onDownload={onDownload}
        onClear={onClear}
      />
    ) : (
      <Dropzone
        className="Sidebar-dropzone"
        activeClassName="Sidebar-dropzone-active"
        onDrop={onDropFile}
      >
        Drop file here.
      </Dropzone>
    )}
  </div>
);
