import * as actionTypes from '../actions/actionTypes';

const initialState = {
  darkmode: false,
}

const reducer = (state = initialState, action) => {
  switch  (action.type){
    case actionTypes.THEME_TOGGLE:
      return {
        ...state,
        darkmode: action.darkmode
      }
    default: return state
       
  }
}

export default reducer;