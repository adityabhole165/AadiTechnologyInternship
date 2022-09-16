import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import {
  CardDetail,
  CardDetail1,
  CardDetail2,
  CardWrapper1,
  CardDetail3
} from '../styled/AccordianStyled';

import { useLocation } from 'react-router-dom';

function Card31({ Name, Value, }) {
  const location = useLocation();

  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');
  return (
    <div>
      {pageName === 'Timetable' ? (
        <CardWrapper1>
          <CardDetail1>{Name}</CardDetail1>
          <CardDetail3>{Value}</CardDetail3>
        </CardWrapper1>
      ) : (
        <CardDetail>
          <CardDetail1>{Name}</CardDetail1>
          <CardDetail2>{Value}</CardDetail2>
        </CardDetail>
      )}
    </div>
  );
}
export default Card31;
