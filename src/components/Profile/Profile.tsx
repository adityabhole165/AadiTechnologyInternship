import { Box, Container } from '@mui/material';

import Card24 from 'src/libraries/card/Card24';
import PageHeader from 'src/libraries/heading/PageHeader';
import Card6 from 'src/libraries/mainCard/Card6';
function Profile() {
  return (
    <Box
      sx={{
        backgroundColor: '#bbdefb',
        Top: 0,
        position: 'fixed',
        width: '100%',
        overflow: "scroll",
        height: '100%'
      }}
    >
      <PageHeader heading={'My Profile'} subheading={''} />

      <Card6 />
    </Box>
  );
}
export default Profile;
