import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import CarouselPhotoCard from './CarouselPhotoCard';

const CarouselPhoto = ({ itemlist, IsPath = false, onImageClick, largeImage = false, isSlideshowRunning = true }) => {
  const [index, setIndex] = useState(0);

  const arrowClick = (value) => {
    const maxlength = itemlist.length - 1;
    if (value === -1 && index === 0) {
      setIndex(maxlength);
    } else if (value === 1 && index === maxlength) {
      setIndex(0);
    } else {
      setIndex(index + value);
    }
  };

  useEffect(() => {
    let timer;
    if (isSlideshowRunning) {
      timer = setTimeout(() => {
        setIndex((prevIndex) =>
          prevIndex === itemlist.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [index, isSlideshowRunning, itemlist.length]);

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={1} sx={{mr:0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <IconButton  onClick={() => arrowClick(-1)}>
            <ArrowLeft />
          </IconButton>

        </Grid>
        <Grid item xs={10}>
          <CarouselPhotoCard
            item={itemlist[index]}
            IsPath={IsPath}
            onImageClick={onImageClick}
            largeImage={largeImage}
            currentIndex={index}
            totalImages={itemlist.length}
          />
        </Grid>
        <Grid item xs={1}>

          <IconButton sx={{ml:1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <ArrowRight  onClick={() => arrowClick(1)} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default CarouselPhoto;
