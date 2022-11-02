import React from 'react';
import {Grid,Card, Typography} from "@mui/material";
import { CardDetail1, CardDetail2, CardDetail6, ListStyle } from '../styled/CardStyle';
import { Header1 } from '../styled/AccordianStyled';

function Card7({header,text1, text2}) {
  return (
    <>
    <ListStyle>
      <Grid container>
        <Grid item xs={8}>
       <CardDetail6>{header}</CardDetail6>    
            </Grid>
        <Grid item xs={4}>
        <CardDetail2 sx={{float:"right"}}>{text1}<br/>{text2}</CardDetail2>  
        </Grid>
      
      </Grid>
      </ListStyle>
    </>
  )
}

export default Card7
