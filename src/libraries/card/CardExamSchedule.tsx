import { Grid, Typography } from '@mui/material';
import { ListStyle } from '../styled/CardStyle';

function CardExamSchedule({ header, text2, text3, text5, text6 = '' }) {
  return (
    <div>
      <ListStyle>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h6">{header}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" sx={{ float: 'right' }}>
              {text2}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">{text3}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ float: 'right' }}>
              {text6}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="primary">
              {text5}
            </Typography>
          </Grid>
        </Grid>
      </ListStyle>
    </div>
  );
}

export default CardExamSchedule;
