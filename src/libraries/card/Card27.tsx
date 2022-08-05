import { useTheme, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Container, Card } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import Card16 from 'src/libraries/card/Card16';

Card27.propTypes = {
  FeesType: PropTypes.string,
  Fee: PropTypes?.array,
  Heading: PropTypes?.object,
  Note: PropTypes?.string
};

function Card27({ FeesType, Fee, Heading, Note }) {
  const theme = useTheme();
  const classes = Styles();
  const Summery: any = useSelector((state: RootState) => state.Fees.FeesData2);

  console.log({ Fee });

  return (
    <>
      <Container sx={{ mt: 1, pb: '5px', pl: '-8px' }}>
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
              <b>{FeesType}</b>
            </Typography>
          </AccordionSummary>
          {FeesType == 'Payable Fees' ? (
            <AccordionDetails
              sx={{
                borderRadius: 1,
                borderBottom: 2,
                mb: 1,
                backgroundColor: '#5c5f628a'
              }}
            >
              <Card16 Fee={Fee} Heading={Heading} Note={Note} />
            </AccordionDetails>
          ) : Fee !== undefined ? (
            Fee.map((item, i) => {
              return item.AmountPayable == 0 ? (
                <Card
                  sx={{
                    background: `${theme.colors.gradients.pink1}`,
                    marginTop: '0.3rem'
                  }}
                  key={i}
                >
                  <Grid container direction="row">
                    <Grid
                      xs={9}
                      sx={{
                        borderRight: 1,
                        borderRadius: 1,
                        border: 'none'
                      }}
                    >
                      <Typography
                        component="div"
                        variant="h5"
                        sx={{ pl: 2, pt: 1, pb: 1, textAlign: 'start' }}
                      >
                        Hello5
                      </Typography>
                    </Grid>
                    <Grid xs={3}>
                      <Typography
                        component="div"
                        variant="h5"
                        sx={{ pt: 1, textAlign: 'center' }}
                      >
                        {item.Amount}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              ) : null;
            })
          ) : 
          (
            null
          )}
        </Accordion>
      </Container>
    </>
  );
}

export default Card27;
