import PageHeader from 'src/UI_Library/heading/PageHeader';
import {
  Container,
  TextField,
  Button,
  FormControl,
  Tooltip,
  Typography,
  FormGroup,
  Grid,
  Card,
  Box,
  Checkbox,
  FormControlLabel,
  NativeSelect,
  Radio,
  ClickAwayListener,
  useTheme,
  Fab,
  RadioGroup
} from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { toast } from 'react-toastify';
import ReplyIcon from '@mui/icons-material/Reply';
import { getAComposeSMSTemplateList, getSendSMS } from 'src/Client_Api/AdminSMSCenter/AComposeSMS';
import ACompose_SendSMS, { MessageTemplateSMSCenter } from 'src/Interface/AdminSMSCenter/ACompose_SendSMS';
import { GetSMSTemplates } from 'src/Interface/AdminSMSCenter/ACompose_SendSMS';

//  to page ===================================
import {
  IGetStudentsUser,
  GetStudentsUserResult
} from 'src/Interface/AdminSMSCenter/To';
import { IUsergroup } from 'src/Interface/AdminSMSCenter/To';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from 'src/Client_Api/AdminSMSCenter/To';
import { GetStudent } from 'src/Client_Api/AdminSMSCenter/To';
import { GetGetAdminAndprincipalUsers } from 'src/Client_Api/AdminSMSCenter/To';
import Icon2 from 'src/UI_Library/icon/icon2';
import ErrorMessages from 'src/UI_Library/ErrorMessages/ErrorMessages';
import { GetAdminAndprincipalUsers } from 'src/Interface/AdminSMSCenter/To';
import List21 from 'src/UI_Library/list/List21';

