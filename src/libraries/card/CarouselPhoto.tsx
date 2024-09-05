import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CarouselPhotoCard from './CarouselPhotoCard';
const CarouselPhoto = ({ itemlist, IsPath = false, onImageClick, largeImage = false, isSlideshowRunning = true }) => {
  const [index, setIndex] = useState(0);

  const arrowClick = (value) => {
    const maxlength = itemlist.length - 1;
    const min = 0;
    if (value === -1 && index === 0) {
      setIndex(maxlength);
    } else if (value === 1 && index === maxlength) {
      setIndex(min);
    } else {
      setIndex(index + value);
    }
  };
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIndex((prevIndex) =>
  //       prevIndex === itemlist.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, [index]);
  
  useEffect(() => {
    let timer;
    if (isSlideshowRunning) {
      timer = setTimeout(() => {
        setIndex((prevIndex) =>
          prevIndex === itemlist.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [index, isSlideshowRunning, itemlist.length]);

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <ArrowLeft onClick={() => arrowClick(-1)} />
        </Grid>
        <Grid item xs={10}>
          <CarouselPhotoCard item={itemlist[index]} IsPath={IsPath} onImageClick={onImageClick} largeImage={largeImage}
            currentIndex={index}
            totalImages={itemlist.length} />
        </Grid>
        <Grid item xs={1}>
          <ArrowRight onClick={() => arrowClick(1)} />
        </Grid>
      </Grid>
    </div>
  );
};

export default CarouselPhoto;
