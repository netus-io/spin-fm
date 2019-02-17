import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer        from './user_reducer'
import playlistReducer    from './playlist_reducer';
import chatroomReducer    from './chatroom_reducer'
import musicroomsReducer  from './musicrooms_reducer'

const rootReducer = combineReducers({
  user:       userReducer,
  music:      playlistReducer,
  chatroom:   chatroomReducer,
  loungeroom: musicroomsReducer 
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;