import React from 'react'
import DynamicComponents from '../../DynamicComponents';
import { useContext } from 'react';
import { UserNameContext } from '../../context/UserNameContext';


function HomePage() {

  const { userName } = useContext(UserNameContext);

  const data = {
    content: {
      body: [
        {
          _uid: "BUY6Drn9e1",
          component: "userComponent",
          headline: "User Details"
        },
        {
          _uid: "gJZoSLkfZV",
          component: "calendar",
          title: "Calendar"
        }
      ]
    }
  };
  return (
    <div>
      <h1>Home</h1>
      {data.content.body.map(block => DynamicComponents(block))}
    </div>
  )
}

export default HomePage