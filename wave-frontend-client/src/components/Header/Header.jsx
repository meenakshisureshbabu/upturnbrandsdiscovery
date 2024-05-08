import React from 'react'
import '../Header/header.css'
import NavBar from '../NavBar/NavBar'

function Header({user,setUser}) {
  return (
    <div>
      <div className='header-main-div'>
        <div className='appname-div'>
          <h1>STYX</h1>
        </div>
        <div className='navbar-div'>
          <NavBar setUser={setUser}/>
        </div>
      </div>
    </div>
  )
}

export default Header