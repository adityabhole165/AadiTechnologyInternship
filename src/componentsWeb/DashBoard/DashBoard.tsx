import { Box, Grid, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import CardDahContainer from 'src/librariesWeb/CardDashContainer';
import CardDashContainer3 from 'src/librariesWeb/CardDashContainer3';
import CardDashContainer2 from 'src/librariesWeb/CardDashContanier2';

function DashBoard() {
//   const slideText = keyframes`
//   0% { transform: translateX(100%); }
//   100% { transform: translateX(-100%); }
// `;
  return (
    <Box sx={{ px: 1 }}>
      <Box
      sx={{
        marginTop: 4,
        position: 'relative',
        overflow: 'hidden', // Ensure the text stays within the box bounds
        backgroundColor: '#4db6ac',
        padding: '8px 8px',
        width: '100%',
      }}
      >
        <Typography
          variant="h5"
          color="white"
          sx={{
            whiteSpace: 'nowrap',
            display: 'inline-block',
            // animation: `${slideText} 30s linear infinite`,
          }}
        >
          Feedback facility is available now! Click on the top-right link “Feedback” to give your opinion about School as well as RITeSchool software.
        </Typography>
      </Box>
      <Grid container spacing={2} mt={-1}>
        <Grid item md={12} lg={6}>
          <CardDahContainer />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <CardDashContainer2 />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <CardDashContainer3 />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashBoard;
