import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Grid, List, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Styles } from 'src/assets/style/student-style';
import {
  MarkInformation,
  OnlineExams,
  Subjects
} from 'src/interfaces/Student/OnlineExamProgressReport';

Accordion6.propTypes = {
  Student: PropTypes.array,
  OnlineExams: PropTypes.array,
  MarkInformation: PropTypes.array,
  Subject: PropTypes.array,
  Marks: PropTypes.number,
  Id: PropTypes.number
};

function Accordion6({ OnlineExams, MarkInformation, Subject }) {
  const theme = useTheme();
  var sum = 0;
  var TotalMarks = 0;
  var Percentage = 0;

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = Styles();
  return (
    <>
      <Grid item xs={12} container>
        <Container>
          {OnlineExams.map((items: OnlineExams, i) => {
            return (
              <Accordion
                key={i}
                className={classes.background}
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    background: `${theme.colors.gradients.pink1}`,
                    boxShadow: '6px 6px 8px  gray !important',
                    mb: 1
                  }}
                >
                  <Typography sx={{ color: 'black' }}>
                    <b>{items.Name}</b>
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderRadius: 1,
                    borderBottom: 2,
                    backgroundColor: '#5c5f628a',
                    mb: 1
                  }}
                >
                  <List
                    sx={{
                      boxShadow: '6px 6px 8px  gray !important',
                      borderColor: '#1E656D',
                      borderRadius: 1,
                      mb: 1,
                      mt: 1,
                      color: 'black',
                      backgroundColor: 'white'
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      sx={{ maxWidth: '100%', mb: 1, flexDirection: 'row' }}
                    >
                      <Typography className={classes.Listfont1}>
                        {Subject.map((items: Subjects, i) => {
                          return (
                            <div key={i}>
                              {items.Name}
                              <Typography>Total</Typography>
                              <Typography>Percentage</Typography>

                              {MarkInformation.map(
                                (items: MarkInformation, i) => (
                                  <Grid
                                    key={i}
                                    xs={6}
                                    sx={{
                                      maxWidth: '100%',
                                      mb: 1,
                                      flexDirection: 'row',
                                      marginLeft: '15rem',
                                      marginTop: '-3.8rem',
                                      textAlign: 'end'
                                    }}
                                  >
                                    {items.Marks}/{items.OutOfMarks}
                                    <div>
                                      {(sum = sum + items.Marks)}/
                                      {
                                        (TotalMarks =
                                          TotalMarks + items.OutOfMarks)
                                      }
                                    </div>
                                    <div>
                                      {((sum / TotalMarks) * 100).toFixed(2)}
                                    </div>
                                  </Grid>
                                )
                              )}
                            </div>
                          );
                        })}
                        <br />
                      </Typography>
                    </Grid>
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Container>
      </Grid>
    </>
  );
}
export default Accordion6;
