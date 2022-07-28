import React,{useState} from 'react';
import {
    
    useTheme,
    List,
    Grid,
    Box,
    Grow
  } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Container, ListItem, ListItemText, Card } from '@mui/material';

//import { Container, makeStyles, TableBody, Table,TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import {Styles} from 'src/assets/style/student-style';
import Button from '@mui/material/Button';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import IFees, { GetFeeDetailsResult } from "src/Interface/Student/Fees";
// import { saveAs } from "file-saver";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

Table1.propTypes = {
    FeeType : PropTypes.string,
    LateFeeAmount:PropTypes.string,
    ReceiptNo : PropTypes.string,
    Fee : PropTypes.array,
    Heading: PropTypes.object,
    expand: PropTypes.any,
    Amount: PropTypes.object, 
    TotalFeesPaid: PropTypes.string,
    FeesTobePaid: PropTypes.string,
    TotalLateFee: PropTypes.string,
    TotalFee: PropTypes.string,
 
}
function Table1({ Fee, Heading, Amount } ) {
    const theme = useTheme();
    const [checked, setChecked] = useState(true);
    const classes = Styles();
    const navigate = useNavigate();

    const Compredirect = () => {
      navigate('/extended-sidebar/Student/Button');
  }

  // const Receipt = () => {
  //   saveAs(
  //     "http://riteschool_old.aaditechnology.com" + "//RITeSchool//OtherDownloads//ReceiptDownloads//Receipt_113202218923760.pdf" ,
  //     "example.pdf"
  //   );
  // };

  
    return (
      <div>
        <Container>
          <Grow in={checked}
            style={{ transformOrigin: '1 1 1' }}
            {...(checked ? { timeout: 1000 } : {})}>
            <Accordion className={classes.background} >
              < AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
                sx={{
                  background: `${theme.colors.gradients.pink1}`,
                  color: "white",
                  boxShadow: "6px 6px 8px  gray !important"
                }}
                className={classes.ListStyle}
              >
                <Typography sx={{ color: "black" }}><b>FEETYPE</b></Typography> 
                
              </AccordionSummary>
              <AccordionDetails sx={{ borderRadius: 1, borderBottom: 2, mb: 1, backgroundColor: "#5c5f628a" }}>
              <Card sx={{ backgroundColor: "#c8dccb", mb: 1, p: 1 }} >
                          <Grid container item direction="row" >
                            <Grid
                              item
                              xs={4}
                              style={{ display: "flex", justifyContent: "flex-start" }}>
                              <ListItem>
                                <ListItemText><b>{Heading.Fee1}</b></ListItemText>
                              </ListItem>
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              style={{ display: "flex", justifyContent: "flex-start" }}>
                              <ListItem >
                                <ListItemText><b>{Heading.Fee2}</b></ListItemText>
                              </ListItem>
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              style={{ display: "flex", justifyContent: "flex-start" }}>
                              <ListItem >
                                <ListItemText><b>{Heading.Fee3}</b></ListItemText>
                              </ListItem>
                            </Grid>
                          </Grid>
                        </Card>
                  <>
                  {
                     (Fee === undefined) ?                       
                       null                          :
                         <>
     {
                  Fee.map((item: GetFeeDetailsResult, i) => 
                  {
                    
                      return (
                        <Card key={i} sx={{ backgroundColor: "#c8dccb", mb: 1, p: 1 }} >
                          <Grid container item direction="row" key={i}>
                            <Grid
                              item
                              xs={4}
                              style={{ display: "flex", justifyContent: "flex-start" }}>
                              <ListItem>
                                <ListItemText>{item.FeeType}</ListItemText>
                              </ListItem>
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              style={{ display: "flex", justifyContent: "flex-start" }}>
                              <ListItem >
                                <ListItemText>{item.LateFeeAmount}</ListItemText>
                              </ListItem>
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              style={{ display: "flex", justifyContent: "flex-start" }}>
                              <ListItem >
                                {/* <ListItemText><DownloadForOfflineIcon onClick={Receipt}/></ListItemText> */}
                              </ListItem>
                            </Grid>
                          </Grid>
                        </Card>
                      )
                  }
                      )
                    }
                      
                      </>
                    }
                  
                    </>
                    
                     
  
                    )
                  
                </AccordionDetails>
              </Accordion>
              
              
            </Grow>
            
            
                  
          </Container>
        </div>


      )
    }
  

export default Table1;