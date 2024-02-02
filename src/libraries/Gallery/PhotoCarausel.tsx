import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import PhotoCard from '../card/PhotoCard';
import PrevNextNav from '../card/PrevNextNav';

const PhotoCarausel = ({
  item,
  maxLength,
  index,
  clickClose,
  clickPhotoIndex
}) => {
  let screenHeight = window.innerHeight;
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {window.innerHeight} - {window.innerWidth}
        </Grid>
        <Grid item xs={12}>
          <PrevNextNav
            maxLength={maxLength}
            index={index}
            clickClose={clickClose}
            clickPhotoIndex={clickPhotoIndex}
          ></PrevNextNav>
        </Grid>
        <Grid item xs={12}>
          <Container fixed>
            <Box
              justifyContent="center"
              display="flex"
              alignItems="center"
              sx={{ bgcolor: 'black', minHeight: screenHeight * 0.65 }}
            >
              <PhotoCard item={item}></PhotoCard>
            </Box>
          </Container>
        </Grid>
        <Grid
          item
          xs={12}
          justifyContent="center"
          display="flex"
          alignItems="center"
        >
          {item.Name}
        </Grid>
      </Grid>
    </>
  );
};

export default PhotoCarausel;
