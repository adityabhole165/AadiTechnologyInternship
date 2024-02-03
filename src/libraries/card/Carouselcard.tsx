import { Avatar, Typography } from '@mui/material';
import { Cardbday } from '../styled/CardStyle';

const Carouselcard = ({ item }) => {
  return (
    <div>
      <Cardbday sx={{ mt: 1, pl: 1 }}>
        <Avatar
          alt="user.name"
          src={
            item.Text2 != 0
              ? `data:image/png;base64,${item.Text2}`
              : '/imges/defualtUser.jpg '
          }
          sx={{
            mt: '10px',
            backgroundColor: '#90caf9',
            height: '151px',
            width: '112px'
          }}
          variant="rounded"
          aria-label="add"
        />
        <Typography variant="h5">{item.Header}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {item.Text1}
        </Typography>
      </Cardbday>
    </div>
  );
};

export default Carouselcard;
