import * as actionTypes from '../actions/actionTypes';

const initialState = {
  listedSongs: [],
  inputValue: undefined,
  nextSongsUrl: null,
  error: false
}

const reducer = (state = initialState, action) => {
  switch  (action.type){
    case actionTypes.LIST_SONGS_CHANGE:
      return {
        ...state,
        listedSongs: action.listedSongs,
        inputValue: action.inputValue,
        nextSongsUrl: action.nextSongsUrl
      }
    case actionTypes.SERVER_ERROR:
      return {
        ...state,
        error: action.error
      }
    default: return state     
  }
}

export default reducer;