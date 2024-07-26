// import PageHeader from 'src/libraries/heading/PageHeader';
import { Box } from '@mui/material';
import CommonPageHeader from '../CommonPageHeader';
import Form13 from './Composee';

export const Composee = () => {
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader navLinks={[
        {
          title: 'Compose Message',
          path: ''
        }
      ]}
        rightActions={''}
      />
      {/* <PageHeader heading={'Compose Message'} subheading={''} /> */}
      <Form13 />
    </Box>
  );
};
export default Composee;
