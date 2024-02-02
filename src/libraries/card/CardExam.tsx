import { Box, Typography } from '@mui/material';
import { ListStyle } from '../styled/CardStyle';

const CardExam = ({ text1, text2, text3 }) => {
  return (
    <div>
      <ListStyle>
        <Typography>
          <b>Subject:-</b>
          {text1}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            <b>Total Marks:-</b>
            {text2}
          </Typography>
          <Typography>
            {' '}
            <b>Percentage:-</b>
            {text3}
          </Typography>
        </Box>
      </ListStyle>
    </div>
  );
};

export default CardExam;
