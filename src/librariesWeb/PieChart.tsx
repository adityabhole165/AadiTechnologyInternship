import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { IWeeklyAttendanceBody } from 'src/interfaces/Student/dashboard';
import { RootState } from 'src/store';
import Header from './Header';

const PieChart = () => {
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const UserId = Number(sessionStorage.getItem('Id'));
    const WeeklyAttendance = useSelector((state: RootState) => state.Dashboard.WeeklyAttendanceCount);
    const options1 = {
        chart: {
            id: "basic-bar444",
        },
        series: [2, 4],
        labels: ["Girl", "Boys"],
    };
    const series = [2, 4];
    // Define options with correct types
    // const options2: ApexOptions = {
    //     chart: {
    //          id: "basic-bar444", // Ensure the type is 'pie'
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
        colors: {},
        options: {
            chart: {
                id: "basic-bar444",
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat']
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

    const WeeklyAttendanceBody: IWeeklyAttendanceBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: UserId,
    };

    return (
        <Box sx={{ backgroundColor: 'white', p: 1 }} >
            <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
                <Header Title="Weekly Attendance" />
            </Grid>
            <Grid container>
                <Grid item xs={4} mt={5}>
                    <ApexCharts
                        options={options1}
                        series={series}
                        type="donut"
                        width="100%"
                        height="295"
                    />
                </Grid>
                <Grid item xs={8} sx={{ height: '320px', overflow: 'auto', mt: 1, }}>
                    <ApexCharts
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="95%"
                        height="295"
                    />
                </Grid>

            </Grid>
        </Box>
    );
};

export default PieChart;
