import * as actionTypes from './actionTypes';

export const dark_theme_toggle = (darkmode) => {
  return {
    type: actionTypes.THEME_TOGGLE,
    darkmode: darkmode
  }
}