const Compose = () => {

  // Navigation Themes & Classes =================================
  const classes = Styles();
  const navigate = useNavigate();
  const theme = useTheme();
  toast.configure();

  const [inputBoxValue, setinputBoxValue] = useState<any>('');
  const [displayOfTo_RecipientsPage, setdisplayOfTo_RecipientsPage] =
    useState<any>('none');
  const [displayOfCompose_Page, setdisplayOfCompose_Page] =
    useState<any>('block');

  const To_Recipients_Page = (e) => {
    setdisplayOfTo_RecipientsPage('block');
    setdisplayOfCompose_Page('none');
  };

  const ToPageClicked = (e) => {
    setdisplayOfCompose_Page('block');
    setdisplayOfTo_RecipientsPage('none');
  };

  // Tool Tip  =================================
  const [open, setOpen] = useState(false);
  const Note1: string =
    'Do not use any website URL or mobile number in SMS text.Such SMS will not get delivered to selected recipient(s)';
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const getAComposeSMSTemplate: any = useSelector(
    (state: RootState) => state.getAComposeSMS.AComposeSMSTemplateList
  );
  const TemplateList = getAComposeSMSTemplate.GetSMSTemplates;

  const [ContentTemplateDependent, setContentTemplateDependent] =
    useState<any>();

  const handleChangeForTemplate = (e) => {
    setContentTemplateDependent(e.target.value);
    console.log(e.target.value.length);
  };

  // Message counter  =================================

  const [contentError, setcontentError] = useState<any>(); // For content Error
  const [initialMessage, setinitialMessage] = useState(0);
  const [initialCount, setCharacterCount] = useState(0);

  const changeHandler = (e) => {
    if (e.target.value.length == 0) {
      setcontentError(true);
    } else {
      setcontentError(false);
    }
    if (e.target.value.length >= 300) {
      toast.error('More than 300 characters not allowed');
    }
    if (e.target.value.length >= 1 && e.target.value.length <= 160) {
      setinitialMessage(1);
    }
    if (e.target.value.length > 160) {
      setinitialMessage(2);
    }
    if (e.target.value.length == 0) {
      setinitialMessage(0);
    }

    setCharacterCount(e.target.value.length);
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

  //  On send confirmation and message sending  = ================================
  let confirmationDone;
  let confirmationDoneForPlainMessage;
  const clickSend = () => {
    if (initialCount == 0 || ContentTemplateDependent.length == 0) {
      setcontentError(true);
    }
    if (inputBoxValue.length == 0) {
      setToError(true);
    }

    if (
      initialCount > 160 &&
      inputBoxValue.length > 0 &&
      ContentTemplateDependent.length > 0
    ) {
      confirmationDone = confirm(
        'SMS will be send in 2 parts for each selected user(s). Are you sure to continue?'
      );
    }
    if (
      initialCount > 0 &&
      ContentTemplateDependent.length > 0 &&
      inputBoxValue.length > 0 &&
      confirmationDone
    ) {
      toast.success('Message Has Been Sent Successfully');
    }

    if (
      initialCount < 160 &&
      initialCount != 0 &&
      inputBoxValue.length > 0 &&
      initialCount < 159
    ) {
      confirmationDoneForPlainMessage = confirm(
        'Do You Want To Send The Message To Selected Recipient'
      );
    }
    if (
      initialCount > 0 &&
      inputBoxValue.length > 0 &&
      confirmationDoneForPlainMessage &&
      initialCount < 159
    ) {
      toast.success('Message Has Been Sent Successfully');
    }
  };

  //  OnSubmit  =================================
  const SubmitForm = (event) => {
    event.preventDefault();
  };

  //  ============================================================================================================================

  // Student checked for stdent list in dropdown
  // Input values from compose page

  const [defaultCheckBoxForprincipal, setdefaultCheckBoxForprincipal] =
    useState<any>(false);

  const [PrincipalChecked, setPrincipalChecked] = useState<any>();

  const [EntireSchookIsChecked, setEntireSchookIsChecked] =
    useState('selected');

  // Input value for teacher list ,student list ,other staff and admin staff
  const [valueFor_APi, ChnageValueForAPI] = useState();

  const [nativeSelectDefault, setnativeSelectDefault] = useState('none');

  const [EntireSchoolChecked, setEntireSchoolChecked] = useState('inherit');

  const dispatch = useDispatch();

  // Api for Admin principle and Software co-ordinator
  const GetAdminAndprincipalUsersApiBody: any = useSelector(
    (state: RootState) =>
      state.getGetAdminAndprincipalUsers.getGetAdminAndprincipalUsers
  );
  const StaffAndAdmin =
    GetAdminAndprincipalUsersApiBody.GetAdminAndprincipalUsersResult;

  // Check box labels/ names for input box Admin ,Principle ,SWCo_ordinator
  let Admin;
  let Principle;
  let SWCo_ordinator;

  if (StaffAndAdmin == undefined) {
    console.log('null');
  } else {
    Admin = '  ' + StaffAndAdmin[0].Name;
    Principle = '  ' + StaffAndAdmin[1].Name;
    SWCo_ordinator = '  ' + StaffAndAdmin[2].Name;
  }

  // Api for Teacher list ,Student list ,Other staff and admin staff
  const getuserlist: any = useSelector(
    (state: RootState) => state.getuser.GetUser
  );
  const list = getuserlist.GetUsersInGroupResult;

  // List of classes of students
  const SendSMS: any = useSelector(
    (state: RootState) => state.getASendSMS.ASendSMS
  );
  console.log(SendSMS);

  // Send SMS Api
  const getstudentlist: any = useSelector(
    (state: RootState) => state.getuser.getStudent
  );
  const Student = getstudentlist.GetStudentsUserResult;

  const [getStandardId, setgetStandardId] = useState();

  const [listOpend, setlistOpend] = useState(false);

  // natvie list of To / Recipients Page
  const handleChange = (e) => {
    setgetStandardId(e.target.value);
    setnativeSelectDefault('block');
    setlistOpend(true);
  };

  const [checkedTeacher, setTeacherChecked] = useState(false);
  const [studentclicked, setStudentClicked] = useState(false);
  const [otherStaffClicked, setOtherStaffClicked] = useState(false);
  const [adminStaffClicked, setAdminStaffClicked] = useState(false);

  const [EntireSchoolDependent, setEntireSchoolDependent] = useState<any>();

  //  Call for api based on Value Teacher / Student / OtherStaff / Admin Staff and Displaying Dropdown list
  const getUserListBasedOnRollID = (e) => {
    if (e.target.value == '3') {
      setnativeSelectDefault('block');
      setStudentClicked(true);
      setEntireSchookIsChecked('unselected');
    }
    if (e.target.value == '7') {
      setnativeSelectDefault('none');
      setOtherStaffClicked(true);
      setStudentClicked(false);
      setEntireSchookIsChecked('unselected');
    }
    if (e.target.value == '6') {
      setnativeSelectDefault('none');
      setAdminStaffClicked(true);
      setStudentClicked(false);
      setEntireSchookIsChecked('unselected');
    }
    if (e.target.value == '2') {
      setnativeSelectDefault('none');
      setTeacherChecked(true);
      setStudentClicked(false);
      setEntireSchookIsChecked('unselected');
    }
    // Default call For api based on values passed on radio button
    ChnageValueForAPI(e.target.value);
  };

  // Checking conditions for Admin Principal Software Coordinator
  const AdminAndPrincipalUsers = (e) => {
    if (e.target.checked) {
      if (e.target.value == 'Entire School') {
        setinputBoxValue(' Entire School ');
        setEntireSchookIsChecked('selected');
        setEntireSchoolChecked('none');
        setnativeSelectDefault('none');
        setEntireSchoolDependent('none');
      }
      if (e.target.value == 'Admin') {
        setinputBoxValue(inputBoxValue + ' ' + Admin);
      }
      if (e.target.value == 'Principle') {
        setinputBoxValue(inputBoxValue + ' ' + Principle);
        setPrincipalChecked(true);
      }
      if (e.target.value == 'S/W Co-ordinator') {
        setinputBoxValue(inputBoxValue + ' ' + SWCo_ordinator);
      }
    }
    // On uncheck except "Entire School"
    if (!e.target.checked) {
      if (e.target.value == 'Admin') {
        let arrayToString = inputBoxValue.split('  ');

        let indexing = arrayToString.indexOf(
          ' Mr. F L. Khan (Chief Administrative Officer)'
        );
        let deletinTheElement = arrayToString.splice(indexing, 1);

        let stringToArray = arrayToString.join('  ');

        setinputBoxValue(stringToArray);
      }
      if (e.target.value == 'Principle') {
        setPrincipalChecked(false);
        let arrayToString = inputBoxValue.split('  ');

        let indexing = arrayToString.indexOf(' Mr. Ashraf (Principal)');
        let deletinTheElement = arrayToString.splice(indexing, 1);

        let stringToArray = arrayToString.join('  ');

        setinputBoxValue(stringToArray);
      }
      if (e.target.value == 'S/W Co-ordinator') {
        let arrayToString = inputBoxValue.split('  ');

        let indexing = arrayToString.indexOf(' Software Coordinator');
        let deletinTheElement = arrayToString.splice(indexing, 1);

        let stringToArray = arrayToString.join('  ');

        setinputBoxValue(stringToArray);
      }
    }
    // On uncheck fro "Entire School"
    if (!e.target.checked) {
      if (e.target.value == 'Entire School') {
        setEntireSchoolChecked('');
        setinputBoxValue('');
        setEntireSchoolDependent('flex');
        if (studentclicked) {
          setnativeSelectDefault('block');
        } else {
          setnativeSelectDefault('none');
        }
      }
    }
  };

  // Input values for list of Students / Teachers / Admin Staff / Other Staff
  const ListCheckedTeacherStudent = (e) => {
    if (e.target.checked) {
      setinputBoxValue(inputBoxValue + ' ' + e.target.name);
      setPrincipalChecked(true);
    }

    if (!e.target.checked) {
      if (e.target.value == ' Mr. Ashraf (Principal)') {
        setPrincipalChecked(false);
      }

      let arrayToString = inputBoxValue.split('  ');

      let ans = e.target.value;
      let trimmed = ans.trim();

      let indexing = arrayToString.indexOf(' ' + trimmed);

      let deletinTheElement = arrayToString.splice(indexing, 1);

      let stringToArray = arrayToString.join('  ');

      setinputBoxValue(stringToArray);
    }
  };

  const AdminAndprincipalUsersApiBody: GetAdminAndprincipalUsers = {
    asAcademicYearId: '9',
    asSchoolId: '120'
  };

  // Api body of Admin SMS Template

  const AComposeSMSTemplate: MessageTemplateSMSCenter = {
    asSchoolId: 120,
    sortDirection: 'asc',
    asShowSystemDefined: 'N'
  };

  // Teacher / Students / Other Staff / Admin Staff Body
  const body: IUsergroup = {
    asAcademicYearId: '9',
    asSchoolId: '120',
    asStdDivId: ' ',
    asUserId: '695',
    asSelectedUserGroup: valueFor_APi,
    abIsSMSCenter: false
  };

  // Standared List
  const body2: IGetStudentsUser = {
    asStdDivId: getStandardId,
    asAcadmeicYearId: '9',
    asSchoolId: '120'
  };

  // Send SMS
  const Send_SMS: ACompose_SendSMS = {
    asSchoolId: "120",
    aoMessage: {
      Body: ContentTemplateDependent,
      Subject: "SMS",
      SenderName: "",
      DisplayText: inputBoxValue,
      SenderUserId: "339",
      SenderUserRoleId: "3",
      AcademicYearId: "8",
      SchoolId: "120",
      InsertedById: "339",
      Attachment: ""
    },
    asSelectedUserIds: ", , 414, ",
    asSelectedStDivId: "",
    asIsSoftwareCordinator: 0,
    asMessageId: 0,
    sIsReply: "N",
    asIsForward: "N",
    asSchoolName: "Bright Future School<br/>"
  }

  // SMS Template
  useMemo(() => {
    dispatch(getAComposeSMSTemplateList(AComposeSMSTemplate));
  }, []);

  // Admin / Principle / Software Coordinator body
  useMemo(() => {
    dispatch(GetGetAdminAndprincipalUsers(AdminAndprincipalUsersApiBody));
  }, []);

  // Teacher / Students List / Admin Staff / Other Staff Body
  useEffect(() => {
    dispatch(GetUser(body));
  }, [valueFor_APi, PrincipalChecked]); //SendSMS

  // Send SMS
  // useEffect(() => {
  //   dispatch(getSendSMS(Send_SMS));
  // }, []);

  // Standard List Call
  useEffect(() => {
    dispatch(GetStudent(body2));
  }, [getStandardId]);

  const Note: string =
    'Do not use any website URL or mobile number in SMS text. Such SMS will not get delivered to selected recipient(s).';
  const [open1, setOpen1] = useState(false);
  const handleClick1 = () => {
    setOpen1((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen1(false);
  };

  return (
    <>
      <Box style={{ display: displayOfCompose_Page }}>
        <PageHeader heading={'Compose Message'} subheading={''} />

        <Grid
          container
          direction="row"
          sx={{ mt: '-35px', marginLeft: '35px' }}
        >
          <Box
            onClick={() => navigate('/extended-sidebar/SMSCenter/smsCenter')}
          >
            <Fab
              className={classes.backArrow}
              sx={{
                background: `${theme.colors.gradients.blue2}`,
                position: 'absolute'
              }}
            >
              <ReplyIcon />
            </Fab>
          </Box>
        </Grid>
        <br />
        <br />
        <>
        <br />
          <Container>
            <Box >
              <ClickAwayListener onClickAway={handleClickAway}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleClick1}
                  open={open1}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={Note1}
                  arrow
                  placement="left"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        transform: 'translate3d(20px, 0.5px, 0px) !important'
                      }
                    }
                  }}
                >
                  <InfoTwoToneIcon type="button" onClick={handleClick1} sx={{
                    color: 'navy',
                    mt: -5,
                    fontSize: '17px',
                    float: 'right',
                    position: 'relative',
                    top: '17px'
                  }} />
                </Tooltip>
              </ClickAwayListener>
            </Box>
            <Card sx={{ padding: '20px', backgroundColor: '#ffffffdb' }}>
              <form onSubmit={SubmitForm}>
                <FormControl fullWidth>
                  <TextField
                    sx={{ marginBottom: '-10px' }}
                    variant="standard"
                    name="From"
                    label={'From'}
                    id="from"
                    InputProps={{
                      readOnly: true
                    }}
                    defaultValue="BFS"
                  />

                  <TextField
                    fullWidth
                    variant="standard"
                    name="To"
                    label={'To'}
                    className={classes.InputField}
                    onChange={ToFieldChange}
                    onBlur={ToFieldOnBlur}
                    onFocus={ToFieldFocus}
                    InputProps={{
                      readOnly: true
                    }}
                    value={inputBoxValue}
                  />
                </FormControl>
                <p
                  style={{
                    color: 'red',
                    marginTop: 2,
                    marginBottom: 2,
                    fontWeight: 'bold'
                  }}
                >
                  {ToError ? 'Atleast one recipient should be selected.' : null}
                </p>

                <Grid container style={{ marginTop: '15px' }}>
                  <Grid md={3} style={{ flexDirection: 'row' }}>
                    <Button
                      sx={{
                        background: 'blue'
                      }}
                      color="primary"
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={To_Recipients_Page}
                    >
                      Add Recipients
                    </Button>
                  </Grid>
                </Grid>

                <Grid
                  container
                  style={{ marginTop: '12px', marginBottom: '17px' }}
                >
                  <Grid xs={12}>
                    <FormControl fullWidth>
                      {
                        <NativeSelect
                          onChange={(e) => handleChangeForTemplate(e)}
                          style={{ borderRadius: '2px solid black' }}
                        >
                          <option>Select a Message Template</option>
                          {TemplateList == undefined || TemplateList.length == 0
                            ? null
                            : TemplateList?.map((items: GetSMSTemplates, i) => {
                              return (
                                <>
                                  <option value={items.Template} key={i}>
                                    {items.Template}
                                  </option>
                                </>
                              );
                            })}
                        </NativeSelect>
                      }
                    </FormControl>
                  </Grid>
                </Grid>

                <Typography
                  sx={{
                    color: 'blue',
                    marginTop: 1,
                    marginBottom: 1.5,
                    fontWeight: 'bold'
                  }}
                >
                  {' '}
                  Letters = {initialCount} Message = {initialMessage}{' '}
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  label={'Content'}
                  name="Content"
                  type="text"
                  value={ContentTemplateDependent}
                  onChange={changeHandler}
                  onBlur={ContentFieldBlur}
                  sx={{ marginTop: '1px' }}
                  id="content"
                />
                <p style={{ color: 'red', marginTop: -5, fontWeight: 'bold' }}>
                  {contentError ? 'Message body should not be blank.' : null}
                </p>

                <Grid container>
                  <Grid xs={12} style={{ flexDirection: 'row' }}>
                    <Button
                      sx={{
                        background: 'blue'
                      }}
                      color="primary"
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={clickSend}
                    >
                      {'Send'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Container>
        </>
      </Box>

      {/* To Recipient Page */}

      <Container style={{ display: displayOfTo_RecipientsPage }}>
        <PageHeader heading={'Compose Message'} subheading={''} />
        <Icon2 Note={Note} />
        <Box
          sx={{
            background: `${theme.colors.gradients.pink1}`,
            margin: '-2px',
            backgroundColor: '#FFFFFF',
            minHeight: '25vh',
            borderRadius: '20px'
          }}
        >
          <TextField
            multiline
            placeholder="Selected Recipient"
            value={inputBoxValue}
            variant="outlined"
            id="body"
            fullWidth
            margin="normal"
            style={{ scrollBehavior: 'auto' }}
            sx={{
              marginLeft: 1,
              width: '97%',
              maxHeight: '60px',
              overflow: 'auto'
            }}
          />
          <FormGroup>
            <Button
              onClick={ToPageClicked}
              sx={{
                background: 'rgb(11 101 214)',
                position: 'absolute',
                marginLeft: 1,
                marginTop: 0.5,
                color: 'white'
              }}
            >
              Back To Compose{' '}
            </Button>

            <FormControlLabel
              sx={{
                marginLeft: 1,
                marginTop: 6.5,
                border: '2px solid black',
                borderRadius: '10px',
                width: '21.2rem'
              }}
              control={<Checkbox />}
              onChange={(e) => AdminAndPrincipalUsers(e)}
              value="Entire School"
              label="Entire School"
            />

            <Box
              sx={{
                display: EntireSchoolDependent,
                flexDirection: 'column',
                marginLeft: 1,
                marginTop: 0.5,
                border: '2px solid black',
                borderRadius: '10px',
                width: '11.5rem',
                paddingBottom: '42px'
              }}
            >
              <FormControlLabel
                sx={{ marginLeft: 0.1 }}
                control={<Checkbox />}
                onChange={(e) => AdminAndPrincipalUsers(e)}
                value="Admin"
                name="teacher"
                label="Admin"
              />

              <FormControlLabel
                sx={{ marginLeft: 0.1 }}
                control={<Checkbox />}
                onChange={(e) => AdminAndPrincipalUsers(e)}
                checked={PrincipalChecked}
                value="Principle"
                label="Principle"
              />
              <FormControlLabel
                sx={{ marginLeft: 0.1 }}
                control={<Checkbox />}
                onChange={(e) => AdminAndPrincipalUsers(e)}
                value="S/W Co-ordinator"
                label="S/W Co-ordinator"
              />
            </Box>

            <RadioGroup
              sx={{
                display: EntireSchoolDependent,
                marginLeft: 22,
                marginTop: -19,
                border: '2px solid black',
                borderRadius: '10px',
                width: '9.3rem',
                paddingLeft: '8px'
              }}
            >
              <FormControlLabel
                onClick={getUserListBasedOnRollID}
                value="2"
                control={<Radio />}
                label="Teacher"
              />
              <FormControlLabel
                control={<Radio />}
                onClick={getUserListBasedOnRollID}
                value="3"
                label="Student"
              />
              <FormControlLabel
                onClick={getUserListBasedOnRollID}
                control={<Radio />}
                value="7"
                label="Other Staff"
              />
              <FormControlLabel
                control={<Radio />}
                onClick={getUserListBasedOnRollID}
                value="6"
                label="Admin Staff"
              />
            </RadioGroup>
          </FormGroup>

          <FormControl
            fullWidth
            sx={{ mt: '0.2rem', mb: '-2', marginLeft: '24px' }}
          >
            {
              <NativeSelect
                sx={{ mr: '48px', display: nativeSelectDefault }}
                onChange={(e) => handleChange(e)}
              >
                <option style={{ backgroundColor: '#e0ffff' }}>
                  Select Class
                </option>
                {
                  list?.map((items: GetStudentsUserResult, i) => {
                    return (
                      <>
                        <option
                          style={{ backgroundColor: '#e0ffff' }}
                          value={items.Id}
                          key={i}
                        >
                          {items.Name}
                        </option>
                      </>
                    );
                  })}
              </NativeSelect>
            }
            <br></br>
          </FormControl>
        </Box>

        {(checkedTeacher || otherStaffClicked || adminStaffClicked) &&
          nativeSelectDefault == 'none' ? (
          <h1>
            {list == undefined || list == 0 ? (
              EntireSchookIsChecked == 'selected' ? null : (
                <ErrorMessages Error={'No List Found'} />
              )
            ) : (
              list.map((elm, i) => {
                return (
                  <>
                    {EntireSchookIsChecked == 'selected' ? null : (
                      <List21
                        StudentName={elm.Name}
                        key={i}
                        data={elm}
                        check={
                          elm.Id == '696'
                            ? PrincipalChecked
                            : defaultCheckBoxForprincipal
                        }
                        handleChange1={ListCheckedTeacherStudent}
                      />
                    )}
                  </>
                );
              })
            )}
          </h1>
        ) : null}
        {EntireSchookIsChecked == 'selected' ? null : studentclicked &&
          nativeSelectDefault == 'block' &&
          listOpend ? (
          <h1>
            {Student == undefined || Student == 0 ? (
              <ErrorMessages Error={'No List Found'} />
            ) : (
              Student.map((elm, i) => {
                return (
                  <List21
                    StudentName={elm.Name}
                    key={i}
                    data={elm}
                    check={false}
                    handleChange1={ListCheckedTeacherStudent}
                  />
                );
              })
            )}
          </h1>
        ) : null}
      </Container>
    </>
  );
};
export default Compose;
