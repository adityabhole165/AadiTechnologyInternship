import { useState } from 'react';
import {  Grid, Grow, Typography } from '@mui/material';
import {
  CardDetail1, CardDetail4,
} from '../styled/AccordianStyled';

import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';


function  CardAttendace({ Name}) {
  console.log("Name",Name)
  const location = useLocation();
  const pathname = location.pathname;
  const [checked, setChecked] = useState(true)

  const pageName = pathname.replace('/extended-sidebar/', '');
  const isMiddle =
    pageName === 'Student/Timetable' || pageName === 'Teacher/TeacherTimeTable';
  return (
    <div>
 
     <Grid container sx={{borderTop:"1px solid gray", display:"flex", direction:"row",justifyContent:"space-between"}}>
        <Grid item xs={12}>
       
        <Typography>
                <Box
                
                  dangerouslySetInnerHTML={{ __html: Name }}
                ></Box>
              </Typography>
        </Grid>
      
       
      
     </Grid>
    </div>
  );
}
export default CardAttendace;
