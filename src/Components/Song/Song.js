import React, {useRef} from 'react';
import './Song.scss';
import SongMedia from './SongMedia/SongMedia';
import { gsap } from 'gsap';
import default_artwork from '../../assets/default_artwork.png';

const Song = props => {
  
  const highlightedSong = useRef();

  //image construction
  let songImage = null
  props.track.artwork_url ? songImage = props.track.artwork_url : songImage = props.track.user.avatar_url
  songImage = songImage.replace("-large", "-t500x500");
  //If track does not have artwork or avatar
  if (songImage.includes('default_avatar_large.png')) {
    songImage = default_artwork;
  }

  //function to manage a border outside the song card 
  const highlightSong = (value) => {
    if (value) {
      return gsap.to(highlightedSong.current, {
        outline: "5px double rgba(249, 105, 0, 0.3)",
        boxShadow: "0 15px 15px rgba(0, 0, 0, 0.6)",
        scale: "0.9",
        force3D: false,
        duration: 0.2,
      });
    }
    gsap.to(highlightedSong.current, {
      outline: "none",
      boxShadow: "none",
      scale: "1",
      duration: 0.2,
    });
  }

  const playSongHandler = () => {
    props.playSong(props.track)
  }
  

  return (
    <div ref={highlightedSong} className={"Song"}>
      <SongMedia
        track={props.track}
        highlightSong={(value) => highlightSong(value)}
        playSong={playSongHandler}
        pauseSong={props.pauseSong}
        selectedSong={props.selectedSong}
        isPlaying={props.isPlaying}
      />
      <img className={"SongImage"} src={songImage} alt="Not found"></img>
    </div>
  );
}


export default Song;