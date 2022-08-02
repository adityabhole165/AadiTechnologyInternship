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
  import { makeStyles } from '@mui/styles';
  import {Styles} from 'src/assets/style/student-style';
  import { useParams } from 'react-router-dom';
  import moment from 'moment';
  import { useSelector } from "react-redux";
  import { RootState } from "src/store";


  List17.propTypes = {
    Name: PropTypes.string,
    BirthDate: PropTypes.string,
    list :PropTypes.string,
    setAssignedMonth: PropTypes.string,
    SetassignedMonth_num : PropTypes.string,
    setCurrentDate : PropTypes.string,

  }

  
  function List17({ Name, BirthDate}) {
  
    const [checked, setChecked] = useState(true);
    const theme = useTheme();
    const classes = Styles();
    const { assignedDate } = useParams();
    const [birthDate,SetBirthDate] = useState([]);
   
   
    const staffBirthdayList = useSelector((state:RootState)=>state.staffBirthday.staffBirthdayData)
    
    staffBirthdayList.map((item:any,i)=>{
      birthDate.push(item.BirthDate)
    })

    const presentDate = moment().format("DD MMM")
   
    const datesToBeChecked:any = birthDate
    const dateToCheckFor = presentDate;

    let nearestDate;
    
    datesToBeChecked.map(date => {
      let diff = moment(date).diff(moment(dateToCheckFor), 'days');
      
      if (diff > 0) {
        if (nearestDate) {
          if (moment(date).diff(moment(nearestDate), 'days') < 2) {
            nearestDate = date;
          }
        } else {
          nearestDate = date;
        }
      }
    });

    // console.log("nearest",nearestDate);


const useStyles = makeStyles({
      root:{
      background: '#e9a69a'
      },
      roo1 : {
        background : `${theme.colors.gradients.pink1}`
      }
    }); 
    const clas = useStyles();
    
    
    return (
      <>
        <Container>
         <Grow
            in={checked}
            style={{ transformOrigin: '0 0 1' }}
            {...(checked ? { timeout: 1500 } : {})}
          >  
          <List sx={{ background: BirthDate == presentDate  ? "#e9a69a" : `${theme.colors.gradients.pink1}`,
                mb: 1,
                boxShadow : "8px 4px 5px grey !important",
                borderRadius: 1}}>
            <Box
              sx={{
                mt: 1
              }}>
               
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
              <Grid container>
                
              <Grid xs={8} item>
                <Typography className={classes.Listfont2}>
                  {Name}
                </Typography>
                </Grid>
                <Grid xs={4} item justifyContent="flex-end">
                <Typography sx={{ml:"70px"}} className={classes.Listfont2}>
                  {BirthDate}
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
  
  export default List17;
  