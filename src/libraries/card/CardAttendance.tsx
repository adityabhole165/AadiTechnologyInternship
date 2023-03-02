import { useState } from 'react';
import { Grid, Grow, Typography } from '@mui/material';
import {
  CardDetailTopper, CardDetail
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
            <CardDetailTopper dangerouslySetInnerHTML={{ __html: Name }} ></CardDetailTopper>
          </CardDetail>
    </div>
  );
}
export default CardAttendace;
