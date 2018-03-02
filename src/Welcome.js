import React from "react";

import "./Welcome.css";

export default () => (
  <div className="Welcome">
    <div className="Welcome-inner">
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
