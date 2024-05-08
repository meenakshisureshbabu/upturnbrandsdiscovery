import React from 'react'
import '../NavBar/navbar.css'
import Logout from '../Logout/Logout'

function NavBar({setUser}) {
  return (
    <div className='navbar-div'>
      <div>
        Home
      </div>
      <div className='logout-div'>
        <Logout setUser={setUser}/>
      </div>
    </div>
  )
}

export default NavBar