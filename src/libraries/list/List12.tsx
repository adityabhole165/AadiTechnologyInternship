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
import { Styles } from 'src/assets/style/student-style';

List12.propTypes = {
  imgId: PropTypes.string,
  FromRoute: PropTypes.string
};

function List12({ imgId,FromRoute }) {
  const theme = useTheme();
  const classes = Styles();

  return (
    <>
      <Container>
      <RouterLink
              to={
                `/${location.pathname.split('/')[1]}/Common/Photos/` + imgId + FromRoute
              }
              color="primary"
              style={{ textDecoration: 'none' }}
            >
        <List
          className={classes.ListStyle}
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography className={classes.Listfont1}>{imgId}</Typography>
          </Box>
        </List>
        </RouterLink>
      </Container>
    </>
  );
}

export default List12;
