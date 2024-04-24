import React from "react";
import availableServicesIcons from "../../models/availableServicesIcons";
import "../AvailableServicesList/availableserviceslist.css";

function AvailableServicesList({ setClickedService,disabled }) {
  return (
    <div hidden={disabled}>
      <div  className="tag_menu_div">
        {availableServicesIcons.map((service) => {
          return (
            <div className="tag_menu_div_item">
              <img 
                
                className="tag_icon_img"
                src={service.icon_image}
                alt=""
                onClick={() => setClickedService(service.icon_name)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AvailableServicesList;
