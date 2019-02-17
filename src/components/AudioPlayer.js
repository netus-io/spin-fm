import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AudioPlayer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const audio = this.audioRef

    // audio.addEventListener('loadedmetadata', (e) => {
    //   audio.currentTime = 180
    // }, false)

    audio.addEventListener('canplay', (e) => {
      audio.play()
    }, false)

    audio.addEventListener('ended', (e) => { 
      console.log('SRC: ' + this.src) 
      // audio.src = audio.src + '?next=true'
      audio.load()
      audio.currentTime = 0
      audio.play()
    }, false)
  }
  render() {
    return (
      <div>
        <audio 
          id ="audio-player" 
          ref={(ref) => { this.audioRef = ref}} 
          src={this.props.src} 
          controls/>
      </div>
    )
  }
}

AudioPlayer.defaultProps = {
  id: '',
  src: null,
  autoPlay: false,
  controls: false,
  loop: false,
}

AudioPlayer.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  autoPlay: PropTypes.bool,
  controls: PropTypes.bool,
  loop: PropTypes.bool
}

export default AudioPlayer