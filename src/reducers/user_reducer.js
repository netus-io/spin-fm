import {
  CREATE_NEW_USER,
  CREATE_NEW_USER_FAILURE } from '../actions/types';

  const INITIAL_STATE = {
    web3_instance: null,
    username: 'xxxx',
    email: 'xxx'
  }

export default(state=INITIAL_STATE, action) => {
  switch(action.type) {
    case CREATE_NEW_USER:
      return {
        ...state,
      }
    case CREATE_NEW_USER_FAILURE:
      return INITIAL_STATE
    default:
      return state
  }
}