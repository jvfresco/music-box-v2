import React from 'react';
import './DrawerToggle.scss';

const DrawerToggle = (props) => {

  return (
    <div className={'DrawerToggle'} >
      <input type="checkbox" id="drawerToggle" className={'DrawerToggleCheckbox'} value=""/>
      <label onClick={props.toggleDrawer} className={'DrawerToggleLabel'} htmlFor="drawerToggle">
        <span className={'DrawerToggleIcon'}>
          &nbsp;
        </span>
      </label>
    </div>
  );
}

export default DrawerToggle;