import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
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


    const validAttendance = filteredAttendance.filter((item: any) => Object.keys(item).length > 0);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB').split('/').join('-');
    const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get current day (e.g., Monday)
    // const TotalBoysPresentPercentage = parseFloat(validAttendance.map((item: any) =>item.TotalBoysPresentPercentage)[0]) || 0;
    // const TotalGirlsPresentPercentage = parseFloat(validAttendance.map((item: any) => item.TotalGirlsPresentPercentage)[0]) || 0;
    // const TotalBoysAbsentPercentage = parseFloat(validAttendance.map((item: any) => item.TotalBoysAbsentPercentage)[0]) || 0;
    // const TotalGirlsAbsentPercentage = parseFloat(validAttendance.map((item: any) => item.TotalGirlsAbsentPercentage)[0]) || 0;

    const TotalBoysPresentPercentage = parseFloat(
        validAttendance
            .filter((item: any) => item.Attendance_Date === formattedDate)
            .map((item: any) => item.TotalBoysPresentPercentage)[0]
    ) || 0;

    const TotalGirlsPresentPercentage = parseFloat(validAttendance
        .filter((item: any) => item.Attendance_Date === formattedDate)
        .map((item: any) => item.TotalGirlsPresentPercentage)[0]
    ) || 0;

    const TotalBoysAbsentPercentage = parseFloat(validAttendance
        .filter((item: any) => item.Attendance_Date === formattedDate)
        .map((item: any) => item.TotalBoysAbsentPercentage)[0]
    ) || 0;

    const TotalGirlsAbsentPercentage = parseFloat(validAttendance
        .filter((item: any) => item.Attendance_Date === formattedDate)
        .map((item: any) => item.TotalGirlsAbsentPercentage)[0]
    ) || 0;

    const isWeekend = (statusDesc: string) => statusDesc === 'Weekend';
    const isHoliday = (statusDesc: string) => statusDesc === 'Holiday';
    const isNotDone = (statusDesc: string) => statusDesc === 'Not Done';
    // const colors = statusDescriptions.map((item) => (isWeekend(item.StatusDesc) ? 'red' : ''));

    const attendanceMarkedToday = validAttendance.length > 0;

    const colors = statusDescriptions.map((item) => {
        if (isWeekend(item.StatusDesc)) {
            return 'red';
        } else if (isHoliday(item.StatusDesc)) {
            return 'red';
        } else if (isNotDone(item.StatusDesc)) {
            return '#38548A';
        } else {
            return '#38548A';
        }
    });
    const attendanceNotTaken = validAttendance.length == 0;

    const options1 = {
        chart: {
            id: "donut-chart",
        },
        series: [TotalGirlsPresentPercentage, TotalGirlsAbsentPercentage, TotalBoysPresentPercentage, TotalBoysAbsentPercentage],
        labels: ["GirlPresent", "GirlAbsent", "BoysPresent", "BoysAbsent"],
    };


    const [state, setState] = useState({
        colors: colors,
        options: {
            chart: {
                id: "bar-chart",
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
            dataLabels: {
                style: {
                    colors: ['#38548A'] // Set data label color to black
                }
            }
        },
        series: [
            {
                name: "Absent Student",
                data: filteredAttendance.map(item => Number(item.TotalAbsentPercentage ?? 0)),
            },
            {
                name: "Present Student",
                data: filteredAttendance.map(item => Number(item.TotalPresentPercentage ?? 0)),
            },
            ...(attendanceNotTaken ? [{
                name: "Attendance Not Marked",
                data: statusDescriptions.map(() => 0) // Assuming zero attendance not marked per day
            }] : []),
        ],
    });

    // Fetch data on component mount
    const WeeklyAttendanceBody: IWeeklyAttendanceBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: asStandardDivisionId,
    };

    useEffect(() => {
        dispatch(CDAgetWeeklyAttendance(WeeklyAttendanceBody));
    }, [dispatch]);


    useEffect(() => {
        const updatedCategories = statusDescriptions.map((item) => item.DayName);
        const updatedAbsentData = filteredAttendance.map(item => parseFloat(item.TotalAbsent ?? 0));
        const updatedPresentData = filteredAttendance.map(item => parseFloat(item.TotalPresent ?? 0));

        setState(prevState => ({
            ...prevState,
            colors: colors,
            options: {
                ...prevState.options,
                xaxis: {
                    ...prevState.options.xaxis,
                    categories: updatedCategories,
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
                    data: updatedAbsentData,
                },
                {
                    name: "Present Student",
                    data: updatedPresentData,
                },
            ],
        }));
    }, [filteredAttendance, statusDescriptions]);

    return (
        <Box sx={{ backgroundColor: 'white', p: 1 }} >
            <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
                <Header Title="Attendance Status" />
                <Tooltip
                    title={`If today's attendance is not marked, the circular graph will not be visible.`}
                >
                    <IconButton
                        sx={{
                            color: '#38548A',
                            // backgroundColor: '#223354',
                            // height: '25px !important',
                            // ':hover': { backgroundColor: yellow[700] },
                            mr: '30px'
                        }}
                    >
                        <PriorityHighIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid container>

                <Grid item xs={12} sm={8} md={8} lg={8}
                    sx={{ height: '320px', overflow: 'auto', mt: 1 }}
                >
                    <ApexCharts
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="95%"
                        height="295"
                    />
                </Grid>

                {attendanceMarkedToday && (
                    <Grid item xs={12} sm={4} md={4} lg={4} mt={5}
                        sx={{ height: { xs: 'auto', sm: '305px', md: '280px', lg: '280px' }, overflow: 'hidden' }}>
                        <ApexCharts
                            options={options1}
                            series={[TotalGirlsPresentPercentage, TotalGirlsAbsentPercentage, TotalBoysPresentPercentage, TotalBoysAbsentPercentage]}
                            type="donut"
                            width="100%"
                            height="382"
                        />
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="subtitle1" sx={{ color: '#38548A' }}>
                                <strong>{currentDay}</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                <strong>{formattedDate}</strong>
                            </Typography>
                        </Box>
                    </Grid>)}
            </Grid>
        </Box>
    );
};

export default PieChart;


