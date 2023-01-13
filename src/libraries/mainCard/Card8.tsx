import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Card9 from 'src/libraries/mainCard/Card9';
import { ListStyle } from '../styled/CardStyle';
import Card10 from './Card10';

function Card8({ itemList , Selected=false}) {
  return (
    <ListStyle component={Box} p={1} my={1} color={Selected?'info':'primary'}>
      {itemList.map((item, i) => (
        <Card9 item={item} key={i}
          variant={i === 0 ? "h5" : "body2"}
        />
   
      ))}

  
    </ListStyle >
  )
}

export default Card8
