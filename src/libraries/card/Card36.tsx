
import { Divider, Grid, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { AccordianHeader, Header1, Header2 } from '../styled/AccordianStyled';
import { Box } from '@mui/system';

const Card36 = ({ Id, Name, expand, isActive, Rank, Percentage, Rollno, Presentdays }) => {
  let isThirdAbove = false
  if (Rollno.toString() === sessionStorage.getItem('RollNo')) {
    const arr = ["1", "2", "3"]
    arr.map((item) => {
      if (Rank.indexOf(item) > 0)
        isThirdAbove = true;
    })
  }
  else
    isThirdAbove = true

  const theme = useTheme();
  return (
    <AccordianHeader onClick={() => expand(Id)} >
      <Grid container>
      {isThirdAbove &&
        <Grid item xs={1}>
          <img src={localStorage.getItem('SiteURL') + '/' + Rank.replace('~/', '')} width={25} height={30} />
          </Grid>
        }
   
        <Grid item xs={9}>
       <Header1 color={isActive ? 'secondary' : ''}>{Rollno + "." + " "+ " "} {Name} </Header1>
        </Grid>
        <Grid item xs={1} sx={{ml:'20px'}}>
        {isActive ?
          <ExpandLessIcon /> :
          <ExpandMoreIcon />}
          </Grid>
    
          <Grid item xs={1.5}/>
        <Grid item xs={5}>
         <Box sx={{mr:"5px"}} fontSize={'12px'}><b> Present days:</b> {Presentdays}</Box> 
          
        </Grid>
        <Grid item xs={5} sx={{float:"right",fontSize:'12px'}}>
          <b>Percentage:</b> {Percentage + "%"}
          </Grid>
      

      </Grid>



    </AccordianHeader>
  );
};
export default Card36;