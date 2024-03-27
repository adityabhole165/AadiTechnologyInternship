import { Box } from '@mui/material';
import { CardDetail7 } from '../styled/CardStyle';
const DotLegendTeacher = ({ text, color }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* <DotLegendStyledTeacher sx={{ backgroundColor: color }} /> */}

      <CardDetail7> {text} {color}</CardDetail7>

      <br />
    </Box>
  );
};

export default DotLegendTeacher;
