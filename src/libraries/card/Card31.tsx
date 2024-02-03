import { Grid, Grow } from '@mui/material';
import { useState } from 'react';
import { CardDetail1, CardDetail4 } from '../styled/AccordianStyled';

import { useLocation } from 'react-router-dom';

function Card31({ Name, Value, text1 = '', text2 = '', text3 }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [checked, setChecked] = useState(true);

  const pageName = pathname.replace('/extended-sidebar/', '');
  const isMiddle =
    pageName === 'Student/Timetable' || pageName === 'Teacher/TeacherTimeTable';
  return (
    <div>
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 0' }}
        {...(checked ? { timeout: 1000 } : {})}
      >
        <Grid container sx={{ borderTop: '1px solid gray' }}>
          <Grid item xs={isMiddle ? 4 : 8}>
            <CardDetail1>{Name}</CardDetail1>
            <CardDetail4>{text3}</CardDetail4>
          </Grid>
          <Grid item xs={isMiddle ? 8 : 4}>
            <CardDetail1
              align={isMiddle ? 'left' : 'right'}
              color={isMiddle ? null : '#628def'}
            >
              {Value}
            </CardDetail1>
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
      </Grow>
    </div>
  );
}
export default Card31;
