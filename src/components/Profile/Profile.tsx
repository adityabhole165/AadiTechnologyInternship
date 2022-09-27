import { Box } from '@mui/material';
import { Container } from '@mui/system';
import Card24 from 'src/libraries/card/Card24';
import PageHeader from 'src/libraries/heading/PageHeader';
import Card6 from 'src/libraries/mainCard/Card6';
function Profile() {
  return (
    <Box sx={{backgroundColor:"#bbdefb",Top:0,  position: 'fixed',width:"100%",height:"100%"}}>
   
          <PageHeader heading={'My Profile'} subheading={''} />
          <Card24 />
    
  
      {/* <Card6/> */}
    </Box>
  );
}
export default Profile;
