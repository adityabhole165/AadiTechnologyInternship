import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Container, Grid, Grow, List, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';

Accordion5.propTypes = {
  Title: PropTypes.string,
  Datee: PropTypes.string,
  username: PropTypes.string,
  desig: PropTypes.string,
  parents: PropTypes.string
};

function Accordion5({ Title, Datee, username, desig, parents }) {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [checked, setChecked] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const classes = Styles();
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/extended-sidebar/student/Library');
  };
  return (
    <>
      <Grid item xs={12} container>
        <Container>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <div>
              <Accordion
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
                    mb: 1,
                    color: 'black',
                    fontWeight: 'bold'
                  }}
                >
                  Book Title :{Title}
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
                    <Grid>
                      <Box className={classes.root2}>
                        <Grid item xs={3} sx={{ maxWidth: '100%' }}>
                          <Typography className={classes.Listfont1}>
                            Username:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography className={classes.Listfont2}>
                            {username}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box className={classes.root2}>
                        <Grid item xs={3} sx={{ maxWidth: '100%' }}>
                          <Typography className={classes.Listfont1}>
                            Class:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography className={classes.Listfont2}>
                            {desig}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box className={classes.root2}>
                        <Grid item xs={3} sx={{ maxWidth: '100%' }}>
                          <Typography className={classes.Listfont1}>
                            Date:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography className={classes.Listfont2}>
                            {Datee}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box className={classes.root2}>
                        <Grid item xs={3} sx={{ maxWidth: '100%' }}>
                          <Typography className={classes.Listfont1}>
                            Claimed by Parent:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography
                            className={
                              parents === true ? classes.color2 : classes.color1
                            }
                          >
                            {parents === true ? 'Yes' : 'No'}
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                  </List>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grow>
        </Container>
      </Grid>
    </>
  );
}
export default Accordion5;
