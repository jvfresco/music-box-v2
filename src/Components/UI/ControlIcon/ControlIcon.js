import React from 'react';
import playIcon from '../../../assets/play.svg';
import pauseIcon from '../../../assets/pause.svg';
import './ControlIcon.scss';


const ControlIcon = (props) =>{

  const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

  let icon = !props.playIcon ? (
    <img
      className={props.class}
      src={playIcon}
      alt="Play song"
      onClick={callAll(props.playSong)}
    ></img>
  ) : (
    <img
      className={props.class}
      src={pauseIcon}
      alt="Pause song"
      onClick={callAll(props.pauseSong)}
    ></img>
  );

  return (
    icon
  )
}

export default ControlIcon;

