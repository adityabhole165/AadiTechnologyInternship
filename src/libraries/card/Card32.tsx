import React, { useEffect } from 'react';

import {  Typography, Grid, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Styles } from 'src/assets/style/student-style';
const Card32 = ({ Id, Name, expand }) => {
  const theme = useTheme();
  const ExpandIcon = () =>
    expanded ? (
      <ExpandLessIcon sx={{ float: 'right', mr: 0.5 }} />
    ) : (
      <ExpandMoreIcon sx={{ float: 'right', mr: 0.5 }} />
    );
  const [expanded, setExpanded] = useState(false);
  const expandFunc = () => {
    setExpanded(!expanded);
    expand(Id);
  };

  const classes = Styles();

  console.log(theme.colors.gradients.pink1);
  return (
    <Grid
      container
      sx={{
        background:
          theme.colors.gradients.pink1 ==
          'linear-gradient(135deg, white 0%, white 100%);'
            ? '#9e9e9e'
            : theme.colors.gradients.pink1
      }}
      onClick={expandFunc}
      className={classes.Accodian}
    >
      <Grid item xs={10}>
        <Typography variant="h4" className={classes.accodianHeader}>
          {Name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <ExpandIcon />
      </Grid>
    </Grid>
  );
};
export default Card32;
