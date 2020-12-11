import React from 'react';
import './NavTitle.scss';

const navTitle = (props) => {

  return (
    <div className={'NavTitle'}>
      <h1 className={'TitleText'}>
        {props.title}
      </h1>
      </div>
  );
}

export default navTitle;