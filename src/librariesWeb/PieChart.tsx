import { Box, Grid } from '@mui/material';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions for type checking
import ApexCharts from 'react-apexcharts';
import Header from './Header';

const PieChart = () => {
    // Define options with correct types
    const options: ApexOptions = {
        chart: {
            type: 'pie' as 'pie', // Ensure the type is 'pie'
        },
        labels: ['Group A', 'Group B', 'Group C', 'Group D'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 320,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    const series = [400, 300, 300, 200];

    return (
        <Box sx={{ backgroundColor: 'white', p: 1 }} >
            <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
                <Header Title="Attendance" />
            </Grid>
            <Box sx={{ height: '310px', overflow: 'auto', mt: 2, }}>
                <ApexCharts
                    options={options}
                    series={series}
                    type="pie"
                    width="95%"
                    height="350"
                />
            </Box>
        </Box>
    );
};

export default PieChart;
