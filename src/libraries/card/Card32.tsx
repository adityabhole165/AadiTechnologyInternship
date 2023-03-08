import { useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { AccordianHeader, Header1, Header2 } from '../styled/AccordianStyled';
import {  Grid, Grow } from '@mui/material';
import { useState } from 'react';
const Card32 = ({ Id, Name, expand, isActive }) => {
  const theme = useTheme();
  return (<>
    
    <AccordianHeader onClick={() => expand(Id)}>
      <Header1 color={isActive ? 'secondary':''}> {Name} </Header1>
      <Header2>
        {isActive ?
          <ExpandLessIcon /> :
          <ExpandMoreIcon />}
      </Header2>
    </AccordianHeader>
    </>);
};
export default Card32;
