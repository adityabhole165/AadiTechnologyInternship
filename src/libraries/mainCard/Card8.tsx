import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Card9 from 'src/libraries/mainCard/Card9';

function Card8({ itemList , Selected=false}) {
  return (
    <Paper component={Box} p={1} my={1} sx={{backgroundColor: Selected?'primary.dark':'primary'}}>
      {itemList.map((item, i) => (
        <Card9 item={item} key={i}
          variant={i === 0 ? "h5" : "body2"}
        />
      ))}
    </Paper>
  )
}

export default Card8
