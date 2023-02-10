import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { Box, Container, Grow, Grid, List, useTheme , makeStyles, Dialog, Button} from '@mui/material';
import {CardDetail1,CardDetail3,ListStyle,CardWrapper} from '../styled/CardStyle';
import { Accordionsummary1, Header3, HeaderAcc } from '../styled/AccordianStyled';
import Card14 from '../mainCard/Card14';
import { ButtonPrimary } from '../styled/ButtonStyle';

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
  conformMsg,
  no,
  index,
  Collapse, expand
}) {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const classes = Styles();
  const [open, setOpen] = React.useState(false);
  const clickDialogOpen = () => {
    setOpen(true);
  };
  const clickDialogClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Grow
      in={checked}
      style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 1000 } : {})}
      >
      <Accordion
        className={classes.background}
        expanded={expand === index}
        onChange={Collapse(index)}
        elevation={0}
        disableGutters sx={{mb:"10px"}}
      >
        <Accordionsummary1
          expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{background: `${theme.colors.gradients.pink1}`}} >
         <HeaderAcc  color={expand === index ? 'secondary' : ''}>
      
         <b>Book Title</b>  : {title}
         <Box sx={{display:"flex"}}>
       
         <b>Available</b> : ({available}/{total})
        <Typography  onClick={clickDialogOpen} sx={{color:"#628def",ml:"70px"}}> Claim </Typography>
         <Dialog
          open={open}
          onClose={clickDialogClose}
          PaperProps={{ sx: { position: 'fixed', top: 190, m: 0 ,p:1} }}
        >
          <Typography>Do you want to claim this book for -- </Typography>
         <Box px={2} pt={1}>
         <Grid container>
            <Grid item xs={6}>
            <ButtonPrimary > Student</ButtonPrimary>
            </Grid>
            <Grid item xs={6}>
            <ButtonPrimary> Parent</ButtonPrimary>
            </Grid>
          </Grid>
          
          </Box> 
        
    
   
      </Dialog>
         </Box>   
       </HeaderAcc >
       </Accordionsummary1>
       <AccordionDetails>
      <Card14 Text1={author} Text2={publisher} 
      Text3={standard} Text4={language} Text5={available} Text6={total} conformMsg={conformMsg}/>
      </AccordionDetails>
      </Accordion>
           
          </Grow>
       
     
    </>
  );
}
export default Accordion4;
