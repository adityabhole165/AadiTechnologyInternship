import { Check, Close } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Grid, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { IGetIsValidateLeaveDateBody, IGetSubmitLeaveBody } from 'src/interfaces/LeaveDetails/IAddLeaveDetails';
import { IGetViewLeaveBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import Datepicker from "src/libraries/DateSelector/Datepicker";
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { getLeaveBalance, getSubmitLeave, LeaveTypeDropdown, resetSubmitLeave, StartDateEndDateValidations } from 'src/requests/LeaveDetails/RequestAddLeave';
import { getViewLeaveDetails } from 'src/requests/LeaveDetails/RequestLeaveDetails';
import { RootState } from 'src/store';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';
import { formatDateAsDDMMMYYYY, getCalendarDateFormatDateNew, isLessThanDate, isOutsideAcademicYear } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const AddLeaveDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { LeaveDId } = useParams();
    console.log(LeaveDId, "LeaveDId");
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const aUserId = Number(localStorage.getItem('UserId'));
    const asSenderName = sessionStorage.getItem('StudentName');
    const [asUserId, setasUserId] = useState(Number(localStorage.getItem('UserId')));
    const [SenderName, setSenderName] = useState(asUserId == undefined ? "0" : asSenderName);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [TotalDays, setTotalDays] = useState('');
    const [SelectLeaveType, setLeaveType] = useState("0");
    const [ErrorLeaveType, setErrorLeaveType] = useState(" ");
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
    const [TotalDaysError, setTotalDaysError] = useState('')
    const [TotalDaysError1, setTotalDaysError1] = useState('')


    const GetViewLeave = useSelector(
        (state: RootState) => state.LeaveDetails.ViewLeaveDetails
    );
    const GetLeaveTypeDropdown = useSelector(
        (state: RootState) => state.AddLeaveDetails.LeaveTypeDropdown
    );
    const GetLeaveBalance = useSelector(
        (state: RootState) => state.AddLeaveDetails.LeaveBalanceNote
    );
    const SubmitLeaveDetails = useSelector(
        (state: RootState) => state.AddLeaveDetails.SubmitLeave);
    const StartDateEndDateValidation = useSelector(
        (state: RootState) => state.AddLeaveDetails.StartDateEndDateValidations);
    const USApproveorRejectLeaveDetails = useSelector(
        (state: RootState) => state.AddLeaveDetails.ApproveorReject);
    console.log(USApproveorRejectLeaveDetails, "USApproveorRejectLeaveDetails");

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
    }, [GetViewLeave]);

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

    const SubmitLeaveBody: IGetSubmitLeaveBody = {
        asId: 0,
        asUserId: asUserId,
        asLeaveId: Number(SelectLeaveType),
        asStartDate: StartDate,
        asEndDate: EndDate,
        asTotalDays: Number(TotalDays),
        asChargeHandoverTo: 0,
        asDescription: Description,
        asSchoolId: asSchoolId,
        asInsertedById: asUserId,
        asAcademicYearId: Number(asAcademicYearId)
    }

    useEffect(() => {
        const StartDateValidationBody: IGetIsValidateLeaveDateBody = {
            asSchoolId: asSchoolId,
            aasStartDate: StartDate,
            aasEndDate: EndDate,
            asUserId: asUserId,
            asLeaveConfigId: 0,

        }
        dispatch(StartDateEndDateValidations(StartDateValidationBody));

    }, [StartDate, EndDate])

    const onSelectStartDate = (value) => {
        setStartDate(getCalendarDateFormatDateNew(value));
    };

    const onSelectEndDate = (value) => {
        setEndDate(getCalendarDateFormatDateNew(value));
    };

    const clickLeaveTypeDropdown = (value) => {
        setLeaveType(value);
    };
    // const onTotalDays = (value) => {
    //     setTotalDays(value)
    // }
    const clear = () => {
        setStartDate('');
        setEndDate('');
        setErrorStartDate('');
        setErrorEndDate('');
        setErrorEndDate1('');
        setTotalDays('');
        setDescription('')
        setLeaveType('0');
        setErrorStartDateblank('')
        setErrorEndDateblank('')
        setErrorEndDate2('')
        setErrorLeaveType('')
        setTotalDaysError('')
        setTotalDaysError1('')
        setDescriptionError('')

    };

    const resetForm = () => {
        clear();
        //navigate('/extended-sidebar/Teacher/LeaveDetails');
    };
    const calculateTotalDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1); // +1 to include both start and end dates
        return daysDiff < 0 ? 0 : daysDiff;
    };

    // useEffect(() => {
    //     if (StartDate && EndDate) {
    //         const daysDiff = calculateTotalDays(StartDate, EndDate);
    //         setTotalDays(daysDiff.toString());
    //     }
    // }, [StartDate, EndDate]);

    const ClickSubmit = () => {
        let isError = false;
        let dateError = false;

        // if (StartDate === '') {
        //     setErrorStartDate2('Please choose a valid start date.');
        //     dateError = true
        //     isError = true;
        // } else setErrorStartDate2('')
        if (StartDate === '') {
            setErrorStartDateblank('Start date should not be blank.');

            dateError = true
            isError = true;
        } else setErrorStartDateblank('')
        // if (EndDate == '') {
        //     setErrorEndDate('Please choose a valid End date.');
        //     dateError = true
        //     isError = true;
        // } else setErrorEndDate('')

        if (EndDate == '') {
            setErrorEndDateblank('End date should not be blank.');
            dateError = true
            isError = true;
        } else setErrorEndDateblank('')
        if (dateError == false) {
            if (isOutsideAcademicYear(StartDate)) {
                setErrorStartDate('Leave start date must be within current academic year (i.e between ' +
                    formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' and ' +
                    formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ').');
                dateError = true
                isError = true;
            } else setErrorStartDate('')

            if (isOutsideAcademicYear(EndDate)) {
                setErrorEndDate('Leave end date must be within current academic year (i.e between ' +
                    formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' and ' +
                    formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ').');
                dateError = true
                isError = true;
            } else {
                setErrorEndDate('')
            }

        }
        if (isLessThanDate(EndDate, StartDate)) {
            setErrorEndDate1('End date should not be less than start date.');
            dateError = true
            isError = true;
        } else setErrorEndDate1('')
        if (StartDateEndDateValidation == false && EndDate !== '') {
            setErrorEndDate2("Leave dates should not overlap on another leave day's.");
            isError = true;
        } else setErrorEndDate2('')
        if (SelectLeaveType == '0') {
            setErrorLeaveType('Leave type should be selected.');
            isError = true;
        } else setErrorLeaveType('')
        if (Description.length > 200 || Description == '') {
            setDescriptionError('Description should be less than 200 characters.');
            setDescriptionError('Description should not blank.');
            isError = true;
        } else setDescriptionError('')
        // console.log(isError, "Remark")
        // if (Remark.length > 200 || Remark == '') {
        //     setRemarkError('Remark should be less than 200 characters.');
        //     isError = true;
        // } else setRemarkError('')
        if (TotalDays == '') {
            setTotalDaysError('Total days should not be blank.');
            isError = true;
        } else setTotalDaysError('')

        const calculatedDays = calculateTotalDays(StartDate, EndDate);
        if (TotalDays !== calculatedDays.toString() && TotalDays !== '') {
            setTotalDaysError1('Total days should match with the given date range.');
            isError = true;
        } else {
            setTotalDaysError1('');
        }
        if (!isError) {
            dispatch(getSubmitLeave(SubmitLeaveBody));
        }

    };
    useEffect(() => {
        if (SubmitLeaveDetails != "") {

            if (LeaveDId) {
                toast.success("Leave details updated successfully.", { toastId: "success1" });
            } else {
                toast.success("Leave details saved successfully.", { toastId: "success1" });
            }
            dispatch(resetSubmitLeave());
            navigate('/extended-sidebar/Teacher/LeaveDetails');
        }
    }, [SubmitLeaveDetails])
    // useEffect(() => {
    //     if (StartDate === null || EndDate === null) {
    //         setTotalDays('');
    //     }
    // }, [StartDate, EndDate])
    const rightActions = (
        <>
            <Tooltip title={'Here you can apply for, approve, or reject leave requests.'}>
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
                    <Tooltip title={'Clear'}>
                        <IconButton
                            sx={{
                                color: 'white',
                                backgroundColor: red[500],
                                height: '36px !important',
                                ':hover': { backgroundColor: red[600] }
                            }}
                            onClick={resetForm}
                        >
                            <Close />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={'Submit'}>
                        <IconButton
                            onClick={ClickSubmit}
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
            <Paper sx={{ mb: '10px' }}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>Important Notes</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ gap: 0.1, display: 'flex', flexDirection: 'column' }}>
                        <Alert variant="filled" severity="info" sx={{ mb: 1, mt: '0.1px' }}>
                            <b>Note 1 :</b> <>Leave balance </>{GetLeaveBalance.filter(item => !item.IsUnpaidLeave).map(item => `${item.Text1}(${item.Text2})`).join(', ')}
                        </Alert>
                        <Alert variant="filled" severity="info"><b>Note 2 : </b> {Note2}</Alert>
                    </AccordionDetails>
                </Accordion>
            </Paper>
            <Box sx={{ p: 2, background: 'white' }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            label={<>
                                Staff Name
                            </>}
                            sx={{ bgcolor: '#F0F0F0' }}
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
                            // label="Total Days"
                            label={<>
                                Total Days <span style={{ color: 'red' }}>*</span>
                            </>}
                            value={TotalDays}
                            onChange={(e) => setTotalDays(e.target.value)}
                            fullWidth
                        />
                        <ErrorMessage1 Error={TotalDaysError}></ErrorMessage1>
                        <ErrorMessage1 Error={TotalDaysError1}></ErrorMessage1>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SearchableDropdown
                            sx={{ minWidth: '20vw' }}
                            ItemList={GetLeaveTypeDropdown}
                            onChange={clickLeaveTypeDropdown}
                            label={'Leave Type'}
                            defaultValue={SelectLeaveType}
                            mandatory />
                        <ErrorMessage1 Error={ErrorLeaveType}></ErrorMessage1>
                    </Grid>
                    <Grid item xs={12}>
                        <ResizableTextField
                            label={<>
                                Description <span style={{ color: 'red' }}>*</span>
                            </>}
                            multiline
                            // rows={3}
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        // error={DescriptionError != ''}
                        // helperText={DescriptionError}
                        />
                        <ErrorMessage1 Error={DescriptionError}></ErrorMessage1>
                    </Grid>
                    {/* {(LeaveDId !== undefined && Number(LeaveDId) == asUserId) ? (
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
                        </Grid>) : null} */}
                </Grid >
            </Box>
        </Box >
    );
};

export default AddLeaveDetails;
