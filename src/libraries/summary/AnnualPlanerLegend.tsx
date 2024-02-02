import { Box } from '@mui/material';
import { CardDetail7 } from '../styled/CardStyle';
import { DotAnnualPlanerLegend } from '../styled/DotLegendStyled';
const AnnualPlanerLegend = ({ text, color }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <DotAnnualPlanerLegend color={color} />

      <CardDetail7> {text} </CardDetail7>

      <br />
    </Box>
  );
};

export default AnnualPlanerLegend;
