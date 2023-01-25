import { Box, Card, Grid, Stack, Typography,Avatar,Paper } from '@mui/material';
import React from 'react';
import { CardDetail2 } from 'src/libraries/styled/AccordianStyled';




const Carouselcard = ({ item }) => {

  return (
    <div>

      <Card>
         <Stack justifyContent="center" alignItems="center" sx={{textAlign:"center"}} >
         <Avatar alt="user.name" src={ item.PhotoPath != 0 ? `data:image/png;base64,${item.PhotoPath}`:'/imges/defualtUser.jpg'} sx={{ mt:"10px" ,backgroundColor: "#90caf9", height: "100%" ,width:100}} variant="rounded" aria-label="add" />  
          <Typography variant='body2' >{item.UserName}</Typography>
          <Typography variant='body2'>{item.Date}</Typography>
          </Stack>
      </Card>
  
    </div>
  );
};

export default Carouselcard;
