import {
  Box,
  FormControl,
  Grid,
  NativeSelect,
  TextField,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import GetMessageTemplateAdminSMSListApi from 'src/api/AdminSMSCenter/AComposeSMS';
import { Styles } from 'src/assets/style/student-style';
import ACompose_SendSMS, {
  GetSMSTemplates,
  MessageTemplateSMSCenter
} from 'src/interfaces/AdminSMSCenter/ACompose_SendSMS';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
import Note from 'src/libraries/Note/Note';
import BackButton from 'src/libraries/button/BackButton';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { CardDetail2, ListStyle } from 'src/libraries/styled/CardStyle';
import { getAComposeSMSTemplateList } from 'src/requests/AdminSMSCenter/AComposeSMS';
import { RootState } from 'src/store';
import AddReciepents from '../MessageCenter/AddReciepents';

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
  const [RecipientsArray, setRecipientsArray] = useState({
    RecipientName: [],
    RecipientId: []
  });

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
  const [ContentTemplateDependent, setContentTemplateDependent] =
    useState<any>();
  const [TemplateRegistrationId, setTemplateRegistrationId] = useState();
  let confirmationDone;
  const [contentError, setcontentError] = useState<any>(); // For content Error
  const [initialMessage, setinitialMessage] = useState(0);
  const [initialCount, setCharacterCount] = useState(0);

  const handleChangeForTemplate = (e) => {
    if (e.target.value != '') {
      const indexValue = e.target.value.indexOf(',');
      const templateId = e.target.value.slice(0, indexValue);
      const templateText = e.target.value.slice(indexValue).replace(',', '');

      if (templateText.length >= 300) {
        toast.error('More than 300 characters not allowed');
      }
      if (templateText.length >= 1 && templateText.length <= 160) {
        setinitialMessage(1);
        setContentTemplateDependent(templateText);
        setTemplateRegistrationId(templateId);
      }
      if (templateText.length > 160) {
        {
          confirmationDone = confirm(
            'SMS will be send in 2 parts for each selected user(s). Are you sure to continue?'
          );
        }
        setinitialMessage(2);
        setContentTemplateDependent(templateText);
        setTemplateRegistrationId(templateId);
      }
      if (templateText.length == 0) {
        setinitialMessage(0);
      }
      setCharacterCount(templateText.length);
    } else {
      setContentTemplateDependent('');
      setCharacterCount(0);
      setinitialMessage(0);
    }
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
      if (
        ContentTemplateDependent == undefined ||
        ContentTemplateDependent == ''
      ) {
        errors.Content =
          'SMS content should not be blank please select SMS Template';
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
        Subject: '',
        SenderName: senderUserName,
        DisplayText: RecipientsArray.RecipientName.toString(),
        SenderUserId: asUserId,
        SenderUserRoleId: userRoleId,
        AcademicYearId: asAcademicYearId,
        SchoolId: asSchoolId,
        InsertedById: asUserId,
        Attachment: ''
      },
      asSelectedUserIds: RecipientsArray.RecipientId.toString(),
      asSelectedStDivId: '',
      asIsSoftwareCordinator: 0,
      asMessageId: 0,
      sIsReply: 'N',
      asIsForward: 'N',
      asSchoolName: schoolName,
      asTemplateRegistrationId: TemplateRegistrationId
    };
    GetMessageTemplateAdminSMSListApi.SendSMS(sendSMSAPIBody)
      .then((res: any) => {
        if (res.status === 200) {
          toast.success('SMS sent successfully');
          navigate('/extended-sidebar/SMSCenter/smsCenter');
          formik.resetForm();
        }
      })
      .catch((err) => {
        toast.error('SMS does not sent successfully');
      });
  };

  // SMS Template
  useMemo(() => {
    dispatch(getAComposeSMSTemplateList(getTemplateAPIBody));
  }, []);

  const note = [
    'Do not use any website URL or mobile number in SMS text. Such SMS will not get delivered to selected recipient(s).'
  ];
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
    setContentTemplateDependent(value);
    setCharacterCount(value.length);
  };
  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Compose SMS'} subheading={''} />
      <Box style={{ display: displayOfCompose_Page }}>
        <BackButton FromRoute={'/SMSCenter/smsCenter'} />
        <>
          <ListStyle sx={{}}>
            <form onSubmit={formik.handleSubmit}>
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
                  value={senderUserName}
                />

                <Box sx={{ mt: '15px' }}>
                  <TextField
                    name="To"
                    placeholder="To"
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
                      overflow: 'auto'
                    }}
                  />
                </Box>
                <div style={{ marginTop: '15px' }}>
                  <Errormessage Error={formik.errors.To} />
                </div>
              </FormControl>

              <Grid container>
                <Grid item md={3}>
                  <ButtonPrimary fullWidth onClick={To_Recipients_Page}>
                    Add Recipients
                  </ButtonPrimary>
                </Grid>
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
                        <option value="">Select SMS Template Name</option>
                        {TemplateList == undefined || TemplateList.length == 0
                          ? null
                          : TemplateList?.map((items: GetSMSTemplates, i) => {
                            return (
                              <option
                                value={
                                  items.registration_Number +
                                  ',' +
                                  items.Template
                                }
                                key={i}
                              >
                                {items.Template_Name}
                              </option>
                            );
                          })}
                      </NativeSelect>
                    }
                  </FormControl>
                </Grid>
              </Grid>

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
              <div style={{ marginTop: '8px' }}>
                <Errormessage Error={formik.errors.Content} />
              </div>
              <br />
              <Grid container>
                <Grid item xs={12}>
                  <ButtonPrimary
                    type="submit"
                    fullWidth
                    onClick={formik.handleChange}
                  >
                    Send
                  </ButtonPrimary>
                </Grid>
              </Grid>
            </form>
          </ListStyle>
          <Note NoteDetail={note} />
        </>
      </Box>
      <div style={{ display: displayOfTo_RecipientsPage }}>
        <AddReciepents
          RecipientName={RecipientsArray.RecipientName}
          RecipientId={RecipientsArray.RecipientId}
          recipientListClick={RecipientsListFun}
          contactGroupList={undefined}
          classIdList={undefined}
          IsConfirm={undefined}
          getGroupRadio={undefined}
          getGroupRadio1={undefined}>
        </AddReciepents>
      </div>
    </Box>
  );
};
export default Compose;
