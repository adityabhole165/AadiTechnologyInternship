import React from 'react';
import { Typography, Grid, useTheme } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import { useLocation } from 'react-router-dom';
import {
  CardDetail,
  CardDetail1,
  CardDetail2,CardDetail3,
} from '../styled/CardStyle';


function Card4({ header, text1, text2, text3 }) {
  const theme = useTheme();
  const classes = Styles();
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');
  return (
    <>
     <CardDetail>
        <CardDetail1>{header}</CardDetail1>
        <CardDetail2>{text3}</CardDetail2>
     
      </CardDetail>
      
      <CardDetail>
        <CardDetail3>{text1}</CardDetail3>
        <CardDetail2>{text2}</CardDetail2>
     
      </CardDetail>
    
    </>
  );
}

export default Card4;
