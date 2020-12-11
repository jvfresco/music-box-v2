import React from 'react';
import './NavItems.scss'; 
import soundCloudLogo from '../../../../assets/soundcloud.svg';
import DarkModeToggle from '../../../UI/DarkModeToggle/DarkModeToggle';
import gitHubLogo from '../../../../assets/github2.svg';

const NavItems = (props) => {

  return (
    <ul className={props.desktopOnly ? 'NavItems DesktopOnly' : 'NavItems'}>

      <li className={'NavItem'}>
        <DarkModeToggle text='Toggle Theme'/>
      </li>
      <li className={'NavItem'}>
        <a className={'NavItemLink'} href='https://soundcloud.com'>
          <img className={'NavItemImg'} src={soundCloudLogo} alt='Sound Cloud' />
          <span className={'NavItemText'}>Soundcloud</span>
        </a>
      </li>
      <li className={'NavItem'}>
        <a className={'NavItemLink'} href='https://github.com/'>
          <img className={'NavItemImg'} src={gitHubLogo} alt='GitHub' />
          <span className={'NavItemText'}>GitHub</span>
        </a>
      </li>

    </ul>
  );
}




export default NavItems;