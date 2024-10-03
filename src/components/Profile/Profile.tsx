import { Box, IconButton, Tooltip } from '@mui/material';

import { QuestionMark } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import Card6 from 'src/libraries/mainCard/Card6';
import CommonPageHeader from '../CommonPageHeader';
function Profile() {
  return (
    <Box px={2}
    >
      {/* <PageHeader heading={'My Profile'} subheading={''} /> */}
      <CommonPageHeader
        navLinks={[
          { title: 'User Profile', path: '' }
        ]}

        rightActions={
          <Tooltip title={`
          This section provides the teacher's profile, including their designation,class , contact information, and other relevant details.
          `}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[600]
                }
              }}
            >
              <QuestionMark />
            </IconButton>
          </Tooltip>
        }
      />
      <Card6 />
    </Box>
  );
}
export default Profile;
