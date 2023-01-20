
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { useEffect, useState } from 'react';
import {Box, Grid} from "@mui/material";
import CenterAlign from './CenterAlign';

const Carousel = ({itemList ,Index,arrowClick }) => {
   
console.log(Index)
  
  
  return (
    <div>
   
      <Grid container alignItems="center">
      <Grid item xs={1}>
      <ArrowLeft onClick={() => arrowClick(-1)}/>
      </Grid>
      <Grid item xs={10}>
      {/* <CenterAlign item={itemList[Index]} /> */}
      </Grid>
      <Grid item xs={1}>
      <ArrowRight onClick={() => arrowClick(1)} />
      </Grid>
      </Grid>
    
    </div>
  )
}

export default Carousel