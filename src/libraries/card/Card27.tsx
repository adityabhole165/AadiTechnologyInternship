import { useTheme, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Container, Card } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card16 from 'src/libraries/card/Card16';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

Card27.propTypes = {
  FeesType: PropTypes.string,
  Fee: PropTypes?.array,
  Heading: PropTypes?.object,
  Note: PropTypes?.string
};

function Card27({ FeesType, Fee, Heading, Note }) {
  const theme = useTheme();
  const classes = Styles();

  const FeesObject: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );

  return (
    <>
      <Container sx={{ pl: '-8px',pb: '5px', }}>
        <Accordion  className={classes.ListStyle1}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            sx={{
              background: `${theme.colors.gradients.pink1}`,
            
            }}
            className={classes.ListStyle1}
          >
            <Typography sx={{ color: 'black' }}>
              <b>{FeesType}</b>
            </Typography>
          </AccordionSummary>
          {FeesType == 'Paid Fees' ? (
            <AccordionDetails
              sx={{
                borderRadius: 1,
                mb: 1,
                
              }}
            >
              {FeesObject == undefined ? null : FeesObject.TotalFeesPaid ==
                0 ? (
                <ErrorMessages Error={'No fees has been paid'} />
              ) : Fee == undefined ? null : (
                Fee.map((item, i) => {
                  return item.AmountPayable == 0 ? (
                    <Card
                      sx={{
                        background: `${theme.colors.gradients.pink1}`,
                        marginTop: '0.3rem',
                      }}
                      key={i}
                    >
                      <Grid container direction="row">
                        <Grid
                          xs={8}
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
                            {item.OriginalFeeType}
                          </Typography>
                        </Grid>
                        <Grid xs={2}>
                          <Typography
                            component="div"
                            variant="h5"
                            sx={{ pt: 1, textAlign: 'center' }}
                          >
                            {item.Amount}
                          </Typography>
                        </Grid>
                        <Grid
                          xs={2}
                          sx={{
                            borderRight: 1,
                            borderRadius: 1,
                            border: 'none'
                          }}
                        >
                          <Typography
                            component="div"
                            variant="h5"
                            sx={{ pl: 2, pt: '3px', pb: 1, textAlign: 'start' }}
                          >
                            <FileDownloadOutlinedIcon />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  ) : null;
                })
              )}
            </AccordionDetails>
          ) : (
            <AccordionDetails
              sx={{
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Card16
                Fee={Fee}
                Heading={Heading}
                Note={Note}
                FeesTypes={FeesType}
              />
            </AccordionDetails>
          )}
        </Accordion>
      </Container>
    </>
  );
}

export default Card27;
