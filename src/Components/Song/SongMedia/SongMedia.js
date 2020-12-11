import React, { useEffect, useState } from 'react';
import { millisToMinutesAndSeconds } from '../../../util/utility';
import ControlIcon from '../../UI/ControlIcon/ControlIcon';
import './SongMedia.scss';

const SongMedia = props => {
const [active, setActive] = useState(false)
const {highlightSong, track} = props;

    useEffect(()=>{
      if(props.selectedSong && props.selectedSong.id === track.id){
        highlightSong(true)
        setActive(true)
      } else {
        highlightSong(false)
        setActive(false)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[highlightSong, props.selectedSong, track])
 
    const controlIcon = (
      <ControlIcon
        class={"PlayIcon"}
        playSong={props.playSong}
        pauseSong={props.pauseSong}
        playIcon={active && props.isPlaying}
      />
    );
 
 
    return (
      <div className={"SongMedia"}>
        <div className={"SongTitleMedia"}>{track.title}</div>
        <div className={"SongArtistMedia"}>{track.user.username}</div>
        <div className={"SongControls"}>
          <div className={"SongPlay"}>{controlIcon}</div>
          <div className={"SongDuration"}>
            {millisToMinutesAndSeconds(track.duration)}
          </div>
          <div className={"SongGenre"}>{track.genre}</div>
        </div>
      </div>
    );
  
}

export default SongMedia