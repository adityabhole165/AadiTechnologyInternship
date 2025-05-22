import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const ToggleIconButton = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(prev => !prev);
  };

  return (
    <IconButton onClick={handleClick}>
      <CircleOutlinedIcon style={{ color: isActive ? 'blue' : 'red' }} />
    </IconButton>
  );
};

export default ToggleIconButton;
