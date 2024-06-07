

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuestionMark from "@mui/icons-material/QuestionMark";
import { Box, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import CommonPageHeader from "src/components/CommonPageHeader";

const AddHoliday = ({ }) => {

    const getCurrentDate = () => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const today = new Date();
        const year = today.getFullYear();
        const month = monthNames[today.getMonth()];
        const day = String(today.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    console.log(getCurrentDate(), "getCurrentDate");

    // const today = new Date();
    // console.log("today", today);


    const [HolidayTitle, setHolidayTitle] = useState('');
    const [errorHolidayTitle, SetErrorHolidayTitle] = useState('');

    const [HolidayStartDate, setHolidayStartDate] = useState(getCurrentDate);

    const [HolidayEndDate, setHolidayEndDate] = useState(getCurrentDate);
    const [ErrorHolidayStartDate, setErrorHolidayStartDate] = useState('');
    const [ErrorHolidayEndDate, setErrorHolidayEndDate] = useState('');
    const [TotalDays, setTotalDays] = useState(1);
    const [Reamrk, setRemark] = useState('');

    useEffect(() => {
        const start = new Date(HolidayStartDate);
        const end = new Date(HolidayEndDate);
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(daysDiff);
    }, [HolidayStartDate, HolidayEndDate]);

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'Add Holiday',
                            path: '/extended-sidebar/Admin/SchoolConfiguration/AddHoliday',
                        },
                    ]}
                    rightActions={
                        <Box>
                            <Tooltip title={'Declare a new classwise holiday for your school'}>
                                <IconButton
                                    sx={{
                                        bgcolor: 'grey.500',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'grey.600',
                                        },
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                />
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>

                    <TextField
                        label={
                            <span>
                                Start Date <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        // inputProps={{ type: 'date' }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={HolidayStartDate}
                        onChange={(e) => {
                            setHolidayStartDate(e.target.value);
                            // console.log('EventStartDate :', e.target.value);
                        }}
                        error={ErrorHolidayStartDate !== ''}
                        helperText={ErrorHolidayStartDate}
                        fullWidth

                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        label={
                            <span>
                                End Date <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        type="text"
                        value={HolidayEndDate}
                        onChange={(e) => {
                            setHolidayEndDate(e.target.value);
                            // console.log('EventEndDate :', e.target.value);
                        }}
                        InputProps={{
                            endAdornment: <CalendarTodayIcon />,

                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        error={ErrorHolidayEndDate !== ''}
                        helperText={ErrorHolidayEndDate}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <TextField
                        label="Total Days"
                        value={TotalDays}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>


                <Grid xs={6} md={6} item>
                    <TextField
                        label={
                            <span>
                                Name <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        multiline
                        rows={3}
                        value={HolidayTitle}
                        onChange={(e) => {
                            setHolidayTitle(e.target.value);
                        }}
                        error={errorHolidayTitle !== ''}
                        helperText={errorHolidayTitle}
                        fullWidth
                        sx={{
                            resize: 'both'
                        }}
                    >
                    </TextField>
                </Grid>


                <Grid xs={6} md={6} item>
                    <TextField
                        label={
                            <span>
                                Remark
                            </span>
                        }
                        multiline
                        rows={3}
                        value={Reamrk}
                        onChange={(e) => {
                            setRemark(e.target.value);
                        }}
                        fullWidth
                    >

                    </TextField>
                </Grid>






            </Grid >
        </>
    )
};


export default AddHoliday;