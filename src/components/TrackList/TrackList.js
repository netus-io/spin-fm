import React, { Component } from 'react'
import _ from 'lodash'

import Track from './Track'
import './TrackList.css'

class TrackList extends Component{
  constructor(props) {
    super(props)
  }
 
  renderTrackList(trackList) {
    return _.map(trackList, track => {
      return (
        <Track 
          track={ track } 
          key={ track.title + track.artist }
          removeTrack = { this.props.removeTrack }
        />
      )
    })
  }

  render() { 
    return(
      <div className="">
        
        {/* <button className="btn waves-effect waves-light" type="file" name="action">Add song
          <i className="material-icons right">add</i>
        </button> */}
        <div className="col m12">
          <div className="file-field">
          <h6>Tracklist</h6>
            <div  className="btn small waves-effect waves-light">
              <input 
                type="file" 
                multiple
                onChange={ (e) => this.props.onAddTrack(e.target.files[0])}
                />Add song<i className="material-icons right">add</i>
            </div>
          </div>
        </div>
        <div className="tracklist col m12">
          <table className="highlight">
            <tbody>
              { this.renderTrackList(this.props.trackList) }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TrackList