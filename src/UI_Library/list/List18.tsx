import {
  Box,
  Typography,
  useTheme,
  List,
  Container,
  Grow,
  Grid
} from '@mui/material';
import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {Styles} from 'src/assets/style/student-style'
import ScheduleIcon from '@mui/icons-material/Schedule';


List18.propTypes = {
  Subject: PropTypes.string,
  DisplayText: PropTypes.string,
  Date: PropTypes.string,
  Time: PropTypes.string,
  Index:PropTypes.any,
  ScheduledSMSList:PropTypes.array,
}

function List18({ Subject, ScheduledSMSList,DisplayText, Date:date ,Time, Index}) {

  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();

  const CurrentDate = new Date();

  const DateTomorrow = new Date(CurrentDate);

  const CurrentDay = String(CurrentDate.getDate()).padStart(2, '0');
  const CurrentMonth = CurrentDate.toLocaleString('en-US', {month: 'short'});
  const CurrentDateInStringFormat = CurrentDay + " " + CurrentMonth;
  

  return (
    <>
      <Container>
      <Grow
            in={checked}
            style={{ transformOrigin: '0 0 1' }}
            {...(checked ? { timeout: 1500 } : {})}
          > 
        <List  className={" " +( Index === 0 ? classes.colorpta1 : classes.colorpta2)}
          sx={{ 
            padding : '8px' ,
            borderRadius:'10px',
            marginBottom:"10px",
            background: ((date == CurrentDateInStringFormat)  ) ? null : `${theme.colors.gradients.pink1}`,
          }}>
          
          <Box>
            <Box display="flex" alignItems="center">
              <Typography 
              className={classes.Listfont1}
              >
                {Subject}
              </Typography>
            </Box>
          </Box>

         
          <Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
            <Grid container>
              <Grid xs={8} item>
                  <Typography sx={{mt:"2px"}} className={classes.Listfont2}>
                    {DisplayText}
                  </Typography>
                  </Grid>
                  <Grid xs={4} item justifyContent="flex-end">
                  <Typography  className={classes.Listfont2}>
                  {((date == CurrentDateInStringFormat)  ) ? <ScheduleIcon sx={{ml:"-40px",mb:"-5px",mr:"18px",height:"18px"}}/> : null}
                    {Time}{" "}{date}{"  "}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            
          </Box>  
        </List>
        </Grow>
      </Container>
    </>
  );
}

export default List18;