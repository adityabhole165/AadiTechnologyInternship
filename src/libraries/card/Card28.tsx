import React from 'react';
import { Container, Card, Grid, Typography, Box } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { Styles } from 'src/assets/style/student-style';


function Card28({ Student }) {
  const classes = Styles();
  const Class = sessionStorage.getItem('Class');
  const RollNo = sessionStorage.getItem('RollNo');
  const UserName = sessionStorage.getItem('StudentName');

  let AcademicYear = ''
  if (Student != undefined) {
    Student.map((Header) => (
      AcademicYear = Header.AcademicYear
    ))
  }

  return (
    <Container>
      <Card sx={{ p: 1, mb: '10px' }} className={classes.ListStyle1}>
        <Grid container>
          <Grid item xs={12}>
            <Typography><b>Name:</b> {UserName}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ pt: '5px' }}><b> Roll no:</b> {RollNo}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ pl: 1, pt: 0.5 }}><b>Class:</b> {Class}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ pl: 3, pt: 0.5 }}><b> Year:</b> {AcademicYear}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Card28;
