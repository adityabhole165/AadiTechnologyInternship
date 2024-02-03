import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Container,
  Grid,
  Grow,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import { IHomeworkResponse } from 'src/interfaces/Student/Homework';

Accordion2.propTypes = {
  subject: PropTypes.string,
  Data: PropTypes.array,
  Data2: PropTypes.array,
  close: PropTypes.any,
  index: PropTypes.any,
  expand: PropTypes.any
};

function Accordion2({ subject, Data, Close, index, expand }) {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();

  return (
    <div style={{ marginTop: 6 }}>
      <Container>
        <Grow
          in={checked}
          style={{ transformOrigin: '1 1 1' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Accordion
            className={classes.background}
            expanded={expand === index}
            onChange={Close(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: 'black' }} />}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                color: 'white',
                mb: 0.3,
                boxShadow: '6px 4px 8px  gray !important'
              }}
              className={classes.ListStyle}
            >
              <Typography sx={{ color: 'black' }}>
                <b>{subject}</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                borderRadius: 1
              }}
            >
              {Data?.map((list: IHomeworkResponse, i) => {
                if (list.SubjectName === subject)
                  return (
                    <>
                      <Card
                        sx={{
                          display: 'flex',
                          background: '#c8dccb',
                          mt: 1
                        }}
                      >
                        <Grid container direction="row">
                          <Grid
                            xs={6}
                            sx={{
                              background: '#DA70D6',
                              borderRight: 1,
                              border: 'none'
                            }}
                          >
                            <CardContent
                              sx={{ flex: '1 0 auto', color: 'black' }}
                            >
                              <Typography
                                component="div"
                                variant="h5"
                                sx={{ textAlign: 'center' }}
                              >
                                {list.CompleteByDate}
                              </Typography>
                            </CardContent>
                          </Grid>
                          <Grid xs={6}>
                            <CardContent
                              sx={{ color: 'black', background: '#e9a69a' }}
                            >
                              <RouterLink
                                key={i}
                                to={
                                  `/${
                                    location.pathname.split('/')[1]
                                  }/Student/viewHomework/` + list.Id
                                }
                                style={{
                                  color: 'blue',
                                  textDecoration: 'none'
                                }}
                              >
                                <Typography
                                  component="div"
                                  variant="h5"
                                  sx={{ textAlign: 'center' }}
                                >
                                  {list.SubjectName}
                                </Typography>
                              </RouterLink>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Card>
                    </>
                  );
              })}
            </AccordionDetails>
          </Accordion>
        </Grow>
      </Container>
    </div>
  );
}

export default Accordion2;
