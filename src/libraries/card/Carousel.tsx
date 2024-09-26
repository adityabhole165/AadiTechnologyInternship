import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { RootState } from 'src/store';
import Carouselcard from './Carouselcard';
const Carousel = ({ itemlist, IsPath = false }) => {
  const [index, setIndex] = useState(0);
  const loading = useSelector((state: RootState) => state.Birthdays.Loading);

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
      <Box sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <SuspenseLoader />
        ) : itemlist.length !== 0 ? (
          <Grid container alignItems="center">
            <Grid item xs={1} pl={1.8}>
              <ArrowLeft onClick={() => arrowClick(-1)} />
            </Grid>
            <Grid item xs={10}>
              <Carouselcard item={itemlist[index]} IsPath={IsPath} />
            </Grid>
            <Grid item xs={1}>
              <ArrowRight onClick={() => arrowClick(1)} />
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 5 }}>
              <b>No record found.</b>
            </Typography>
          </Grid>
        )}
      </Box>

    </div>
  );
};

export default Carousel;
