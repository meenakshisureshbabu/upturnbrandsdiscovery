import React from "react";
import ViewUserDetails from "./pages/User/ViewUserDetails";
import CalendarDetails from "./pages/Calendar/CalendarDetails";
import DisplayCurrents from "./pages/DisplayCurrents/DisplayCurrents";
import CreateWave from "./pages/CreateWave/CreateWave";
import Deltas from "./pages/Deltas/Deltas";

const DynamicComponents = {
  userComponent: ViewUserDetails,
  calendar: CalendarDetails,
  currents: DisplayCurrents,
  createwave:CreateWave,
  deltas:Deltas
};

export default (block,user) => {
  if (typeof DynamicComponents[block.component] !== "undefined") {
    return React.createElement(DynamicComponents[block.component], {
      key: block._uid,
      block: block,
      user:user
    });
  }

  return React.createElement(
    () => <div>The component {block.component} has not been created yet.</div>,
    { key: block._uid }
  );
};
