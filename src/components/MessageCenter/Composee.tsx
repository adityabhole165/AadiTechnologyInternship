import DeleteIcon from '@mui/icons-material/Delete';
import DraftsIcon from '@mui/icons-material/Drafts';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import InfoIcon from '@mui/icons-material/Info';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { blue, green, grey } from '@mui/material/colors';
import { ClearIcon, TimePicker } from "@mui/x-date-pickers";
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import { Styles } from 'src/assets/style/student-style';
import { ISaveDraftMessageBody } from 'src/interfaces/MessageCenter/IDraftMessage';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import Errormessages from 'src/libraries/ErrorMessages/Errormessage';
import SingleFile2 from 'src/libraries/File/SingleFile2';
import {
  BoxContent,
  CardDetail8,
  ListStyle,
  Wordbreak1
} from 'src/libraries/styled/CardStyle';
import {
  ReadRecipient,
  messageCenter,
  messageCenterCale
} from 'src/libraries/styled/CommonStyle';
import {
  ContactGroupUsers,
  addRecipients
} from 'src/requests/MessageCenter/MessaageCenter';
import {
  getSaveDraftMessage,
  resetSaveDraftMessage
} from 'src/requests/MessageCenter/RequestDraftMessage';
import { RootState } from 'src/store';
import {
  AttachmentFile,
  ISendMessage
} from '../../interfaces/MessageCenter/MessageCenter';
import { formatAMPM, isFutureDateTime, toolbarOptions } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import AddReciepents from './AddReciepents';
import Datepicker from './DatepickerMessage';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
function Form13() {

  const [openDialog, setOpenDialog] = useState(false);
  const [showRecipients, setShowRecipients] = useState(false);
  const RecipientsList: any = useSelector(
    (state: RootState) => state.MessageCenter.RecipientsName
  );
  const ContactGRPusers = useSelector(
    (state: RootState) => state.MessageCenter.ContactgrpUsers
  );
  const SaveDraftM = useSelector(
    (state: RootState) => state.DraftMessages.SaveDraftMessage
  );

  const dispatch = useDispatch();

  const theme = useTheme();
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/MessageCenter/Compose/',
    ''
  );
  const PageName = pageName.slice(0, 5);
  const ViewData = localStorage.getItem('ViewMessageData');
  const View = ViewData === null || ViewData === '' ? '' : JSON.parse(ViewData);
  const From = ViewData === null || ViewData === '' ? '' : View.From;
  const Text = ViewData === null || ViewData === '' ? '' : View.Text;
  const AttachmentArray =
    ViewData === null || ViewData === '' || View.Attachment == ''
      ? 'null'
      : View.Attachment.join(',');
  const ID = ViewData === null || ViewData === '' ? '' : View.ID;
  const FromUserID =
    ViewData === null || ViewData === '' ? '' : View.FromUserID;
  const CC = ViewData === null || ViewData === '' ? '' : View.CC;
  const CcReceiverUserId =
    ViewData === null || ViewData === '' ? '' : View.CCReceiverUserId;

  const ReplyRecipientNameId = {
    ReplyRecipientName: From,
    ReplyRecipientID: FromUserID
  };
  const ReplyAllRecipientNameId = {
    ReplyAllRecipientName: CC,
    ReplyAllRecipientID: CcReceiverUserId
  };

  const [ArrayOfAttachment, setArrayOfAttachment] = useState<any>([]);
  const [RecipientsObject, setRecipientsObject] = useState<any>({
    RecipientName: [],
    RecipientId: [],
    ClassId: [],
    ContactGroup: []
  });

  const [RecipientsCCObject, setRecipientsCCObject] = useState<any>({
    RecipientName: [],
    RecipientId: [],
    ClassId: []
  });

  const [finalBase642, setFinalBase642] = useState<AttachmentFile[]>([]);
  const [open, setOpen] = useState(false);
  const [Sopen, setSopen] = useState(false);
  const [finalBase642Duplicate, setFinalBase642Duplicate] = useState([]);

  const [FileNameOfAttachment, setFileNameOfAttachment] = useState([]);
  const [Base64URLOfAttachment, setBase64URLOfAttachment] = useState([]);
  const [finalBase642New, setFinalBase642New] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const aRef = useRef(null);

  const originalMessageBody = localStorage.getItem('messageBody');
  const MSGBody = originalMessageBody?.replace(/(\r\n|\r|\n)/g, '<br>');
  useEffect(() => { }, [finalBase642New]);
  useEffect(() => {
    if (PageName == 'Reply' || PageName == 'ReplyAll') {
      const PayLoadObject = {
        Name: From,
        ID: FromUserID.toString()
      };
      dispatch(addRecipients(PayLoadObject));
    }
  }, []);

  useEffect(() => {
    if (AttachmentArray != undefined) {
      if (AttachmentArray != 'null') {
        const a = AttachmentArray.split(',');
        for (let i = 0; i < a.length; i++) {
          ArrayOfAttachment.push(a[i]);
          const filename = a[i];
          let AttachmentFile: AttachmentFile = {
            FileName: filename,
            Base64URL: ''
          };
          finalBase642.push(AttachmentFile);
          finalBase642Duplicate.push(AttachmentFile);
          FileNameOfAttachment.push(AttachmentFile.FileName);
          Base64URLOfAttachment.push(AttachmentFile.Base64URL);
        }
        setArrayOfAttachment((prev) => [...prev]);
        setFinalBase642Duplicate((prev) => [...prev]);
        setFileNameOfAttachment((prev) => [...prev]);
        setBase64URLOfAttachment((prev) => [...prev]);
      }
      for (let key in FileNameOfAttachment) {
        finalBase642New.push({
          FileName: FileNameOfAttachment[key],
          Base64URL: Base64URLOfAttachment[key]
        });
      }
      setFinalBase642New((prev) => [...prev]);
      //setFinalBase642New(prev => [...prev, finalBase642New])
    }
  }, [AttachmentArray]);

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClickAwayS = () => {
    setSopen(false);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickS = () => {
    setSopen((prev) => !prev);
  };
  const classes = Styles();
  const navigate = useNavigate();
  const [fileerror, setFilerror] = useState<any>('');
  const [fileName, setfileName] = useState('');
  const [displayOfRecipients, setdisplayOfRecipients] = useState('none');
  const [displayOfCCRecipients, setdisplayOfCCRecipients] = useState('none');
  const [displayOfComposePage, setdisplayOfComposePage] = useState('block');
  const [scheduleMessage, setscheduleMessage] = useState('none');
  const [requestReadReceipt, setRequestReadReceipt] = useState(false);
  const [scheduleDate, setscheduleDate] = useState<string>('');
  const [requestSchedule, setRequestSchedule] = useState(false);
  const [requestScheduleMsg, setRequestScheduleMsg] = useState('');
  const [schTimeerror, setSchTimeerror] = useState('');
  const [scheduleTime, setscheduleTime] = useState<string>('');
  const [subjecterror, setSubjecterror] = useState('');
  const [contenterror, setContenterror] = useState('');
  let dataShow: any = [];
  const Note: string =
    'Supports only .bmp, .doc, .docx, .jpg, .jpeg, .pdf, .png, .pps, .ppsx, .ppt, .pptx, .xls, .xlsx files types with total size upto 20 MB.';
  const NoteSchedule: string =
    'e.g. 07:00 AM. You can schedule message for next 7 days. For scheduled message, recipients wont get notification on mobile.';

  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const localschoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const StudentName = sessionStorage.getItem('StudentName');
  const DivisionId = sessionStorage.getItem('DivisionId');
  const SchoolName = localStorage.getItem('SchoolName');
  const userName = sessionStorage.getItem('StudentName')
  const DesignationName = sessionStorage.getItem('DesignationName')
  const fullDisplayName = ` ${userName} (${DesignationName})`;
  const [fileExtension, setfileExtension] = React.useState<any>('');
  const [disabledStateOfSend, setdisabledStateOfSend] = useState(false);
  const contactgrpuserBody = {
    asScholId: localschoolId,
    asAcademicYearId: AcademicYearId,
    asGroupId: RecipientsObject.ContactGroup.toString(),
    aiIsForUser: '0'
  };

  useEffect(() => {
    dispatch(ContactGroupUsers(contactgrpuserBody));
  }, [RecipientsObject.ContactGroup]);
  const fileChangedHandler = async (event) => {
    const multipleFiles = event.target.files;
    if (finalBase642New.length == 0) {
      for (let i = 0; i < multipleFiles.length; i++) {
        const isValid = CheckValidation(multipleFiles[i]);
        let fileName = multipleFiles[i].name;
        let base64URL: any = '';
        if (isValid) {
          base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
          let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);

          let AttachmentFile: AttachmentFile = {
            FileName: fileName,
            Base64URL: DataAttachment
          };
          setFinalBase642New((prev) => [...prev, AttachmentFile]);
        }
      }
    } else {
      for (let i = 0; i < multipleFiles.length; i++) {
        const isValid = CheckValidation(multipleFiles[i]);
        let fileName = multipleFiles[i].name;
        let base64URL: any = '';
        if (isValid) {
          base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
          let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);

          let AttachmentFile: AttachmentFile = {
            FileName: fileName,
            Base64URL: DataAttachment
          };
          setFinalBase642New((array) => [...array, AttachmentFile]);
        }
      }
    }
  };

  const handleOpenDialog = (isRecipients) => {
    setShowRecipients(isRecipients);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const CheckValidation = (fileData) => {
    const fileExtension = fileData?.name?.split('.').at(-1);
    setfileExtension(fileExtension);
    const allowedFileTypes = [
      'BMP',
      'DOC',
      'DOCX',
      'JPG',
      'JPEG',
      'PDF',
      'PNG',
      'PPS',
      'PPSX',
      'PPT',
      'PPTX',
      'XLS',
      'XLSX',
      'bmp',
      'doc',
      'docx',
      'jpg',
      'jpeg',
      'pdf',
      'png',
      'pps',
      'ppsx',
      'ppt',
      'pptx',
      'xls',
      'xlsx'
    ];

    if (fileExtension != undefined || null) {
      if (!allowedFileTypes.includes(fileExtension)) {
        setFilerror('File does not support. Please check note');
        return false;
      } else if (allowedFileTypes.includes(fileExtension)) {
        setFilerror(null);
        return true;
      }
      if (fileData?.size > 20e6) {
        setFilerror('Please upload a file smaller than 20 MB');
        return false;
      }
    }
  };

  const ChangeFileIntoBase64 = (fileData) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileData);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const RediretToSentPage = () => {
    navigate('/extended-sidebar/MessageCenter/msgCenter/Inbox');
  };

  const sendMessage = () => {
    setLoading(true);
    const sendMessageAPIBody: ISendMessage = {
      asSchoolId: localschoolId,
      aoMessage: {
        Body: formik.values.Content,
        Subject: formik.values.Subject,
        SenderName: StudentName,
        DisplayText: RecipientsObject.RecipientName.toString(),
        SenderUserId: UserId,
        SenderUserRoleId: RoleId,
        AcademicYearId: AcademicYearId,
        SchoolId: localschoolId,
        InsertedById: UserId,
        Attachment: '',
        ScheduleDateTime: requestSchedule ? scheduleDate + ' ' + strTime : '',
        RequestReadReceipt: requestReadReceipt ? '1' : '0'
      },
      asIsForward: `${PageName === 'Forwa' ? 'Y' : 'N'}`,
      asIsSoftwareCordinator: 0,
      asMessageId: ID != undefined || ID != '' ? parseInt(ID) : 0,
      asSchoolName: SchoolName,
      asSelectedStDivId: RecipientsObject.ClassId.toString(),
      asSelectedUserIds:
        RecipientsObject.RecipientId.toString() +
        ',' +
        ContactGRPusers.toString(),

      sIsReply: `${PageName === 'Reply' ? 'Y' : 'N'}`,
      attachmentFile: finalBase642New,
      asFileName: fileName,
      asSelectedUserIdsCc: RecipientsCCObject.RecipientId.toString(),
      asSelectedStDivIdCc: RecipientsCCObject.ClassId.toString(),
      asIsSoftwareCordinatorCc: '',
      asDisplayTextCc: RecipientsCCObject.RecipientName.toString()
    };

    MessageCenterApi.SendMessage(sendMessageAPIBody)
      .then((res: any) => {
        if (res.status === 200) {
          setdisabledStateOfSend(true);
          if (
            scheduleMessage == 'block' &&
            scheduleDate !== '' &&
            value !== undefined
          ) {
            toast.success('Message scheduled successfully', {
              toastId: 'success1'
            });
          } else {
            toast.success('Message sent successfully', { toastId: 'success1' });
          }
          localStorage.setItem('messageBody', '');
          setTimeout(RediretToSentPage, 100);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error('Message did not sent successfully', { toastId: 'error1' });
        localStorage.setItem('messageBody', '');
        setdisabledStateOfSend(false);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      To: '',
      Cc: '',
      Subject:
        PageName == 'Forwa'
          ? 'FW: ' + Text
          : '' || PageName == 'Reply'
            ? 'RE: ' + Text
            : '' || PageName == 'Edit'
              ? Text
              : '',
      Content: PageName == 'Edit' ? Text : '',
      Attachment: PageName == 'Edit' && null
    },
    onSubmit: (values) => {
      let valid = false;
      if (requestSchedule) {
        if (scheduleDate + value) {
          valid = true;
        }
        if (scheduleDate.length == 0) {
          setRequestScheduleMsg('Schedule Date and Time should not be blank');
          valid = false;
        } else if (!isFutureDateTime(scheduleDate + ' ' + strTime)) {
          setSchTimeerror('Please select future time');
          valid = false;
        } else {
          setRequestScheduleMsg('');
        }
      } else {
        valid = true;
      }
      if (valid) {
        sendMessage();
        setdisabledStateOfSend(true);
      }
    },
    validate: (values) => {
      const errors: any = {};
      if (RecipientsObject.RecipientName.length == 0 && PageName !== 'Reply') {
        errors.To = 'Atleast one recipient should be selected.';
      }
      if (!values.Subject) {
        errors.Subject = 'Subject should not be blank.';
      }
      if (!values.Content) {
        errors.Content = 'Message body should not be blank.';
      }
      return errors;
    }
  });

  const AttachmentFilePath =
    localStorage.getItem('SiteURL') + '/RITeSchool/Uploads/';

  const TodayDate = new Date();
  const curTimeH = TodayDate.getHours() % 12 || 12;
  const curTimeM = TodayDate.getMinutes();
  const CurrTIME = curTimeH + ':' + curTimeM;

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
  const scheduleMessageCheckBox = (e) => {
    if (e.target.checked == true) {
      setscheduleMessage('block');
    } else {
      setscheduleMessage('none');
    }
  };

  const RecipientButton = (e) => {
    setdisplayOfRecipients('block');
    setdisplayOfComposePage('none');
  };

  const RecipientCCButton = (e) => {
    setdisplayOfCCRecipients('block');
    setdisplayOfComposePage('none');
  };

  const displayPropertyFun = (e) => {
    if (e == 'none') {
      setdisplayOfRecipients(e);
      setdisplayOfComposePage('block');
    }
  };

  const RecipientsListFun = (e) => {
    setRecipientsObject(e);
    setdisplayOfRecipients('none');
    setdisplayOfComposePage('block');
  };
  const RecipientsCCListFun = (e) => {
    setRecipientsCCObject(e);
    setdisplayOfCCRecipients('none');
    setdisplayOfComposePage('block');
  };

  useEffect(() => {
    if (
      !(
        ReplyRecipientNameId.ReplyRecipientName === undefined ||
        ReplyRecipientNameId.ReplyRecipientName === ''
      )
    ) {
      RecipientsObject.RecipientName.push(
        ReplyRecipientNameId.ReplyRecipientName
      );
      RecipientsObject.RecipientId.push(ReplyRecipientNameId.ReplyRecipientID);
    }
    if (
      !(
        ReplyAllRecipientNameId.ReplyAllRecipientName === undefined ||
        ReplyAllRecipientNameId.ReplyAllRecipientID === ''
      )
    ) {
      RecipientsCCObject.RecipientName.push(
        ReplyAllRecipientNameId.ReplyAllRecipientName
      );
      RecipientsCCObject.RecipientId.push(
        ReplyAllRecipientNameId.ReplyAllRecipientID
      );
    }
  }, []);

  const handleRemoveListItems = (fileName, fileData) => {
    setFinalBase642New((current) =>
      current.filter((obj) => obj.FileName !== fileName)
    );
    aRef.current.value = null;
  };
  const [value, setValue] = React.useState(new Date());
  let hours = value.getHours();
  let minutes = value.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  let strTime = hours + ':' + minutes + ' ' + ampm;

  const clickTime = (value) => {
    const time = formatAMPM(value);
    if (scheduleDate !== '') {
      checkScheduleValidation(scheduleDate + ' ' + time);
    }
    setValue(value);
  };

  const scheduleDateAndTime = (e) => {
    if (scheduleDate !== '') {
      setRequestScheduleMsg('');
    }
    if (scheduleDate !== '') {
      checkScheduleValidation(e.target.value + ' ' + strTime);
    }
    setscheduleDate(e.target.value);
  };
  const checkScheduleValidation = (DateTime) => {
    if (isFutureDateTime(DateTime)) {
      setSchTimeerror('');
    } else {
      setSchTimeerror('Please select future time');
    }
  };
  const [showCC, setShowCC] = useState(false);
  const clickHide = () => {
    setShowCC(!showCC);
  };

  const handleResize = () => {
    if (window.innerWidth >= 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  window.addEventListener('resize', handleResize);

  const SaveDraftBody: ISaveDraftMessageBody = {
    aiDraftId: ID,
    aoMessage: {
      SenderUserId: UserId,
      SchoolId: localschoolId,
      AcademicYearId: AcademicYearId,
      ReceiverUserId:
        RecipientsObject.RecipientId.toString() +
        ',' +
        ContactGRPusers.toString(),
      DisplayText: RecipientsObject.RecipientName.toString(),
      Subject: formik.values.Subject,
      Body: formik.values.Content,
      ReceiverUserIdCc: '',
      DisplayTextCc: RecipientsCCObject.RecipientName.toString()
    }
  };
  const ValidFileTypes = ['PDF', 'PNG', 'JPEG', 'JPG', 'BMP'];
  const MaxfileSize = 10000000;
  const ValidFileTypes2 = ['JPG', 'JPEG', 'PNG', 'BMP'];

  const SaveDraft = () => {
    let isError = false;
    if (formik.values.Subject === '') {
      setSubjecterror('Subject is required');
      isError = true;
    }
    if (formik.values.Content === '') {
      setContenterror('Content is required');
      isError = true;
    } else {
      dispatch(getSaveDraftMessage(SaveDraftBody));
    }
  };

  useEffect(() => {
    if (SaveDraftM !== '') {
      toast.success(SaveDraftM, { toastId: 'success1' });
      dispatch(resetSaveDraftMessage());
    }
  }, [SaveDraftM]);
  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader navLinks={[
          { title: 'Message Center', path: '/extended-sidebar/MessageCenter/msgCenter' },
          { title: 'Compose Message', path: '' }
        ]}
          rightActions={<>
            <Box>
              <Tooltip
                title={`Write a new message/send reply to the message received.`}
              >
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] }
                  }}
                >
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={'Save As Draft'}>
                <IconButton
                  type='submit'
                  sx={{
                    color: 'white',
                    backgroundColor: green[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: green[600] }
                  }}
                  onClick={SaveDraft}
                >
                  <DraftsIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={'Send'}>
                <IconButton
                  type='submit'
                  onClick={formik.handleSubmit}
                  disabled={disabledStateOfSend}
                  sx={{
                    color: 'white',
                    backgroundColor: blue[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: blue[600] }
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </>
          }
        />

        {/* <span
          onClick={() => {
            navigate(-1);
          }}
        >
           <Fab
            className={classes.backArrow}
            sx={{
              position: 'absolute',
              top: '30px',
              left: '35px',
              background: `${theme.colors.gradients.pink1}`
            }}
          >
            <ReplyIcon />
          </Fab> 
        </span> */}
        <ListStyle>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1} sx={{ height: '100vh' }}>
              <Grid item xs={12} >
                <Typography variant='h4' pl={1}>Form</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={9.5} >
                {/* <FormControl fullWidth> */}
                <TextField
                  multiline
                  id=""
                  fullWidth
                  // rows={3}
                  disabled
                  value={fullDisplayName}
                  // value={RecipientsObject.RecipientName.map((obj) =>
                  //   obj?.trim()
                  // ).join('; ')}
                  onChange={formik.handleChange}
                  sx={{
                    height: '50px',
                    overflow: 'auto',
                    border: '0.1px solid #c4c5c5',
                    borderRadius: '7px'
                  }}
                />
                <Box mt={0}>
                  {RecipientsList.length == 0 ? (
                    <ErrorMessage1 Error={formik.errors.To} />
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} >
                <Typography variant='h4' pl={1}>To</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={9.5} >
                {/* <FormControl fullWidth> */}
                <TextField
                  multiline
                  id=""
                  fullWidth
                  // rows={3}
                  disabled
                  value={RecipientsObject.RecipientName.map((obj) =>
                    obj?.trim()
                  ).join('; ')}
                  onChange={formik.handleChange}
                  sx={{
                    height: '50px',
                    overflow: 'auto',
                    border: '0.1px solid #c4c5c5',
                    borderRadius: '7px'
                  }}
                />
                <Box mt={0}>
                  {RecipientsList.length == 0 ? (
                    <ErrorMessage1 Error={formik.errors.To} />
                  ) : null}
                </Box>
              </Grid>
              {loading && <SuspenseLoader />}
              <Grid item xs={6} sm={2} md={1}>
                <Button
                  fullWidth
                  // color="primary"
                  // onClick={(e) => RecipientButton(e)}
                  onClick={() => handleOpenDialog(true)}
                  sx={{
                    color: '#38548A',
                    width: '140px',
                    mt: 1,
                    '&:hover': {
                      color: '#38548A',
                      backgroundColor: blue[100]
                    }
                  }}
                >
                  Add Recipients
                </Button>
              </Grid>
              <Grid item xs={6} sm={2} md={1}>
                <Button
                  fullWidth
                  //  color="primary"
                  onClick={clickHide}

                  sx={{
                    color: '#38548A',
                    ml: 4,
                    mt: 1,
                    '&:hover': {
                      color: '#38548A',
                      backgroundColor: blue[100]
                    }
                  }}>
                  Add Cc
                </Button>
              </Grid>
              {/* <Hidden smDown>
                <Box pl={1}>

                  <Box sx={{ display: "flex" }}>
                    <TextField
                      label="Search By Name"
                      sx={{ width: "300px" }}
                      size="small" variant='standard'
                    />
                    <ButtonPrimary sx={{ width: "10px", ml: "6px", mt: "20px" }}>Clear</ButtonPrimary>
                  </Box>
                </Box>
              </Hidden> */}
              {showCC && (
                <>
                  <Grid item xs={12}>
                    <Typography variant='h4' pl={1}>Cc</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9.5}>
                    <TextField
                      multiline
                      id=""
                      fullWidth
                      disabled
                      value={RecipientsCCObject.RecipientName.map((obj) =>
                        obj?.trim()
                      ).join('; ')}
                      onChange={formik.handleChange}
                      sx={{
                        height: '50px',
                        overflow: 'auto',
                        border: '0.1px solid #c4c5c5',
                        borderRadius: '5.3px',
                        marginLeft: '0px'
                      }}
                    />
                  </Grid>

                  <Grid item xs={6} sm={2} md={1}>
                    <Box >
                      <Button
                        fullWidth
                        // onClick={(e) => RecipientCCButton(e)}       
                        onClick={() => handleOpenDialog(false)}
                        sx={{
                          color: '#38548A',
                          mt: 0.7,
                          width: '160px',
                          '&:hover': {
                            color: '#38548A',
                            backgroundColor: blue[100]
                          }
                        }}
                      >
                        Add Cc Recipients
                      </Button>
                    </Box>
                  </Grid>
                  {/* <Grid item sm={10.5} /> */}
                  {/* <Hidden smDown>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      sx={{ width: "300px", ml: "10px" }}
                      size="small"
                      label="Search By Name"
                      variant='standard'
                    />
                    <ButtonPrimary sx={{ width: "10px", ml: "6px", mt: "20px" }}>Clear</ButtonPrimary>
                  </Box>
                </Hidden> */}
                </>
              )}
              {/* </FormControl> */}
              <Grid item xs={12} px={1}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Subject "
                  name="Subject"
                  type="text"
                  autoComplete="off"
                  // variant="standard"
                  value={formik.values.Subject}
                  onChange={formik.handleChange}
                  sx={{}}
                />
                <Errormessages Error={subjecterror} />
                <Box >
                  {formik.touched.Subject && formik.errors.Subject ? (
                    <ErrorMessage1 Error={formik.errors.Subject} />
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={10} sm={6} md={6} lg={4.5} mt={1}>
                {/* <input
                  ref={aRef}
                  type="file"
                  multiple
                  onChange={fileChangedHandler}
                  style={{
                    width: '20px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                    
                /> */}
                <SingleFile2
                  ValidFileTypes={ValidFileTypes2}
                  // MaxfileSize={MaxfileSize2}
                  // ChangeFile={ChangeFile2}
                  errorMessage={''}
                  // FileName={ImageFile}
                  FileLabel={'Select Image'}
                  width={'100%'}
                  height={"52px"}
                  isMandatory={false}
                  MaxfileSize={undefined}
                  ChangeFile={undefined}
                // onChange={fileChangedHandler}
                />
                <Box sx={{ mt: '15px', width: '300px' }}>
                  <Errormessages Error={fileerror} />
                </Box>
              </Grid>
              {/* <Grid item xs={2} sm={1} md={0.5} lg={0.5} sx={{ mt: '5px' }}>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true
                    }}
                    onClose={handleClick}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    arrow
                    open={open}
                    title={Note}
                    placement="left"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          marginLeft: '70px',
                          transform: 'translate3d(15px, 0.5px, 0px) !important'
                        }
                      }
                    }}
                  >
                    <IconButton onClick={handleClick}>
                      <InfoTwoToneIcon
                        type="button"
                        sx={{ color: 'navy', fontSize: '20px', mt: '-10px' }}
                      />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              </Grid> */}

              <Grid item xs={12}>
                {finalBase642New == undefined ||
                  finalBase642New.length == 0 ||
                  PageName == 'Reply' ? null : (
                  <div>
                    <Typography>Attachment(s):</Typography>

                    {finalBase642New.map((obj, i) => {
                      return (
                        <>
                          <Box key={obj.FileName} sx={{ display: 'flex' }}>
                            <FilePresentRoundedIcon sx={{ color: 'blue' }} />

                            <CardDetail8 sx={{ mt: '1px' }}>
                              {obj.FileName.slice(0, 25)}
                            </CardDetail8>

                            <IconButton
                              aria-label="delete"
                              title="Delete"
                              onClick={() =>
                                handleRemoveListItems(
                                  obj.FileName,
                                  obj.Base64URL
                                )
                              }
                            >
                              <DeleteIcon sx={{ color: 'red', mt: '-4px' }} />
                            </IconButton>
                          </Box>
                        </>
                      );
                    })}
                  </div>
                )}
              </Grid>

              <Grid item xs={6} sm={4} md={4} lg={2} sx={ReadRecipient}>
                <Checkbox
                  onChange={() => setRequestReadReceipt(!requestReadReceipt)}
                  size="small"
                  sx={{ ml: '-10px' }}
                />
                <Typography sx={{ display: 'inline-block' }}>
                  Request Read Receipt ?
                </Typography>
              </Grid>

              <Grid item xs={6} sm={4.5} md={4.5} lg={2} sx={{ mt: '-10px' }}>
                <Checkbox
                  onChange={scheduleMessageCheckBox}
                  onClick={() => setRequestSchedule(!requestSchedule)}
                  size="small"
                  sx={{ ml: '1px' }}
                />
                <Typography sx={{ display: 'inline-block' }}>
                  Schedule Message at
                </Typography>
              </Grid>
              <Grid item xs={2} sm={1} md={1} lg={0}>
                <ClickAwayListener onClickAway={handleClickAwayS}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true
                    }}
                    onClose={handleClickS}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    arrow
                    open={Sopen}
                    title={NoteSchedule}
                    placement="right"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          marginLeft: '7px',
                          transform: 'translate3d(15px, 0.5px, 0px) !important'
                        }
                      }
                    }}
                  >
                    <IconButton onMouseOver={handleClickS}
                      sx={{ color: '#38548A	', mt: '-9px', ml: -1 }}>
                      <InfoIcon
                      // sx={{ color: '#38548A', fontSize: '20px',  }}
                      />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              </Grid>

              <Grid item xs={12} sm={3.5} md={3.5} lg={1.5} sx={{ ml: -5, mt: -1, messageCenterCale }} >
                {/* <TextField
                  sx={{ display: scheduleMessage }}
                  type="date"
                  id="outlined-required"
                  variant="standard"
                  onChange={scheduleDateAndTime}
                  inputProps={{ min: MinDate, max: MaxDate }}
                  fullWidth
                /> */}
                <Datepicker
                  DateValue={undefined}
                  onDateChange={scheduleDateAndTime}
                  label=""
                  size="medium"
                  minDate={MinDate}
                  maxDate={MaxDate}
                  display={scheduleMessage}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={3.5}
                md={3.5}
                lg={1.5}
                sx={{mt: -1,  display: scheduleMessage }}
              >
                {/* to be made working for release */}
                <TimePicker
                  value={value}
                  onChange={clickTime}
                  
                  // renderInput={(params) => (
                  //   <TextField
                  //     {...params}
                  //     variant="standard"
                  //     size="small"
                  //     sx={messageCenterCale}
                  //     InputProps={{
                  //       startAdornment: (
                  //         <InputAdornment position="start">
                  //            <AccessTimeIcon fontSize="small" /> 
                  //         </InputAdornment>
                  //       )
                  //     }}
                  //      fullWidth
                  //   />
                  // )} 
                 
                  
                /> 
              </Grid>

              <Grid item xs={6} sx={{ mt: 0, mb: '6px', ml: '1px' }}>
                <ErrorMessage1 Error={schTimeerror} />
                <ErrorMessage1 Error={requestScheduleMsg} />
              </Grid>

              <Grid item xs={12} sx={messageCenter}>
                <Box sx={{ p: 0 }}>
                  <ReactQuill value={formik.values.Content} modules={toolbarOptions}
                    onChange={formik.handleChange} theme='snow'
                    onChangeSelection={() => { }} style={{ height: '15vh', resize: 'vertical' }} />
                </Box>
                {/* <TextField
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  label="Content :"
                  name="Content"
                  type="text"
                  variant="outlined"
                  sx={{ mt: '30px' }}
                  value={formik.values.Content}
                  onChange={formik.handleChange}
                /> */}
                <Errormessages Error={contenterror} />
                {/* {isMobile  ? 
                 <TextField fullWidth multiline rows={4}
                 margin="normal" label='Content :' name="Content" type="text"
                 variant="outlined" sx={{ mt: "16px" }}
                 value={formik.values.Content}
                 onChange={formik.handleChange}
               />:
            
               <ReactQuill value={formik.values.Content} onChange={formik.handleChange} modules={toolbarOptions} />
            } */}

                <Box mb={0.5}>
                  {formik.touched.Content && formik.errors.Content ? (
                    <ErrorMessage1 Error={formik.errors.Content} />
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mt: 2, pl: 0 }}>
                {PageName === 'Reply' || PageName === 'Forwa' ? (
                  <>
                    <FormHelperText sx={{ ml: '3px' }}>
                      Original message
                    </FormHelperText>
                    <BoxContent>
                      <Wordbreak1
                        dangerouslySetInnerHTML={{ __html: MSGBody }}
                      />
                    </BoxContent>
                  </>
                ) : null}

              </Grid>

              {/* <Grid container spacing={1} sx={{ m: 0.5, pt: 2, pl: 125 }}  >
                <Grid item xs={12} sm={6} >
                  <Button
                    // color="primary"
                    type="submit"
                    fullWidth
                    onClick={formik.handleChange}
                    disabled={disabledStateOfSend}
                    sx={{
                      color: '#38548A',
                      '&:hover': {
                        color: 'blue',
                        backgroundColor: blue[100]
                      }
                    }}
                  >
                    Send
                  </Button>
                </Grid>
                <Grid item xs={12} sm={5} >
                  <Button
                    // color="primary" 
                    fullWidth onClick={SaveDraft}
                    sx={{
                      color: 'green',
                      '&:hover': {
                        color: 'green',
                        backgroundColor: green[100]
                      }
                    }}>
                    Save As Draft
                  </Button>
                </Grid>
              </Grid> */}
            </Grid>

          </form>
        </ListStyle>
      </Box>
      {/* <div style={{ display: displayOfRecipients, paddingTop:'15px' }}>
        <AddReciepents
          RecipientName={RecipientsObject.RecipientName}
          RecipientId={RecipientsObject.RecipientId}
          recipientListClick={RecipientsListFun}
        ></AddReciepents>
      </div>
      <div style={{ display: displayOfCCRecipients }}>
        <AddReciepents
          RecipientName={RecipientsCCObject.RecipientName}
          RecipientId={RecipientsCCObject.RecipientId}
          recipientListClick={RecipientsCCListFun}
        ></AddReciepents>
      </div> */}

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
          {showRecipients ? 'Add Recipients' : 'Add CC Recipients'}
        </Typography>

        <DialogContent>
          <Box>
            {showRecipients ? (
              <AddReciepents
                RecipientName={RecipientsObject.RecipientName}
                RecipientId={RecipientsObject.RecipientId}
                recipientListClick={RecipientsListFun}
              />
            ) : (
              <AddReciepents
                RecipientName={RecipientsCCObject.RecipientName}
                RecipientId={RecipientsCCObject.RecipientId}
                recipientListClick={RecipientsCCListFun}
              />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Form13;
