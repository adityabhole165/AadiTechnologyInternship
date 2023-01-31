import React from "react";
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style'
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  Container, CardHeader,useTheme, Box, Grid, List, Typography, Accordion, AccordionDetails, AccordionSummary, Grow} from "@mui/material";
import Card10 from "../mainCard/Card10";
import { Accordionsummary, Accordionsummary1, Header1, Header2, Header3 } from "../styled/AccordianStyled";
import Card13 from "../mainCard/Card13";

List9.propTypes = {
    Title: PropTypes.object,
    Acc:PropTypes.string,
    title:PropTypes.string,
    issue:PropTypes.string,
    returnn:PropTypes.string,
    parentissue:PropTypes.string,
}

function List9({Title,Acc,title,issue,returnn,parentissue}) {
    const classes = Styles();
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState<string | false>(false);
  const [checked, setChecked] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
const issuedate = new Date(issue);
		const Day = issuedate.getDate();
		const Month = issuedate.toLocaleString("default", { month: 'short'});
		const Year = issuedate.getFullYear();
		const NewDateFormat = `${Day} ${Month} ${Year}`;

   const returndate = new Date(returnn);
   const Days = returndate.getDate();
   const Months = returndate.toLocaleString("default", { month: 'short'});
   const Years = returndate.getFullYear();
   const NewDateFormats = `${Days} ${Months} ${Years}`;


    return (
        <>
    
        <Container >
        <Grow in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}>

        <Accordion
        className={classes.background}
        expanded={expanded === 'panel'}
        onChange={handleChange('panel')}
        elevation={0}
        disableGutters
      >
        <Accordionsummary1
          expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{background: `${theme.colors.gradients.pink1}`}} >
         <Header3 variant="body2" color={expanded === 'panel' ? 'secondary' : ''}>
         <b style={{fontSize:"14px"}}>Accession No : {Acc}</b> <br/>
          Book Title : {title}
          </Header3 >
       </Accordionsummary1>
       <AccordionDetails>
       <Card13 Text1={NewDateFormat}  Text2={ NewDateFormats} Text3={parentissue}/>
          </AccordionDetails>
        </Accordion>

          </Grow>
        </Container>
    
        </>

    );
}

export default List9;