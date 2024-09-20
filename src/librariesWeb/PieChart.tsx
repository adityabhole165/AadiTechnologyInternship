import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import Header from './Header';
import colors from 'react-multi-date-picker/plugins/colors';

const PieChart = () => {
    // Define options with correct types
    // const options: ApexOptions = {
    //     chart: {
    //         type: 'pie' as 'pie', // Ensure the type is 'pie'
    //     },
    //     labels: ['Group A', 'Group B', 'Group C', 'Group D'],
    //     responsive: [
    //         {
    //             breakpoint: 480,
    //             options: {
    //                 chart: {
    //                     width: 320,
    //                 },
    //                 legend: {
    //                     position: 'bottom',
    //                 },
    //             },
    //         },
    //     ],
    // };

    // const series = [400, 300, 300, 200];
    const [state, setState] = useState({
        colors:{},
        options: {
            chart: {
                id: "basic-bar444",
            },
            xaxis: {
                categories:['Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat']
            },
        },
        series: [
            {
                name: "Absent Student",
                data: [30, 40, 45, 50, 49, 60],
            },
            {
                name: "Present Student",     
                data: [35, 20, 55, 70, 10, 23],
            },
        ],
    });

    return (
        <Box sx={{ backgroundColor: 'white', p: 1 }} >
            <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
                <Header Title="Attendance" />
            </Grid>
            <Box sx={{ height: '320px', overflow: 'auto', mt: 1, }}>
                <ApexCharts
                    options={state.options}
                    series={state.series}
                    type="bar"
                    width="95%"
                    height="295"
                />
            </Box>
        </Box>
    );
};

export default PieChart;
100