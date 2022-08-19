import React from 'react';
import {  Typography, Grid } from '@mui/material';

function Card31({ Name, Value }) {
  return (
    <div>
      <Grid container>
        <Grid item xs={10}>
          <Typography sx={{ my: 0.5, mx: 1 }}>
            {Name}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ mt: 0.5, float: 'right', mr: 1.3 }}>
            {Value}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
export default Card31;
