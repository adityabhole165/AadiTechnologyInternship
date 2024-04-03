import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';

const DotLegends2 = ({ text, text1, text2, text4, text5, text3, color }) => {
  return (
    <>
      <Box sx={{ display: 'flex', maxWidth: '300px', gap: '8px' }}>
        <CheckIcon style={{ color: 'green' }} />
        <Typography>{text1}</Typography>
      </Box>

      <Box sx={{ display: 'flex', maxWidth: '300px', gap: '8px' }}>
        <CloseIcon style={{ color: 'red' }} />
        <Typography> {text2}</Typography>
      </Box>

      <Box sx={{ display: 'flex', maxWidth: '300px', gap: '8px' }}>
        <h5 style={{ color: 'Black', margin: 0 }}>N/A</h5>

      </Box>
      <Typography>{text3}</Typography>
      {/* sx={{
          display: 'flex',
          maxWidth: '25px',
          height: '25px',
          border: '1px solid green',
          p: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }} */}

      <Box sx={{ display: 'flex', maxWidth: '300px', gap: '8px' }}>
        <Typography style={{ color: 'blue' }}> {text4}</Typography>
      </Box>
    </>
  );
};

export default DotLegends2;
