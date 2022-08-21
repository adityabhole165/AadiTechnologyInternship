import React from 'react';
import { Typography, Grid } from '@mui/material';
import {
  CardDetail,
  CardDetail1,
  CardDetail2
} from '../styled/AccordianStyled';

function Card31({ Name, Value }) {
  return (
    <div>
      <CardDetail>
        <CardDetail1>{Name}</CardDetail1>

        <CardDetail2>{Value}</CardDetail2>
      </CardDetail>
    </div>
  );
}
export default Card31;
