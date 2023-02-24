import { useState } from 'react';
import {  Grid, Grow } from '@mui/material';
import {
  CardDetail1, CardDetail4,
} from '../styled/AccordianStyled';

import { useLocation } from 'react-router-dom';


function  CardAttendace({ Name}) {
  const location = useLocation();
  const pathname = location.pathname;
  const [checked, setChecked] = useState(true)

  const pageName = pathname.replace('/extended-sidebar/', '');
  const isMiddle =
    pageName === 'Student/Timetable' || pageName === 'Teacher/TeacherTimeTable';
  return (
    <div>
 
     <Grid container sx={{borderTop:"1px solid gray"}}>
        <Grid item xs={12}>
        {Name}
        </Grid>
      
       
      
     </Grid>
    </div>
  );
}
export default CardAttendace;
