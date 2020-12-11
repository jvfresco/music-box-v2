import React from 'react';
import musicFinderLogo from '../../assets/music_finder.svg';
import './Logo.scss';
import Aux from '../../hoc/Auxiliar/Auxiliar';


const Logo = (props) => {
  return (
    <Aux>
      <div className={"Logo"}>
        <img src={musicFinderLogo} alt="Music Finder" className={"LogoImg"} />
      </div>
      <h3 className={props.desktopOnly ? "LogoText DesktopOnly" : "LogoText"}>
        Music Finder
      </h3>
    </Aux>
  );
};

export default Logo;