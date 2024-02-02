import { Box, Typography } from '@mui/material';
import { ListStyle } from '../styled/CardStyle';

function ClaimedCard({ items }) {
  const UserId = sessionStorage.getItem('Id');
  return (
    <div>
      <ListStyle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            {' '}
            <b>Date : </b> {items.ReservationDate}
          </Typography>
          <Typography>
            <b>Claimed by Parent : </b>{' '}
            {items.IsForParent === true ? 'Yes' : 'No'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} pb={1}>
          {items.ClassNameDesignation != '-' ? (
            <Typography>
              {' '}
              <b> Class : </b> {items.ClassNameDesignation}
            </Typography>
          ) : (
            <Typography>
              <b>Designation : </b> {items.Designation}
            </Typography>
          )}
        </Box>
      </ListStyle>
    </div>
  );
}

export default ClaimedCard;
