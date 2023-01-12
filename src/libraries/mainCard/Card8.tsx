import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Card9 from 'src/libraries/mainCard/Card9';

function Card8({ itemList }) {

  return (
    <div>
        {itemList.map((item,i)=>(
      <Paper  component={Box} p={1} my={1} key={i}>
       <Card9 item={item}   />
      </Paper>
        ))}
    </div>
  )
}

export default Card8
