import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class RoomList extends Component {

  rendeRooms(musicroomList) {
    return _.map(musicroomList, room => {
      const { name, djs, peers, networkId } = room
      return (
        <tr key={ networkId } onClick={ () => this.props.onSelectedRoom(room)}>
          <td><button className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">fast_forward</i></button></td>
          <td>{ djs } / 5</td>
          <td>{ peers }</td>
          <td><strong> { name }</strong></td>
          <td>{ networkId }</td>
        </tr>
      )
    })
  }
  
  render() {
    return (
      <div className="center row">
        <div className="col m12 " >
          <div className="row" id="topbarsearch">
            <div className="input-field col s6 s12 red-text">
              <i className="red-text material-icons prefix">search</i>
              <input type="text" placeholder="search" id="autocomplete-input" className="autocomplete red-text" />
            </div>
          </div>
        </div>
        <table className="highlight">
          <thead>
            <tr>
              <th>DJs</th>
              <th>Peers</th>
              <th>Name</th>
              <th>Network ID</th>
            </tr>
          </thead>
          <tbody>
            { this.rendeRooms(this.props.musicroomList) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default RoomList