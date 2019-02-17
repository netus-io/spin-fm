import React, { Component } from 'react'
import { NavLink, Link, Text } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

import { actionOne } from '../actions'

import Portis from '@portis/web3';
import Web3 from 'web3';

const portis = new Portis('55f3b60f-eacd-4e7b-8d39-bcf0d516dee1', 'kovan');
const web3 = new Web3(portis.provider);

class ScreenLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dummyStateVar: false
    }
    this.onSelectedItem   = this.onSelectedItem.bind(this)
    this._startPortis     = this._startPortis.bind(this)
  }

  onSelectedItem(obj) {
    this.setState({
      dummyStateVar: true
    })

    this.props.actionOne(obj, (err, data, response) => {
      console.log("Action One - Going to ScreenLoungeArea::: " + JSON.stringify(obj))
      this.props.history.push('/screenLoungeArea/' + obj.name)
    })
  }

  // componentWillMount() {
    // web3.eth.getAccounts((error, accounts) => {
    //   if(error) {
    //     console.log(`ERROR: ${error}`)
    //     return
    //   }
    //   console.log(`SUCCESS!`)
    //   console.log(`PORTIS ACCOUNT: ${accounts}`);
    // });
  // }

  _startPortis(){
    console.log('jm portis')
    web3.eth.getAccounts((error, accounts) => {
      if(error) {
        console.log(`ERROR: ${error}`)
        return
      }
      console.log(`SUCCESS!`)
      console.log(`PORTIS ACCOUNT: ${accounts}`);
    });
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
      <div
      style={{
        flex:1,
        height:'100vh',
        backgroundColor: 'black',
        backgroundImage: 'url(https://backgrounds.wetransfer.net/sudanarchives1_1280x800.jpg)'
      }}>
        <div
        className="container">
          <div
          className="row center">
            <div
            className="card large">
                <h1>Spin.fm</h1>
                <Link to="#" onClick={() => this._startPortis()} className="light-blue waves-effect waves-light btn-large">
                <i className="material-icons left">open_in_new</i>Log In
                </Link>

                <br />

                <Link to="/screenCreateUser" className="waves-effect waves-light btn-large">
                <i className="material-icons left">open_in_new</i>Shortcut
                </Link>
            </div>
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
    user:               state.user
  }
}

export { ScreenLogin } // The raw component is useful to have when writing unit tests, and can also increase reusability
export default connect(mapStateToProps, { actionOne })(ScreenLogin)
