import React, {useEffect, useRef, useState} from 'react';
import seekIcon from '../../assets/rewind.svg';
import ControlIcon from '../UI/ControlIcon/ControlIcon';
import gsap from 'gsap';
import './Player.scss';
import { CLIENT_ID_QUERY } from '../../config/config';
import ProgressBar from './ProgressBar/ProgressBar';
import Timer from './Timer/Timer'

const Player = props =>{
    const player = useRef();
    const [audio] = useState(new Audio())
    const [timer, setTimer] = useState(null)
    const [currentTime, setCurrentTime] = useState(null)
    const [volumeLevel, setVolumeLevel] = useState(0.15)

    gsap.to(player.current, {y:0, duration: 3});

    audio.onended = () => {
      props.playSong(props.nextSong)
    }

    useEffect(()=>{
      audio.volume = volumeLevel
      // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[volumeLevel])

    useEffect(()=> {
      if(props.isPlaying){
        setTimer(setInterval(()=>{
          //This timer dispatches the actual time of the song each 200ms
          setCurrentTime(audio.currentTime)
        }, 200));
      } else {
        clearInterval(timer)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[props.isPlaying])

    useEffect(() => {
      const wasPlaying = !audio.paused || audio.ended
      audio.src = props.selectedSong.stream_url + CLIENT_ID_QUERY
      audio.load()
      if(wasPlaying){
        audio.play()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[props.selectedSong])

    useEffect(() => {
      if(!props.isPlaying){
        audio.pause()
      } else {
        audio.play()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[props.isPlaying])

    const onProgressBarChange = React.useCallback((newCurrentTime) => {
      audio.currentTime = newCurrentTime
      // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[])


    const controlIcon = (
      <ControlIcon
        class={"PlayerIcon"}
        playSong={() => props.playSong(null)}
        pauseSong={props.pauseSong}
        playIcon={props.isPlaying}
      />
    );
 
    return (
      <div className={"Player"} ref={player}>
        <ProgressBar
          songDuration={props.selectedSong.duration}
          currentTime={currentTime}
          darkmode={props.darkmode}
          onProgressBarChange={onProgressBarChange}
        />
        <div className={"PlayerControls"}>
          <div className={"PlayerPlay"}>
            <img
              className={"PreviousIcon"}
              src={seekIcon}
              alt="Previous song"
              onClick={() => props.playSong(props.previousSong)}
            ></img>
            {controlIcon}
            <img
              className={"NextIcon"}
              src={seekIcon}
              alt="Next song"
              onClick={() => props.playSong(props.nextSong)}
            ></img>
          </div>

          <div className={"SongData"}>
            <div className={"SongTitle"}>{props.selectedSong.title}</div>
            <div className={"SongArtist"}>
              {props.selectedSong.user.username}
            </div>
          </div>
          <Timer
            currentTime={currentTime}
            songDuration={props.selectedSong.duration}
          />
          <div className={"PlayerVolume"}>
            <input
              className={"VolumeBar"}
              type="range"
              step="1"
              min="1"
              max="100"
              value={volumeLevel * 100}
              onChange={(e) => setVolumeLevel(e.target.value / 100)}
            />
          </div>
        </div>
      </div>
    );
    
}

export default Player;