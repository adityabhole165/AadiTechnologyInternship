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
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';

List12.propTypes = {
  imgId: PropTypes.string,
  FromRoute: PropTypes.string,
  data:PropTypes.array
};

function List12({ imgId,FromRoute ,data}) {
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
              {data[0].Name == null &&  data[0].ImageList == null ? (
                  <ErrorMessages Error={'No records found'} />
                ) : (
                  <>
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
        </>
            )}
        </RouterLink>
      </Container>
    </>
  );
}

export default List12;
