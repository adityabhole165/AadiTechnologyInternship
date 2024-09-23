import { Box, Grid } from '@mui/material';
import Header from './Header';

const AnnualPlannerDashBoard = () => {


    return (
        <Box sx={{ backgroundColor: 'white', p: 1 }} >
            <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
                <Header Title="Annual Planner" />
            </Grid>
            <Box sx={{ height: '320px', overflow: 'auto', mt: 1, }}>
            </Box>
        </Box>
    );
};

export default AnnualPlannerDashBoard;