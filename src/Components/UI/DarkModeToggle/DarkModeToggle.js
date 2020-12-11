import React, {useState, useEffect } from 'react';
import toggleThemeIcon from '../../../assets/sun_moon.svg';
import './DarkModeToggle.scss';

//Component used to change a theme via adding or removing a class
//Class to append 

const DarkModeToggle = (props) => {
  const [darkmode, setDarkmode] = useState(false);

  const themeToggle = () => {
    if (!darkmode) {
      document
        .getElementById("root")
        .classList.replace("theme-light", "theme-dark");
    } else {
      document
        .getElementById("root")
        .classList.replace("theme-dark", "theme-light");
    }
    setDarkmode(!darkmode);
    //The status of the Darkmode is saved in localstorage
    localStorage.setItem("DarkMode", !darkmode);
  };
  
  //If the application has been used before, the status of the theme has been saved. Check for existence
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("DarkMode")) === true) {
      themeToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let text = props.text ? (
    <span className="ToggleThemeText">{props.text}</span>
  ) : null;
  return (
    <div className="ToggleContainer">
      <input
        className="CheckToggle"
        id="toggleTheme"
        type="checkbox"
        onChange={themeToggle}
      />
      <label className="ToggleTheme" htmlFor="toggleTheme">
        <img
          className="ToggleThemeIcon"
          src={toggleThemeIcon}
          alt="Switch Theme"
        />
        {text}
      </label>
    </div>
  );
};


export default DarkModeToggle;