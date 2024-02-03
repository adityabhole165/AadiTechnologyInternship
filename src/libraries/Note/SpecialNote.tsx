import { Grid, Typography } from '@mui/material';

const SpecialNote = () => {
  return (
    <>
      <Typography sx={{ textDecorationLine: 'underline', mb: '10px' }}>
        <b>NEFT Details For Fee Payment</b>
      </Typography>
      <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid xs={2}>
          <Typography>Name:</Typography>
          <Typography>A/c No:</Typography>
          <Typography>Bank Name:</Typography>
          <Typography>Branch:</Typography>
        </Grid>
        <Grid xs={10} sx={{ mb: '10px' }}>
          <Typography>
            <b>PAWAR PUBLIC SCHOOL, HINJEWADI</b>
          </Typography>
          <Typography>
            <b>912010033385065</b>
          </Typography>
          <Typography>
            <b>Axis Bank Ltd.</b>
          </Typography>
          <Typography>
            <b>Hinjewadi</b>
          </Typography>
          <Typography>
            <b>UTIB0001034</b>
          </Typography>
        </Grid>

        <Typography>
          <b>
            Note: Mail the screen shot of successful payment and Transaction
            details to rohit.bhosale@ppshinjewadi.com /
            accountsofficer@ppshinjewadi.com
          </b>
        </Typography>
      </Grid>
    </>
  );
};

export default SpecialNote;
