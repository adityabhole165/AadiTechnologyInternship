import {
    Box,
    Typography,
    useTheme,
    List,
    Container,
    Grow,
    Grid
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GetVideoGalleryResult, IVideoList } from "src/interfaces/Common/VideoGallery";
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style'

List12.propTypes = {
    imgId:PropTypes.string,
    
}

function List12({ imgId}) {
    // alert(imgId)
    // const [checked, setChecked] = useState(true);
    const theme = useTheme();
    const classes = Styles();

    return (
        <>
            <Container>
              

                   
                                <List 
                                    className={classes.ListStyle}
                                    sx={{
                                        background: `${theme.colors.gradients.pink1}`,
                                        
                                    }}>

                                    <Box display="flex" alignItems="center">
                                        {/* <RouterLink to={
                                            `/${location.pathname.split('/')[1]
                                            }/student/photos/` + imgId
                                            
                                        }
                                        
                                            color="primary"
                                            style={{ textDecoration: 'none' }}
                                            > */}
                                                
                                            <Typography className={classes.Listfont1} >
                                                {imgId}
                                            </Typography>
                                            
                                        {/* </RouterLink> */}
                                        
                                    </Box>
                                   
                                </List>
                        
                
            </Container>
        </>
    );
}

export default List12;
