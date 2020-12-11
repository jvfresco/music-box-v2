import React, { useState } from 'react';
import NavItems from './NavItems/NavItems';
import NavTitle from './NavTitle/NavTitle';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import Search from './Search/Search';
import './Navbar.scss';

const Navbar = props => {

  const [title, setTitle] = useState('Featured Tracks');
  
 

  const submitSearch = (inputValue) =>{
    setTitle('Showing results for: ' + inputValue);
  }

  return (
    <div className={"Navbar"}>
      <DrawerToggle toggleDrawer={props.toggleDrawer}></DrawerToggle>
      <Logo desktopOnly={true}/>
      <div className={"SearchTitle"}>
        <Search submitSearch={submitSearch}></Search>
        <NavTitle title={title}></NavTitle>
      </div>
      <NavItems desktopOnly={true}/>
    </div>
  );
  
}


export default Navbar;