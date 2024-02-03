import { Box, Typography } from '@mui/material';
import { ButtonPrimary } from '../styled/ButtonStyle';
import { ListStyle } from '../styled/CardStyle';

function ClaimedCard({ Text1, Text2, confirmsg }) {
  return (
    <div>
      <ListStyle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} pb={1}>
          <Typography>
            {' '}
            <b>Date : </b> {Text1}
          </Typography>
          <Typography>
            {Text2 === true && <b>Claimed by Parent : Yes </b>}
          </Typography>
        </Box>
        <ButtonPrimary onClick={confirmsg}>Cancel</ButtonPrimary>
      </ListStyle>
    </div>
  );
}

export default ClaimedCard;
