import * as actionTypes from './actionTypes';
import { DEFAULT_INITIAL_SEARCH, DEFAULT_SEARCH } from '../../config/config';


//asyncronous function managed by redux-thunk, when finished returns action list_songs_update to de reducer
export const list_songs_change = (inputValue, nextSongsUrl, listedSongs) => {
  
  if (!inputValue){
    return dispatch => {
      const url = DEFAULT_INITIAL_SEARCH;
      fetch(url).then(response => response.json())
      .then(data => {
        dispatch(list_songs_update(data.collection));
      })
      .catch(err =>{
        dispatch(server_error(true));
        //window.location.reload(false); 
      });
    }
  } else if (nextSongsUrl === undefined){
    return dispatch => {
      const url = DEFAULT_SEARCH + inputValue;
      fetch(url).then(response => response.json())
      .then(data => {
        dispatch(list_songs_update(data.collection, inputValue, data.next_href));
      })
      .catch(err =>{
        dispatch(server_error(true));
      });
    }
  } else {
    return dispatch => {
      const url = nextSongsUrl;
      fetch(url).then(response => response.json())
      .then(data => {
        dispatch(list_songs_update(listedSongs.concat(data.collection), inputValue, data.next_href));
      })
      .catch(err =>{
        dispatch(server_error(true));
      });
    }
  }
}

const list_songs_update = (newListedSongs, inputValue, nextSongsUrl) => {
  return {
    type: actionTypes.LIST_SONGS_CHANGE,
    listedSongs: newListedSongs,
    inputValue: inputValue,
    nextSongsUrl: nextSongsUrl
  }
}

export const server_error = (errorStatus) => {
  return {
    type: actionTypes.SERVER_ERROR,
    error: errorStatus,
  }
}

