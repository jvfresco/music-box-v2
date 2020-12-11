
import React, {useReducer, useState, useEffect} from 'react'


// const audio = new Audio()
// audio.volume = 0.15
//Play-Pause, Next song(auto), Change song, Seek
// const initialState = {
//   volume: 0.15,
//   src: null,
//   currentTime: audio.currentTime,
//   isPlaying: false,
  
// }

const audioReducer = ({audio}, action) => {
  switch (action.type){
    case 'PLAY':{
      console.log('play has been performed')
      audio.play()
      return {
        audio: audio,
        isPlaying: true
      }
    }
    case 'PAUSE':{
      audio.pause()
      return {
        audio: audio,
        isPlaying: false
      }
    }
    case 'CHANGE_SONG':{
      //If the audio was playing when the song was changed, keep playing automatically
      const wasPlaying = !audio.paused
      audio.src = action.newSelectedSong
      audio.load()
      if(wasPlaying){
        audio.play()
      }
      return {
        audio: audio
      }
    }
    case 'UPDATE_TIME':{
      return {
        audio: audio,
      }
    }
    case 'SEEKTIME':{
      audio.currentTime = action.newCurrentTime
      return {
        audio: audio,
      }
    }
    case 'VOLUME_CHANGE':{
      audio.volume = action.newVolumeLevel
      return {
        audio: audio,
      }
    }
    default:{
      throw new Error(`Action not found: ${action.type}`)
    }
  }
}

export const useAudio = () => {
  const [state, dispatch] = useReducer(audioReducer, {audio: new Audio()})
  const {audio: {src, currentTime, volume, ended, isPlaying}} = state
  const [timer, setTimer] = useState(null)
  
  useEffect(()=> {
    if(isPlaying){
      setTimer(setInterval(()=>{
        //This timer dispatches the actual time of the song each 200ms
        dispatch({type:'UPDATE_TIME', newCurrentTime: currentTime});
      }, 200));
    } else {
      clearInterval(timer)
    }
  },[isPlaying])


  return [src, currentTime, volume, ended, dispatch]
}