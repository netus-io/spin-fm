import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper black">
          <div className="brand-logo"><Link to="/loungeArea">spin.fm</Link></div>
            <ul className="right hide-on-med-and-down">
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
