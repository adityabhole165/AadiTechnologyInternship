import { Box, Grid, List, Typography,Container,useTheme,Grow, Checkbox } from "@mui/material"
import PropTypes from 'prop-types';
import { useState,useEffect } from "react";

import { makeStyles } from '@mui/styles';
import {Styles} from 'src/assets/style/student-style'

List14.PropTypes={
    RollNumber: PropTypes.number,
    StudentName: PropTypes.string,
    getAttendance:PropTypes.array,
    present:PropTypes.string,
    date:PropTypes.string,
    assigne:PropTypes.string

}

function List14({RollNumber,StudentName,getAttendance,present,date,assigne}){
    const classes = Styles();
    const theme = useTheme();
    const [users, setUsers] = useState([]);
    const[checked,setChecked]=useState(false);    
    

    const handleChange = (event)=>{
        setChecked(event.target.checked)
    }
    // useEffect(() =>{
    //   setUsers()
    // },[])
    const useStyles = makeStyles({
      root:{
      background: "#f33737"
      },
      roo1 : {
        background : `${theme.colors.gradients.pink1}`
      },
      roo2:{
        background:'#00b8d4'

      }
    }); 

    const clas = useStyles();
    const JoinDate=new Date(date)
    const RecordDate=new Date(assigne)
  
  
    return(
        <>
        
        {<Container>
        
        <List className={" " +(  JoinDate > RecordDate ? clas.roo2: present === "false" ? clas.root :  clas.roo1)} 
              sx={{
                justifyContent:'center',
                borderRadius: "6px !important",
                marginBottom: "8px !important",
                boxShadow: "6px 4px 5px grey !important",
              }}>
              <Box>
                
              <Grid container >         
                 
               
                  <Grid item xs={10}>
                
                   <Grid xs={12}>
                  <Grid container>
                    <Grid xs={10}>
                   
                    <Typography className={classes.Listfont1}>
                      {RollNumber}
                    </Typography>
                    </Grid>     
                    
                  </Grid>
                 
        
                    <Grid container>
                      <Grid xs={3}>
                          <Typography>
                            
                          </Typography>
                      </Grid>
        
                      <Grid xs={9} sx={{mt:"-18px"}}>
                        <Typography className={classes.Listfont2} >
                          {StudentName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  
              
                  </Grid>
                  <Grid container>
                  <Grid xs={9}>
        
                  </Grid>
        
        
                  </Grid>
               </Grid>
              </Box>
            </List>
         
        </Container>
}        </>
            )
     }
export default List14