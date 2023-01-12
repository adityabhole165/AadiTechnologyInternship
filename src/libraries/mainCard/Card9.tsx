import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function Card9({item, }) {
  return (
    <div>
      
       <Box display={"flex"} justifyContent={'space-between'}>
        <Typography variant="h5" gutterBottom>{item.Text1}</Typography>
        <Typography variant="body2">{item.Text2}</Typography>
       </Box>
    </div>
  )
}

export default Card9
