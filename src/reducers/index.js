import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducerOne    from './reducer_one'

const rootReducer = combineReducers({
  reducerOne:     reducerOne
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;