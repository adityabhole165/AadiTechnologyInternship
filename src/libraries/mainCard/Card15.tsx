import { Box } from '@mui/material';
import { CardDetail, CardDetail2, CardDetail3 } from '../styled/CardStyle';

const Card15 = ({ text1, text2 }) => {
  return (
    <Box p={1}>
      <CardDetail>
        {' '}
        <CardDetail3>
          <b>User Name: </b>
          {text2}
        </CardDetail3>
      </CardDetail>
      <CardDetail2>
        <b>Read Date/Time: </b>
        {text1}{' '}
      </CardDetail2>
    </Box>
  );
};

export default Card15;
