import { Avatar, Box, Card, Stack, Typography, Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import Card28 from '../card/Card28';
import { CardDetail1, CardDetail3, ListStyle } from '../styled/CardStyle';

function Card6() {
  return (
    <>
      <Stack alignItems="center" justifyContent="center" gap={1}>
        <Avatar
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Typography variant="h4" sx={{ mb: '10px' }}>Student name</Typography>
      </Stack>

      <ListStyle
        sx={{
      
          bottom: 0,
          height: '80vh',
          width: '100%',
          borderRadius:"15px"
        }}
      >
        <Grid container>
          <Grid item xs={12}>
          
            <Typography sx={{mt:"10px"}}>   <b> Roll No:</b></Typography>
          </Grid>
          <Grid item xs={12}>
         
            <Typography sx={{mt:"10px"}}>    <b> Residence Phone No:</b></Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography sx={{mt:"10px"}}>      <b>Religion:</b></Typography>
       
          </Grid>
          <Grid item xs={12}>
          <Typography sx={{mt:"10px"}}>      <b>Religion:</b></Typography>
          </Grid>
        </Grid>
      </ListStyle>
    </>
  );
}

export default Card6;
