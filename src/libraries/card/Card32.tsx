import React, { useEffect } from 'react';

import { Typography, Grid, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Styles } from 'src/assets/style/student-style';
import { AccordianHeader, Header1, Header2 } from '../styled/AccordianStyled';
const Card32 = ({ Id, Name, expand }) => {
  const theme = useTheme();
  const ExpandIcon = () => (expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />);
  const [expanded, setExpanded] = useState(false);
  const expandFunc = () => {
    setExpanded(!expanded);
    expand(Id);
  };

  const classes = Styles();
  return (
    <AccordianHeader onClick={expandFunc}>
      <Header1> {Name} </Header1>
      <Header2>
        <ExpandIcon />
      </Header2>
    </AccordianHeader>
  );
};
export default Card32;
