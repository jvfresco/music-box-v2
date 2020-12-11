import * as actionTypes from './actionTypes';

export const toggle_play_pause = (song) => {
  return {
    type: actionTypes.TOGGLE_PLAY_PAUSE,
    song: song
  }
}

export const volume_change = (newVolumeLevel) => {
  return {
    type: actionTypes.VOLUME_CHANGE,
    volumeLevel: newVolumeLevel
  }
}

export const current_time_change = (currentTime, songDuration) => {
  return {
    type: actionTypes.CURRENT_TIME_CHANGE,
    currentTime: currentTime,
    currentPercentage: calculatePercentage(currentTime, songDuration)
  }
}

const calculatePercentage = (currentTime, songDuration) =>{
  return (currentTime * 100 / songDuration).toFixed(2);
}

export const seek_time = (newCurrentTime) => {
  return {
    type: actionTypes.SEEK_TIME,
    seekTime: newCurrentTime
  }
}

export const change_song = (direction, selectedSong, listedSongs) => {
  let newSongIndex;
  let actualSongIndex = listedSongs.indexOf(selectedSong);
  if (direction === 'next' && actualSongIndex < (listedSongs.length - 1) ){
    newSongIndex = actualSongIndex + 1;
  } else if (direction === 'previous' && actualSongIndex !== 0){
    newSongIndex = actualSongIndex - 1;  
  } else {
    newSongIndex = 0;
  }
  return {
    type: actionTypes.TOGGLE_PLAY_PAUSE,
    song: listedSongs[newSongIndex],
  }
}



      