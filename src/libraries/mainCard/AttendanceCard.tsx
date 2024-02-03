import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid } from '@mui/material';
import { CardDetail, CardDetailTopper } from '../styled/AccordianStyled';

const AttendanceCard = ({ Item }) => {
  return (
    <Grid container>
      <Grid item xs={5}>
        <CardDetail>
          <CardDetailTopper
            dangerouslySetInnerHTML={{
              __html: Item.Text1 + ' ' + '-' + ' ' + '  ' + Item.Text2
            }}
          ></CardDetailTopper>
        </CardDetail>
      </Grid>
      <Grid item xs={0.5} />
      <Grid item xs={1} sx={{ mt: '-10px' }}>
        <ArrowForwardIosIcon fontSize="small" />
      </Grid>
      <Grid item xs={5}>
        <CardDetail>
          <CardDetailTopper
            dangerouslySetInnerHTML={{
              __html: Item.Text3 + ' ' + '-' + ' ' + Item.Text4
            }}
          ></CardDetailTopper>
        </CardDetail>
      </Grid>
    </Grid>
  );
};

export default AttendanceCard;
