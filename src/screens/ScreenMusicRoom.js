import React, { Component } from 'react'
import _ from 'lodash'
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg'

import { addChatRoomMessage, addSong, addSongs, removeSong, removeAllSongs } from '../actions'
import AudioPlayer from '../components/AudioPlayer'
import Avatar from '../components/Avatar'
import TrackList from '../components/TrackList'
import ChatRoom from '../components/ChatRoom'

import '../components/DanceFloor/DanceFloor.css'

class ScreenMusicRoom extends Component {
  
  state = {
    trackList: {
      c2bc5d939cce3388ac8ukj44de79ca6fa3784e63bc: {
        title: "Erase - FRND x Lights Remix",
        artist: "FRND, Lights",
        album: "",
        year: "2018",
        comment: "",
        track: "",
        genre: "",
        fileHash: "c2bc5d939cce3388ac8ukj44de79ca6fa3784e63bc"
      },
      x2bc5d939cc8388ac34f44de79ca6fa3784e63bc: {
        title: "Jackie Chan",
        artist: "Tiesto, Dzeko, Preme, Post Malon",
        album: "",
        year: "2018",
        comment: "",
        track: "",
        genre: "",
        fileHash: "x2bc5d939cc8388ac34f44de79ca6fa3784e63bc"
      },
      x2bc5d939cc8381a334f4de79ca6fa3784r63bc: {
        title: "Stolen Dance",
        artist: "Milky Chance",
        album: "",
        year: "",
        comment: "",
        track: "",
        genre: "",
        fileHash: "x2bc5d939cc8381a334f4de79ca6fa3784r63bc",
      },
      w2bc28j39cc83kjsc34f44d289ka6fa3784e63bc: {
        title: "Shut It Down",
        artist: "Party Favor, Dillon Francis",
        album: "",
        year: "",
        comment: "",
        track: "",
        genre: "",
        fileHash: "w2bc28j39cc83kjsc34f44d289ka6fa3784e63bc"
      },
      e2bc5d939cc8388ac34f44d98jhg26fa3784e63bc: {
        title: "Head Up",
        artist: "Don Diablo",
        album: "",
        year: "",
        comment: "",
        track: "",
        genre: "",
        fileHash: "e2bc5d939cc8388ac34f44d98jhg26fa3784e63bc"
      },
      t2bc5d939cc8388acfkkj4de7s254d2a6fa3784e63bc: {
        title: "Keepmastik",
        artist: "Phlegmatic Dogs",
        album: "",
        year: "",
        comment: "",
        track: "",
        genre: "",
        fileHash: "t2bc5d939cc8388acfkkj4de7s254d2a6fa3784e63bc"
      },
      i2bc5d939cc8388ac34f44de79903i0ojl784e63bc: {
        title: "Slide (feat. Frank Ocean & Migos)",
        artist: "Calvin Harris, Frank Ocean, Migos",
        album: "",
        year: "",
        comment: "",
        track: "",
        genre: "",
        fileHash: "i2bc5d939cc8388ac34f44de79903i0ojl784e63bc"
      },
      r0vbc5d939cc8rwe8acs4f44de79ca6fa3784e63bc: {
        title: "We Did It",
        artist: "AREA21",
        album: "",
        year: "",
        comment: "",
        track: "",
        genre: "",
        fileHash: "r0vbc5d939cc8rwe8acs4f44de79ca6fa3784e63bc"
      }
    }
  }

  constructor(props) {
    super(props)
    this.onAddTrack = this.onAddTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  }

  onAddTrack(file) {
    console.log(JSON.stringify(file))
    const fileReader = new FileReader()
    fileReader.onloadend = (e) =>{
      const content = fileReader.result
      console.log("CONTENT:" + content)
      // Do something with content
    }
    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Methods
    fileReader.readAsDataURL(file)
  }

  removeTrack(track) {
    this.setState({
      trackList: _.omit(this.state.trackList, track.fileHash)
    })
  }

  onDrop = (files) => {
    // invalid file types are not added to files object
    const songs = _.map(files, ({ name, path, size, type }) => {
      return { name, path, size, type };
    });

    if (songs.length) {
      this.props.addSongs(songs);
      // if (!this.props.small) {
      //   this.props.history.push('/convert'); //IRVIN: We are using react-router here
      // }
    }
  }

