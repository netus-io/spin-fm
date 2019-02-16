import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo"><Link to="/loungeArea">reactron-base</Link></div>
          <ul className="right hide-on-med-and-down">
          </ul>
        </div>
      </nav>        
    )
  }
}

export default Header