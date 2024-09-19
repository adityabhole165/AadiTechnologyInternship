import { Avatar, Grid, Typography } from '@mui/material';
import { Cardbday } from '../styled/CardStyle';

const Carouselcard = ({ item, IsPath }) => {
  return (
    <div>
      <Cardbday sx={{ mt: 1, pl: 1 }}>
        <Grid container gap={1}>
          <Grid item>
        <Avatar
          alt="user.name"
          src={IsPath ? item.Text2 :
            item.Text2 != 0
              ? `data:image/png;base64,${item.Text2}`
              : '/imges/defualtUser.jpg'
          }
          sx={{
            m:1,
            backgroundColor: '#90caf9',
            height: '155px',
            width: '112px'
          }}
          variant="rounded"
          aria-label="add"
        /></Grid>
        <Grid item mt={2}>
        <Typography variant="h5" mt={1}><b>{item.Header}</b></Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>{item.Text1}</Typography>
        </Grid>
        </Grid>
      </Cardbday>
    </div>
  );
};

export default Carouselcard;
