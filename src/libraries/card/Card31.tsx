import {  Grid } from '@mui/material';
import {
  CardDetail1, CardDetail4,
} from '../styled/AccordianStyled';

import { useLocation } from 'react-router-dom';


function Card31({ Name, Value, text1 = '', text2 = '' ,text3}) {
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/', '');
  const isMiddle =
    pageName === 'Student/Timetable' || pageName === 'Teacher/TeacherTimeTable';
    const color1 =
    pageName === 'Student/Homework' ;

  return (
    <div>
      <Grid container sx={{ borderTop: '1px solid gray' }}>
        <Grid item xs={5}>
          <CardDetail1>{Name}</CardDetail1>
          <CardDetail4>{text3}</CardDetail4>
        </Grid>
        <Grid item xs={7}>
          <CardDetail1 align={isMiddle ? 'left' : 'right'}  color= {color1 ? "primary" : null }>{Value}</CardDetail1>
        </Grid>
        {text1 !== '' && (
          <>
            <Grid item xs={4}>
              <CardDetail1>{text1}</CardDetail1>
            </Grid>
            <Grid item xs={8}>
              <CardDetail1 align={isMiddle ? 'left' : 'right'}>
                {text2}
              </CardDetail1>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
export default Card31;
