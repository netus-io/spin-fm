import React, { Component } from 'react'
import { NavLink, Link, Text } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

import { actionOne } from '../actions'
import './ScreenLogin.css'
import truffleContract from "truffle-contract";

import Web3 from 'web3';


 import Avatar from '../../ethereum/build/contracts/Avatar.json';
//import * as Avatar from '../../ethereum/build/contracts/Avatar.json'

class ScreenLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dummyStateVar: false
    }
    this.onSelectedItem   = this.onSelectedItem.bind(this)

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

  componentWillMount () {
    console.log("mounting !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(Avatar)
    var web3 = new Web3(new Web3.providers.HttpProvider('https://sokol.poa.network'))
    let avatar=new web3.eth.Contract(Avatar.abi, "0xd2f44fa6eccc4e04e9ccee6ada1a91dbe7e2c8a8")
    avatar.methods.createdTokens().call().then((result)=>{console.log(result+"tokens")})

    // let accounts=web3.eth.accounts.privateKeyToAccount('BCA93B325843D996FF4E3F68A66DB374BDCA103E0B7E9374AB00C0BEFD75A99E');
    // console.log(JSON.stringify(accounts)+"accoisjoiej")
    // //avatar.methods.createdTokens().mint().send()
    // console.log(web3.eth.getAccounts().then((r)=>{console.log(r)}))

    const accnt = web3.eth.accounts.create()
    console.log(web3.eth.accounts)
    // console.log('NEW ACCOUNT: ' + JSON.stringify(accnt))
    web3.eth.getAccounts().then( (r) => {
      console.log('FIRST ACCOUNT: ' + r)
    })

    console.log(web3.eth.personal)

    web3.eth.personal.newAccount('password')
    .then((e) => {
      console.log('HEY: ' + (e))
    })
    // web3.eth.getAccounts().then( (r) => {
    //   console.log('FIRST ACCOUNT: ' + r[0])
    // })


   // web3 = new Web3(web3.providers.WebsocketProvider('ws://3.85.253.242.8545'))
    // console.log(web3.currentProvider)
    // const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://3.85.253.242.8545'))
    // var web3 = new Web3()
    //web3 = new Web3(web3.currentProvider)
    //web3 = new Web3(web3.setProvider())


  }




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
        <div className="borderRadiusImportant row">
        <div className="col s12 m2"></div>
          <div className="col s12 m3">
            <div className="card"
            style={{
              height: '50vh',
              display:'flex',
              justifyContent:'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
                <h1>Spin.fm</h1>
                <Link to="#"  className="waves-effect waves-light btn-large">
                <i className="material-icons left">open_in_new</i>Log In
                </Link>
                <Link to="/screenCreateUser" className="waves-effect waves-light btn-large">
                <i className="material-icons left">open_in_new</i>Shortcut
                </Link>
            </div>


              <Link to="#" onClick={() => this._startPortis()} className="light-blue waves-effect waves-light btn-large">
              <i className="material-icons left">open_in_new</i>Log In
              </Link>


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
  }
}

export { ScreenLogin } // The raw component is useful to have when writing unit tests, and can also increase reusability
export default connect(mapStateToProps, { actionOne })(ScreenLogin)
