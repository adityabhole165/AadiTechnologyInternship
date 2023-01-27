import { Box, Card, Grid, Stack, Typography,Avatar,Paper } from '@mui/material';
import React from 'react';
import { CardDetail2 } from 'src/libraries/styled/AccordianStyled';
import { Cardbday } from '../styled/CardStyle';




const Carouselcard = ({ item }) => {

  return (
    <div>

      <Cardbday sx={{mt:1}}>
         <Stack justifyContent="center" alignItems="center" sx={{textAlign:"center"}} >
         <Avatar alt="user.name" src={ item.Text2 != 0 ? `data:image/png;base64,${item.Text2}`:
         '/imges/defualtUser.jpg'} sx={{ mt:"10px" ,backgroundColor: "#90caf9", height: "100%" ,width:100}} variant="rounded" aria-label="add" />  
          <Typography variant='h5' >{item.Header}</Typography>
          <Typography variant='body2'>{item.Text1}</Typography>
          </Stack>
      </Cardbday>
  
    </div>
  );
};

export default Carouselcard;
