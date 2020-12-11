import * as actionTypes from '../actions/actionTypes';

const initialState = {
  showPlayer: false,
  playingSong: false,
  selectedSong: null,
  volumeLevel: 25,
  currentTime: 0,
  currentPercentage: 0,
  seekTime: 0
}

const reducer = (state = initialState, action) => {
  switch  (action.type){
    case actionTypes.TOGGLE_PLAY_PAUSE:
      return {
        ...state,
        showPlayer: true,
        //If the song is the same toggle the state, if the song is different play it directly
        playingSong: state.selectedSong === action.song ? !state.playingSong : true,
        selectedSong: action.song
      }
    case actionTypes.VOLUME_CHANGE:
      return {
        ...state,
        volumeLevel: action.volumeLevel
      }
    case actionTypes.CURRENT_TIME_CHANGE:
      return {
        ...state,
        currentTime: action.currentTime,
        currentPercentage: action.currentPercentage
      }
    case actionTypes.SEEK_TIME:
      return {
        ...state,
        seekTime: action.seekTime
      }
    default: return state
       
  }
}

export default reducer;