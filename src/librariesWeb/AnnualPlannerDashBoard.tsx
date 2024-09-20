import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import Header from './Header';
import colors from 'react-multi-date-picker/plugins/colors';
import { Calender1 } from 'src/components/Attendance/Calender';
import HeaderIcons from 'src/components/AnnualPlannerNew/HeaderIcons';
import AnnualPlannerHeader from 'src/components/AnnualPlannerNew/AnnualPlannerHeader';

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