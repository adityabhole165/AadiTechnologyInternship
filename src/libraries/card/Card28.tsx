import React from 'react';
import { Container, Card, Grid, Typography, Box } from '@mui/material';

function Card28() {
  const Class = sessionStorage.getItem('Class');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const RollNo = sessionStorage.getItem('RollNo');
  const UserName = sessionStorage.getItem('UserName');

  return (
    <Container>
      <Card sx={{ p: 1, mb: '10px' }}>
        <Grid container>
          <Grid xs={12}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h5">Name:</Typography>
              <Typography sx={{ pl: 0.5 }}> {UserName}</Typography>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Typography variant="h5">Roll no:</Typography>
              <Typography sx={{ pl: 0.5 }}>{RollNo}</Typography>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Typography variant="h5" sx={{ pl: 3 }}>
                Class:
              </Typography>
              <Typography sx={{ pl: 0.5 }}>{Class}</Typography>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Typography variant="h5" sx={{ pl: 2 }}>
                Year:
              </Typography>
              <Typography sx={{ pr: 2 }}>2022</Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Card28;
