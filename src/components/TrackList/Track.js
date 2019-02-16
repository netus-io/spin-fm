import React, { Component } from 'react'

class Track extends Component{
  render() {
    const { title, artist } = this.props.track
    return(
      <tr>
        <td>
          <strong>{ title }</strong>
          <br/>
          <span>{ artist }</span>
        </td>
        <td>
          <i 
            className="center material-icons btn-floating right" 
            onClick={ () => {this.props.removeTrack(this.props.track)} }
          >clear</i>
        </td>
      </tr>
    )
  }
}

export default Track