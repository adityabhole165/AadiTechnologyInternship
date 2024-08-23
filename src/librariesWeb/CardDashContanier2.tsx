import { Box, Card, Grid, Typography } from '@mui/material';
import { Calendar } from 'react-multi-date-picker';
function CardDashContainer2() {
  return (
    <div>
      <Card>
        <Typography variant="h3" p={1} sx={{ color: '#304ffe' }}>
          Upcoming Event
        </Typography>
        <Grid container spacing={1} >
          <Grid item sm={6} md={12}>
            <Box
              sx={{ width: '800px', mr: '0px' }}
              justifyContent={'center'}
              px={3.7}
              
            >
              <Calendar />
            </Box>
          </Grid>
          <Grid item sm={6} md={12}>
            <Card>
              <Card
                component={Box}
                m={1.7}
                p={1}
                sx={{ backgroundColor: '#4db6ac' }}
              >
                School Event
              </Card>
              <Card
                component={Box}
                m={1.7}
                p={1}
                sx={{ backgroundColor: '#64b5f6' }}
              >
                Holiday
              </Card>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default CardDashContainer2;
