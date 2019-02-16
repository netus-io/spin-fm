import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import RoomList from '../components/RoomList';
import { goToRoom } from '../actions'

class ScreenLoungeArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryingNetus: false
    }
    this.onSelectedRoom = this.onSelectedRoom.bind(this)
  }

  onSelectedRoom(room) {
    this.setState({
      queryingNetus: true
    })
    this.props.goToRoom(room, (err, data, response) => {
      console.log("LOUNGE ROOM::: " + JSON.stringify(room))
      this.props.history.push('/room/' + room.networkId)
    })

  }

  render() {
    const queryingNetus = this.state.queryingNetus
    let preloaderBar
    if(queryingNetus) {
      preloaderBar = (
        <div className="progress">
            <div className="indeterminate"></div>
        </div>
      )
    } else {
      preloaderBar = <div></div>
    }
    return (
      <div>
        <div className="container">
          <br/>
          <div className="row center">
            <Link to="/room/create-room" className="waves-effect waves-light btn-large">
              <i className="material-icons left">open_in_new</i>New Room
            </Link>
            <Link to="/room/random-room" className="waves-effect waves-light btn-large">
              <i className="material-icons right">insert_emoticon</i>Random Room
            </Link>
          </div>
          { preloaderBar }
          <RoomList
            musicroomList={ this.props.musicroomList }
            onSelectedRoom= { this.onSelectedRoom }
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('STATE:: ' + JSON.stringify(state))
  return { 
    loungeroom:     state.loungeroom,
    musicroomList:  state.loungeroom.musicroomList 
  }
}

export { ScreenLoungeArea } // The raw component is useful to have when writing unit tests, and can also increase reusability
export default connect(mapStateToProps, { goToRoom })(ScreenLoungeArea)