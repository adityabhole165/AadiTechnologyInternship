import { Box, Typography } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';

function DashboardError({ Error }) {
  const classes = Styles();

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Typography className={classes.errorMessage}>{Error}</Typography>
      </Box>
    </>
  );
}

export default DashboardError;
