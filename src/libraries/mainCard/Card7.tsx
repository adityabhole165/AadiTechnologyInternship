import { Grid } from '@mui/material';
import { CardDetail2, ListStyle } from '../styled/CardStyle';

function Card7({ header, text1 }) {
  return (
    <>
      <ListStyle>
        <Grid container>
          <Grid item xs={12}>
            <CardDetail2>{header}</CardDetail2>
          </Grid>
          <Grid item xs={12}>
            <CardDetail2>
              <b>{text1}</b>
            </CardDetail2>
          </Grid>
        </Grid>
      </ListStyle>
    </>
  );
}

export default Card7;
