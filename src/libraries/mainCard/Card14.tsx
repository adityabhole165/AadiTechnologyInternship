import React from 'react';
import { Typography,Box,Card } from '@mui/material'

function Card14({Text1,Text2,Text3,Text4,Text5,Text6}) {
  return (
    <div>
       <Card  component={Box} p={1}>
    <Box display={"flex"} justifyContent={'space-between'} >
      <Typography variant='body2'> <b>Author:</b> {Text1}</Typography>
      <Typography variant='body2'> <b>Publisher:</b> {Text2}</Typography>
    </Box>
    <Box display={"flex"} justifyContent={'space-between'} >
      <Typography variant='body2'> <b>Available:</b> {Text5}</Typography>
      <Typography variant='body2'> <b>Language:</b> {Text4}</Typography>
    </Box>
    <Box display={"flex"} justifyContent={'space-between'} >
      <Typography variant='body2'> <b>Standards:</b>{Text3}</Typography>
      <Typography variant='body2'> <b>Total:</b> {Text6}</Typography>
    </Box>
   
    </Card>
    </div>
  )
}

export default Card14
