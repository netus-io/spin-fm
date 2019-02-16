import _ from 'lodash';
import {
  ADD_SONG,
  ADD_SONGS,
  REMOVE_SONG,
  REMOVE_ALL_SONGS,
  SONG_PROCESSING_PROGRESS,
  SONG_PROCESSING_COMPLETE,
} from '../actions/types';

const INITIAL_STATE = {};

// A Redux reducer function has the signature of: current_state, action; and return the new state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SONG_PROCESSING_COMPLETE:
      return { 
        ...state, 
        [action.payload.path]: { ...action.payload, complete: true } 
      };
    case SONG_PROCESSING_PROGRESS:
      return { 
        ...state, 
        [action.payload.fleHash]: action.payload 
      };
    case ADD_SONGS:
      return { 
        ...state, 
        ..._.mapKeys(action.payload, 'fleHash')
      }
    case ADD_SONG:
      return { 
        ...state, 
        [action.payload.fleHash]: action.payload 
      };
    case REMOVE_SONG:
      return _.omit(state, action.payload.fleHash);
    case REMOVE_ALL_SONGS:
      return INITIAL_STATE
    default:
      return state;
  }
}