import React from 'react';
import { Box, Paper, Typography, Card ,Grid } from '@mui/material';

function CardText3({itemList}) {
  return (
    <div>
       {itemList.map((item,i)=>(
         <Card key={i} component={Box}  my={1} >
         <Box  sx={{backgroundColor:"#c5cae9"}}  p={0.5}>
         <Typography variant="h5">{item.Header}</Typography>
         </Box>
         <Box  p={0.5} display={"flex"} justifyContent={'space-between'}>
         <Typography variant="body2">{item.Text1}</Typography>
         <Typography variant="body2">{item.Text2}</Typography>
         </Box>
        <Typography variant="body2" p={0.5}>{item.Text3}</Typography>
         </Card>
          ))} 
    </div>
  )
}

export default CardText3
