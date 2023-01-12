import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function Card8({ itemList }) {
  return (
    <div>
              {itemList.map((item,i)=>(
        <Paper  component={Box} p={1} my={1} key={i}>
        <Box display={"flex"} justifyContent={'space-between'}>
        <Typography variant="h5" gutterBottom>{item.header}</Typography>
        <Typography variant="body2"></Typography>
       </Box>
       <Box display={"flex"} justifyContent={'space-between'}>
       <Typography variant="body2">{item.text1}</Typography>
        <Typography variant="body2" >{item.text2}</Typography>
        </Box>
        <Box display={"flex"} justifyContent={'space-between'}>
       <Typography variant="body2">{item.text3}</Typography>
        <Typography variant="body2" >{item.text4}</Typography>
        </Box>
         </Paper>
        ))}
    </div>
  )
}

export default Card8
