import { Grid } from '@mui/material';
import FeedBackCard from './FeedBackCard';
import MyprofileCard from './MyprofileCard';
import UnreadMessage from './UnreadMessage';
function CardDahContainer() {
  return (
    <div>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <MyprofileCard />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item sm={6}>
            <UnreadMessage />
          </Grid>
          <Grid item sm={6}>
            <FeedBackCard />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CardDahContainer;
