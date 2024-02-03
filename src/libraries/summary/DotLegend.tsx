import { Box } from '@mui/material';
import { CardDetail7 } from '../styled/CardStyle';
import { DotLegendStyled } from '../styled/DotLegendStyled';
const DotLegend = ({ text, color }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <DotLegendStyled color={color} />

      <CardDetail7> {text} </CardDetail7>

      <br />
    </Box>
  );
};

export default DotLegend;
