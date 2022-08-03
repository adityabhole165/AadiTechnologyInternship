import React, { useState } from 'react';
import {
  Box,
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Getimg } from 'src/interfaces/Common/PhotoGallery';
import { makeStyles } from '@mui/styles';
import { Styles } from 'src/assets/style/student-style';
import { SRLWrapper } from 'simple-react-lightbox';
import SimpleReactLightbox from 'simple-react-lightbox';
import BackButton from '../button/BackButton';

Card22.propTypes = {
  pic: PropTypes.array,
  YearData: PropTypes.array
};
const useStyles = makeStyles((theme) => ({
  resonsive: {
    width: '150px',
    height: '100px',

    objectfit: 'cover'
  }
}));

function Card22({ pic }) {
  const options = {
    buttons: {
      backgroundColor: 'rgb(105,105,105)',
      iconColor: 'rgb(255,255,255)',
      iconPadding: '10px',
      showAutoplayButton: true,
      showCloseButton: true,
      showDownloadButton: false,
      showFullscreenButton: true,
      showNextButton: true,
      showPrevButton: true,
      showThumbnailsButton: true,
      size: '40px'
    },

    settings: {
      overlayColor: 'black'
    },
    caption: {
      captionColor: '#a6cfa5',
      captionFontSize: '20px',
      captionFontWeight: '300'
    },
    thumbnails: {
      showThumbnails: true,
      thumbnailsAlignment: 'center',
      thumbnailsContainerPadding: '10px',
      thumbnailsGap: '0 1px',
      thumbnailsIconColor: '#ffffff',
      thumbnailsOpacity: 0.4,
      thumbnailsPosition: 'bottom',
      thumbnailsSize: ['100px', '80px']
    }
  };

  return (
    <>
      <SimpleReactLightbox>
      <span style={{position:'relative',left:'20px',top:'-35px'}}>
      <BackButton />
      </span>

        <SRLWrapper options={options}>
          <Grid
            container
            xs={12}
            direction="row"
            rowSpacing={1}
            justifyContent="center"
          >
            {pic.map((items: Getimg, i) => {
              return (
                <>
                  <Grid>
                    <Box sx={{ marginLeft: '10px', fontSize: '20px' }}>
                      <img
                        src={
                          'http://riteschool_old.aaditechnology.com/RITeSchool/' +
                          items.ImagePath
                        }
                        width="100"
                        height="100"
                        alt={items.Description}
                      />
                    </Box>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </SRLWrapper>
      </SimpleReactLightbox>
    </>
  );
}
export default Card22;
