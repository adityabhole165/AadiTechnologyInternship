import { QuestionMark, RestartAlt, Search, SearchTwoTone } from '@mui/icons-material'
import { Box, Grid, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IGetMonthwiseAttendance } from 'src/interfaces/HolidayNew/IHolidays'
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance'
import { GetGetMonthwiseAttendance } from 'src/requests/HolidayNew/RequestHolidays'
import { RootState } from 'src/store'
import CommonPageHeader from '../CommonPageHeader'
import Legend from 'src/libraries/Legend/Legend'


const Monthwise = () => {
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('SchoolId');
    const asStanardDivisionId = sessionStorage.getItem('StandardDivisionId');
    const MonthWiseAttendance = useSelector(
        (state: RootState) => state.HolidayNew.GetMonthwiseAttendance
    );
    const HeaderArray = useSelector(
        (state: RootState) => state.HolidayNew.HeaderArray
    );
    const dispatch = useDispatch();
    const [MonthWiseAttendanceList, setMonthWiseAttendanceList] = useState([
        MonthWiseAttendance
    ]);
    const GetMonthwiseAttendance: IGetMonthwiseAttendance = {
        asSchoolId: Number(asSchoolId),
        asAcademicyearId: Number(asAcademicYearId),
        asStanardDivisionId: Number(asStanardDivisionId)
    }
    useEffect(() => {
        dispatch(GetGetMonthwiseAttendance(GetMonthwiseAttendance));
    }, []);

    useEffect(() => {
        setMonthWiseAttendanceList(MonthWiseAttendance);
    }, [MonthWiseAttendance]);

    const [search, setSearch] = useState(true);
    const [SearchText, setSearchText] = useState('');
    const changeSearchText = () => {
    if (SearchText === '') {
        setMonthWiseAttendanceList(MonthWiseAttendance);
    } else {
        setMonthWiseAttendanceList(
        MonthWiseAttendance.filter((item) => {
            return item.Text2.toLowerCase().includes(SearchText.toLowerCase());
        })
        );
    }
    };

    const onKeyDown = (e) => {
    if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();

        changeSearchText();
    }
    };
    const SearchNameChange = (value) => {
    setSearchText(value);
    };

    const handleSearchChange = (e) => {
                setSearchText(e.target.value);
            };
        
            const handleKeyDown = (e) => {
                if (e.key === 'Enter' || e.key === 'Tab') {
                    e.preventDefault();
                    changeSearchText();
                }
            };
        

    //Reset
    const ResetClick = () => {
        setSearchText('');
        setMonthWiseAttendanceList(MonthWiseAttendance);
    } 

    //Legend
    const LegendArray =[
        {
            id:1,
            Name : 'Student below 75% Attendance',
            Value: <Box sx={{display:'flex',gap: 1, alignItems:'center'}}>
                <Box
                    sx={{
                        width: 23,
                        height: 23,
                        backgroundColor: 'red',
                        border: '1px solid black',
                    }}
                />

            </Box> 
        },
    ];
    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Attendence', path: '/RITeSchool/Teacher/AttendenceBaseScreen' },
                    {
                        title: 'Month Wise Attendence',
                        path: '/RITeSchool/Teacher/Monthwise',
                    },
                ]}
                rightActions={
                    <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="left"
                    gap={1}
                    sx={{
                        mt: { xs: 0, sm: 0 },
                        flexWrap: { xs: 'nowrap', sm: 'nowrap' }
                    }}
                >
                    <Box>

                        <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                        >
                            <TextField
                        sx={{
                             width: { xs: '90vw', sm: '50vw', md: '30vw', lg: '23vw' } // Adjust width based on screen size
                            }}
                                fullWidth
                                label="Student Name"
                                variant="outlined"
                                size="small"
                                value={SearchText}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                    </Box>
                    <Stack direction="row" spacing={1} marginLeft={0.5} marginRight={1}>
                    <Box>

                                            <Tooltip title="Search">
                                                <IconButton
                                                    sx={{
                                                        background: (theme) => theme.palette.primary.main,
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: (theme) => theme.palette.primary.dark
                                                        }
                                                    }}
                                                    onClick={changeSearchText}
                                                >
                                                    <Search />
                                                </IconButton>
                                            </Tooltip>
                    </Box>
                    <Box>

                                            <Tooltip title="Reset">
                                                <IconButton
                                                    sx={{
                                                        background: (theme) => blue[500],
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: (theme) => blue[600]
                                                        }
                                                    }}
                                                    onClick={ResetClick}
                                                >
                                                    <RestartAlt />
                                                </IconButton>
                                            </Tooltip>
                    </Box>
                    <Box>

                                            <Tooltip title="Display list of students along with their month-wise attendance. Attendance is given in the following format: Number of days present / Total attendance days.">

                                                <IconButton sx={{
                                                bgcolor: 'grey.500',
                                                color: 'white',
                                                '&hover': {
                                                    bgcolor: 'grey.600'
                                                }
                                                }}>
                                                        <QuestionMark />
                                        
                                                </IconButton>
                                    
                            </Tooltip>
                    </Box>
                    </Stack>
                                            
                </Stack>
                }
                        
            />
            <Box sx={{background: 'white', p:1 , mb:2}}>
                    <Legend LegendArray={LegendArray}/>
            </Box>


            <TableAttendace
                ItemList={MonthWiseAttendanceList}
                HeaderArray={HeaderArray}
                />
        </Box>
    
    )
}

export default Monthwise

