
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Datepicker from "src/libraries/DateSelector/Datepicker";
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
import CommonPageHeader from '../CommonPageHeader';
import { IGetViewLeaveBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getViewLeaveDetails } from 'src/requests/LeaveDetails/RequestLeaveDetails';
import { RootState } from 'src/store';
import { getCalendarDateFormatDate } from '../Common/Util';

const AddLeaveDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { LeaveId } = useParams();
    console.log(LeaveId,"LeaveId");
    
    const [StartDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [EndDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [TotalDays, setTotalDays] = useState(1);
    const [ErrorStartDate, setErrorStartDate] = useState('');
    const [ErrorEndDate, setErrorEndDate] = useState('');
    const [Description, setDescription] = useState('');
    const [DescriptionError, setDescriptionError] = useState('');



    const GetViewLeave = useSelector(
        (state: RootState) => state.LeaveDetails.ViewLeaveDetails
    );
    console.log(GetViewLeave,"GetViewLeave");
    

    useEffect(() => {
        const start = new Date(StartDate);
        const end = new Date(EndDate);
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(daysDiff);
    }, [StartDate, EndDate]);

    useEffect(() => {
        if(LeaveId){
            const GetViewLeaveBody : IGetViewLeaveBody = {
                asSchoolId: 18,
                asUserId: 5488,
                asId: Number(LeaveId)  //Id for ViewDetails
            }
            dispatch(getViewLeaveDetails(GetViewLeaveBody))
        }
    }, []);

    // useEffect(() => {
    //     if(GetViewLeave){
    //         const Leave = GetViewLeave[0];
    //         // setStartDate(getCalendarDateFormatDate(Leave.Text2));
    //         // setEndDate(getCalendarDateFormatDate(Leave.Text3));
    //         setDescription(Leave.Text5);
    //         setTotalDays(Leave.Text4);
    //     }
    // }, [GetViewLeave]);

    const onSelectStartDate = (value) => {
        setStartDate(value);
    };

    const onSelectEndDate = (value) => {
        setEndDate(value);
    };
    const clear= () => {
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date().toISOString().split('T')[0]);
        setTotalDays(1);
        setDescription('')
    }
    const resetForm = () => {
        clear();
        //navigate('/extended-sidebar/Teacher/LeaveDetails');
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
                    <ErrorMessage1 Error={ErrorStartDate} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Datepicker
                        DateValue={EndDate}
                        onDateChange={onSelectEndDate}
                        label={'End Date'}
                        size={"medium"}
                    />
                    <ErrorMessage1 Error={ErrorEndDate} />
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
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        error={DescriptionError !== ''}
                        helperText={DescriptionError}
                    />
                </Grid>
                <Grid item xs={2}>
                        <Box sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px'}}>
                        <Typography variant="body1" fontWeight="bold">
                            Note 1:
                        </Typography>
                        </Box>
                        </Grid>
                        <Grid item xs={9}>
                        <Box>
                            <Typography variant="body1">
                               Leave Balance : CL(3.00), SL(113.00), EL(180.00), A(Unpaid), ML(0.00), LWP(Unpaid), Off(0.00), O.D.(0.00)
                            </Typography>
                        </Box>
                </Grid>
                <Grid item xs={2}>
                        <Box sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px'}}>
                        <Typography variant="body1" fontWeight="bold">
                            Note 2:
                        </Typography>
                        </Box>
                        </Grid>
                        <Grid item xs={9}>
                        <Box>
                            <Typography variant="body1">
                                If leave start date or end date is across the month, then the system will update leave for only the days that are in the upcoming salary publish month.
                            </Typography>
                        </Box>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                    <Stack direction="row" gap={2} alignItems="center">
                        <Button variant="contained" color="success">
                            SUBMIT
                        </Button>
                        <Button variant="contained" color="error" onClick={resetForm}>
                            CLEAR
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddLeaveDetails;
