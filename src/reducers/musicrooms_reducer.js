import _ from 'lodash'
import {    
  ADD_MUSICROOM,
  REMOVE_MUSICROOM
} from '../actions/types'

const INITIAL_STATE = {
  'musicroomList': [
    { name: "Coding Music 2.0", djs: 4, peers: 80, networkId: "0x2098uojnfu0298hjlkj" },
    { name: "East Coast Clasics", djs: 5, peers: 100, networkId: "0x348hkj34knnkkjhjfla" }]
};

export default(state=INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_MUSICROOM:
      return {
        ...state,
        'musicroomList': state.musicroomList.push(action.payload)
      }
    case REMOVE_MUSICROOM:
      return _.omit(state, action.payload.musicroomID)
    default:
      return state
  }
}