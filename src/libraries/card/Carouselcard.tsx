import { Avatar, Grid, Typography } from '@mui/material';
import { Cardbday } from '../styled/CardStyle';

const Carouselcard = ({ item, IsPath }) => {
  // Check if item is defined and has necessary properties
  if (!item) {
    return null; // Return nothing if item is undefined
  }

  // Safe extraction of item properties
  const { Text2, Header, Text1 } = item;

  // Determine the source of the avatar image
  const avatarSrc = IsPath
    ? Text2
    : Text2
      ? `data:image/png;base64,${Text2}`
      : '/imges/defualtUser.jpg'; // Default image if Text2 is falsy

  return (
    <div>
      <Cardbday sx={{ mt: 2, pl: 1 }}>
        <Grid item>
          <Avatar
            alt={Header || 'User Avatar'} // Use Header or a fallback text
            src={avatarSrc}
            sx={{
              m: 2,
              backgroundColor: '#90caf9',
              height: '180px',
              width: '112px',
            }}
            variant="rounded"
            aria-label="add"
          />
        </Grid>
        <Grid ml={2}>
          <Typography variant="h5" mt={1} pb={0.5}>
            <b>{Header || 'No Name'}</b> {/* Fallback text if Header is missing */}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <b>{Text1 || 'No Additional Info'}</b> {/* Fallback text if Text1 is missing */}
          </Typography>
        </Grid>
      </Cardbday>
    </div>
  );
};

export default Carouselcard;
