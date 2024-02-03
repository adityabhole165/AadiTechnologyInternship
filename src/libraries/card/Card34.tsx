import { Box, Typography } from '@mui/material';

function card34() {
  return (
    <div>
      <Box
        sx={{
          boxShadow: '6px 4px 5px !important',
          borderRadius: '10px',

          mt: '50px',
          backgroundColor: '#d0dbd2'
        }}
      >
        <Typography sx={{ ml: '10px', mt: '5px', mb: '5px' }}>
          <b>Note :</b>
          <br />
          1) Parents need to enter the date of birth of their child.
          <br />
          2) Please enter the user name and date of birth, the system will SMS
          you the password on the mobile number registered with the RITeSchool
          account.
          <br />
          3) If you don't remember the user name then enter mobile number that
          is currently registered with the RITeSchool account and date of birth.
          <br />
          4) Please enter email id to receive the login details through email.
        </Typography>
      </Box>
    </div>
  );
}

export default card34;
