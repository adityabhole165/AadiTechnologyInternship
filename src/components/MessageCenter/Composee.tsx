import { QuestionMark } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DraftsIcon from '@mui/icons-material/Drafts';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import InfoIcon from '@mui/icons-material/Info';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { blue, green, grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import JoditEditor from 'jodit-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import { Styles } from 'src/assets/style/student-style';
import { AlertContext } from 'src/contexts/AlertContext';
import { ISaveDraftMessageBody } from 'src/interfaces/MessageCenter/IDraftMessage';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import Errormessages from 'src/libraries/ErrorMessages/Errormessage';
import {
  BoxContent,
  CardDetail8,
  Wordbreak1
} from 'src/libraries/styled/CardStyle';
import {
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
import { getDateFormat1, isFutureDateTime } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import AddReciepents from './AddReciepents';
import Datepicker from './DatepickerMessage';
import { TimepickerTwofields1 } from './TimeField';


function Form13() {
  const [openDialog, setOpenDialog] = useState(false);
  const [showRecipients, setShowRecipients] = useState(false);
  const [IsConfirm, setIsConfirm] = useState('');
  const RecipientsList: any = useSelector(
    (state: RootState) => state.MessageCenter.RecipientsName
  );
  const ContactGRPusers = useSelector(
    (state: RootState) => state.MessageCenter.ContactgrpUsers
  );
  const SaveDraftM = useSelector(
    (state: RootState) => state.DraftMessages.SaveDraftMessage
  );
  const editor = useRef(null);
  const [content, setContent] = useState('');

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

  const [groupSelectionId, setGroupSelectionId] = useState<string>('');  // Provide initial 

  const getGroupRadio1 = (isActive) => {
    if (isActive !== undefined) {
      sessionStorage.setItem('GroupSelectionId1', isActive);
    }
  }
  const getGroupRadio = (value) => {
    if (value !== undefined) {
      sessionStorage.setItem('GroupSelectionId', value);
    }
  }
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
  const [value, setValue] = useState(new Date());
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [schTimeerror, setSchTimeerror] = useState('');
  const [requestScheduleMsg, setRequestScheduleMsg] = useState('');
  const [requestReadReceipt, setRequestReadReceipt] = useState(false);
  const [requestSchedule, setRequestSchedule] = useState(false);
  const [scheduleTime, setscheduleTime] = useState<string>('');
  const [subjecterror, setSubjecterror] = useState('');
  const [contenterror, setContenterror] = useState('');
  let dataShow: any = [];
  const Note: string =
    'Supports only .bmp, .doc, .docx, .jpg, .jpeg, .pdf, .png, .pps, .ppsx, .ppt, .pptx, .xls, .xlsx files types with total size upto 50 MB.';
  const NoteSchedule: string =
    'Messages can be scheduled for the upcoming seven days. Recipients will not receive notifications on their mobile devices for scheduled messages.';
  const { showAlert, closeAlert } = useContext(AlertContext);
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const localschoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const StudentName = sessionStorage.getItem('StudentName');
  const DivisionId = sessionStorage.getItem('DivisionId');
  const SchoolName = localStorage.getItem('SchoolName');
  const userName = sessionStorage.getItem('StudentName');
  const DesignationName = sessionStorage.getItem('DesignationName');
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
    setIsConfirm('');
    setShowRecipients(isRecipients);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsConfirm('true');
  };

  const CheckValidation = (fileData) => {
    const fileExtension = fileData?.name?.split('.').at(-1);
    setfileExtension(fileExtension);
    const allowedFileTypes = [
      'DOC',
      'DOCX',
      'JPG',
      'JPEG',
      'PDF',
      'PPS',
      'PPSX',
      'PPT',
      'PPTX',
      'XLS',
      'XLSX',
      'doc',
      'docx',
      'jpg',
      'jpeg',
      'pdf',
      'pps',
      'ppsx',
      'ppt',
      'pptx',
      'xls',
      'xlsx'
    ];
    if (fileExtension != undefined || null) {
      if (!allowedFileTypes.includes(fileExtension)) {
        setFilerror('Invalid file format.');
        return false;
      }

      if (fileData?.size >= 50e6) {
        setFilerror('Total file size should be less than 50 MB.');
        return false;
      }
      setFilerror(null);
      return true;
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
    setLoading(false);
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
        RecipientsObject.RecipientId.toString() + ',' + ContactGRPusers.toString(),

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
            toast.success('Message scheduled successfully.', {
              toastId: 'success1'
            });
          } else {
            toast.success('Message sent successfully.', { toastId: 'success1' });
          }
          localStorage.setItem('messageBody', '');
          setTimeout(RediretToSentPage, 100);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error('Message did not sent successfully.', { toastId: 'error1' });
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
          : PageName == 'Reply'
            ? 'RE: ' + Text
            : PageName == 'Edit'
              ? Text
              : '',
      Content:
        PageName == 'Edit'
          ? originalMessageBody
          : '<br/><br/>Thanks and Regards,<br/>' +
          sessionStorage.getItem('StudentName'),
      Attachment: PageName == 'Edit' && null
    },

    // const formik = useFormik({
    //   initialValues: {
    //     To: '',
    //     Cc: '',
    //     Subject:
    //       (PageName == 'Forwa'
    //         ? 'FW: ' + Text
    //         : '') || (PageName == 'Reply'
    //           ? 'RE: ' + Text
    //           : '') || PageName == 'Edit'
    //         ? Text
    //         : '',
    //     Content: PageName == 'Edit' ? Text : '',
    //     Attachment: PageName == 'Edit' && null
    //   },
    onSubmit: (values) => {
      let valid = false;
      if (requestSchedule) {
        if (scheduleDate + value) {
          valid = true;
        }
        if (scheduleDate.length == 0) {
          setRequestScheduleMsg('Schedule date should not be blank.');
          valid = false;
        } else if (!isFutureDateTime(scheduleDate + ' ' + strTime)) {
          setSchTimeerror('Message schedule time should be in future.');
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
      console.log('>>>>>>', scheduleDate);

      //
      // let valid = false;
      // if (requestSchedule) {
      //   if (scheduleDate !== '') {
      //     setRequestScheduleMsg('');
      //   }
      //   if (scheduleDate + value) {
      //     valid = true;
      //   }
      //   if (scheduleDate === '') {
      //     console.log('>>>>>>', scheduleDate);

      //     setRequestScheduleMsg('Schedule date should not be blank.');
      //     valid = false;
      //   } else if (!isFutureDateTime(scheduleDate + ' ' + strTime)) {
      //     setSchTimeerror('Message schedule time should be in future.');
      //     valid = false;
      //   } else {
      //     setRequestScheduleMsg('');
      //   }
      // } else {
      //   valid = true;
      // }
      //
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
  const [recipients, setRecipients] = useState(
    RecipientsObject.RecipientName || []
  );

  // Update local recipients state whenever the RecipientsObject changes
  useEffect(() => {
    setRecipients(RecipientsObject.RecipientName || []);
  }, [RecipientsObject.RecipientName]);

  // Handle deleting a chip
  const handleDelete = (chipToDelete, index) => {
    const updatedRecipients = recipients.filter(
      (recipient, i) => i !== index
    );
    setRecipients(updatedRecipients);
    setRecipientsObject((prev) => ({
      ...prev,
      RecipientName: prev.RecipientName.filter((recipient, i) => i !== index),
      RecipientId: prev.RecipientId.filter((recipient, i) => i !== index),
    }));
  };
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    if (
      !(ReplyRecipientNameId.ReplyRecipientName === undefined ||
        ReplyRecipientNameId.ReplyRecipientName === '')) {
      RecipientsObject.RecipientName = ReplyRecipientNameId.ReplyRecipientName.split(',');
      RecipientsObject.RecipientId = ReplyRecipientNameId.ReplyRecipientID.split(','); // Fixed: Using ReplyRecipientID instead of ReplyRecipientName

    }
    if (!(
      ReplyAllRecipientNameId.ReplyAllRecipientName === undefined ||
      ReplyAllRecipientNameId.ReplyAllRecipientID === ''
    )) {
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
  // 


  const clickTime = (timeValue) => {
    console.log(timeValue);
    if (scheduleDate !== '') {
      checkScheduleValidation(scheduleDate + ' ' + timeValue);
    }
    // Convert timeValue (HH:mm) to Date object for state
    const [hours, minutes] = timeValue.split(':').map(Number);
    const newDate = new Date(value);
    newDate.setHours(hours, minutes);
    setValue(newDate);
  };

  const scheduleDateAndTime = (dateValue) => {
    const dateValue1 = getDateFormat1(dateValue);
    setScheduleDate((prevState) => {
      const dateValue1 = getDateFormat1(dateValue);
      console.log('New scheduleDate:', dateValue1);
      return dateValue1;
    });
    console.log(scheduleDate);

    if (scheduleDate !== '') {
      setRequestScheduleMsg('');
    }

    const timeString = formatTime(value);
    if (scheduleDate !== '') {
      checkScheduleValidation(scheduleDate + ' ' + timeString);
    }
  };
  useEffect(() => {
    if (scheduleDate !== '') {
      setRequestScheduleMsg('');
      const timeString = formatTime(value);
      checkScheduleValidation(scheduleDate + ' ' + timeString);
    }
  }, [scheduleDate, value]);

  const checkScheduleValidation = (DateTime) => {
    if (isFutureDateTime(DateTime)) {
      setSchTimeerror('');
    } else {
      setSchTimeerror('Message schedule time should be in future.');
    }
  };
  // 

  // const [value, setValue] = React.useState(new Date());
  let hours = value.getHours();
  let minutes = value.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  let strTime = hours + ':' + minutes + ' ' + ampm;

  // const clickTime = (value) => {
  //   const time = formatAMPM(value);
  //   if (scheduleDate !== '') {
  //     checkScheduleValidation(scheduleDate + ' ' + time);
  //   }
  //   setValue(value);
  // };

  // const scheduleDateAndTime = (value) => {
  //   if (scheduleDate !== '') {
  //     setRequestScheduleMsg('');
  //   }
  //   if (scheduleDate !== '') {
  //     checkScheduleValidation(getDateFormat1(value) + ' ' + strTime);
  //   }
  //   setscheduleDate(getDateFormat1(value));
  // };
  // const checkScheduleValidation = (DateTime) => {
  //   if (isFutureDateTime(DateTime)) {
  //     setSchTimeerror('');
  //   } else {
  //     setSchTimeerror('Message schedule time should be in future.');
  //   }
  // };
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
    aiDraftId: PageName == "Edit" ? ID : "",
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
      Body: (PageName == "Reply" || PageName == "ReplyAll" || PageName == "Forwa") ?
        formik.values.Content + "<br><br>" +
        "------------ Original message ------------<br><br>" + MSGBody + "<br><br>" : formik.values.Content,
      ReceiverUserIdCc: '',
      DisplayTextCc: RecipientsCCObject.RecipientName.toString()
    }
  };
  const ValidFileTypes = ['PDF', 'PNG', 'JPEG', 'JPG', 'BMP'];
  //const MaxfileSize = 10000000;
  const MaxfileSize = 50000000;
  // const ValidFileTypes2 =  ['PDF', 'PNG', 'JPEG', 'JPG', 'BMP'];
  const ValidFileTypes2 = [
    'DOC',
    'DOCX',
    'JPG',
    'JPEG',
    'PDF',
    'PPS',
    'PPSX',
    'PPT',
    'PPTX',
    'XLS',
    'XLSX'
  ];

  const SaveDraft = () => {
    let isError = false;
    // if (formik.values.Subject === '') {
    //   setSubjecterror('Subject is required');
    //   isError = true;
    // }
    // if (formik.values.Content === '') {
    //   setContenterror('Content is required');
    //   isError = true;
    // } else {
    dispatch(getSaveDraftMessage(SaveDraftBody));

  };

  useEffect(() => {
    if (SaveDraftM !== '') {
      toast.success(SaveDraftM, { toastId: 'success1' });
      dispatch(resetSaveDraftMessage());

    }
  }, [SaveDraftM]);
  useEffect(() => {
    // dlt session storage
    sessionStorage.removeItem('GroupSelectionId');
  }, [])

  function hasNonEmptyArray(obj) {
    console.log(
      'obj', obj
    );

    return Object.values(obj).some(array => Array.isArray(array) && array.length > 0);
  }

  const clickConfirm = (RecipientsObject) => {
    // if (RecipientsObject.RecipientName.length === 0) {
    //   showAlert({
    //     title: 'Please Confirm',
    //     message: 'No User/Contact group is selected. Are you sure you want to continue?',
    //     variant: 'warning',
    //     confirmButtonText: 'Confirm',
    //     cancelButtonText: 'Cancel',
    //     onCancel: () => {
    //       closeAlert();
    //     },

    //     onConfirm: () => {
    //       closeAlert();
    //     },
    //   })
    // }
    // else { "" }
    if (sessionStorage.getItem('GroupSelectionId') === '9' && RecipientsObject.ContactGroup.length === 0 &&
      RecipientsObject.RecipientName.length === 0) {
      showAlert({
        title: 'Please Confirm',
        message: 'No group is selected. Are you sure you want to continue?',
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {
          closeAlert();
        },
      })
      // Need To Add condition over here | Note 🔔   windows + .
    } else if (RecipientsObject.RecipientName.length === 0) {
      console.log(RecipientsObject, 'checkthis');

      showAlert({
        title: 'Please Confirm',
        message: 'No User is selected. Are you sure you want to continue?',
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {
          closeAlert();
        },
      })
    }
    handleCloseDialog();
  };
  const [recipientsCC, setRecipientsCC] = useState(
    RecipientsCCObject.RecipientName || []
  );

  useEffect(() => {
    setRecipientsCC(RecipientsCCObject.RecipientName || []);
  }, [RecipientsCCObject.RecipientName]);

  // Handle deleting a chip (recipient)
  const handleDelete1 = (chipToDelete, index) => {
    const updatedRecipients = recipientsCC.filter(
      (recipient, i) => i !== index
    );
    setRecipientsCC(updatedRecipients);
    setRecipientsCCObject((prev) => ({
      ...prev,
      RecipientName: prev.RecipientName.filter((recipient, i) => i !== index),
      RecipientId: prev.RecipientId.filter((recipient, i) => i !== index),
    }));
  };
  return (
    <>
      <Box sx={{ px: 2, height: '95vh', mb: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Message Center',
              path: '/extended-sidebar/MessageCenter/msgCenter'
            },
            { title: 'Compose Message', path: '' }
          ]}
          rightActions={
            <>
              <Box>
                <Tooltip
                  title={`Write a new message / send reply to the message received.`}
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
                    type="submit"
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
                    type="submit"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
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
        <Box sx={{ backgroundColor: 'white', px: 2, minHeight: '85vh', mt: 2, mb: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <Typography variant="h4" pl={1}>
                  Form
                </Typography>
              </Grid> */}
              <Grid item xs={12} sm={8} md={9.5}>
                {/* <FormControl fullWidth> */}
                <TextField
                  multiline
                  id=""
                  fullWidth
                  label={
                    <span style={{ color: '#38548A' }}>
                      From
                    </span>
                  }
                  InputProps={{
                    readOnly: true
                  }}
                  value={fullDisplayName}
                  // value={RecipientsObject.RecipientName.map((obj) =>
                  //   obj?.trim()
                  // ).join('; ')}
                  onChange={formik.handleChange}
                // sx={{
                //   height: '50px',
                //   overflow: 'auto',
                //   border: '0.1px solid #c4c5c5',
                //   borderRadius: '7px'
                // }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="h4" pl={1}>
                  To
                </Typography>
              </Grid> */}

              <Grid item xs={12} sm={8} md={9.5}>
                {/* <FormControl fullWidth> */}
                <TextField
                  // multiline
                  // id=""
                  fullWidth
                  label={
                    <span style={{ color: '#38548A' }}>
                      To <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', minWidth: '100%', height: '110px' }}
                      >
                        <>
                          {recipients.map((recipient, index) => (
                            <Chip
                              key={index}
                              label={recipient?.trim()}
                              onDelete={() => handleDelete(recipient, index)} // Add delete functionality
                              sx={{ my: 1, mx: 0.5, }}
                            />
                          ))}
                        </>
                      </Box>
                    ),
                    readOnly: true
                  }}
                  // Display joined recipients as string in textfield
                  onChange={formik.handleChange}
                // sx={{
                //   height: '120px',
                //   overflow: 'auto',
                //   my:2,
                //   // border: '0.1px solid #c4c5c5',
                //   borderRadius: '7px'
                // }}
                />
                <Box mt={0}>
                  {RecipientsList.length == 0 &&
                    formik.touched.To &&
                    formik.errors.To ? (
                    <ErrorMessage1 Error={formik.errors.To} />
                  ) : null}
                </Box>
              </Grid>
              {loading && <SuspenseLoader />}
              <Grid item xs={6} sm={2} md={1}>
                <Button
                  fullWidth
                  onClick={() => handleOpenDialog(true)}
                  sx={{
                    color: '#38548A',
                    width: '140px',
                    mt: 4,
                    '&:hover': { color: '#38548A', backgroundColor: blue[100] }
                  }}
                >
                  Add Recipients
                </Button>
              </Grid>
              <Grid item xs={6} sm={2} md={1}>
                <Button
                  fullWidth
                  onClick={clickHide}
                  sx={{
                    color: '#38548A',
                    ml: 4,
                    mt: 4,
                    '&:hover': { color: '#38548A', backgroundColor: blue[100] }
                  }}
                >
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
                    <Typography variant="h4" pl={1}>
                      Cc
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9.5}>
                    <TextField
                      multiline
                      id=""
                      fullWidth
                      disabled
                      InputProps={{
                        startAdornment: (
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '4px'
                            }}
                          >
                            {recipientsCC.map((recipient, index) => (
                              <Chip
                                key={index}
                                label={recipient?.trim()}
                                sx={{ margin: '2px 4px' }}
                                onDelete={() => handleDelete1(recipient, index)} // Add delete functionality
                              />
                            ))}
                          </Box>
                        )
                      }}
                      // value={recipientsCC.join('; ')} // Display joined recipients as a string in the textfield
                      onChange={formik.handleChange}
                      sx={{
                        height: 'auto',
                        overflow: 'auto',
                        border: '0.1px solid #c4c5c5',
                        borderRadius: '5.3px',
                        marginLeft: '0px'
                      }}
                    />
                  </Grid>

                  <Grid item xs={6} sm={2} md={1}>
                    <Box>
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
                  label={
                    <span>
                      Subject <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  name="Subject"
                  type="text"
                  autoComplete="off"
                  value={formik.values.Subject}
                  onChange={formik.handleChange}
                />
                <Errormessages Error={subjecterror} />
                <Box sx={{ mt: 1.5 }}>
                  {formik.touched.Subject && formik.errors.Subject ? (
                    <ErrorMessage1 Error={formik.errors.Subject} />
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={2} md={2} lg={2.5} >
                <Tooltip
                  title={
                    'Supports only ' +
                    ValidFileTypes2.join(', ') +
                    ' files types with total size upto ' +
                    (MaxfileSize / 1000000).toString() +
                    'MB.'
                  }
                >
                  <Button
                    sx={{
                      width: '250px',
                      height: 'auto',
                      gap: 1,
                      border: (theme) =>
                        `1px dashed ${theme.colors.primary.main}`,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    color={'primary'}
                  >
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      gap={1}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <CloudUploadIcon />
                      Select Image
                      <input
                        ref={aRef}
                        type="file"
                        multiple
                        onChange={fileChangedHandler}
                        style={{
                          opacity: 0,
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0
                        }}
                      />
                    </Stack>
                  </Button>
                </Tooltip>

                <Box sx={{ mt: '15px', width: '220px' }}>
                  <Errormessages Error={fileerror} />
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={4} lg={2} sx={{ mt: 0.5 }} >
                <Checkbox
                  size="medium"
                  onChange={() => setRequestReadReceipt(!requestReadReceipt)}
                />
                <Typography sx={{ display: 'inline-block', }}>
                  Request Read Receipt ?
                </Typography>
              </Grid>

              <Grid item xs={6} sm={4} md={4} lg={2.5} sx={{ mt: 0.5 }}>
                <Checkbox
                  onChange={scheduleMessageCheckBox}
                  onClick={() => setRequestSchedule(!requestSchedule)}
                  size="medium"

                />
                <Typography sx={{ display: 'inline-block', mt: 0.5 }}>
                  Schedule Message at
                </Typography>
                {/* </Grid> */}
                {/* <Grid item xs={2} sm={0.5} md={0.5} lg={0.5}> */}
                <ClickAwayListener onClickAway={handleClickAwayS}>
                  <Tooltip
                    PopperProps={{ disablePortal: true }}
                    onClose={handleClickS}
                    arrow
                    open={Sopen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={NoteSchedule}
                    placement="right"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          // marginLeft: '7px',
                          transform: 'translate3d(15px, 0.5px, 0px) !important'
                        }
                      }
                    }}
                  >
                    <IconButton
                      onMouseOver={handleClickS}
                      sx={{ color: '#38548A', ml: 2 }}
                    >
                      <InfoIcon
                      // sx={{ color: '#38548A', fontSize: '20px',  }}
                      />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              </Grid>

              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={2.5}
                sx={{ messageCenterCale }}
              >
                <Datepicker
                  DateValue={undefined}
                  onDateChange={scheduleDateAndTime}
                  label=""
                  size="medium"
                  minDate={MinDate}
                  maxDate={MaxDate}
                  display={scheduleMessage}
                  readonly={true}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={2.4}
                sx={{ display: scheduleMessage }}
              >
                {/* <TimePicker value={value} onChange={clickTime} slotProps={{
                  actionBar: {
                    actions: []
                  }
                }} /> */}
                <TimepickerTwofields1
                  Item={formatTime(value)}
                  label={'Time'}
                  isMandatory={false}
                  ClickItem={clickTime}
                  size={"medium"}
                // tooltipMessage="e.g. 14:00"
                />
              </Grid>
              <Grid item xs={12}>
                {finalBase642New == undefined ||
                  finalBase642New.length == 0 ||
                  PageName == 'Reply' ? null : (
                  <div>
                    <Typography>Attachment(s):</Typography>

                    {finalBase642New.map((obj, i) => {
                      return (
                        <div key={i}>
                          <Box key={obj.FileName} sx={{ display: 'flex' }}>
                            <FilePresentRoundedIcon sx={{ color: 'blue' }} />
                            <CardDetail8 sx={{ mt: '1px' }}>
                              {obj.FileName.slice(0, 25)}
                            </CardDetail8>
                            <Tooltip title={'Delete'}>
                              <IconButton
                                aria-label="delete"
                                // title="Delete"
                                onClick={() =>
                                  handleRemoveListItems(
                                    obj.FileName,
                                    obj.Base64URL
                                  )
                                }
                                sx={{
                                  color: '#38548A	',
                                  ml: 2,
                                  p: 0.2,
                                  mt: -0.7,
                                  '&:hover': {
                                    color: 'red',
                                    backgroundColor: red[100]
                                  }
                                }}
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Grid>


              <Grid item xs={6} sx={{ mt: 0, ml: '1px' }}>
                <ErrorMessage1 Error={schTimeerror} />
                <ErrorMessage1 Error={requestScheduleMsg} />
              </Grid>

              <Grid item xs={12} sx={messageCenter}>
                <Box sx={{}}>
                  {/* <ReactQuill value={formik.values.Content}
                    onChange={(content) => formik.setFieldValue('Content', content)}
                    modules={toolbarOptions}
                    style={{ height: '20vh', resize: 'vertical' }} /> */}
                  {/* <QuillEditor formik={formik} /> */}
                  <JoditEditor
                    ref={editor}
                    value={formik.values.Content}
                    // config={{
                    //   disablePlugins: ['ai-assistant', 'class-span', 'about', 'powered-by-jodit','paste-storage','placeholder']
                    // }}
                    onChange={(newContent) => {
                      formik.setFieldValue('Content', newContent);
                    }}
                  />
                </Box>
                <Errormessages Error={contenterror} />
                <Box mb={0.5}>
                  {formik.touched.Content && formik.errors.Content ? (
                    <ErrorMessage1 Error={formik.errors.Content} />
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mb: 5, }}>
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
            </Grid>
          </form>
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: '15px' } }}
      >
        <DialogTitle sx={{ bgcolor: '#223354' }}>
          <Tooltip
            title={
              'Select name of the teacher / student / admin staff / other staff and click on " Confirm " button.'
            }
            placement="bottom-end"
          >
            <QuestionMark
              sx={{
                color: 'white',
                // background:'white',
                borderRadius: '10px',
                position: 'absolute',
                top: '4px',
                right: '35px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: grey[600] }
              }}
            />
          </Tooltip>
          <ClearIcon
            onClick={handleCloseDialog}
            sx={{
              color: 'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red'
              }
            }}
          />
        </DialogTitle>
        <Typography variant="h3" sx={{ pt: 2, pl: 3 }}>
          {showRecipients ? 'Add Recipients' : 'Add Cc Recipients'}
        </Typography>

        <DialogContent>
          <Box sx={{ overflow: 'auto', maxBlockSize: '400px', mt: 2 }}>
            {showRecipients ? (
              <AddReciepents
                getGroupRadio={getGroupRadio}
                RecipientName={RecipientsObject.RecipientName}
                RecipientId={RecipientsObject.RecipientId}
                recipientListClick={RecipientsListFun}
                contactGroupList={RecipientsObject.ContactGroup}
                classIdList={RecipientsCCObject.ClassId}
                IsConfirm={IsConfirm}
                getGroupRadio1={getGroupRadio1} />
            ) : (
              <AddReciepents
                getGroupRadio={getGroupRadio}
                RecipientName={RecipientsCCObject.RecipientName}
                RecipientId={RecipientsCCObject.RecipientId}
                recipientListClick={RecipientsCCListFun}
                contactGroupList={RecipientsObject.ContactGroup}
                classIdList={RecipientsCCObject.ClassId}
                IsConfirm={IsConfirm}
                getGroupRadio1={getGroupRadio1} />

            )}
          </Box>
          <Box>
            <DialogActions sx={{ py: 2, px: 3 }}>
              <Button color={'error'} onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                onClick={() => { clickConfirm(RecipientsObject) }}
                sx={{
                  color: 'green',
                  '&:hover': {
                    color: 'green',
                    backgroundColor: green[100]
                  }
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Form13;


