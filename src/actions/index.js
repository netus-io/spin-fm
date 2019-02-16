import { ipcRender } from 'electron'

import {
  ACTION_TYPE_ONE,
  ACTION_TYPE_TWO
} from './types'

export const actionOne = () => (dispatch) => {
  dispatch({ type: ACTION_TYPE_ONE })
}

export const actionTwo = () => (dispatch) => {
  dispatch({ type: ACTION_TYPE_TWO })
}

