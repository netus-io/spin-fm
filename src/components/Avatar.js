import React, { Component } from 'react'
import Snap from 'snapsvg-cjs';
import { connect } from 'react-redux'

import { startDjing, stopDjing, startDancing, stopDancing } from '../actions';

class Avatar extends Component {
  _isMounted = false
  constructor(props) {
    super(props)
    
    this.state = {
      s: null,
      geom: null,
      isDancing: false,
      isDjing: false
    };

    this.onSVGLoaded  = this.onSVGLoaded.bind(this)
    this.animate      = this.animate.bind(this)
    this.rotateLeft   = this.rotateLeft.bind(this)
    this.rotateRight  = this.rotateRight.bind(this)
  }

  animate() {
    console.log(JSON.stringify(this.props))
    console.log('IS_MOUNTED::: ' + this._isMounted)
    if(this.props.onAvatarSelection) {
      this.props.onAvatarSelection((this.props.avatarId))
    }
    if(this.props.animType === 'HEAD_BOP') {
      if(this.state.isDancing) {
        if(this._isMounted) {
          this.setState({ 
            geom: this.state.geom.stop(),
            isDancing: false 
          })
        }
      } else {
        if(this._isMounted) {
          this.rotateLeft(this)
          this.setState({ 
            isDancing: true 
          })
        }
      }
    }
  }

  rotateLeft() {
    if(this._isMounted) {
      const dummyGeom = this.state.geom.animate({ 
        transform: 'rotate(-5 250 250)' 
        }, 800, mina.linear, this.rotateRight);
      this.setState({geom: dummyGeom})
    }
  };

  rotateRight() {
    if(this._isMounted) {
      const dummyGeom = this.state.geom.animate({ 
        transform: 'rotate(5 250 250)' 
        }, 800, mina.linear, this.rotateLeft);
      this.setState({geom: dummyGeom}) 
    }   
  }

  onSVGLoaded(data) {
    const avatarId = this.props.avatarId
    const geom = data.select("#" + avatarId);
    this.setState({ geom: geom })
    this.setState({ s: this.state.s.append(data) })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.isDancing != nextState.isDancing) ? true : false
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    const s = Snap("#avatar-" + this.props.svgId.toString())
    const source = this.props.source
    this.setState({ s: s })
    Snap.load(source, this.onSVGLoaded);
  }

  render() {
    const idKey = "avatar-" + this.props.svgId.toString()
    return (
      <div id={ idKey } onClick={ this.animate }></div>
    )
  }
}

export default Avatar