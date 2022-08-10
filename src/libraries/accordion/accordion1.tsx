import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { GetPTADetailsResult } from 'src/interfaces/Common/PTA';
import { Box, Container, Grow, Grid, List, useTheme } from '@mui/material';
import List1 from '../mainCard/List1';

Accordion1.propTypes = {
  Parent: PropTypes.array,
  Teacher: PropTypes.array,
  headingg: PropTypes.object
};

function Accordion1({ Parent, Teacher, headingg }) {
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [checked, setChecked] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const classes = Styles();

  const Data = Teacher.map((item, index) => {
    return {
      id: index,
      header: item.TeacherName,
      text1: item.TeacherDesignation,
      text2: '',
      backgroundColor: '#c8dccb',
      mx: '-30px'
    };
  });
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
                    mb: 1
                  }}
                >
                  <Typography sx={{ color: 'black' }}>
                    <b>{headingg.PTA_Member}</b>
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderRadius: 1,
                  
                    mb: 1
                  }}
                >
                  <List1 items={Data} />
                </AccordionDetails>
              </Accordion>
            </div>
          </Grow>

          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <div>
              <Accordion
                className={classes.background}
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
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
                    <b>{headingg.PTA}</b>
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    borderRadius: 1,
                 
                    mb: 1
                  }}
                >
                  {Parent.map((items: GetPTADetailsResult, i) => {
                    return (
                      <List
                        key={i}
                        className={classes.color2}
                        sx={{
                          boxShadow: '6px 6px 8px  gray !important',
                          borderColor: '#1E656D',
                          borderRadius: 1,
                          mb: 1,
                          mt: 1,
                          color: 'black',
                          background: '#c8dccb'
                        }}
                      >
                        <Grid>
                          <Box className={classes.root2}>
                            <Grid item xs={6} sx={{ maxWidth: '100%' }}>
                              <Typography className={classes.Listfont1}>
                                {items.ParentName}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.gridend}>
                              <Typography className={classes.Listfont2}>
                                {items.Class}
                              </Typography>
                            </Grid>
                          </Box>
                          <Box className={classes.root2}>
                            <Grid item xs={6} className={classes.gridstart}>
                              <Typography className={classes.Listfont2}>
                                {items.ParentDesignation}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.gridend}>
                              <Typography className={classes.Listfont2}>
                                {items.MobileNumber1}&nbsp;
                                {items.MobileNumber2}
                              </Typography>
                            </Grid>
                          </Box>
                        </Grid>
                      </List>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </div>
          </Grow>
        </Container>
      </Grid>
    </>
  );
}
export default Accordion1;
function useStyles() {
  throw new Error('Function not implemented.');
}
