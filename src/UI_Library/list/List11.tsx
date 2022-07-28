import {
    Box,
    Typography,
    useTheme,
    List,
    Container,
    Grow,
    Grid
} from '@mui/material';
import { Link, Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Getcomments, GetVideoGalleryResult, IVideoList } from "src/Interface/Common/VideoGallery";
import PropTypes from 'prop-types';
import { IPics, GetPics } from 'src/Interface/Common/PhotoGallery';
import { Styles } from 'src/assets/style/student-style'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";

List11.propTypes = {
    VideoDetailsId: PropTypes.number,
    VideoId: PropTypes.number,
    Title: PropTypes.string,
    UrlSourceId: PropTypes.number,
    VideoUrl: PropTypes.string
}

function List11({ VideoId, Title, VideoDetailsId, UrlSourceId, VideoUrl }) {
    const theme = useTheme();
    const classes = Styles();

    const comment: any = useSelector((state: RootState) => state.Video.Comments)
    //   alert(JSON.stringify(comment))
    const [click, setClick] = React.useState();
    const handleclickk = (event) => {
        setClick(event.target.value)
        alert(event.target.value)
    }
    function returnURL(VideoUrl) {
        if (VideoUrl.split('=')[1].split('&')[0] === undefined) {
            return VideoUrl.split('=')[1]
        }
        else
            return VideoUrl.split('=')[1].split('&')[0]
    }
    return (
        <>
{/*            
                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 1' }}
                    {...(checked ? { timeout: 1500 } : {})}
                > */}

                <RouterLink to={
                    `/${location.pathname.split('/')[1]

                    }/student/videoview/` +  returnURL(VideoUrl)

                }
                    color="primary"
                    style={{ textDecoration: 'none' }}>
                    <List
                        className={classes.ListStyle}
                        sx={{
                            background: `${theme.colors.gradients.pink1}`,
                        }}
                    >
                        <Typography className={classes.Listfont1}>
                            {Title}
                        </Typography>
                    </List>

                </RouterLink>
                {/* </Grow> */}
           
        </>
    );
}

export default List11;
