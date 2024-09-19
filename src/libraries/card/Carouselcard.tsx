import { Avatar, Grid, Typography } from '@mui/material';
import { Cardbday } from '../styled/CardStyle';

const Carouselcard = ({ item, IsPath }) => {
  return (
    <div>
      <Cardbday sx={{ mt: 2, pl: 1 }}>
          <Grid item>
        <Avatar
          alt="user.name"
          src={IsPath ? item.Text2 :
            item.Text2 != 0
              ? `data:image/png;base64,${item.Text2}`
              : '/imges/defualtUser.jpg'
          }
          sx={{
            m:2,
            backgroundColor: '#90caf9',
            height: '180px',
            width: '112px',
           
          }}
          variant="rounded"
          aria-label="add"
        /></Grid>
       <Grid ml={2} >
        <Typography variant="h5" mt={1} pb={0.5}><b>{item.Header}</b></Typography>
        <Typography variant="body2" sx={{ mb: 2 }}><b>{item.Text1}</b></Typography>
        </Grid>
      </Cardbday>
    </div>
  );
};

export default Carouselcard;
