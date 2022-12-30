import React from 'react';
import {Grid,Card, Typography} from "@mui/material";
import { CardDetail1, CardDetail2, CardDetail6, ListStyle } from '../styled/CardStyle';
import { Header1 } from '../styled/AccordianStyled';

function Card7({header,text1}) {
  console.log({header,text1})
  return (
    <>
    <ListStyle>
      <Grid container>
        <Grid item xs={12}>
       <CardDetail2>{header}</CardDetail2>    
            </Grid>
        <Grid item xs={12} >
        <CardDetail2 >{text1}</CardDetail2>  
        </Grid>
      
      </Grid>
      </ListStyle>
    </>
  )
}

export default Card7
