import { Box } from '@mui/material';
import { CardDetail7 } from '../styled/CardStyle';
import { AttandaceCalender } from '../styled/DotLegendStyled';
const DotLegendAttandaceCalender = ({ text, color }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AttandaceCalender color={color} />

      <CardDetail7> {text} </CardDetail7>

      <br />
    </Box>
  );
};

export default DotLegendAttandaceCalender;
