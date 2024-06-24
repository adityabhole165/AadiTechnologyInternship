import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Datepicker from "src/libraries/DateSelector/Datepicker";
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
import CommonPageHeader from '../CommonPageHeader';

const AddLeaveDetails = () => {
    const navigate = useNavigate();

    const [StartDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [EndDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [TotalDays, setTotalDays] = useState(1);
    const [ErrorStartDate, setErrorStartDate] = useState('');
    const [ErrorStartDate2, setErrorStartDate2] = useState('');
    const [ErrorEndDate, setErrorEndDate] = useState('');
    const [ErrorEndDate1, setErrorEndDate1] = useState('');
    const [ErrorEndDate2, setErrorEndDate2] = useState('');

    useEffect(() => {
        const start = new Date(StartDate);
        const end = new Date(EndDate);
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);
        setTotalDays(daysDiff);
    }, [StartDate, EndDate]);

    const onSelectStartDate = (value) => {
        setStartDate(value);
    };

    const onSelectEndDate = (value) => {
        setEndDate(value);
    };

    const resetForm = () => {
        navigate('/extended-sidebar/Teacher/LeaveDetails');
    };

    return (
        <Box sx={{ px: 2, pt: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Leave Details',
                        path: '/extended-sidebar/Teacher/LeaveDetails',
                    },
                    {
                        title: 'Apply / Approve / Reject Leave page',
                        path: '/extended-sidebar/Teacher/AddLeaveDetails',
                    }
                ]}
            />
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Datepicker
                        DateValue={StartDate}
                        onDateChange={onSelectStartDate}
                        label={'Start Date'}
                        size={"medium"}
                    />
                    <ErrorMessage1 Error={ErrorStartDate}></ErrorMessage1>
                   
                </Grid>
                <Grid item xs={12} md={4}>
                    <Datepicker
                        DateValue={EndDate}
                        onDateChange={onSelectEndDate}
                        label={'End Date'}
                        size={"medium"}
                    />
                    <ErrorMessage1 Error={ErrorEndDate}></ErrorMessage1>
                   
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Total Days"
                        value={TotalDays}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={12} container justifyContent="center">
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                        <Button variant={'contained'} color="success">
                            SUBMIT
                        </Button>
                        <Button variant={'contained'} color="error" onClick={resetForm}>
                            CLEAR
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddLeaveDetails;
