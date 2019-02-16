import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

import { actionOne } from '../actions'

class ScreenCreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dummyStateVar: false
    }
    this.onSelectedItem = this.onSelectedItem.bind(this)
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
            <h1>Create User</h1>
            <Link to="/screenLoungeArea" className="waves-effect waves-light btn-large">
              <i className="material-icons left">open_in_new</i>To Lounge Area
            </Link>
          </div>
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