import React from "react";
import { properties } from "../../properties/properties";
import "../AppHeader/appheader.css";
import { appheaderMenu } from "../../models/navbarmenu";

function AppHeader() {
    console.log(appheaderMenu)
  return (
    <div className="app-header-div">
      <div>
        <img src={properties.styximage} className="styx-logo-img" alt="Styx" />
      </div>
      <div className="app-header-menu-div">
        {appheaderMenu.map((menu) => {
         return <div>{menu.menu_name}</div>
        })}
      </div>
    </div>
  );
}

export default AppHeader;
