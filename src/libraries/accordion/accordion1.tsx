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
import { Accordionsummary, Header1 } from '../styled/AccordianStyled';

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
      id: item.RealatedSection,
      header: item.TeacherName,
      text1: item.TeacherDesignation,
      text2: '',
      Color: item.RealatedSection === '2'?'warning':'',
      RelatedSection: item.RealatedSection === '2'?'2':'0',
    }
  });
  const Data1 = Parent.map((item, index) => {
    return {
      id: index,
      header: item.ParentName,
      text1: item.ParentDesignation,
      text2: item.MobileNumber1,
      text3: item.Class,
      backgroundColor: '',
   
    };
  });
  return (
    <>
   
       
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
                elevation={0}
          disableGutters
              >
                <Accordionsummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    background: `${theme.colors.gradients.pink1}`,
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                    mb: 1,
                    color: expanded === 'panel1'
                    ?  `${theme.colors.gradients.accordianHeadercolor}`
                    : ''
                  }}
                >
                    <b>{headingg.PTA_Member}</b>
                </Accordionsummary>

                <AccordionDetails
                  sx={{
                    borderRadius: 1,

                    mb: -1
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
                elevation={0}
          disableGutters
              >
                <Accordionsummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    background: `${theme.colors.gradients.pink1}`,
                  
                  }}
                >
                  <Header1
                    sx={{
                      color:expanded === 'panel2'
                        ?   `${theme.colors.gradients.accordianHeadercolor}`
                        : ''
                    }}
                  >
                    <b>{headingg.PTA}</b>
                  </Header1>
                </Accordionsummary>

                <AccordionDetails
                  sx={{
                    borderRadius: 1,

                    mb: -1
                  }}
                >
                  <List1 items={Data1} />
                </AccordionDetails>
              </Accordion>
            </div>
          </Grow>
    
   
    </>
  );
}
export default Accordion1;
function useStyles() {
  throw new Error('Function not implemented.');
}
