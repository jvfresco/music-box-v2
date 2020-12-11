import { useEffect, useRef, useReducer} from 'react';
//Converts milliseconds to minutes and seconds
export const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

//Used to save the value of the previous state
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

//Function used in conjuction with the scroll listener
export const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {
      func.apply(this, arguments);
    }, 
    delay);
  }
}

//Custom hook to retrieve data
export const fetchSongs = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error("There has been a problem with the server of soundcloud loading the data. Please refresh the page or perform a new search");
    });
};

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

const initialState = {
  songs: [],
  input: null,
  nextUrl: null,
  selectedSong: null,
  nextSong: null,
  previousSong: null
}

const reproductionListReducer = (state, action) => {
  switch (action.type) {
    case 'MAIN_PAGE_LOAD':
      return updateObject(state, {songs: action.songs})
    case 'SEARCH_SONGS':
      return updateObject(state, {songs: action.songs, input: action.input, nextUrl: action.nextUrl})
    case 'LOAD_MORE_SONGS':
      return updateObject(state, {songs: state.songs.concat(action.songs), nextUrl: action.nextUrl})
    case 'SELECT_SONG':
      console.log('selected song')
      const selectedSongIndex = state.songs.indexOf(action.selectedSong)
      return updateObject(state, {selectedSong: action.selectedSong, nextSong: state.songs[selectedSongIndex + 1], previousSong: state.songs[selectedSongIndex - 1] })
    default:
      throw new Error(`Action ${action.type} does not exist`)
  }
}

export const useReproductionList = () => {
  const [state, dispatch] = useReducer(reproductionListReducer, initialState)
  
  return [state.songs, state.nextUrl, state.selectedSong, state.nextSong, state.previousSong, dispatch]
}
