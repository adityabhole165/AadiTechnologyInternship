import { Box } from '@mui/material';
import { CardDetail7 } from '../styled/CardStyle';
import { DotLegendStyledTeacher } from '../styled/DotLegendStyled';
const DotLegendTeacher = ({ text, color }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <DotLegendStyledTeacher sx={{ backgroundColor: color }} />

      <CardDetail7> {text} </CardDetail7>

      <br />
    </Box>
  );
};

export default DotLegendTeacher;
