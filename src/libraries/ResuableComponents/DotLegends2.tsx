import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';

const DotLegends2 = ({ text, text1, text2, text4, text5, text3, color }) => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
        {/* <CheckIcon style={{ color: 'green' }} />
        <Typography>{text1}</Typography> */}
         {text1 && <CheckIcon style={{ color: 'green' }} />}
         {text1 && <Typography>{text1}</Typography>}
      </Box>

      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
        {/* <CloseIcon style={{ color: 'red' }} /> */}
        {/* <Typography> {text2}</Typography> */}
        {text2 && <CloseIcon style={{ color: 'red' }} />}
        {text2 && <Typography>{text2}</Typography>}
      </Box>

      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
        {/* <h5 style={{ color: 'Black', margin: 0 }}>N/A</h5> */}
        <Typography component="h5" style={{ color: 'black', margin: 0 }}>N/A</Typography>
        <Typography>{text3}</Typography>
      </Box>
      {/* sx={{
          display: 'flex',
          maxWidth: '25px',
          height: '25px',
          border: '1px solid green',
          p: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }} */}

      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
        <Typography style={{ color: 'blue' }}> {text4}</Typography>
      </Box>
    </>
  );
};

export default DotLegends2;
