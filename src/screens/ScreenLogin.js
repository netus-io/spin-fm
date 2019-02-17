import React, { Component } from 'react'
import { NavLink, Link, Text } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import tx from './ethereumjs-tx'
import { actionOne } from '../actions'
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
    console.log(tx +"sjfowajefp")
    console.log("mounting !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(Avatar)
    var web3 = new Web3(new Web3.providers.HttpProvider('https://sokol.poa.network'))
    //let web3 = new Web3(new Web3.providers.WebsocketProvider('ws://3.85.253.242.8545'))
    let avatar=new web3.eth.Contract(Avatar.abi, "0xd2f44fa6eccc4e04e9ccee6ada1a91dbe7e2c8a8")
    console.log(avatar)
    avatar.methods.createdTokens().call().then((result)=>{console.log(result+"tokens")})
    const TX={
      from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
      gasPrice: "20000000000",
      gas: "21000",
      to: '0x3535353535353535353535353535353535353535',
      value: "1000000000000000000",
      data: ""
  }
  var transaction = new tx(TX)
   transaction.sign('BCA93B325843D996FF4E3F68A66DB374BDCA103E0B7E9374AB00C0BEFD75A99E')
   console.log(transaction)
   const serializedTx = transaction.serialize().toString('hex')
   console.log(serializedTx)
   //web3.eth.sendSignedTransaction('0x' + serializedTx)
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
    
   

    web3.eth.personal.newAccount('password')
    .then((e) => {
      console.log('HEY: ' + (e))
    })
    // web3.eth.getAccounts().then( (r) => {
    //   console.log('FIRST ACCOUNT: ' + r[0])
    // })
    
    
   // web3 = new Web3(web3.providers.WebsocketProvider('ws://3.85.253.242.8545'))
    // console.log(web3.currentProvider)
   
    // var web3 = new Web3()
    //web3 = new Web3(web3.currentProvider)
    //web3 = new Web3(web3.setProvider())
    
    
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
        <div>
          <div style={{display:'flex', flexDirection: 'row'}}>

            <div
            style={{
              width: '30%',
              height:'100vh'
            }}>
                <h1>Spin.fm</h1>
                <Link to="#"  className="waves-effect waves-light btn-large">
                <i className="material-icons left">open_in_new</i>Log In
                </Link>
                <Link to="/screenCreateUser" className="waves-effect waves-light btn-large">
                <i className="material-icons left">open_in_new</i>Shortcut
                </Link>
            </div>

            <div
            style={{
              width:'70%',
              height:'100vh'
            }}>
              <h1></h1>
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
