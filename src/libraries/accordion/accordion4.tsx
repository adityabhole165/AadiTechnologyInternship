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
import {CardDetail1,CardDetail3,ListStyle,CardWrapper} from '../styled/CardStyle';
import { Accordionsummary1, Header3 } from '../styled/AccordianStyled';
import Card14 from '../mainCard/Card14';

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
    
 
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
        
        <Accordion
        className={classes.background}
        expanded={expanded === 'panel'}
        onChange={handleChange('panel')}
        elevation={0}
        disableGutters sx={{mb:"10px"}}
      >
        <Accordionsummary1
          expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{background: `${theme.colors.gradients.pink1}`}} >
         <Header3 variant="body2" color={expanded === 'panel' ? 'secondary' : ''}>
         <b style={{fontSize:"14px"}}>Accession No : {no} </b> <br/>
          Book Title : {title}
          </Header3 >
       </Accordionsummary1>
       <AccordionDetails>
      <Card14 Text1={author} Text2={publisher} 
      Text3={standard} Text4={language} Text5={available} Text6={total}/>
      </AccordionDetails>
      </Accordion>
           
          </Grow>
       
     
    </>
  );
}
export default Accordion4;
