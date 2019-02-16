import _ from 'lodash';
import {
  ACTION_TYPE_ONE,
  ACTION_TYPE_TWO
} from '../actions/types';

const INITIAL_STATE = {
  'dummyStateList': [
    { name: "Alice", favColor: "Blue" },
    { name: "Bob", favColor: "Red" },
    { name: "Carl", favColor: "Green" }
  ]
}

// A Redux reducer function has the signature of: current_state, action; and return the new state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE_ONE:
      return { 
        ...state, 
        'musicroomList': state.musicroomList.push(action.payload)
      }
    case ACTION_TYPE_TWO:
      return _.omit(state, action.payload.musicroomID)
    default:
      return state
  }
}