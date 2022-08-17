import React from 'react';
import { Container, Card, Grid, Typography, Box } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { Styles } from 'src/assets/style/student-style';


function Card28() {
  const classes = Styles();
  const Class = sessionStorage.getItem('Class');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const RollNo = sessionStorage.getItem('RollNo');
  const UserName = sessionStorage.getItem('UserName');

const  AcademicYear =  sessionStorage.getItem('AcademicYear');
console.log(AcademicYear);

  return (
    <Container>
      <Card sx={{ p: 1, mb: '10px' }} className={classes.ListStyle1}>
        <Grid container>
          <Grid xs={12}>
            <Typography>
              <b>Name:</b>
              {UserName}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography sx={{ pt: '5px' }}>
              <b> Roll no:</b>
              {RollNo}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography sx={{ pl: 3, pt: 0.5 }}>
              <b>Class:</b> {Class}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography sx={{ pl: 2, pt: 0.5 }}>
              <b> Year:</b>{AcademicYear}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Card28;
