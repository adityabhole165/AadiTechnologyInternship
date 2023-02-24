import { Grid, useTheme } from '@mui/material';
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
    <AccordianHeader onClick={() => expand(Id)}>
      {isThirdAbove &&
        <Box sx={{ mr: 0.8, mt: 0.8 }}>
          <img src={localStorage.getItem('SiteURL') + '/' + Rank.replace('~/', '')} width={25} height={35} />
        </Box>}
      <Grid container>
        <Grid item xs={12}>

          <Header1 color={isActive ? 'secondary' : ''}>{Rollno + ":"+ " "}{Name} </Header1>


        </Grid>

        <Grid item xs={6}>
          Present days: {Presentdays}
        </Grid>
        <Grid item xs={6}>
          Percentage: {Percentage + "%"}



        </Grid>

      </Grid>
      <Header2>
        {isActive ?
          <ExpandLessIcon /> :
          <ExpandMoreIcon />}
      </Header2>

    </AccordianHeader>
  );
};
export default Card36;
