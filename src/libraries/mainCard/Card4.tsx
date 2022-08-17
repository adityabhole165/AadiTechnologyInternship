import React from 'react';
import { Typography, Grid, useTheme } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import { useLocation } from 'react-router-dom';

function Card4({ header, text1, text2, text3 }) {
  const theme = useTheme();
  const classes = Styles();
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');
  console.log(pageName);
  return (
    <>
      <Grid container>
        <Grid xs={pageName == 'Timetable' ? 6 :  10 } >
          <Typography sx={{ fontWeight: 'bold' }} className={classes.Listfont2}>
            {header}
          </Typography>
        </Grid>

        <Grid xs={pageName == 'Timetable' ? 6 : 2 }>
          <Typography className={classes.Listfont2} sx={{ float: 'right' }}>
            {text3}
          </Typography>
        </Grid>
        <Grid xs={8}>
          <Typography className={classes.Listfont2}>{text1}</Typography>
        </Grid>
        <Grid xs={4}>
          <Typography
            className={classes.Listfont2}
            sx={{ float: 'right', ml: '-20px' }}
          >
            {text2}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Card4;
