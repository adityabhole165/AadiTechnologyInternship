import React from "react";
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style'
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  Container, CardHeader,useTheme, Box, Grid, List, Typography, Accordion, AccordionDetails, AccordionSummary, Grow} from "@mui/material";

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
		const NewDateFormat = `${Day}/${Month}/${Year}`;
   console.log(issue.slice(9,-6))

   const returndate = new Date(returnn);
   const Days = returndate.getDate();
   const Months = returndate.toLocaleString("default", { month: 'short'});
   const Years = returndate.getFullYear();
   const NewDateFormats = `${Days}/${Months}/${Years}`;
  console.log(issue.slice(9,-6))


    return (
        <>
       
           <Grid item xs={12} container>
        <Container >
          <Grow in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}>
            <div>
              <Accordion className={classes.background} expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
              >

                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    background: `${theme.colors.gradients.pink1}`,
                    boxShadow: "6px 6px 8px  gray !important",
                    fontWeight:"bold",
                    color: "black",
                    mb: 1
                  }} >
                   Accession No : {Acc}<br/>
                  
                  Book Title : {title}
                </AccordionSummary>

                <AccordionDetails sx={{ borderRadius: 1, borderBottom: 2, backgroundColor: "#5c5f628a", mb: 1 }}>

                  <List

                    sx={{
                      boxShadow: "6px 6px 8px  gray !important",
                      borderColor: "#1E656D",
                      borderRadius: 1,
                      mb: 1,
                      mt: 1,
                      color: 'black',
                      backgroundColor:"white"
                    }}
                  >
                    <Grid >
                              <Box
                                className={classes.root2}>
                                <Grid
                                  item xs={3}
                                  sx={{ maxWidth: '100%' }} >
                                  <Typography  className={classes.Listfont1} >
                                  Issue Date:
                                  </Typography>
                                </Grid>
                                <Grid item xs={9}
                                  className={classes.gridstart}>
                                  <Typography className={classes.Listfont2}>
                                  {NewDateFormat} {issue.slice(9,-6)} {issue.slice(18)}
                                  </Typography>
                                </Grid>
                              </Box>
                              <Box className={classes.root2}>
                                <Grid item xs={3}
                                  className={classes.gridstart}>
                                  <Typography className={classes.Listfont1}>
                                  Return Date:
                                  </Typography>
                                </Grid>
                                <Grid item xs={9}
                                  className={classes.gridstart}>
                                  <Typography className={classes.Listfont2}>
                                  {NewDateFormats}  {returnn.slice(9,-6)} {returnn.slice(18)}
                                  </Typography>
                                </Grid>
                              </Box>
                              <Box
                                className={classes.root2}>
                                <Grid
                                  item xs={3}
                                  sx={{ maxWidth: '100%' }} >
                                  <Typography  className={classes.Listfont1} >
                                  Issued To Parent?:
                                  </Typography>
                                </Grid>
                                <Grid item xs={9}
                                  className={classes.gridstart}>
                                  <Typography className={(parentissue === true ? classes.color2 : classes.color1)}>
                                 {parentissue === true ? "Yes" : "No"}
                                  </Typography>
                                </Grid>
                             </Box>
                            </Grid>
                  </List>
                </AccordionDetails>
              </Accordion >
            </div>
          </Grow>
        </Container>
      </Grid>
        </>

    );
}

export default List9;