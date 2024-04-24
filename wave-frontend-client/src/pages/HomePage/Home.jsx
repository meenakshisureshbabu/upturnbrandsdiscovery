import React from "react";
import "../HomePage/home.css";


import DynamicComponents from "../../DynamicComponents";

function Home({user,setUser}) {
  const data = {
    content: {
      firstcontainer: [
        {
          _uid: "BUY6Drn9e1",
          component: "userComponent",
          headline: "User Details",
        },
        {
          _uid: "gJZoSLkfZV",
          component: "calendar",
          title: "Events",
        },
        {
          _uid: "gJZoKLkfZV",
          component: "currents",
          title: "Currents",
        },
      ],
      secondcontainer: [
        {
          _uid: "htryUndng",
          component: "createwave",
          title: "CreateWave",
        },
      ],
      thirdcontainer: [
        {
          _uid: "gJZoSLkfJK",
          component: "deltas",
          title: "Deltas",
        },
      ],
    },
  };
  return (
    <>
     
        <div className="main-home-container">
          <div className="home-first-container">
            {data.content.firstcontainer.map((firstblock) =>
              DynamicComponents(firstblock,user)
            )}
          </div>

          <div className="home-second-container">
          {data.content.secondcontainer.map((secondblock) =>
              DynamicComponents(secondblock)
            )}
          </div>
          <div className="home-third-container">
          {data.content.thirdcontainer.map((thirdblock) =>
              DynamicComponents(thirdblock)
            )}
          </div>
        </div>
      
    </>
  );
}

export default Home;
