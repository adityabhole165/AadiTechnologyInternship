import { Box, Grid, List, Typography,Container,useTheme,Grow, Checkbox } from "@mui/material"
import PropTypes from 'prop-types';
import { useState,useEffect } from "react";
import { Styles } from "src/assets/style/student-style";

List16.PropTypes={
    Class: PropTypes.string,
    Status: PropTypes.string,
    getAttendance:PropTypes.array
}

function List16({Class}){
    const classes = Styles();
    const theme = useTheme();
    const [users, setUsers] = useState([]);

    return(
      <>
      
      <Container >
      
      <List className={classes.ListStyle} 
            sx={{
              background: `${theme.colors.gradients.pink1}`,justifyContent:'center'
            }}>
            <Box >
              
            <Grid container >         
               
             
                <Grid item xs={10}>
              
                 <Grid xs={12}>
                <Grid container >
                  <Grid xs={10}>
                 
                  <Typography className={classes.Listfont1} >
                    {Class}
                    
                  </Typography>
                  </Grid>     
                  
                </Grid>
               
      
                  <Grid container>
                    <Grid xs={3}>
                        <Typography>
                          
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
      </>
          )
}
export default List16 ;