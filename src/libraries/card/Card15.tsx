import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, Container, Grid, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Styles } from 'src/assets/style/student-style';
import { RootState } from 'src/store';

Card15.propTypes = {
  FeeAmount: PropTypes.object
};

function Card15({ FeeAmount }) {
  const theme = useTheme();
  const classes = Styles();
  const Summery: any = useSelector((state: RootState) => state.Fees.FeesData2);

  return (
    <>
      <Container sx={{ mt: 1, mb: 5, pb: '5px', pl: '-8px' }}>
        <Accordion className={classes.background}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            sx={{
              background: `${theme.colors.gradients.pink1}`,
              color: 'white',
              boxShadow: '6px 6px 8px  gray !important'
            }}
            className={classes.ListStyle}
          >
            <Typography sx={{ color: 'black' }}>
              <b>Summary & Amount </b>
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              borderRadius: 1,
              borderBottom: 2,
              mb: 1,
              backgroundColor: '#5c5f628a'
            }}
          >
            <Card
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                marginTop: '0.5rem'
              }}
            >
              <Grid container direction="row">
                <Grid
                  xs={9}
                  sx={{ borderRight: 1, borderRadius: 1, border: 'none' }}
                >
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ pl: 2, pt: 1, pb: 1, textAlign: 'start' }}
                  >
                    {FeeAmount.Sum1}
                  </Typography>
                </Grid>
                <Grid xs={3}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ pt: 1, textAlign: 'center' }}
                  >
                    {Summery.TotalFeesPaid}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            <Card sx={{ background: '#f48fb1', marginTop: '0.3rem' }}>
              <Grid container direction="row">
                <Grid
                  xs={9}
                  sx={{ borderRight: 1, borderRadius: 1, border: 'none' }}
                >
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ pl: 2, pt: 1, pb: 1, textAlign: 'start' }}
                  >
                    {FeeAmount.Sum2}
                  </Typography>
                </Grid>
                <Grid xs={3}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ pt: 1, textAlign: 'center' }}
                  >
                    {Summery.FeesTobePaid}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            <Card
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                marginTop: '0.3rem'
              }}
            >
              <Grid container direction="row">
                <Grid
                  xs={9}
                  sx={{ borderRight: 1, borderRadius: 1, border: 'none' }}
                >
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ pl: 2, pt: 1, pb: 1, textAlign: 'start' }}
                  >
                    {FeeAmount.Sum3}
                  </Typography>
                </Grid>
                <Grid xs={3}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ pt: 1, textAlign: 'center' }}
                  >
                    {Summery.TotalLateFee}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            <Card
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                marginTop: '0.3rem'
              }}
            >
              <Grid container direction="row">
                <Grid
                  xs={9}
                  sx={{ borderRight: 1, borderRadius: 1, border: 'none' }}
                >
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ pl: 2, pt: 1, pb: 1, textAlign: 'start' }}
                  >
                    {FeeAmount.Sum4}
                  </Typography>
                </Grid>
                <Grid xs={3}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ pt: 1, textAlign: 'center' }}
                  >
                    {Summery.TotalFee}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}

export default Card15;
