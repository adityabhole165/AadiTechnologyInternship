import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, Container, Grid, ListItem, ListItemText } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Styles } from 'src/assets/style/student-style';
import { AdditionalLecture } from 'src/interfaces/Student/Tmtimetable';

Accordion7.propTypes = {
  Data: PropTypes.array,
  Days: PropTypes.array,
  additional: PropTypes.any,
  AddLectures: PropTypes.array
};

function Accordion7({ Data, additional, AddLectures }) {
  const classes = Styles();

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Container>
        <Accordion
          className={classes.background}
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            sx={{
              background: 'black',
              color: 'white',
              boxShadow: '6px 6px 8px  gray !important'
            }}
            className={classes.ListStyle}
          >
            <Typography sx={{ color: 'white' }}>
              <b>Additional Lectures</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderRadius: 1,
              borderBottom: 2,
              mb: 1
            }}
          >
            {/* {!additional == null ? (
              <>
                {AddLectures.map((list: AdditionalLecture, index) => (
                  <Card
                    key={index}
                    sx={{ backgroundColor: '#c8dccb', mb: 1, p: 1, mt: 1 }}
                  >
                    <Grid container item direction="row">
                      <Grid
                        sx={{ mt: '-10px' }}
                        item
                        xs={6}
                        style={{ display: 'flex' }}
                      >
                        <ListItem>
                          <ListItemText>Day: {list.Day}</ListItemText>
                        </ListItem>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          marginBottom: '-10px',
                          marginTop: '-20px'
                        }}
                      >
                        <ListItem>
                          <ListItemText>Subject: {list.Name}</ListItemText>
                        </ListItem>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          marginBottom: '-10px',
                          marginTop: '-20px'
                        }}
                      >
                        <ListItem>
                          <ListItemText>Class: {list.ClassName}</ListItemText>
                        </ListItem>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          marginBottom: '-10px',
                          marginTop: '-15px'
                        }}
                      >
                        <ListItem>
                          <ListItemText>Lecture: {list.Number}</ListItemText>
                        </ListItem>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
              </>
            ) : (
              <ErrorMessages Error={'No additional lectures are assigned'} />
            )} */}

            <>
              {AddLectures.map((list: AdditionalLecture, index) => (
                <Card
                  key={index}
                  sx={{ backgroundColor: '#c8dccb', mb: 1, p: 1, mt: 1 }}
                >
                  <Grid container item direction="row">
                    <Grid
                      sx={{ mt: '-10px' }}
                      item
                      xs={6}
                      style={{ display: 'flex' }}
                    >
                      <ListItem>
                        <ListItemText>Day: {list.Day}</ListItemText>
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginBottom: '-10px',
                        marginTop: '-20px'
                      }}
                    >
                      <ListItem>
                        <ListItemText>Subject: {list.Name}</ListItemText>
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginBottom: '-10px',
                        marginTop: '-20px'
                      }}
                    >
                      <ListItem>
                        <ListItemText>Class: {list.ClassName}</ListItemText>
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginBottom: '-10px',
                        marginTop: '-15px'
                      }}
                    >
                      <ListItem>
                        <ListItemText>Lecture: {list.Number}</ListItemText>
                      </ListItem>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}
export default Accordion7;
