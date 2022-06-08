import React from "react"
import { NavLink } from "react-router-dom"

import '../Styles/Header.scss'
import '../Styles/Variables.scss'

const Header = () => {
  return( 
    <nav>
      <NavLink to="/home" >Home</NavLink>
      {/* <NavLink to="login">Sell Data</NavLink> */}
      <NavLink to="/crypto">Crypto</NavLink>
      {/* Add a component that advertises all of her socials too */}
      <NavLink to="/watchlist">Watchlist</NavLink>
    </nav>
  )
}
export default Header