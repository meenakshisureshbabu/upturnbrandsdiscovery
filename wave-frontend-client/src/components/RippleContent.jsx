import { Container } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import AskGPT from "../pages/AskGpt/AskGpt";

function RippleContent({ clickedService,waveId }) {
  const RippleComponents = {
    "AskGPT" : AskGPT
  };
  console.log("Clicked Service", clickedService);
  return (
    <div>
      <Container fixed>
        {(() => {
          if (typeof RippleComponents[clickedService] !== "undefined") {
            return React.createElement(RippleComponents[clickedService],{
              waveId:waveId
            });
          }
        })()}
      </Container>
    </div>
  );
}

export default RippleContent;
