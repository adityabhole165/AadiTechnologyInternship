import { Save } from '@mui/icons-material';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Alert, Box, Button, Grid, IconButton, Stack, TextField, Tooltip } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IGetViewLeaveBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import Datepicker from "src/libraries/DateSelector/Datepicker";
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
import { getViewLeaveDetails } from 'src/requests/LeaveDetails/RequestLeaveDetails';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const AddLeaveDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { LeaveId } = useParams();
    console.log(LeaveId, "LeaveId");

    const [SenderName, setSenderName] = useState('');
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
    console.log(GetViewLeave, "GetViewLeave");

    const Note1 = [
        ' Leave Balance : CL(3.00), SL(113.00), EL(180.00), A(Unpaid), ML(0.00), LWP(Unpaid), Off(0.00), O.D.(0.00)'
    ];
    const Hedaer1 = ['Note 1:'];
    const Note2 = [
        ' If leave start date or end date is across the month, then the system will update leave for only the days that are in the upcoming salary publish month.'
    ];
    const Hedaer2 = ['Note 2:'];

    useEffect(() => {
        if (LeaveId != undefined && GetViewLeave.length > 0 && GetViewLeave[0] != null) {
            const ViewLeave = GetViewLeave[0]
            setSenderName(ViewLeave.Text1);
            setStartDate(ViewLeave.Text2)
            setEndDate(ViewLeave.Text3)
            setTotalDays(ViewLeave.Text4)
            setDescription(ViewLeave.Text5)
        }
    }, [GetViewLeave]);

    useEffect(() => {
        const start = new Date(StartDate);
        const end = new Date(EndDate);
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(daysDiff);
    }, [StartDate, EndDate]);

    useEffect(() => {
        if (LeaveId) {
            const GetViewLeaveBody: IGetViewLeaveBody = {
                asSchoolId: 18,
                asUserId: 5488,
                asId: Number(LeaveId)  //Id for ViewDetails
            }
            dispatch(getViewLeaveDetails(GetViewLeaveBody))
        }
    }, [LeaveId, dispatch]);

    const onSelectStartDate = (value) => {
        setStartDate(value);
    };

    const onSelectEndDate = (value) => {
        setEndDate(value);
    };

    const clear = () => {
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date().toISOString().split('T')[0]);
        setTotalDays(1);
        setDescription('')
    };

    const resetForm = () => {
        clear();
        //navigate('/extended-sidebar/Teacher/LeaveDetails');
    };

    const rightActions = (
        <>
            <Tooltip title={'Declare a new Leave.'}>
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

            <Tooltip title={'Save'}>
                <IconButton
                    onClick={undefined}
                    sx={{
                        background: green[500],
                        color: 'white',
                        '&:hover': {
                            backgroundColor: green[600]
                        }
                    }}
                >
                    <Save />
                </IconButton>
            </Tooltip>
        </>
    );

    return (
        <Box sx={{ px: 2 }}>
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
                rightActions={rightActions}
            />
            <Box sx={{ p: 2, background: 'white' }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            label={<>
                                Teacher <span style={{ color: 'red' }}>*</span>
                            </>}
                            sx={{ bgcolor: '#f0e68c' }}
                            InputProps={{
                                readOnly: true,
                            }}
                            value={SenderName}
                        />
                    </Grid>
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
                    <Grid item xs={12}>
                        <Alert variant="filled" severity="info" sx={{ mb: 1 }}><b>Note 1 : </b> {Note1}</Alert>
                        <Alert variant="filled" severity="info"><b>Note 2 : </b> {Note2}</Alert>
                    </Grid>
                    {LeaveId == undefined ?
                    <Grid item xs={12} md={12}>
                        <Stack direction={"row"} gap={2} alignItems={"center"}>

                            <Button sx={{
                                // backgroundColor: green[100],
                                color: 'red',
                                ':hover': { backgroundColor: red[100] }
                            }} onClick={resetForm}>
                                Clear
                            </Button>
                            <Button sx={{
                                // backgroundColor: green[100],
                                color: 'green',
                                ':hover': { backgroundColor: green[100] }
                            }} onClick={undefined}>
                                Submit
                            </Button>
                        </Stack>
                    </Grid> : null
                     }
                </Grid >
            </Box>
        </Box >
    );
};

export default AddLeaveDetails;
