// import PageHeader from 'src/libraries/heading/PageHeader';
import { Box, IconButton, Tooltip } from '@mui/material';
import CommonPageHeader from '../CommonPageHeader';
import Form13 from './Composee';
import PageHeader from '../CommonPageHead/PageHeader';
import { green, grey } from '@mui/material/colors';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
export const Composee = () => {
  return (
    <Box>
      {/* <PageHeader heading={'Compose Message'} subheading={''} />  */}
      <Form13 />
    </Box>
  );
};
export default Composee;
