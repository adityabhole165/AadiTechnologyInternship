import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SendIcon from '@mui/icons-material/Send';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Paper, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import GetMessageTemplateAdminSMSListApi from 'src/api/AdminSMSCenter/AComposeSMS';
import { Styles } from 'src/assets/style/student-style';
import TimepickerTwofields from 'src/components/AddSchoolNitice/TimepickerTwofields';
import { formatAMPM, getCalendarDateFormatDateNew, isFutureDateTime } from 'src/components/Common/Util';
import CommonPageHeader from 'src/components/CommonPageHeader';
import ACompose_SendSMS, { MessageTemplateSMSCenter } from 'src/interfaces/AdminSMSCenter/ACompose_SendSMS';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
import { CardDetail2 } from 'src/libraries/styled/CardStyle';
import { getAComposeSMSTemplateList } from 'src/requests/AdminSMSCenter/AComposeSMS';
import { RootState } from 'src/store';
import AddReciepentsSMS from './AddReciepientSMS';

const ComposeSMSform = () => {
    const classes = Styles();
    const navigate = useNavigate();
    const theme = useTheme();
    toast.configure();
    const [isManualEntryEnabled, setIsManualEntryEnabled] = useState(false);
    const [mobileNumbers, setMobileNumbers] = useState('');
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [displayOfTo_RecipientsPage, setdisplayOfTo_RecipientsPage] = useState<any>('none');
    const [displayOfCompose_Page, setdisplayOfCompose_Page] = useState<any>('block');
    const [schTimeerror, setSchTimeerror] = useState('');
    const [scheduleSMS, setScheduleSMS] = useState('none');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = React.useState(new Date());
    const [requestSchedule, setRequestSchedule] = useState(false);
    const [requestScheduleMsg, setRequestScheduleMsg] = useState('');
    const [RecipientsArray, setRecipientsArray] = useState(
        {
            RecipientName: [],
            RecipientId: []
        }
    );
    const [RecipientsObject, setRecipientsObject] = useState<any>({
        RecipientName: [],
        RecipientId: [],
        ClassId: [],
        ContactGroup: []
    });

    const To_Recipients_Page = (e) => {
        setdisplayOfTo_RecipientsPage('block');
        setdisplayOfCompose_Page('none');
    };
    const [StartTime, setStartTime] = useState('00:00');

    const TodayDate = new Date();
    const curTimeH = TodayDate.getHours() % 12 || 12;
    const curTimeM = TodayDate.getMinutes();
    const CurrTIME = curTimeH + ':' + curTimeM;
    const [scheduleDate, setscheduleDate] = useState<string>('');
    const Day = TodayDate.getDate().toString().padStart(2, '0');
    const Month = (TodayDate.getMonth() + 1).toString().padStart(2, '0');
    const Year = TodayDate.getFullYear();
    const MinDate = `${Year}-${Month}-${Day}`;

    let maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const Day7FromToday = maxDate.getDate().toString().padStart(2, '0');
    const Month7FromToday = (maxDate.getMonth() + 1).toString().padStart(2, '0');
    const Year7FromToday = maxDate.getFullYear();
    const MaxDate = `${Year7FromToday}-${Month7FromToday}-${Day7FromToday}`;
    // Tool Tip  =================================
    const Note1: string =
        'Do not use any website URL or mobile number in SMS text.Such SMS will not get delivered to selected recipient(s)';

    const getAComposeSMSTemplate: any = useSelector((state: RootState) => state.getAComposeSMS.AComposeSMSTemplateList);
    const TemplateList = getAComposeSMSTemplate.GetSMSTemplates;
    const [ContentTemplateDependent, setContentTemplateDependent] = useState<any>();
    const [TemplateRegistrationId, setTemplateRegistrationId] = useState();
    let confirmationDone;
    const [contentError, setcontentError] = useState<any>(); // For content Error
    const [initialMessage, setinitialMessage] = useState(0);
    const [initialCount, setCharacterCount] = useState(0);
    const { AssignedDate } = useParams();
    const [form, setForm] = useState({
        scheduleSMS: false,
        scheduledDate: null,
        scheduledTime: null
    });

    const [errors, setErrors] = useState({
        scheduledDate: false,
        scheduledTime: false
    });
    // Getting data from useNavigate state via useLocation
    const location = useLocation();
    const { state } = location;
    // state: { activeNoList }
    useEffect(() => {
        if (state) {
            let updatedList = state?.activeNoList.split(',');
            // Ensure that all numbers are trimmed of any leading/trailing spaces
            const trimmedActiveNoList = updatedList.map(num => num.trim());

            // Concatenate the trimmed list to existing mobileNumbers
            setMobileNumbers(mobileNumbers?.concat(trimmedActiveNoList));
        }
    }, [state]);


    const handleChangeForTemplate = (e) => {
        if (e.target.value != '') {
            const indexValue = e.target.value.indexOf(',')
            const templateId = e.target.value.slice(0, indexValue);
            const templateText = e.target.value.slice(indexValue,).replace(',', '');

            if (templateText.length >= 300) {
                toast.error('More than 300 characters not allowed');
            }
            if (templateText.length >= 1 && templateText.length <= 160) {
                setinitialMessage(1);
                setContentTemplateDependent(templateText);
                setTemplateRegistrationId(templateId)
            }
            if (templateText.length > 160) {
                {
                    confirmationDone = confirm(
                        'SMS will be send in 2 parts for each selected user(s). Are you sure to continue?'
                    );
                }
                setinitialMessage(2);
                setContentTemplateDependent(templateText);
                setTemplateRegistrationId(templateId)
            }
            if (templateText.length == 0) {
                setinitialMessage(0);
            }
            setCharacterCount(templateText.length);
        }
        else {
            setContentTemplateDependent('');
            setCharacterCount(0)
            setinitialMessage(0);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const ContentFieldBlur = (e) => {
        setcontentError(false);
    };

    // To field Error

    const [ToError, setToError] = useState<any>(); // To Error

    const ToFieldChange = (e) => {
        if (e.target.length > 0) {
            setToError(false);
        }
        if (e.target.length == 0) {
            setToError(true);
        }
    };

    const ToFieldOnBlur = (e) => {
        if (e.target.value.length == 0) {
            setToError(true);
        }
        if (e.target.value.length > 0) {
            setToError(false);
        }
    };

    const ToFieldFocus = (e) => {
        setToError(false);
    };

    // Input value for teacher list ,student list ,other staff and admin staff
    const dispatch = useDispatch();

    // List of classes of students
    const getSendSMS: any = useSelector(
        (state: RootState) => state.getASendSMS.ASendSMS
    );
    const handleOpenDialog = (isRecipients) => {
        setOpenDialog(true);
    };


    // Validate numbers - check if each is 10 digits long
    const validateNumbers = (value) => {
        const numbers = value.split(',').map((num) => num.trim());
        const invalidNumbers = numbers.filter((num) => num.length !== 10 || isNaN(num));

        if (invalidNumbers.length > 0) {
            setError('Each number must be 10 digits.');
        } else {
            setError('');
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMobileNumbers(value);

        // Validate the entered numbers
        validateNumbers(value);
    };

    // Handle checkbox change to enable/disable input field
    const handleCheckboxChange = () => {
        setIsManualEntryEnabled((prev) => !prev);

        // Clear the input and error if checkbox is unchecked
        if (isManualEntryEnabled) {
            setMobileNumbers('');
            setError('');
        }
    };

    // Api body of Admin SMS Template
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = sessionStorage.getItem('Id');
    const schoolName = localStorage.getItem('SchoolName');
    const userRoleId = sessionStorage.getItem('RoleId');
    const SchoolSettingsValue = JSON.parse(
        localStorage.getItem('SchoolSettingsValue')
    );
    const senderUserName = SchoolSettingsValue.SMSSenderUserName;

    const getTemplateAPIBody: MessageTemplateSMSCenter = {
        asSchoolId: asSchoolId,
        sortDirection: 'asc',
        asShowSystemDefined: 'Y'
    };

    const formik = useFormik({
        initialValues: {
            From: senderUserName,
            To: RecipientsArray.RecipientName.toString(),
            Content: ContentTemplateDependent
        },
        onSubmit: () => {
            submitResult();
        },
        validate: (values) => {
            const errors: any = {};
            if (RecipientsArray.RecipientName.toString().length == 0) {
                errors.To = 'Atleast one recipient should be selected.';
            }
            if (ContentTemplateDependent == undefined || ContentTemplateDependent == '') {
                errors.Content = 'SMS content should not be blank please select SMS Template';
            }
            return errors;
        }
    });

    // Send SMS
    const submitResult = () => {

        const sendSMSAPIBody: ACompose_SendSMS = {
            asSchoolId: asSchoolId,
            aoMessage: {
                Body: ContentTemplateDependent,
                Subject: "",
                SenderName: senderUserName,
                DisplayText: RecipientsArray.RecipientName.toString(),
                SenderUserId: asUserId,
                SenderUserRoleId: userRoleId,
                AcademicYearId: asAcademicYearId,
                SchoolId: asSchoolId,
                InsertedById: asUserId,
                Attachment: ""
            },
            asSelectedUserIds: RecipientsArray.RecipientId.toString(),
            asSelectedStDivId: "",
            asIsSoftwareCordinator: 0,
            asMessageId: 0,
            sIsReply: "N",
            asIsForward: "N",
            asSchoolName: schoolName,
            asTemplateRegistrationId: TemplateRegistrationId
        }
        GetMessageTemplateAdminSMSListApi.SendSMS(sendSMSAPIBody)
            .then((res: any) => {
                if (res.status === 200) {
                    toast.success('SMS sent successfully');
                    navigate('/extended-sidebar/SMSCenter/smsCenter')
                    formik.resetForm();
                }
            })
            .catch((err) => {
                toast.error('SMS does not sent successfully');
            });
    }


    // SMS Template
    useMemo(() => {
        dispatch(getAComposeSMSTemplateList(getTemplateAPIBody));
    }, []);

    const note =
        ['Do not use any website URL or mobile number in SMS text. Such SMS will not get delivered to selected recipient(s).'];
    const note1 =
        ['SMS Schedule should be set after 1 hour and within 7 days range from now.'];
    const note2 =
        ['Enter multiple mobile numbers seperated by comma. Max 10 digit number.'];

    const [open1, setOpen1] = useState(false);
    const handleClick1 = () => {
        setOpen1((prev) => !prev);
    };
    const handleClickAway = () => {
        setOpen1(false);
    };

    const displayPropertyFun = (e) => {
        if (e == 'none') {
            setdisplayOfTo_RecipientsPage(e);
            setdisplayOfCompose_Page('block');
        }
    };

    const RecipientsListFun = (e) => {
        setRecipientsArray(e);
        setdisplayOfTo_RecipientsPage('none');
        setdisplayOfCompose_Page('block');
    };
    const onContentChange = (value) => {
        setContentTemplateDependent(value)
        setCharacterCount(value.length)
    }

    const scheduleMessageCheckBox = (e) => {
        if (e.target.checked == true) {
            setScheduleSMS('block');
        } else {
            setScheduleSMS('none');
        }
    };
    const checkScheduleValidation = (DateTime) => {
        if (isFutureDateTime(DateTime)) {
            setSchTimeerror('');
        } else {
            setSchTimeerror('Please select future time');
        }
    };
    const clickTime = (value) => {
        const time = formatAMPM(value);
        if (scheduleDate !== '') {
            checkScheduleValidation(scheduleDate + ' ' + time);
        }
        setScheduledTime(value);
    };
    const handleInputChange1 = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };
    const handleCheckboxChange1 = (event) => {
        const isChecked = event.target.checked;
        setForm((prevForm) => ({
            ...prevForm,
            scheduleSMS: isChecked,
            // Reset date and time fields when unchecked
            scheduledDate: isChecked ? prevForm.scheduledDate : null,
            scheduledTime: isChecked ? prevForm.scheduledTime : null,
        }));
        setErrors({
            scheduledDate: false,
            scheduledTime: false
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { scheduledDate: false, scheduledTime: false };

        if (form.scheduleSMS) {
            if (!form.scheduledDate) {
                newErrors.scheduledDate = true;
                isValid = false;
            }
            if (!form.scheduledTime) {
                newErrors.scheduledTime = true;
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };
    const clickStartTime = (value) => {
        setStartTime(value);
    };


    const [SelectDate, SetSelectDate] = useState(
        AssignedDate == undefined
            ? new Date().toISOString().split('T')[0]
            : getCalendarDateFormatDateNew(AssignedDate)
    );

    const onSelectDate = (value) => {
        SetSelectDate(value);
    };


    return (
        <>

            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'SMS Center',
                            path: '/extended-sidebar/Teacher/SmsCenter',
                        },
                        { title: 'Compose SMS', path: '' }
                    ]}
                    rightActions={
                        <>
                            <Tooltip title={'Send SMS to individual student / teacher or the entire school. To send sms to other mobile numbers check Add Mobile Numbers Manually checkbox and enter mobile numbers separated by comma.'}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        '&:hover': {
                                            backgroundColor: grey[600]
                                        }
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={'Send SMS'}>
                                <IconButton
                                    onClick={formik.handleChange}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: green[500],
                                        '&:hover': {
                                            backgroundColor: green[600]
                                        }
                                    }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Tooltip>

                        </>
                    }
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
                                <b>Note 1 : </b> {note}
                            </Alert>
                            <Alert variant="filled" severity="info" sx={{ mb: 1, mt: '0.1px' }}><b>Note 2 : </b> {note1}</Alert>
                            <Alert variant="filled" severity="info"><b>Note 3 : </b> {note2}</Alert>
                        </AccordionDetails>
                    </Accordion>
                </Paper>
                <Box sx={{ backgroundColor: 'white' }} >
                    {/* <ListStyle> */}
                    {/* <Checkbox
                            onChange={scheduleMessageCheckBox}
                            onClick={() => setRequestSchedule(!requestSchedule)}
                            size="small"
                            sx={{ ml: '1px' }}
                        />
                        <Typography sx={{ display: 'inline-block' }}>
                            Schedule SMS
                        </Typography>

                        <Grid container spacing={2} mt={0}>
                            <Grid item xs={2}>
                                <Datepicker
                                    DateValue={undefined}
                                    onDateChange={(e) => setScheduledDate(e.target.value)}
                                    label=""
                                    size="medium"
                                    minDate={MinDate}
                                    maxDate={MaxDate}
                                    display={scheduleSMS}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{ display: scheduleSMS }}
                            >
                                <TimePicker
                                    value={scheduledTime}
                                    onChange={clickTime}
                                />
                            </Grid>
                        </Grid> */}
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container>
                            <Grid xs={3} mt={3.3} px={2} sm={3} md={3}>
                                <TextField
                                    sx={{ marginTop: '20px' }}
                                    variant="outlined"
                                    fullWidth
                                    name="From"
                                    label={'From'}
                                    id="from"
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    value={senderUserName}
                                />
                            </Grid>
                            <Grid xs={8} sm={8} md={7}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isManualEntryEnabled}
                                            onChange={handleCheckboxChange}
                                            color="primary"
                                        />
                                    }
                                    label="Add Mobile Numbers Manually"
                                />
                                {/* TextField for mobile numbers */}
                                <TextField
                                    disabled={!isManualEntryEnabled}
                                    multiline
                                    fullWidth
                                    placeholder="Enter multiple mobile numbers separated by commas"
                                    value={mobileNumbers}
                                    onChange={handleInputChange}
                                    error={!!error}
                                    helperText={error || '(Enter multiple mobile numbers separated by comma. Max 10-digit numbers.)'}
                                    sx={{
                                        marginTop: '8px',
                                        height: '50px',
                                        // overflow: 'auto',
                                        borderRadius: '5px',
                                    }}
                                />
                            </Grid>
                            <Grid xs={2} mt={6} sm={2} md={2} >
                                <Box ml={2}>
                                    <Button
                                        fullWidth
                                        // onClick={(e) => RecipientCCButton(e)}       
                                        // onClick={() => handleOpenDialog(false)}
                                        sx={{
                                            color: '#38548A',
                                            mt: 0.7,
                                            width: '200px',
                                            '&:hover': {
                                                color: '#38548A',
                                                backgroundColor: blue[100]
                                            }
                                        }}
                                        onClick={() => {
                                            // pass data via state > mobileNumbers
                                            navigate('/extended-sidebar/teacher/PersonalAddressBook', { state: { mobileNumbers } })
                                        }}
                                    >
                                        Personal Address book
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container p={2}>
                            <Grid xs={12}  sm={2} md={6} lg={10.1} >
                                <Box sx={{ mt: "10px" }}>
                                    <TextField
                                        name="To"
                                        placeholder='To'
                                        multiline
                                        className={classes.InputField}
                                        onChange={ToFieldChange}
                                        onBlur={ToFieldOnBlur}
                                        onFocus={ToFieldFocus}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                        value={RecipientsArray.RecipientName}
                                        variant="outlined"
                                        id="body"
                                        fullWidth
                                        margin="normal"
                                        style={{ scrollBehavior: 'auto' }}
                                        sx={{
                                            maxHeight: '60px',
                                            // overflow: 'auto'
                                        }}
                                    />
                                </Box>
                                <div style={{ marginTop: '15px' }}>
                                    <Errormessage Error={formik.errors.To} />
                                </div>
                            </Grid>
                            <Grid xs={1} mt={2} >
                                <Box mt={2} ml={2}>
                                    <Button
                                        fullWidth
                                        onClick={() => handleOpenDialog(true)}
                                        sx={{
                                            color: '#38548A',

                                            width: '140px',
                                            '&:hover': {
                                                color: '#38548A',
                                                backgroundColor: blue[100]
                                            }
                                        }}>
                                        Add Recipients
                                    </Button>
                                </Box>
                            </Grid >
                        </Grid>

                        <Grid container spacing={2} p={2}>
                        <Grid item xs={12} sm={6} md={2} lg={2} px={2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="SendMessage"
                                        // checked={form.scheduleSMS}
                                        // onChange={handleInputChange1}
                                        />
                                    }
                                    label="Send Message"
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="scheduleSMS"
                                            checked={form.scheduleSMS}
                                            onChange={handleInputChange1}
                                        />
                                    }
                                    label="Schedule SMS"
                                />
                            </Grid>
                           
                            {form.scheduleSMS && (
                                <>
                             {/* <Grid container spacing={2} pt={2} pl={2} alignItems="center"> */}
                                <Grid item xs={12} sm={6} md={3} lg={2}>
                                    <Datepicker
                                        DateValue={SelectDate}
                                        onDateChange={onSelectDate}
                                        size={'medium'}
                                        label={'Date'}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={2}>
                                    <TimepickerTwofields Item={StartTime} label={'Time'} isMandatory={false} ClickItem={clickStartTime} size={"medium"} tooltipMessage="e.g. 10:00 AM" />
                                </Grid>
                                {/* <Grid item xs={12} sm={6} md={6} lg={3}>
                                    <Typography variant="body2" color="textSecondary">
                                        e.g., 10:00 AM. SMS Schedule should be set after 1 hour
                                        and within 7 days range from now.
                                    </Typography>
                                </Grid> */}
                             {/* </Grid> */}
                            </>
                        )}
                           
                            <Grid item xs={12} sm={6} md={6} lg={2}>
                                <TextField
                                    name="TemplateId"
                                    label="Template Id"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={2} mt={2} sm={2} md={2} >
                                <Box ml={2}>
                                    <Button
                                        fullWidth
                                        // onClick={(e) => RecipientCCButton(e)}       
                                        // onClick={() => handleOpenDialog(false)}
                                        sx={{
                                            color: '#38548A',
                                            mt: 0.7,
                                            width: '130px',
                                            '&:hover': {
                                                color: '#38548A',
                                                backgroundColor: blue[100]
                                            }
                                        }}
                                        onClick={() => {
                                            // pass data via state > mobileNumbers
                                            navigate('/extended-sidebar/teacher/PersonalAddressBook', { state: { mobileNumbers } })
                                        }}
                                    >
                                        Use Template
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                       


                        {/* <Grid item md={3} >

                            </Grid>

                            <Grid
                                container
                                style={{ marginTop: '12px', marginBottom: '17px' }}
                            >
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        {
                                            <NativeSelect
                                                onChange={handleChangeForTemplate}
                                                style={{ borderRadius: '2px solid black' }}
                                            >
                                                <option value=''>Select SMS Template Name</option>
                                                {TemplateList == undefined || TemplateList.length == 0
                                                    ? null
                                                    : TemplateList?.map((items: GetSMSTemplates, i) => {
                                                        return (
                                                            <option value={items.registration_Number + "," + items.Template} key={i}>
                                                                {items.Template_Name}
                                                            </option>
                                                        );
                                                    })}
                                            </NativeSelect>
                                        }
                                    </FormControl>
                                </Grid>
                            </Grid> */}
                   <Box px={2}>
                        <CardDetail2
                            sx={{
                                color: 'blue',
                                marginTop: 1,
                                marginBottom: 1.5,
                                fontWeight: 'bold'
                            }}
                        >
                            {' '}
                            Letters = {initialCount} Message = {initialMessage}{' '}
                        </CardDetail2>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            name="Content"
                            type="text"
                            value={ContentTemplateDependent}
                            onBlur={ContentFieldBlur}
                            sx={{ marginTop: '1px' }}
                            id="content"
                            onChange={(e) => onContentChange(e.target.value)}
                        />
                        <Box style={{ marginTop: '8px' }}>
                            <Errormessage Error={formik.errors.Content} />
                        </Box>
                        </Box>
                       
                        {/* <Grid container>
                                <Grid item xs={12} >
                                    <ButtonPrimary


                                        type="submit"
                                        fullWidth

                                        onClick={formik.handleChange}
                                    >
                                        Send
                                    </ButtonPrimary>
                                </Grid>
                            </Grid> */}
                    </form>
                    {/* </ListStyle> */}

                </Box>
                <div style={{ display: displayOfTo_RecipientsPage }}>
                    <AddReciepentsSMS RecipientName={RecipientsArray.RecipientName}
                        RecipientId={RecipientsArray.RecipientId}
                        recipientListClick={RecipientsListFun}></AddReciepentsSMS>
                </div>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    fullWidth
                    maxWidth="md"
                    PaperProps={{
                        sx: {
                            borderRadius: "15px",
                        }
                    }}
                >
                    <DialogTitle sx={{ bgcolor: '#223354' }}>
                        <ClearIcon onClick={handleCloseDialog}
                            sx={{
                                color: 'white',
                                borderRadius: '7px',
                                position: 'absolute',
                                top: '5px',
                                right: '8px',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'red',
                                }
                            }} />

                    </DialogTitle>
                    <Typography variant="h3" sx={{ pt: 2, pl: 3 }}>
                        Add Recipients
                    </Typography>

                    <DialogContent>
                        <Box>
                            <AddReciepentsSMS
                                RecipientName={RecipientsObject.RecipientName}
                                RecipientId={RecipientsObject.RecipientId}
                                recipientListClick={RecipientsListFun}
                            />
                        </Box>
                    </DialogContent>
                </Dialog>


            </Box>
        </>
    );
};

export default ComposeSMSform;
