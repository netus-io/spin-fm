import React, { Component } from 'react'
import { NavLink, Link, Image } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import Avatar from '../components/Avatar'


import { actionOne } from '../actions'

class ScreenCreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dummyStateVar: false,
      initialAvatar: "https://i.ibb.co/S3njdRS/empty-avatar.png"
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
  setAvatarInState(){
    console.log('jm clicked!')
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
          backgroundColor: 'white',
        }}>
          <div
          style={{
            display:'flex',
            flexDirection:'column',
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '20%'
          }}>
              <img className="circle" src={this.state.initialAvatar} />
              <h3>[username]</h3>
              <h3>[0x address]</h3>
            </div>
        </div>

        <div className='container'
        style={{
          // width:'70%',
          // height:'100vh',
          flex:1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div className='row'>
            <div className="col s12 m4 l4">
              <div className="card small hoverable">
                <Avatar
                  svgId="head-piggy"
                  source="./assets/pig-head.svg"
                  avatarId="head-piggy"
                  animType="HEAD_BOP"
                  />
              </div>
            </div>
            <div className="col s12 m4 l4">
              <div className="card small hoverable">
              <Avatar
                svgId="head-girl"
                source="./assets/girl-blond-head.svg"
                avatarId="head-girl"
                animType="HEAD_BOP"
                />
                </div>
            </div>
            <div className="col s12 m4 l4">
              <div className="card small hoverable">
              <Avatar
                svgId="head-boy"
                source="./assets/boy-brunette-head.svg"
                avatarId="head-boy"
                animType="HEAD_BOP"
                />
                </div>
            </div>
          </div>

          <div className='row'>
            <div className="col s12 m4 l4">
              <div className="card small hoverable" onClick={this.setAvatarInState()}>
                <Avatar
                  svgId="head-robot"
                  source="./assets/robot-head.svg"
                  avatarId="head-robot-helmet"
                  animType="HEAD_BOP"
                  />
              </div>
            </div>
            <div className="col s12 m4 l4">
              <div className="card small hoverable">
                <Avatar
                  svgId="head-ox"
                  source="./assets/tough-ox-front-head.svg"
                  avatarId="head-ox"
                  animType="HEAD_BOP"
                  />
              </div>
            </div>
            <div className="col s12 m4 l4">
              <div className="card small hoverable">
              <Avatar
                svgId="head-chicken"
                source="./assets/cool-chicken-front-head.svg"
                avatarId="head-chicken"
                animType="HEAD_BOP"
                />
              </div>
            </div>
          </div>

          <div className="row center">
            <Link to="/screenLoungeArea" className=" waves-effect waves-light btn-large">
              <i className=" material-icons left">open_in_new</i>Create character
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
