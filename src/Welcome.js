import React from "react";

import Credits from "./Credits";
import "./Welcome.css";

export default () => (
  <div className="Welcome">
    <div className="Welcome-inner">
      <h1>SHADOWPLAY</h1>
      <p>Make a nice graph of git commit activity.</p>
      <ol>
        <li>Go to the directory of the git repo you want to graph.</li>
        <li>
          Run <code>git log --format=format:%aI &gt; commits.txt</code>
        </li>
        <li>
          Drop <code>commits.txt</code> over there on the left.
        </li>
      </ol>
      <Credits />
    </div>
  </div>
);
