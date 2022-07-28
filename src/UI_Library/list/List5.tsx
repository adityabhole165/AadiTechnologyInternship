
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
import { useState } from 'react';

//import { Container, makeStyles, TableBody, Table,TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import {Styles} from 'src/assets/style/student-style';
import Button from '@mui/material/Button';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import IFees, { GetFeeDetailsResult } from "src/Interface/Student/Fees";
// import { saveAs } from "file-saver";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

List2.propTypes = {
    FeeType : PropTypes.string,
    LateFeeAmount:PropTypes.string,
    ReceiptNo : PropTypes.string,
    Fee : PropTypes.array,
    Heading: PropTypes.object,
    expand: PropTypes.any
 
}
function List2({FeeType, LateFeeAmount, ReceiptNo, Fee, Heading} ) {
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
  <>
    <Container>

      <Grow in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1500 } : {})}>   
          <>
                  {
                     (Fee === undefined) ?                       
                       null                          :
                         <>
     {
                  Fee.map((item: GetFeeDetailsResult, i) => 
                  { 
        
            
        return(
            <List key={i}>
<List 
          className={classes.ListStyle}
          sx={{

            background: `${theme.colors.gradients.pink1}`,


          }}
        >
                    
          <Box>
            <Box display="flex" alignItems="center">
                <Grid xs={8}>
              <Typography
                className={classes.Listfont1}
              >
                {item.FeeType}
              </Typography>
              </Grid>
              <Grid xs={4}>
              <Typography
                className={classes.Listfont1}
              >
                {item.LateFeeAmount}
              </Typography>
              </Grid>
              <Grid xs={4}>
              <Typography
                className={classes.Listfont1}
              >
                {/* <DownloadForOfflineIcon onClick={Receipt}/> */}
              </Typography>
              </Grid>
            </Box>
          </Box>

        {/* //   <Box
        //     sx={{
        //       mt: 1
        //     }}>
        //     <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        //       <Typography className={classes.Listfont2}>
        //         {Sub}
        //       </Typography>
        //     </Box> */}
          </List> 
          </List>  
                      )
                      
                  }
                  )
                  }
                </>
            }
            </>
        
        </Grow> 
    </Container>
  </>);
}


export default List2;
