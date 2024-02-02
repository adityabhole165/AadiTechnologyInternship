import { Grid } from '@mui/material';

import BirthdayDashboard from './BirthdayDashboard';
import PhotoCardDash from './PhotoCardDash';
function CardDashContainer3() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={6} md={12}>
          <BirthdayDashboard />
        </Grid>
        <Grid item sm={6} md={12}>
          <PhotoCardDash />
        </Grid>
      </Grid>
    </div>
  );
}

export default CardDashContainer3;
