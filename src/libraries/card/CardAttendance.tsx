import { useState } from 'react';
import { Grid, Grow, Typography } from '@mui/material';
import {
  CardDetail1, CardDetail4, CardDetail
} from '../styled/AccordianStyled';

import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';


function CardAttendace({ Name }) {
  
  const location = useLocation();
  const pathname = location.pathname;
  const [checked, setChecked] = useState(true)

  const pageName = pathname.replace('/extended-sidebar/', '');
  const isMiddle =
    pageName === 'Student/Timetable' || pageName === 'Teacher/TeacherTimeTable';
  return (
    <div>


          <CardDetail>
            <CardDetail1 dangerouslySetInnerHTML={{ __html: Name }} ></CardDetail1>
          </CardDetail>
   
    </div>
  );
}
export default CardAttendace;
