import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../Navbar/NavItems/NavItems';
import './SideDrawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = ['SideDrawer', 'Closed'];
  if (props.open) {
    attachedClasses = ['SideDrawer', 'Open'];
  }
  return(
    <div>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={'LogoSideDrawer'}>
          <Logo />
        </div>
          <nav>
            <NavItems />
          </nav>
      </div>
    </div>
   

  );
}

export default sideDrawer;