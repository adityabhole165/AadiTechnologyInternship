import {
    Box,
    Typography,
    useTheme,   
    List,
    Container,
    Grow,
    Fab,
  } from '@mui/material';
  
import { Styles } from 'src/assets/style/student-style'
  import React,{useState,useEffect} from 'react';
  // import Slide from '@mui/material/Slide';
  import AttachmentIcon from '@mui/icons-material/Attachment';
  
  
  import PropTypes from 'prop-types';
  
  List1.propTypes = {
    Content : PropTypes.string,
    Date:PropTypes.string,
    FileName : PropTypes.string,
    Id : PropTypes.string,
    IsText:PropTypes.string,
    Name:PropTypes.string
}
  
  function List1({  Date, Name, FileName }) {
    const [checked, setChecked] = useState(true);
    const [slide, setSlide] = React.useState(false);
    const theme = useTheme();
    const classes = Styles();
    
    return (
      <>
        <Container>
        <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1500 } : {})}
          >        
          <List className ={classes.ListStyle}
            sx={{ 
              borderRadius: 1,
              mb: 1,
              background: `${theme.colors.gradients.pink1}`,             
            }}>
            
            <Box>
              <Box display="flex" alignItems="center">
                <Typography className={classes.Listfont1} sx={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width:250,marginBottom:"10px"}}>
                  {Name}
                </Typography>
              </Box>
            </Box>
  
            <Box display="flex"  flexDirection="row"  alignItems="center" justifyContent="space-between"
              sx={{
                mt: 0
              }}>
                   <Typography className={classes.Listfont2}>
                  {Date}
                </Typography>
              <Box >
                <Typography color="#333333" variant="subtitle1">
                
                {
                        (FileName === '') ?
                            null
                            : <>
                               
                                    <Box className={classes.backArrow1}  ><AttachmentIcon  sx={{ fontSize: '33px',paddingLeft:'6px',marginLeft:'1.3rem',marginTop:'-0.5rem', transform:'rotateZ(-36deg)' }}/></Box>
                               
                            </>
                    }
                </Typography>
                </Box>
            </Box>
          </List>
          </Grow>
        </Container>
      </>
    );
  }
  export default List1;
  
  