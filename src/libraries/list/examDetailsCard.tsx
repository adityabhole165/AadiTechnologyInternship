import {
    Box,
    Typography,
    useTheme,
    List,
    Container,
    Grow,
    Divider
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
// import ShowMoreText from "react-show-more-text";
import ExpandLess from "@mui/material/Icon/Icon";
import ExpandMore from "@mui/material/Icon/Icon";
import { makeStyles } from '@mui/styles';
import {Link as RouterLink} from 'react-router-dom';


ExamDetails.propTypes = {
    StartDate: PropTypes.string,
    StartTime: PropTypes.string,
    EndTime: PropTypes.string,
    SubjectName: PropTypes.string,
}
function ExamDetails({ StartDate, StartTime, EndTime,Exam,SubjectName,EndDate }) {

    const [checked, setChecked] = useState(true);
    
    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            background: "#ff7961"
        },
        roo1: {
            background: `${theme.colors.gradients.pink1}`
        },
        testtypessx:{

            borderColor: '#223294',
            border: '1',  width: '5rem',
            height: '2rem',  paddingTop: '9px',
            paddingLeft: '22px', fontSize: 'inherit',
            fontWeight: 'bold',    borderRadius: '15px 2px',
            backgroundColor: 'whitesmoke',
            boxShadow:  '4px 1px 1px black',
            borderTop: '0px solid',  alignItems: 'center',

        },
        timesx:{
            display:"flex" ,
            flexDirection:"row",
             alignItems:"center" ,
             justifyContent:"space-between",
              marginTop:"-14px"

        },
       
    });

    const classes = Styles();
    const clas = useStyles();

    return (
        <>
            <Container>
                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 1' }}
                    {...(checked ? { timeout: 1500 } : {})}
                >
               <List
                        sx={{
                            boxShadow: "8px 4px 5px grey !important",
                            borderRadius: 1,
                            background: `${theme.colors.gradients.pink1}`,
                            mb: 1,
                          
                        }}>

                    <Box>
                        <Typography sx={{ marginBottom: '25px !important' ,  }} className={classes.Listfont1} >
                            <b>Exam : {Exam} </b>   
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            mt: 2
                        }}>
                        <Box className={clas.timesx}>
                            <Typography className={classes.Listfont2} sx={{marginTop:'-2px'}}>
                                Subject : {SubjectName}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            mt: 2
                        }}>
                        <Box className={clas.timesx}>
                            <Typography className={classes.Listfont2} sx={{marginTop:'-2px'}}>
                                Date/Time : {StartDate}-{StartTime} To {EndTime}
                            </Typography>
                        </Box>
                    </Box>
                </List>

            </Grow>

        </Container>

        </>

    )


}

export default ExamDetails;