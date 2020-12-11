import React, { useState, useEffect, useRef, useLayoutEffect, useContext} from 'react';
import Song from '../../Components/Song/Song';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { debounce, fetchSongs, usePrevious, useReproductionList } from '../../util/utility';
import { gsap } from 'gsap';
import './SongList.scss';
import Player from '../../Components/Player/Player'
import { DEFAULT_INITIAL_SEARCH, DEFAULT_SEARCH } from '../../config/config';
import {ContextData} from '../../context/providers'


const SongList = ({handleError}) => {
  
  const [bottom, setBottom] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [input] = useContext(ContextData)
  const [reproductionList, nextUrl, selectedSong, nextSong, previousSong, dispatch] = useReproductionList() 

  let previousReproductionList = usePrevious(reproductionList)
  const songCardList = useRef([]);

  const playSongHandler = React.useCallback((track) => {
    if(track){
      if(track.id !== selectedSong?.id){
        dispatch({type:'SELECT_SONG', selectedSong: track})
      }
    }
    setIsPlaying(true)
  },[selectedSong, dispatch])

  const pauseSongHandler = React.useCallback(() => {
    setIsPlaying(false)
  },[])

  //Executes only the first time the component is mounted
  useEffect(() =>{
    //First song list loaded using parameters in config.js
    fetchSongs(DEFAULT_INITIAL_SEARCH)
      .then(data => { 
        dispatch({type: 'MAIN_PAGE_LOAD', songs: data.collection})
      })
      .catch(error => handleError())
    //Event listener loaded to the scroll
    window.addEventListener('scroll', debounce(listenToScroll, 500));
    setLoading(true);
    return () => window.removeEventListener('scroll', listenToScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  },[]);

  //Executes when a search has been performed
  useEffect(()=>{
    if(input !== null){
      fetchSongs(DEFAULT_SEARCH + input)
        .then(data => {
          dispatch({type: 'SEARCH_SONGS', songs: data.collection, input: input, nextUrl: data.next_href})
        })
        .catch(error => handleError())
    }
    return () => dispatch({type: 'SEARCH_SONGS', songs: [], input: null, nextUrl: null})
    
  },[input, dispatch, handleError])

   //Executes when there was a search and the user is at the bottom of the page
   useEffect(() => {
    if(bottom && input !== null){
      fetchSongs(nextUrl)
        .then(data => dispatch({type: 'LOAD_MORE_SONGS', songs: data.collection, nextUrl: data.next_href}))
        .catch(error => handleError())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[input, bottom, dispatch])

 
  //Animation for the songcards
  useLayoutEffect(() => {
    if (reproductionList?.length > 0) {
      setTimeout(() => {
        //Filters all new loaded songs
        reproductionList.filter((item, index)=>{
          return reproductionList[index] !== previousReproductionList[index]
        }).forEach((item, index) => {
          //Animate each new songcard using his corresponding index reference
            gsap.to(songCardList.current[index + previousReproductionList.length], {
              duration: 1,
              opacity: 1,
              delay: index/3,
            });
        });
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reproductionList]);

  //Scroll listener
  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = winScroll / height
    //When the value of scrolled is greater than 0.85 means that the user is at the bottom of the page
    if(scrolled > 0.85){
      setBottom(true)

    } else {
      setBottom(false)
    
    }
  }

  let player = selectedSong ? (
    <Player
      isPlaying={isPlaying}
      selectedSong={selectedSong}
      nextSong={nextSong}
      previousSong={previousSong}
      playSong={playSongHandler}
      pauseSong={pauseSongHandler}
    />
  ) : null;

  let spinner = null;
  if(loading){ 
    spinner = <Spinner /> 
  }else{
    spinner = null
  } 

    return (
      <div className={"SongList"}>
        <div className={"SongCollection"}>
          {reproductionList?.length
            ? reproductionList.map((song, index) => {
                return (
                  <div
                    key={song.id}
                    className={"Card"}
                    ref={(element) => (songCardList.current[index] = element)}
                  >
                    <Song
                      playSong={playSongHandler}
                      pauseSong={pauseSongHandler}
                      track={song}
                      selectedSong={selectedSong}
                      isPlaying={isPlaying}
                    />
                  </div>
                )
              })
            : spinner}
        </div>
        {player}
      </div>
    );
  
}

export default SongList;

