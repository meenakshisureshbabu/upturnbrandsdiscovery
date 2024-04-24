import React from "react";
import "../DisplayCurrents/displaycurrents.css";

function DisplayCurrents({block}) {
  return <div className="display-currents-container">{block.title}</div>;
}

export default DisplayCurrents;
