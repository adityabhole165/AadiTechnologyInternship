import { Box, Card, Grid } from '@mui/material';
import Card11 from './Card11';

function Card12({ item, clickItem = undefined }) {
  return (
    <Card component={Box} p={0.5} my={1}>
      <Grid container>
        <Grid item xs={11}>
          <Card11 item={item} />
        </Grid>
        <Grid item xs={1} color={item.color} onClick={() => clickItem(item.Id)}>
          {item.Icon}
        </Grid>
      </Grid>
    </Card>
  );
}

export default Card12;
