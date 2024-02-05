import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import 'src/assets/style/Homework_Calci.css';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import DownloadIcon from '@mui/icons-material/Download';

Card22.propTypes = {
  pic: PropTypes.array,
  imgId: PropTypes.string,
  YearData: PropTypes?.array
};

const useStyles = makeStyles((theme) => ({
  resonsive: {
    width: '150px',
    height: '100px',
    objectFit: 'cover'
  }
}));

function Card22({ pic, imgId }) {
  const classes = useStyles();  
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
      thumbnailsSize: ['100px', '20px']
    }
  };

  const handleDownload = (url, filename) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div>
      <SimpleReactLightbox>
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <span>{imgId}</span>
        </span>

        <SRLWrapper options={options}>
          <Grid
            container
            xs={12}
            direction="row"
            rowSpacing={1}
            justifyContent="center"
            sx={{ marginTop: '20px' }}
          >
            {pic === null ? (
              <ErrorMessages Error={'No message'} />
            ) : (
              <>
                {pic.map((items, i) => (
                  <Grid key={i}>
                    <Box sx={{ marginLeft: '10px', fontSize: '20px' }}>
                      <a
                        href={items.Value}
                        download={`download_${i}`} 
                      >
                        <img
                          src={items.Value}
                          width="100"
                          height="100"
                          alt={items.Name}
                          className={classes.resonsive}
                        />
                        <IconButton onClick={() => handleDownload(items.Value, `download_${i}`)}>
                       <DownloadIcon />
                     </IconButton>
                      </a>
                    </Box>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </SRLWrapper>
      </SimpleReactLightbox>
    </div>
  );
}

export default Card22;
