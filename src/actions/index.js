import { ipcRender } from 'electron'

import {
  CREATE_NEW_USER,
  GO_TO_ROOM,
  START_DJING,
  STOP_DJING,
  START_DANCING,
  STOP_DANCING,
  ADD_SONG, 
  ADD_SONGS, 
  REMOVE_SONG, 
  REMOVE_ALL_SONGS, 
  SONG_PROCESSING_PROGRESS, 
  SONG_PROCESSING_COMPLETE,
  ADD_CHATROOM_MESSAGE,
  REMOVE_ALL_CHATROOM_MESSAGES, 
  ADD_MUSICROOM,
  REMOVE_MUSICROOM } from "./types";

//
export const actionOne = () => (dispatch) => {
  dispatch({ type: ACTION_TYPE_ONE })
}
//
export const actionTwo = () => (dispatch) => {
  dispatch({ type: ACTION_TYPE_TWO })
}

// export const oauthPortis = () => (dispatch) => {
//   ipcRenderer.send('oauth:portis', null);

//   ipcRender.on('oauth:portis:response', (event, { accounts }) => {
//     dispatch({ type: CREATE_NEW_USER, payload: { accounts }})
//   })
// }

export const startDjing = () => (dispatch) => {
  dispatch({ type: START_DJING })
}

export const stopDjing = () => (dispatch) => {
  dispatch({ type: STOP_DJING })
}

export const startDancing = () => (dispatch) => {
  dispatch({ type: START_DANCING })
}

export const stopDancing = () => (dispatch) => {
  dispatch({ type: STOP_DANCING })
}

// Communicate to MainWindow process that videos
// have been added and are pending conversion
export const addSongs = songs => dispatch => {
  ipcRenderer.send('videos:added', songs)
  ipcRenderer.on('metadata:complete', (event, songsWithData) => {
    dispatch({ type: ADD_SONGS, payload: songsWithData })
  })
};

// Communicate to MainWindow that the user wants
// to start converting videos.  Also listen for feedback
// from the MainWindow regarding the current state of
// conversion.
export const convertSongs = songs => dispatch => {
  ipcRenderer.send('conversion:start', songs);

  ipcRenderer.on('conversion:end', (event, { song, outputPath }) => {
    dispatch({ 
      type: SONG_PROCESSING_COMPLETE, 
      payload: { ...song, outputPath } 
    });
  });

  ipcRenderer.on('conversion:progress', (event, { song, timemark }) => {
    dispatch({ 
      type: SONG_PROCESSING_PROGRESS, 
      payload: { ...song, timemark }
    });
  });
};

// Open the folder that the newly added song
// exists in
export const showInFolder = outputPath => dispatch => {
  ipcRenderer.send('folder:open', outputPath)
};

export const addSong = song => {
  return {
    type: ADD_SONG,
    payload: { ...song }
  };
};

export const setFormat = (song, format) => {
  return {
    type: ADD_SONG,
    payload: { ...song, format, err: "" }
  };
};

export const removeSong = song => {
  return {
    type: REMOVE_SONG,
    payload: song
  };
};

export const removeAllSongs = () => {
  return {
    type: REMOVE_ALL_SONGS
  };
};

export const addChatRoomMessage = message => {
  return {
    type: ADD_CHATROOM_MESSAGE,
    payload: { ...message }
  };
};

export const removeAllChatRoomMessages = () => {
  return {
    type: REMOVE_ALL_CHATROOM_MESSAGES
  };
};

export const addMusicroom = musicroom => {
  return {
    type: ADD_MUSICROOM,
    payload: { ...musicroom }
  }
}

export const removeMusicroom = musicroom => {
  return {
    type: REMOVE_MUSICROOM,
    payload: musicroom
  }
}

// export const createNewUser = user => dispatch => {
//   dispatch({ 
//     type: CREATE_NEW_USER, 
//     payload: user 
//   })
// }

// IRVIN: By making this async we can now call .then() fromt the component
// Otherwise if netus.js provides a listener for a request then we can just subscribe to it here
// then call it dispatch when it returns
// IRVIN: HTTP request to create a user in the network 
// would take place here. It should return a resolved Promise
// e.g. const responsePromise = await netusQuery( .... )
// export const createNewUser = user => async (dispatch) => { 
//   try {
//     const responsePromise = new Promise((resolve, reject) => {
//       setTimeout(() => resolve('CREATED_NEW_USER!'), 1000)
//     })
//     let result = await responsePromise

//     dispatch({ 
//       type: CREATE_NEW_USER, 
//       payload: user 
//     })
//   } catch (e) {
//     dispatch({
//       type: CREATE_NEW_USER_FAILURE
//     })
//     throw e
//   }
// }
export const createNewUser = (user, callback) => (dispatch) => { 
  setTimeout(() => {
    console.log('DISPATCHING_ACTION::: ' + CREATE_NEW_USER)
    dispatch({ 
      type: CREATE_NEW_USER, 
      payload: user 
    })  
    callback()
  }, 2000)
}

// IRVIN: Emulate a 'request for network metadata' or a 'request to access network'
export const goToRoom = (room, callback) => (dispatch) => {
  setTimeout(() => {
    console.log('DISPATCHING_ACTION::: ' + GO_TO_ROOM)
    dispatch({ 
      type: GO_TO_ROOM, 
      payload: room 
    })  
    callback()
  }, 2000)
}


