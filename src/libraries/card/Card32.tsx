import React from 'react';

import { Container, Card, Typography, Grid, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const Card32 = ({ Id, Name, expand }) => {
  const theme = useTheme();
  const ExpandIcon = () =>
    expanded ? (
      <ExpandLessIcon sx={{float:"right",mr:1}}/>
    ) : (
      <ExpandMoreIcon sx={{float:"right",mr:1}} />
    );
    const [expanded, setExpanded] = useState(false)
    const expandFunc= () => {
        setExpanded(!expanded)
        expand(Id)
    }
  return (
    <Grid
      container
      sx={{ background: `${theme.colors.gradients.pink1}`, cursor: 'pointer' }}
      onClick={expandFunc}
    >
      <Grid item xs={10}>
        <Typography variant="h4" sx={{ py: 1, mx: 1 }}>
          {Name}
        </Typography>
      </Grid>
      <Grid item xs={2} sx={{ py:0.5 }}>
        <ExpandIcon />
      </Grid>
    </Grid>
  );
};
export default Card32;