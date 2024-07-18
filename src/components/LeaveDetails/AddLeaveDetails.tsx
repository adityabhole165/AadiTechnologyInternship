import { Check, Close } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Accordion, AccordionSummary, Alert, Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IGetViewLeaveBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import Datepicker from "src/libraries/DateSelector/Datepicker";
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { getLeaveBalance, LeaveTypeDropdown } from 'src/requests/LeaveDetails/RequestAddLeave';
import { getViewLeaveDetails } from 'src/requests/LeaveDetails/RequestLeaveDetails';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const AddLeaveDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { LeaveDId } = useParams();
    console.log(LeaveDId, "LeaveDId");
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const [asUserId, setasUserId] = useState(Number(localStorage.getItem('UserId')));
    const [SenderName, setSenderName] = useState(asUserId == undefined ? "0" : asUserId);
    const [StartDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [EndDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [TotalDays, setTotalDays] = useState(1);
    const [SelectLeaveType, setLeaveType] = useState("0");
    const [Description, setDescription] = useState('');
    const [Remark, setRemark] = useState('');
    const [Remark1, setRemarkError] = useState('');
    const [ErrorStartDateblank, setErrorStartDateblank] = useState('');
    const [ErrorEndDateblank, setErrorEndDateblank] = useState('');
    const [ErrorStartDate, setErrorStartDate] = useState('');
    const [ErrorEndDate1, setErrorEndDate1] = useState('');
    const [ErrorEndDate2, setErrorEndDate2] = useState('');
    const [ErrorStartDate2, setErrorStartDate2] = useState('');
    const [ErrorEndDate, setErrorEndDate] = useState('');
    const [DescriptionError, setDescriptionError] = useState('');


    const GetViewLeave = useSelector(
        (state: RootState) => state.LeaveDetails.ViewLeaveDetails
    );
    console.log(GetViewLeave, "GetViewLeave");
    const GetLeaveTypeDropdown = useSelector(
        (state: RootState) => state.AddLeaveDetails.LeaveTypeDropdown
    );
    const GetLeaveBalance = useSelector(
        (state: RootState) => state.AddLeaveDetails.LeaveBalanceNote
    );
    console.log(GetLeaveBalance, "GetLeaveBalance");

    const Note2 = [
        ' If leave start date or end date is across the month, then the system will update leave for only the days that are in the upcoming salary publish month.'
    ];

    useEffect(() => {
        if (LeaveDId != undefined && GetViewLeave.length > 0 && GetViewLeave[0] != null) {
            const ViewLeave = GetViewLeave[0]
            setSenderName(ViewLeave.Text1);
            setStartDate(ViewLeave.Text2)
            setEndDate(ViewLeave.Text3)
            setTotalDays(ViewLeave.Text4)
            setLeaveType(ViewLeave.LeaveType)
            setDescription(ViewLeave.Text5)
            setasUserId(ViewLeave.UserId)
        }
        console.log(SelectLeaveType, "SelectLeaveType")
    }, [GetViewLeave]);

    useEffect(() => {
        const start = new Date(StartDate);
        const end = new Date(EndDate);
        const timeDiff = end.getTime() - start.getTime();
        let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);
        if (daysDiff < 0) {
            daysDiff = 0;
        }
        setTotalDays(daysDiff);
    }, [StartDate, EndDate]);

    useEffect(() => {
        if (LeaveDId) {
            const GetViewLeaveBody: IGetViewLeaveBody = {
                asSchoolId: asSchoolId,
                asUserId: asUserId,
                asId: Number(LeaveDId)  //Id for ViewDetails
            }
            dispatch(getViewLeaveDetails(GetViewLeaveBody))
        }
    }, [LeaveDId]);

    const LeaveTypeDropdownBody = {
        asSchoolId: asSchoolId
    };
    useEffect(() => {
        dispatch(LeaveTypeDropdown(LeaveTypeDropdownBody))
    }, []);
    useEffect(() => {
        if (asUserId) {
            const GetLeaveBalanceBody = {
                asSchoolId: asSchoolId,
                asUserId: asUserId,
            };
            dispatch(getLeaveBalance(GetLeaveBalanceBody));
        }
    }, [asUserId]);

    const onSelectStartDate = (value) => {
        setStartDate(value);
    };

    const onSelectEndDate = (value) => {
        setEndDate(value);
    };
    const clickLeaveTypeDropdown = (value) => {
        setLeaveType(value);
    };
    const clear = () => {
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date().toISOString().split('T')[0]);
        setTotalDays(1);
        setDescription('')
    };

    useEffect(() => {
        if (StartDate === null || EndDate === null) {
            setTotalDays(0);
        }
    }, [StartDate, EndDate])

    const resetForm = () => {
        clear();
        //navigate('/extended-sidebar/Teacher/LeaveDetails');
    };



    const rightActions = (
        <>
            <Tooltip title={'Here you can Apply for, Approve, or Reject leave requests.'}>
                <IconButton
                    sx={{
                        bgcolor: grey[500],
                        color: 'white',
                        '&:hover': {
                            bgcolor: grey[600],
                        },
                    }}
                >
                    <QuestionMark />
                </IconButton>
            </Tooltip>


            {LeaveDId === undefined ? (
                <>
                    <Tooltip title={'Cancel'}>
                        <IconButton
                            sx={{
                                color: 'white',
                                backgroundColor: red[500],
                                height: '36px !important',
                                ':hover': { backgroundColor: red[600] }
                            }}
                            onClick={undefined}
                        >
                            <Close />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={'Submit'}>
                        <IconButton
                            onClick={undefined}
                            sx={{
                                backgroundColor: green[500],
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: green[600]
                                }
                            }}
                        >
                            <Check />
                        </IconButton>
                    </Tooltip></>) : null}
            {/* <>
                    <Tooltip title={'Reject'}>
                        <IconButton
                            sx={{
                                backgroundColor: red[500],
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: red[600]
                                }
                            }}
                            onClick={undefined}
                        >
                            <PersonRemove />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Approve'}>
                        <IconButton
                            sx={{
                                backgroundColor: green[500],
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: green[600]
                                }
                            }}
                            onClick={undefined}
                        >
                            <HowToReg />
                        </IconButton>
                    </Tooltip></>} */}
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
                    LeaveDId ?
                        {
                            title: 'Apply / Approve / Reject Leave page',
                            path: '/extended-sidebar/Teacher/AddLeaveDetails/',
                        } :
                        {
                            title: 'Apply / Approve / Reject Leave page',
                            path: '/extended-sidebar/Teacher/AddLeaveDetails',
                        }
                ]}
                rightActions={rightActions}
            />
            <Box sx={{ p: 0.5, background: 'white' }}>
                <Grid item xs={12}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>Important Notes</Typography>
                        </AccordionSummary>
                        <Grid item xs={12}>
                            <Alert variant="filled" severity="info" sx={{ mb: 1 }}>
                                <b>Note 1 :</b> <>Leave balance </>{GetLeaveBalance.filter(item => !item.IsUnpaidLeave).map(item => `${item.Text1}(${item.Text2})`).join(', ')}
                            </Alert>
                            <Alert variant="filled" severity="info"><b>Note 2 : </b> {Note2}</Alert>
                        </Grid>
                    </Accordion>
                </Grid>
            </Box>
            <Box sx={{ p: 2, background: 'white' }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            label={<>
                                Teacher <span style={{ color: 'red' }}>*</span>
                            </>}
                            sx={{ bgcolor: '#D3D3D3' }}
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
                        <ErrorMessage1 Error={ErrorStartDate}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorStartDate2}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorStartDateblank}></ErrorMessage1>


                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Datepicker
                            DateValue={EndDate}
                            onDateChange={onSelectEndDate}
                            label={'End Date'}
                            size={"medium"}
                        />
                        <ErrorMessage1 Error={ErrorEndDate}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorEndDate1}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorEndDate2}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorEndDateblank}></ErrorMessage1>
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
                    <Grid item xs={12} md={4}>
                        <SearchableDropdown
                            sx={{ minWidth: '20vw' }}
                            ItemList={GetLeaveTypeDropdown}
                            defaultValue={SelectLeaveType}
                            onChange={clickLeaveTypeDropdown}
                            label='Leave Type'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={<>
                                Description <span style={{ color: 'red' }}>*</span>
                            </>}
                            multiline
                            rows={3}
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            error={DescriptionError !== ''}
                            helperText={DescriptionError}
                        />
                    </Grid>
                    {(LeaveDId !== undefined && Number(LeaveDId) == asUserId) ? (
                        <Grid item xs={12} >
                            <TextField
                                label={<>
                                    Remark <span style={{ color: 'red' }}>*</span>
                                </>}
                                multiline
                                rows={3}
                                value={Remark}
                                onChange={(e) => {
                                    setRemark(e.target.value);
                                }}
                                fullWidth
                                error={Remark1 !== ''}
                                helperText={Remark1}
                            >
                            </TextField>
                        </Grid>) : null}
                </Grid >
            </Box>
        </Box >
    );
};

export default AddLeaveDetails;
