import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import {
  CardDetail,
  CardDetail1,
  CardDetail2,
  CardWrapper1,
  CardDetail3,
  CardDetailH
} from '../styled/AccordianStyled';

import { useLocation } from 'react-router-dom';

function Card31({ Name, Value, text1 = '', text2 = '' }) {
  const location = useLocation();

  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/', '');
  const isMiddle = pageName === 'Student/Timetable' || pageName === 'Teacher/TeacherTimeTable'
  return (
    <div>
      <CardWrapper1>
        <CardDetail1>{Name}</CardDetail1>
        {isMiddle ? (
          <CardDetail3>{Value}</CardDetail3>
        ) : (
          <CardDetail2>{Value}</CardDetail2>
        )}
      </CardWrapper1>

      {text1 !== '' &&
        <CardDetailH>
        {isMiddle ? (
          <CardDetail3>a{text2}</CardDetail3>
        ) : (
          <CardDetail2>b{text2}</CardDetail2>
        )}
        </CardDetailH>
      }
    </div>
  );
}
export default Card31;
