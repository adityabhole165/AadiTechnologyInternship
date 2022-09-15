import PageHeader from 'src/libraries/heading/PageHeader';
import {
  Container,
  TextField,
  Button,
  FormControl,
  Tooltip,
  Typography,
  Grid,
  Card,
  Box,
  NativeSelect,
  ClickAwayListener,
  useTheme,
  Fab,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { toast } from 'react-toastify';
import ReplyIcon from '@mui/icons-material/Reply';
import { getAComposeSMSTemplateList, getSendSMS } from 'src/requests/AdminSMSCenter/AComposeSMS';
import ACompose_SendSMS, { MessageTemplateSMSCenter } from 'src/interfaces/AdminSMSCenter/ACompose_SendSMS';
import { GetSMSTemplates } from 'src/interfaces/AdminSMSCenter/ACompose_SendSMS';

//  to page ===================================
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import AdminTeacherRecipientsList from './AdminTeacherRecipientsList';

const Compose = () => {

  // Navigation Themes & Classes =================================
  const classes = Styles();
  const navigate = useNavigate();
  const theme = useTheme();
  toast.configure();

  const [displayOfTo_RecipientsPage, setdisplayOfTo_RecipientsPage] =
    useState<any>('none');
  const [displayOfCompose_Page, setdisplayOfCompose_Page] =
    useState<any>('block');
  const [RecipientsArray,setRecipientsArray] = useState(
    { 
      RecipientName : [],
      RecipientId : []
    }
  );

  const To_Recipients_Page = (e) => {
    setdisplayOfTo_RecipientsPage('block');
    setdisplayOfCompose_Page('none');
  };

  // Tool Tip  =================================
  const Note1: string =
    'Do not use any website URL or mobile number in SMS text.Such SMS will not get delivered to selected recipient(s)';
  const getAComposeSMSTemplate: any = useSelector(
    (state: RootState) => state.getAComposeSMS.AComposeSMSTemplateList
  );
  const TemplateList = getAComposeSMSTemplate.GetSMSTemplates;

  const [ContentTemplateDependent, setContentTemplateDependent] = useState<any>();
  const [TemplateRegistrationId,setTemplateRegistrationId] = useState();

const handleChangeForTemplate = (e) => {
    const indexValue = e.target.value.indexOf(',')
    const templateId = e.target.value.slice(0,indexValue);
    setContentTemplateDependent(e.target.value.slice(indexValue,).replace(',',''));
    setTemplateRegistrationId(templateId)
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
    if (RecipientsArray.RecipientName.length == 0) {
      setToError(true);
    }

    if (
      initialCount > 160 &&
      RecipientsArray.RecipientName.length > 0 &&
      ContentTemplateDependent.length > 0
    ) {
      confirmationDone = confirm(
        'SMS will be send in 2 parts for each selected user(s). Are you sure to continue?'
      );
    }
    if (
      initialCount > 0 &&
      ContentTemplateDependent.length > 0 &&
      RecipientsArray.RecipientName.length > 0 &&
      confirmationDone
    ) {
      toast.success('Message Has Been Sent Successfully');
    }

    if (
      initialCount < 160 &&
      initialCount != 0 &&
      RecipientsArray.RecipientName.length > 0 &&
      initialCount < 159
    ) {
      confirmationDoneForPlainMessage = confirm(
        'Do You Want To Send The Message To Selected Recipient'
      );
    }
    if (
      initialCount > 0 &&
      RecipientsArray.RecipientName.length > 0 &&
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

  // Input value for teacher list ,student list ,other staff and admin staff
  const dispatch = useDispatch();

  // List of classes of students
  const SendSMS: any = useSelector(
    (state: RootState) => state.getASendSMS.ASendSMS
  );

  // Api body of Admin SMS Template
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const SchoolName = sessionStorage.getItem('SchoolName');

  const AComposeSMSTemplate: MessageTemplateSMSCenter = {
    asSchoolId: asSchoolId,
    sortDirection: 'asc',
    asShowSystemDefined: 'Y'
  };

  // Send SMS
  const Send_SMS: ACompose_SendSMS = {
    asSchoolId: asSchoolId,
    aoMessage: {
      Body: ContentTemplateDependent,
      Subject: "SMS",
      SenderName: "",
      DisplayText: RecipientsArray.RecipientName.toString(),
      SenderUserId: asUserId,
      SenderUserRoleId: "3",
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
    asSchoolName: "Bright Future School<br/>",
    asTemplateRegistrationId: TemplateRegistrationId
  }

  // SMS Template
  useMemo(() => {
    dispatch(getAComposeSMSTemplateList(AComposeSMSTemplate));
  }, []);

  const Note: string =
    'Do not use any website URL or mobile number in SMS text. Such SMS will not get delivered to selected recipient(s).';
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
    setRecipientsArray(() => {
      return e
    })
  };

  console.log(RecipientsArray.RecipientId.toString())

  return (
    <>
      <PageHeader heading={'Compose Message'} subheading={''} />

      <Box style={{ display: displayOfCompose_Page }}>
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
                    value={RecipientsArray.RecipientName}
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
                          onChange={handleChangeForTemplate}
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

      <div style={{ display: displayOfTo_RecipientsPage }}>
        <AdminTeacherRecipientsList displayProperty={displayPropertyFun}  RecipientsListDetails={RecipientsListFun} />
      </div>
    </>
  );
};
export default Compose;