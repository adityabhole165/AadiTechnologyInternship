import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';

const DotLegends2 = ({ text, text1, text2, text4, text5, text3, color }) => {
  return (
    <>
      <Box sx={{ display: 'flex', maxWidth: '300px' }}>
        <CheckIcon style={{ color: 'green' }} />
        <Typography> {text1}</Typography>
      </Box>

      <Box sx={{ display: 'flex', maxWidth: '300px' }}>
        <CloseIcon style={{ color: 'red' }} />
        <Typography> {text2}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          maxWidth: '25px',
          height: '25px',
          border: '1px solid green',
          p: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h5 style={{ color: 'Black' }}>N/A</h5>
      </Box>
      <Typography>{text3}</Typography>

      <Box sx={{ display: 'flex', maxWidth: '300px' }}>
        <Typography style={{ color: 'blue' }}> {text4}</Typography>
      </Box>
    </>
  );
};

export default DotLegends2;
