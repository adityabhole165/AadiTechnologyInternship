import { Grid } from '@mui/material';
import PhotoCard from '../card/PhotoCard';

const PhotoList = ({ PhotoList, clickPhoto }) => {
  return (
    <Grid container>
      {PhotoList.map((item, index) => (
        <Grid
          item
          xs={4}
          key={index}
          onClick={() => {
            clickPhoto(index);
          }}
        >
          <PhotoCard item={item} columns={3} rows={4}></PhotoCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default PhotoList;
