import React from 'react';
import styled from 'styled-components';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  return (
    <button onClick={toggleTheme}>
      {isLight ? <WbSunnyIcon /> : <Brightness2Icon />}
    </button>
  );
};

export default Toggle;
