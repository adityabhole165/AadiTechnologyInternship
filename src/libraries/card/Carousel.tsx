import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Carouselcard from './Carouselcard';
const Carousel = ({ itemlist }) => {
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === itemlist.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <ArrowLeft onClick={() => arrowClick(-1)} />
        </Grid>
        <Grid item xs={10}>
          <Carouselcard item={itemlist[index]} />
        </Grid>
        <Grid item xs={1}>
          <ArrowRight onClick={() => arrowClick(1)} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Carousel;
