import React from "react";

import Credits from "./Credits";
import "./Welcome.css";

export default () => (
  <div className="Welcome">
    <div className="Welcome-inner">
      <h1>SHADOWPLAY</h1>
      <p>Make a nice graph of your Twitter activity.</p>
      <ol>
        <li>
          <b>Request your Twitter archive.</b> Go to{" "}
          <a
            href="https://twitter.com/settings/account"
            target="_blank"
            rel="noopener noreferrer"
          >
            “Settings and privacy”
          </a>, scroll down and click “Request your archive”. Twitter will email
          you a link to a zip file.
        </li>
        <li>
          <b>Download the archive.</b>
        </li>
        <li>
          <b>Open it and find tweets.csv.</b>
        </li>
        <li>
          <b>Drop it over there on the left.</b> Your data won’t leave your
          computer. If you don’t believe me, disconnect from the internet first.
        </li>
      </ol>
      <Credits />
    </div>
  </div>
);
