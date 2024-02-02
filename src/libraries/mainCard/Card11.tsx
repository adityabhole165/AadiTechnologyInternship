import { Typography } from '@mui/material';

function Card11({ item }) {
  return (
    <>
      <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
        {item.header}{' '}
      </Typography>
      <Typography variant="body2" sx={{ color: 'black' }}>
        {item.text1}
      </Typography>
    </>
  );
}

export default Card11;
