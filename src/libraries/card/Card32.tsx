import React from 'react';

import { Container, Card, Typography, Grid, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const Card32 = ({ Id, Name, enableRow, expand }) => {
  const theme = useTheme();
  const ExpandIcon = ({ expanded }) =>
    expanded ? (
      <ExpandLessIcon sx={{float:"right",mr:1}}/>
    ) : (
      <ExpandMoreIcon sx={{float:"right",mr:1}} />
    );

  return (
    <Grid
      container
      sx={{ background: `${theme.colors.gradients.pink1}`, cursor: 'pointer' }}
    >
      <Grid item xs={10} onClick={() => expand(Id)}>
        <Typography variant="h4" sx={{ py: 1, mx: 1 }}>
          {Name}
        </Typography>
      </Grid>
      <Grid item xs={2} sx={{ py:0.5 }}>
        <ExpandIcon expanded={enableRow === Id}  />
      </Grid>
    </Grid>
  );
};
export default Card32;
