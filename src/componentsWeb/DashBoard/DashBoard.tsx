import { Box, Grid } from '@mui/material';
import SchoolNoticeBoard from 'src/components/SchoolNoticeBoard/SchoolNoticeBoard';
import CardDahContainer from 'src/librariesWeb/CardDashContainer';
import CardDashContainer3 from 'src/librariesWeb/CardDashContainer3';
import CardDashContainer2 from 'src/librariesWeb/CardDashContanier2';

function DashBoard() {

  return (
    <Box sx={{ px: 2 }}>
      <SchoolNoticeBoard />
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
