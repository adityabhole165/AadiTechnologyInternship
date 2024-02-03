import { Typography } from '@mui/material';
import { ListStyle } from '../styled/CardStyle';

function CardNew({ Data }) {
  return (
    <div>
      <ListStyle>
        <Typography style={{ fontWeight: 'bold' }}>{Data.text1}</Typography>
        <Typography>{Data.text2}</Typography>
      </ListStyle>
    </div>
  );
}

export default CardNew;
