import React, { Component } from 'react'
import { NavLink, Link, Text } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import TX from './ethereumjs-tx'
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

  componentWillMount (){
   
    var web3 = new Web3(new Web3.providers.HttpProvider('https://sokol.poa.network'))
    //let web3 = new Web3(new Web3.providers.WebsocketProvider('ws://3.85.253.242.8545'))
    let avatar=new web3.eth.Contract(Avatar.abi, "0xa8f7525f29435e761255433a69f7e9b662b4b947")
    console.log(avatar)
    avatar.methods.createdTokens().call().then((result)=>{console.log(result+"tokens")})
    // this.Mint('0x1789e8fCa257492556c36EF0E803a9919bC42b49',1,web3,avatar)
    avatar.methods.AvatarId(2).call().then((result)=>{console.log(result+"character")})
    avatar.methods.tokenOfOwnerByIndex('0x1789e8fCa257492556c36EF0E803a9919bC42b49',1).call().then((r)=>{console.log(r+"tokenID")}) 
 

  //  web3.eth.sendSignedTransaction('0x' + serializedTx).then((r)=>{
   

  

   
    
   // web3 = new Web3(web3.providers.WebsocketProvider('ws://3.85.253.242.8545'))
 
    
    
  }


   CreateTX(nonce,gasPrice,gasLimit,value,to,data,pk){
    const tx = new TX(null, 1);
    tx.nonce = nonce
    tx.gasPrice = gasPrice
    tx.gasLimit = gasLimit
    tx.value = value
    // console.log(tx.gasPrice.toString('hex') + 'gasprice')
    console.log(pk)
      tx.to=to
      // console.log('notcontract')
    
      
    tx.data = data
    // const pk = Buffer.from(privateKey, 'hex')
    tx.sign(pk)
    const ret="0x"+tx.serialize().toString('hex')
    return ret
  }
  
  //Old Token 0xd2f44fa6eccc4e04e9ccee6ada1a91dbe7e2c8a8
  Mint(address,avatar,web3,AVatar){
   web3.eth.getTransactionCount('0x1789e8fCa257492556c36EF0E803a9919bC42b49').then((nonce)=>{
  console.log(nonce)
  let gas=1000000
  let pk='BCA93B325843D996FF4E3F68A66DB374BDCA103E0B7E9374AB00C0BEFD75A99E'
  let DATA =AVatar.methods.mint(address,avatar).encodeABI()
  let TXData=this.CreateTX(nonce,'0x4a817c800',1000000,0,'0xa8f7525f29435e761255433a69f7e9b662b4b947',DATA,pk)
  console.log(TXData)
   web3.eth.sendSignedTransaction(TXData).then((hash)=>{
       console.log(hash)
  })
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
