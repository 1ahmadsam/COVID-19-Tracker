import React from 'react';
import styled from 'styled-components';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import './Toggle.css';
const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  // <button onClick={toggleTheme}>
  //   {isLight ? <WbSunnyIcon /> : <Brightness2Icon />}
  // </button>
  return (
    <label className='switch'>
      <input type='checkbox' onClick={toggleTheme} />
      <span className='slider round'>
        {/* {isLight ? <WbSunnyIcon /> : <Brightness2Icon />} */}
      </span>
    </label>
  );
};

export default Toggle;
