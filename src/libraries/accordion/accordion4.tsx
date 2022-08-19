import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { Box, Container, Grow, Grid, List, useTheme } from '@mui/material';

Accordion4.propTypes = {
  Bookk: PropTypes.array,
  author: PropTypes.string,
  publisher: PropTypes.string,
  standard: PropTypes.string,
  language: PropTypes.string,
  available: PropTypes.number,
  total: PropTypes.number,
  title: PropTypes.string,
  no: PropTypes.string
};

function Accordion4({
  Bookk,
  author,
  publisher,
  standard,
  language,
  available,
  total,
  title,
  no
}) {
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [checked, setChecked] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = Styles();
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
                  Accession No : {no}
                  <br />
                  Book Title : {title}
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderRadius: 1,
                    
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
                            Author:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography className={classes.Listfont2}>
                            {author}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box className={classes.root2}>
                        <Grid item xs={3} className={classes.gridstart}>
                          <Typography className={classes.Listfont1}>
                            Publisher:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography className={classes.Listfont2}>
                            {publisher}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box className={classes.root2}>
                        <Grid item xs={3} sx={{ maxWidth: '100%' }}>
                          <Typography className={classes.Listfont1}>
                            Standards:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography className={classes.Listfont2}>
                            {standard}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box className={classes.root2}>
                        <Grid item xs={3} className={classes.gridstart}>
                          <Typography className={classes.Listfont1}>
                            Language:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography className={classes.Listfont2}>
                            {language}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box className={classes.root2}>
                        <Grid item xs={3} sx={{ maxWidth: '100%' }}>
                          <Typography className={classes.Listfont1}>
                            Available:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography className={classes.Listfont2}>
                            {available}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box className={classes.root2}>
                        <Grid item xs={3} className={classes.gridstart}>
                          <Typography className={classes.Listfont1}>
                            Total:
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.gridstart}>
                          <Typography className={classes.Listfont2}>
                            {total}
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
export default Accordion4;
