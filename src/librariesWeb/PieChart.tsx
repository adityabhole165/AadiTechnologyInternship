// import { Box, Grid } from '@mui/material';
// import { useEffect, useState } from 'react';
// import ApexCharts from 'react-apexcharts';
// import { useDispatch, useSelector } from 'react-redux';
// import { IWeeklyAttendanceBody } from 'src/interfaces/Student/dashboard';
// import { CDAgetWeeklyAttendance } from 'src/requests/Dashboard/Dashboard';
// import { RootState } from 'src/store';
// import Header from './Header';

// const PieChart = () => {
//     const dispatch = useDispatch();
//     const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
//     const asSchoolId = Number(localStorage.getItem('localSchoolId'));
//     const UserId = Number(sessionStorage.getItem('Id'));
//     const asStandardDivisionId = Number(
//         sessionStorage.getItem('StandardDivisionId')
//     );
//     const filteredAttendance: any = useSelector((state: RootState) => state.Dashboard.ISWeeklyAttendanceCount);
//     const statusDescriptions: any = useSelector((state: RootState) => state.Dashboard.ISlistAttendanceCalender);
//     const GetDayDates: any = useSelector((state: RootState) => state.Dashboard.ISGetDayDates);

//     const firstGirlsPercentage = parseFloat(filteredAttendance.map((item: any) => item.TotalGirlsPercentage)[0]) || 0;
//     const firstBoysPercentage = parseFloat(filteredAttendance.map((item: any) => item.TotalBoysPercentage)[0]) || 0;

//       const isWeekend = (statusDesc) => statusDesc === 'Weekend'; 
//       const colors = statusDescriptions.map((item) => (
//         isWeekend(item.StatusDesc) ? 'red' : ''
//       ));

   

//     const options1 = {
//         chart: {
//             id: "basic-bar444",
//         },
//         series: [firstGirlsPercentage ,firstBoysPercentage ],
//         labels: ["Girl", "Boys"],
//     };
//     const series = [firstGirlsPercentage,firstBoysPercentage];
//     // Define options with correct types
//     // const options2: ApexOptions = {
//     //     chart: {
//     //          id: "basic-bar444", // Ensure the type is 'pie'
//     //     },
//     //     labels: ['Group A', 'Group B', 'Group C', 'Group D'],
//     //     responsive: [
//     //         {
//     //             breakpoint: 480,
//     //             options: {
//     //                 chart: {
//     //                     width: 320,
//     //                 },
//     //                 legend: {
//     //                     position: 'bottom',
//     //                 },
//     //             },
//     //         },
//     //     ],
//     // };

//     // const series = [400, 300, 300, 200];
//     const [state, setState] = useState({
//         colors: colors,
//         options: {
//             chart: {
//                 id: "basic-bar444",
//             },
//             xaxis: {
//                 categories: statusDescriptions.map((item) => item.DayName) ,// Set categories for the x-axis
//                 labels: {
//                   style: {
//                     colors: colors, // Apply the colors to the x-axis labels
//                     fontSize: '14px'
//                   }
//                 }
//               }
//         },
//         series: [
//             {
//                 name: "Absent Student",
//                 data: filteredAttendance.map(item => item.TotalAbsentPercentage)
//             },
//             {
//                 name: "Present Student",

//                 data: filteredAttendance.map(item => item.TotalPresentPercentage)

//             },
//         ],
//     });

//     const WeeklyAttendanceBody: IWeeklyAttendanceBody = {
//         asSchoolId: asSchoolId,
//         asAcademicYearId: asAcademicYearId,
//         asStandardDivisionId: asStandardDivisionId,
//     };

//     useEffect(() => {
//         dispatch(CDAgetWeeklyAttendance(WeeklyAttendanceBody));
//     }, []);
//     return (
//         <Box sx={{ backgroundColor: 'white', p: 1 }} >
//             <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
//                 <Header Title="Weekly Attendance" />
//             </Grid>
//             <Grid container>
//                 <Grid item xs={4} mt={5}>
//                     <ApexCharts
//                         options={options1}
//                         series={series}
//                         type="donut"
//                         width="100%"
//                         height="295"
//                     />
//                 </Grid>
//                 <Grid item xs={8} sx={{ height: '320px', overflow: 'auto', mt: 1, }}>
//                     <ApexCharts
//                         options={state.options}
//                         series={state.series}
//                         type="bar"
//                         width="95%"
//                         height="295"
//                     />
//                 </Grid>

//             </Grid>
//         </Box>
//     );
// };

// export default PieChart;

import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { IWeeklyAttendanceBody } from 'src/interfaces/Student/dashboard';
import { CDAgetWeeklyAttendance } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';
import Header from './Header';

const PieChart = () => {
    const dispatch = useDispatch();
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const UserId = Number(sessionStorage.getItem('Id'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));

   
    const filteredAttendance: any = useSelector((state: RootState) => state.Dashboard.ISWeeklyAttendanceCount);
    const statusDescriptions: any = useSelector((state: RootState) => state.Dashboard.ISlistAttendanceCalender);

    const firstGirlsPercentage = parseFloat(filteredAttendance.map((item: any) => item.TotalGirlsPercentage)[0]) || 0;
    const firstBoysPercentage = parseFloat(filteredAttendance.map((item: any) => item.TotalBoysPercentage)[0]) || 0;

    
    const isWeekend = (statusDesc: string) => statusDesc === 'Weekend'; 
    const colors = statusDescriptions.map((item) => (isWeekend(item.StatusDesc) ? 'red' : '')); 

   
    const options1 = {
        chart: {
            id: "basic-bar444",
        },
        series: [firstGirlsPercentage, firstBoysPercentage],
        labels: ["Girl", "Boys"],
    };
    const series = [firstGirlsPercentage, firstBoysPercentage];

   
    const [state, setState] = useState({
        colors: colors,
        options: {
            chart: {
                id: "basic-bar444",
            },
            xaxis: {
                categories: statusDescriptions.map((item) => item.DayName),
                labels: {
                    style: {
                        colors: colors,
                        fontSize: '14px',
                    },
                },
            },
        },
        series: [
            {
                name: "Absent Student",
                data: filteredAttendance.map(item => item.TotalAbsentPercentage),
            },
            {
                name: "Present Student",
                data: filteredAttendance.map(item => item.TotalPresentPercentage),
            },
        ],
    });

    const WeeklyAttendanceBody: IWeeklyAttendanceBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: asStandardDivisionId,
    };

    useEffect(() => {
        dispatch(CDAgetWeeklyAttendance(WeeklyAttendanceBody));
    }, []);

    useEffect(() => {
        
        setState(prevState => ({
            ...prevState,
            colors: colors,
            options: {
                ...prevState.options,
                xaxis: {
                    ...prevState.options.xaxis,
                    categories: statusDescriptions.map((item) => item.DayName),
                    labels: {
                        style: {
                            colors: colors,
                            fontSize: '14px',
                        },
                    },
                },
            },
            series: [
                {
                    name: "Absent Student",
                    data: filteredAttendance.map(item => item.TotalAbsentPercentage),
                },
                {
                    name: "Present Student",
                    data: filteredAttendance.map(item => item.TotalPresentPercentage),
                },
            ],
        }));
    }, [filteredAttendance, colors, statusDescriptions]);

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
                <Grid item xs={8} sx={{ height: '320px', overflow: 'auto', mt: 1 }}>
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

