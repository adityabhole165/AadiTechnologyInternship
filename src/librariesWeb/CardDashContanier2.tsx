import { Box, Card, Grid, Typography } from '@mui/material';
import { Calendar } from 'react-multi-date-picker';
function CardDashContainer2() {
  return (
      <Box sx={{ height: 'auto', width:'auto', backgroundColor:'white', p:1 }}>
      <Grid item xs={12} sx={{ backgroundColor:'#38548A'  }}>
        <Typography variant="h3" p={0.8} mb={2} sx={{ color: 'white' }}>
          Upcoming Event
        </Typography>
        </Grid>
        <Grid container spacing={1} >
          <Grid item sm={6} md={12}>
            <Box
              sx={{ width: '800px', mr: '0px' }}
              justifyContent={'center'}
              px={4.5}>
              <Calendar />
            </Box>
          </Grid>
          <Grid item sm={6} md={12}>
            <Card>
              <Card
                component={Box}
                m={1.7}
                p={1}
                sx={{ backgroundColor: '#4db6ac', color:'black' }}
              >
               <b> School Event</b>
              </Card>
              <Card
                component={Box}
                m={1.7}
                p={1}
                sx={{ backgroundColor: '#64b5f6', color:'black' }}
              >
               <b> Holiday</b>
              </Card>
            </Card>
          </Grid>
        
        </Grid>
        </Box>
      
    
  );
}

export default CardDashContainer2;
