import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

import web3 from 'web3'
//import Avatar from '../../ethereum/build/contracts/Avatar.json';

import { actionOne } from '../actions'

class ScreenCreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dummyStateVar: false
    }
    this.onSelectedItem = this.onSelectedItem.bind(this)
    super(props)
  }

  onSelectedItem(obj) {
    this.setState({
      dummyStateVar: true
    })

    this.props.actionOne(obj, (err, data, response) => {
      console.log("Action One - Going to ScreenCreateUser::: " + JSON.stringify(obj))
      this.props.history.push('/screenLoungeArea/' + obj.name)
    })
  }
  componentDidMount(){
  console.log("mounting !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  
  
  
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
      <div style={{display:'flex', flexDirection: 'row'}}>

        <div
        style={{
          width: '30%',
          height:'100vh',
          backgroundColor: 'black'
        }}>
            <h3>Create New User</h3>
            <Link to="/screenLoungeArea" className="waves-effect waves-light btn-large">
              <i className="material-icons left">open_in_new</i>To Lounge Area
            </Link>
        </div>

        <div className=''
        style={{
          // width:'70%',
          // height:'100vh',
          flex:1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div className='row'>
            <div className="col s12 m4 s4">
              <div className="card small hoverable"></div>
            </div>
            <div className="col s12 m4 s4">
              <div className="card small hoverable"></div>
            </div>
            <div className="col s12 m4 s4">
              <div className="card small hoverable"></div>
            </div>
          </div>
          <div className='row'>
            <div className="col s12 m4 s4">
              <div className="card small hoverable"></div>
            </div>
            <div className="col s12 m4 s4">
              <div className="card small hoverable"></div>
            </div>
            <div className="col s12 m4 s4">
              <div className="card small hoverable"></div>
            </div>
          </div>
          <Link to="/screenLoungeArea" className="waves-effect waves-light btn-large">
            <i className="material-icons left">open_in_new</i>Create a character
          </Link>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('STATE:: ' + JSON.stringify(state))
  return {
    dummyStateList:     state.dummyStateList,
  }
}

export { ScreenCreateUser } // The raw component is useful to have when writing unit tests, and can also increase reusability
export default connect(mapStateToProps, { actionOne })(ScreenCreateUser)
