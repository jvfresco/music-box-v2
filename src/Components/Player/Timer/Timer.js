import React from 'react'
import { millisToMinutesAndSeconds } from '../../../util/utility';
import './Timer.scss';

const Timer = ({currentTime, songDuration}) => {
  return (
  <div className={"PlayerDuration"}>
    {millisToMinutesAndSeconds(currentTime * 1000) +
      " / " +
      millisToMinutesAndSeconds(songDuration)}
  </div>
  )
}

export default Timer