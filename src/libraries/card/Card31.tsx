import React from 'react';
import { Typography, Grid } from '@mui/material';
import { CardDetail, CardDetail1, CardDetail2 } from '../styled/AccordianStyled';

function Card31({ Name, Value }) {
  return (
    <div>
      <CardDetail>
        <Grid container>
          <Grid item xs={10}>
            <CardDetail1>
              {Name}
            </CardDetail1>
          </Grid>
          <Grid item xs={2}>
            <CardDetail2>
              {Value}
            </CardDetail2>
          </Grid>
        </Grid>
      </CardDetail>
    </div>
  );
}
export default Card31;