  renderChildren({ isDragActive, isDragReject }) {
    if (isDragActive) {
      return <h4 className="drop-message">Omnomnom, let me have those files!</h4>;
    } else if (isDragReject) {
      return <h4 className="drop-message">Uh oh, I don't know how to deal with that type of file!</h4>;
    } else {
      return <h4 className="drop-message">Drag and drop some files on me, or click to select.</h4>
    }
  }
  
  render() {
    // const { networkId } = this.props.match.params
    return (
      <div>
        <div className="row row-10px">
          {/* <!-- START OF MAIN-STAGE COLUMN --> */}
          <div className="col m8 l9">
            <div className="row center">
              <h4>Coding Music 2.0</h4>
            </div>
            <div className="row center">
              {/* <audio id = "audio-player" controls autoPlay src="http://localhost:3000/spinningfm#t=80"></audio> */}
              <AudioPlayer 
                id = 'audio-player'
                src="http://localhost:3000/spinningfm"
                controls={true}
              />
            </div>
            {/* <!-- START OF DJ-ROW --> */}
            <div className="row">
              <div className="col m3">
                <Avatar 
                  svgId="dj-1" 
                  source="./assets/robot.svg"
                  avatarId="head-robot-helmet"
                  animType="HEAD_BOP"
                  />
              </div>
              <div className="col m3">
                <Avatar 
                  svgId="dj-2" 
                  source="./assets/girl-blond.svg"
                  avatarId="head-girl"
                  animType="HEAD_BOP"
                  />
              </div>
              <div className="col m3">
                <Avatar 
                  svgId="dj-3" 
                  source="./assets/pig.svg"
                  avatarId="head-piggy"
                  animType="HEAD_BOP"
                  />
              </div>
              <div className="col m3">
                <Avatar 
                  svgId="dj-4" 
                  source="./assets/boy-brunette.svg"
                  avatarId="head-boy"
                  animType="HEAD_BOP"
                  />
              </div>
            </div>
            {/* <!-- /END OF DJ-ROW --> */}
            {/* <!-- START OF DANCEFLOOR-ROW --> */}
            <div className="row">
              <ReactSVG 
                src="./assets/gauge.svg" 
                evalScripts="always"
                fallback={() => <span>Error!</span>}
                loading={() => <span>Loading</span>}
                svgStyle={{ width: 150, heght: 400 }}
                />
            </div>
            {/* <!-- END OF DANCEFLOOR-ROW --> */}

          </div>
          {/* <!-- /END OF MAIN-STAGE COLUMN --> */}
          
          {/* <!-- START OF RIGHT COLUMN --> */}
          <div className="col m4 l3">
            {/* <!-- START OF PLAYLIST-ROW --> */}
            <div className="row">
              {/* <Dropzone
                onDrop={this.onDrop}
                multiple
                accept="audio/*"
                className="dropzone"
                activeClassName="dropzone-active"
                rejectClassName="dropzone-reject"
              >
                {this.renderChildren}
              </Dropzone> */}

              <TrackList
                trackList= { this.state.trackList }
                onAddTrack={ this.onAddTrack }
                addTracks={ this.props.addSongs }
                removeTrack={ this.removeTrack }
                removeAllTracks={ this.props.removeAllSongs }
              />

            </div>
            {/* <!-- /END OF PLAYLIST-ROW --> */}
            {/* <!-- START OF CHATROOM-ROW --> */}
            <div className="row row-10px">
              <ChatRoom 
                chatroomInfo={ this.props.chatroomInfo }
                addChatRoomMessage = { this.props.addChatRoomMessage }
              />
            </div>
            {/* <!-- /END OF CHATROOM-ROW --> */}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('MUSIC ROOM STATE::' + JSON.stringify(state))
  return {
    isDjing: state.isDjing,
    isDancing: state.isDancing,
    chatroomInfo: state.chatroom
  }
}

export default withRouter(
  connect(mapStateToProps, { addChatRoomMessage, addSong, addSongs, removeSong, removeAllSongs })(ScreenMusicRoom)
)