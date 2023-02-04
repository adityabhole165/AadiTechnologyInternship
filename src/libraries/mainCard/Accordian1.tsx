import React,{ useState} from 'react'
import {  Container,useTheme,   Accordion, AccordionDetails, Grow} from "@mui/material";
import {  Accordionsummary1,  Header1,  Header2,  Header3 } from "../styled/AccordianStyled";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Styles } from 'src/assets/style/student-style'
import ClaimedCard from '../card/ClaimedCard';
import ClaimedCard2 from "../card/ClaimedCard2";
function Accordian1({expanded,handleChange,index,items,confirmsg}) {
    const [checked, setChecked] = useState(true);
    const classes = Styles();
    const theme = useTheme();
  return (
    <div>
    
    <Grow in={checked}
    style={{ transformOrigin: '0 0 0' }}
        {...(checked ? { timeout: 1000 } : {})}>
       <Accordion
        className={classes.background}
        expanded={expanded === index}
        onChange={handleChange(index)}
        elevation={0}
        disableGutters
      >
        <Accordionsummary1
          expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{background: `${theme.colors.gradients.pink1}`}} >
         <Header1  color={expanded === index ? 'secondary' : ''}>
          Book Title : {items.Book_Title}
          </Header1 >
       </Accordionsummary1>
       <AccordionDetails>
        {items.UserId ==  sessionStorage.getItem('Id') ? 
        (<ClaimedCard Text1={items.ReservationDate} Text2={items.IsForParent} confirmsg={confirmsg}/>): 
        (<ClaimedCard2 Text1={items.ReservationDate} Text2={items.IsForParent} Text3={items.UserName} Text4={items.Designation} Text5={items.ClassNameDesignation}/>)}
        </AccordionDetails>
        </Accordion>
        </Grow>
      
    </div>
  )
}

export default Accordian1
