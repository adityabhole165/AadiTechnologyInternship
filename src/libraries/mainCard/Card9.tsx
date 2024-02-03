import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
function Card9({ item, variant = 'body2', IsDivider = false }) {
  let num = 'tel:' + item.Text2;
  return (
    <div>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        sx={{ backgroundColor: item.IsActive ? 'secondary' : 'primary' }}
        p={0.5}
      >
        <Typography variant={variant === 'body2' ? 'body2' : 'h5'} gutterBottom>
          {item.Text1}
        </Typography>
        <Typography variant={variant === 'body2' ? 'body2' : 'h5'}>
          {item.IsDial ? <a href={num}>{item.Text2}</a> : item.Text2}
        </Typography>
      </Box>
      {IsDivider && (
        <Divider sx={{ background: '#5b5258', my: '3px', height: '0.5px' }} />
      )}
    </div>
  );
}

export default Card9;
