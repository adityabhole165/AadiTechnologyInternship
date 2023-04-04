import { Container, TextField, Box, FormControl, Grid, Typography, InputAdornment, useTheme, TextareaAutosize, Fab, ClickAwayListener, Tooltip, Checkbox, } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { AttachmentFile, ISendMessage } from '../../interfaces/MessageCenter/MessageCenter';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import { addRecipients, ContactGroupUsers } from 'src/requests/MessageCenter/MessaageCenter';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import ReplyIcon from '@mui/icons-material/Reply';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { BoxContent, CardDetail8, ListStyle, Wordbreak, Wordbreak1 } from 'src/libraries/styled/CardStyle';
import AddReciepents from './AddReciepents';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { textAlign } from '@mui/system';
import Errormessages from 'src/libraries/ErrorMessages/Errormessage';
import { FormHelperText } from '@mui/material';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { isFutureDateTime, formatAMPM } from '../Common/Util';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TimePicker from '@mui/lab/TimePicker';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
function Form13() {

  const RecipientsList: any = useSelector(
    (state: RootState) => state.MessageCenter.RecipientsName
  );
  const ContactGRPusers = useSelector(
    (state: RootState) => state.MessageCenter.ContactgrpUsers
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
  const ViewData = localStorage.getItem("ViewMessageData");
  const View = (ViewData === null || ViewData === "") ? "" : JSON.parse(ViewData)
  const From = (ViewData === null || ViewData === "") ? "" : View.From;
  const Text = (ViewData === null || ViewData === "") ? "" : View.Text;
  const AttachmentArray = (ViewData === null || ViewData === "" || View.Attachment == "") ? "null" : View.Attachment.join(',');
  const ID = (ViewData === null || ViewData === "") ? "" : View.ID;
  const FromUserID = (ViewData === null || ViewData === "") ? "" : View.FromUserID;

  const ReplyRecipientNameId = {
    ReplyRecipientName: From,
    ReplyRecipientID: FromUserID
  };

  const [ArrayOfAttachment, setArrayOfAttachment] = useState<any>([]);
  const [RecipientsObject, setRecipientsObject] = useState<any>({
    RecipientName: [],
    RecipientId: [],
    ClassId: [],
    ContactGroup:[]
  });

  const [RecipientsCCObject, setRecipientsCCObject] = useState<any>({
    RecipientName: [],
    RecipientId: [],
    ClassId: []
  });

  const [finalBase642, setFinalBase642] = useState<AttachmentFile[]>([]);

  const [finalBase642Duplicate, setFinalBase642Duplicate] = useState([]);

  const [FileNameOfAttachment, setFileNameOfAttachment] = useState([]);
  const [Base64URLOfAttachment, setBase64URLOfAttachment] = useState([]);
  const [finalBase642New, setFinalBase642New] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const aRef = useRef(null);

  const originalMessageBody = localStorage.getItem("messageBody")
  const MSGBody = originalMessageBody?.replace(/(\r\n|\r|\n)/g, '<br>');
  useEffect(() => {
  }, [finalBase642New])
  useEffect(() => {
    if (PageName == 'Reply') {
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
          FileNameOfAttachment.push(AttachmentFile.FileName)
          Base64URLOfAttachment.push(AttachmentFile.Base64URL)
        }
        setArrayOfAttachment((prev) => [...prev]);
        setFinalBase642Duplicate((prev) => [...prev]);
        setFileNameOfAttachment((prev) => [...prev])
        setBase64URLOfAttachment((prev) => [...prev])
      }
      for (let key in FileNameOfAttachment) {
        finalBase642New.push({ FileName: FileNameOfAttachment[key], Base64URL: Base64URLOfAttachment[key] })
      }
      setFinalBase642New((prev) => [...prev])
      //setFinalBase642New(prev => [...prev, finalBase642New])
    }
  }, [AttachmentArray]);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const classes = Styles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fileerror, setFilerror] = useState<any>('');
  const [fileName, setfileName] = useState('');
  const [displayOfRecipients, setdisplayOfRecipients] = useState('none');
  const [displayOfCCRecipients, setdisplayOfCCRecipients] = useState('none');
  const [displayOfComposePage, setdisplayOfComposePage] = useState('block');
  const [scheduleMessage, setscheduleMessage] = useState('none');
  const [requestReadReceipt, setRequestReadReceipt] = useState(false)
  const [scheduleDate, setscheduleDate] = useState<string>('');
  const [requestSchedule, setRequestSchedule] = useState(false);
  const [requestScheduleMsg, setRequestScheduleMsg] = useState('');
  const [schTimeerror, setSchTimeerror] = useState('');
  const [scheduleTime, setscheduleTime] = useState<string>('');
  let dataShow: any = [];
  const Note: string =
    'Supports only .bmp, .doc, .docx, .jpg, .jpeg, .pdf, .png, .pps, .ppsx, .ppt, .pptx, .xls, .xlsx files types with total size upto 20 MB.';

  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const localschoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const StudentName = sessionStorage.getItem('StudentName');
  const DivisionId = sessionStorage.getItem('DivisionId');
  const SchoolName = localStorage.getItem('SchoolName');
  const [fileExtension, setfileExtension] = React.useState<any>('');
  const [disabledStateOfSend, setdisabledStateOfSend] = useState(false);
  const contactgrpuserBody = {
    asScholId: localschoolId,
    asAcademicYearId: AcademicYearId,
    asGroupId: "131",
    aiIsForUser: "0"
  }
  
  useEffect(() => {
    dispatch(ContactGroupUsers(contactgrpuserBody))
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
          setFinalBase642New(prev => [...prev, AttachmentFile])
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
          setFinalBase642New(array => [...array, AttachmentFile])
        }
      }
    }
  };

  const CheckValidation = (fileData) => {
    const fileExtension = fileData?.name?.split('.').at(-1);
    setfileExtension(fileExtension);
    const allowedFileTypes = ['BMP', 'DOC', 'DOCX', 'JPG', 'JPEG', 'PDF', 'PNG', 'PPS', 'PPSX', 'PPT', 'PPTX', 'XLS', 'XLSX', 'bmp', 'doc',
      'docx', 'jpg', 'jpeg', 'pdf', 'png', 'pps', 'ppsx', 'ppt', 'pptx', 'xls', 'xlsx'];

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
    setLoading(true)
    const sendMessageAPIBody: ISendMessage = {
      asSchoolId: localschoolId,
      aoMessage: {
        Body: formik.values.Content,
        Subject: formik.values.Subject,
        SenderName: StudentName,
        // DisplayText: RecipientsObject.RecipientName.toString(),
        DisplayText: RecipientsObject.RecipientName.toString(),
        SenderUserId: UserId,
        SenderUserRoleId: RoleId,
        AcademicYearId: AcademicYearId,
        SchoolId: localschoolId,
        InsertedById: UserId,
        Attachment: '',
        ScheduleDateTime: scheduleDate + ' ' + strTime,
        RequestReadReceipt: requestReadReceipt ? "1" : "0"
      },
      asIsForward: `${PageName === 'Forwa' ? 'Y' : 'N'}`,
      asIsSoftwareCordinator: 0,
      asMessageId: ID != undefined || ID != "" ? parseInt(ID) : 0,
      asSchoolName: SchoolName,
      asSelectedStDivId: RoleId == '3' ? DivisionId : RecipientsObject.ClassId.toString(),
      asSelectedUserIds: RecipientsObject.RecipientId.toString() + ContactGRPusers.toString(),
      sIsReply: `${PageName === 'Reply' ? 'Y' : 'N'}`,
      attachmentFile: finalBase642New,
      asFileName: fileName,
      asSelectedUserIdsCc: RecipientsCCObject.RecipientId.toString(),
      asSelectedStDivIdCc: RoleId == '3' ? DivisionId : RecipientsCCObject.ClassId.toString(),
      asIsSoftwareCordinatorCc: "",
      asDisplayTextCc: RecipientsCCObject.RecipientName.toString()
    };
    
    MessageCenterApi.SendMessage(sendMessageAPIBody)
      .then((res: any) => {
        if (res.status === 200) {
          setdisabledStateOfSend(true);
          if (scheduleMessage == 'block' && scheduleDate !== '' && value !== undefined) {
            toast.success('Message scheduled successfully', { toastId: 'success1' });
          } else {
            toast.success('Message sent successfully', { toastId: 'success1' });
          }
          localStorage.setItem("messageBody", '');
          setTimeout(RediretToSentPage, 100);
          setLoading(false)

        }
      })
      .catch((err) => {
        toast.error('Message did not sent successfully', { toastId: 'error1' });
        localStorage.setItem("messageBody", '');
        setdisabledStateOfSend(false);
        setLoading(false)

      });
  };


  const formik = useFormik({
    initialValues: {
      To: '',
      Cc: '',
      Subject: PageName == 'Forwa' ? "FW: " + Text : '' || PageName == 'Reply' ? "RE: " + Text : '',
      Content: '',
      Attachment: ''
    },
    onSubmit: (values) => {
      let valid = false;
      if (requestSchedule) {
        if (scheduleDate + value) {
          valid = true
        }
        if (scheduleDate.length == 0) {
          setRequestScheduleMsg('Schedule Date and Time should not be blank')
          valid = false
        } else
          if (!isFutureDateTime(scheduleDate + ' ' + strTime)) {
            setSchTimeerror('Please select future time')
            valid = false
          } else {
            setRequestScheduleMsg('')
          }
      }
      else {
        valid = true
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

  const AttachmentFilePath = localStorage.getItem('SiteURL') + '/RITeSchool/Uploads/';

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
      !(ReplyRecipientNameId.ReplyRecipientName === undefined ||
        ReplyRecipientNameId.ReplyRecipientName === "")) {
      RecipientsObject.RecipientName.push(
        ReplyRecipientNameId.ReplyRecipientName
      );
      RecipientsObject.RecipientId.push(Number(ReplyRecipientNameId.ReplyRecipientID))
    }
  }, []);

  const handleRemoveListItems = (fileName, fileData) => {
    setFinalBase642New((current) =>
      current.filter((obj) => obj.FileName !== fileName)
    )
    aRef.current.value = null;
  }
  const [value, setValue] = React.useState(new Date());
  let hours = value.getHours();
  let minutes = value.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  let strTime = hours + ':' + minutes + ' ' + ampm;

  const clickTime = (value) => {
    const time = formatAMPM(value)
    checkScheduleValidation(scheduleDate + " " + time)
    setValue(value)
  }

  const scheduleDateAndTime = (e) => {

    if (scheduleDate !== "") {
      setRequestScheduleMsg('')
    }
    checkScheduleValidation(e.target.value + " " + strTime)
    setscheduleDate(e.target.value);

  };
  const checkScheduleValidation = (DateTime) => {
    if (isFutureDateTime(DateTime)) {
      setSchTimeerror('')
    }
    else {
      setSchTimeerror('Please select future time')
    }
  }
  const [showCC, setShowCC] = useState(false)
  const clickHide = () => {
    setShowCC(!showCC)
  }

  return (
    <>
      <Container sx={{ display: displayOfComposePage }}>
        <span
          onClick={() => {
            navigate(-1);
          }}
        >
          <Fab
            className={classes.backArrow}
            sx={{
              position: 'absolute', top: '30px', left: '35px',
              background: `${theme.colors.gradients.pink1}`
            }}
          >
            <ReplyIcon />
          </Fab>
        </span>
        <ListStyle>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              <FormHelperText >To</FormHelperText>
              <TextField multiline id="" fullWidth disabled
                value={RecipientsObject.RecipientName.map(obj => obj?.trim()).join('; ')}
                onChange={formik.handleChange}
                sx={{ height: "50px", overflow: 'auto', border: "0.1px solid #c4c5c5", borderRadius: "5.3px" }}
              />
              <Box mt={0.5}>
                {RecipientsList.length == 0 ? (
                  <ErrorMessage1 Error={formik.errors.To} />
                ) : null}
              </Box>

              {loading && <SuspenseLoader />}
              <Grid container spacing={1}  >
                <Grid item xs={6} >
                  <ButtonPrimary fullWidth color="primary"
                    onClick={(e) => RecipientButton(e)}
                  >
                    Add Recipients
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={6} >
                  <ButtonPrimary fullWidth color="primary"
                    onClick={clickHide}
                  >
                    Add Cc
                  </ButtonPrimary>
                </Grid>
              </Grid>
              {showCC && <>
                <FormHelperText >Cc</FormHelperText>
                <TextField multiline id="" fullWidth disabled
                  value={RecipientsCCObject.RecipientName.map(obj => obj?.trim()).join('; ')}
                  onChange={formik.handleChange}
                  sx={{ height: "50px", overflow: 'auto', border: "0.1px solid #c4c5c5", borderRadius: "5.3px", }}
                />

                <Box mt={1}>
                  <ButtonPrimary
                    onClick={(e) => RecipientCCButton(e)}
                    color="primary">
                    Add Cc Recipients
                  </ButtonPrimary>
                </Box>
              </>}
            </FormControl>

            <TextField fullWidth margin="normal" label='Subject :'
              name="Subject" type="text" autoComplete="off"
              variant="standard" sx={{ mt: "5px" }}
              value={formik.values.Subject}
              onChange={formik.handleChange}
            />
            <Box mb={0.4}>
              {formik.touched.Subject && formik.errors.Subject ? (
                <ErrorMessage1 Error={formik.errors.Subject} />
              ) : null}
            </Box>

            <input ref={aRef} type="file" multiple onChange={fileChangedHandler} style={{ width: '280px', overflow: "hidden", textOverflow: "ellipsis" }} />
            <ClickAwayListener onClickAway={handleClickAway}>
              <Tooltip
                PopperProps={{
                  disablePortal: true
                }}
                onClose={handleClick}

                disableFocusListener disableHoverListener disableTouchListener arrow
                open={open} title={Note} placement="left"
                componentsProps={{
                  tooltip: {
                    sx: { marginLeft: '10px', mt: 0.5, transform: 'translate3d(17px, 0.5px, 0px) !important' }
                  }
                }}
              >
                <InfoTwoToneIcon type="button"
                  onClick={handleClick}
                  sx={{ color: 'navy', fontSize: '17px', float: 'right' }}
                />
              </Tooltip>
            </ClickAwayListener>
            <Box >
              <Errormessages Error={fileerror} />
            </Box>
            {finalBase642New == undefined ||
              finalBase642New.length == 0
              || PageName == 'Reply'
              ? null :
              (
                <div >
                  <Typography component={Box} mt={2}>Attachment(s):</Typography>
                  {
                    finalBase642New.map((obj, i) => {
                      return (
                        <Box key={obj.FileName}>
                          <Grid container>
                            <Grid item xs={2} >
                              <FilePresentRoundedIcon sx={{ color: 'blue' }} />
                            </Grid>
                            <Grid item xs={8}>
                              <CardDetail8 sx={{ mt: '1px' }}>
                                {obj.FileName.slice(0, 25)}
                              </CardDetail8>
                            </Grid>
                            <Grid item xs={2}>
                              <IconButton edge="end" aria-label="delete" title="Delete"
                                onClick={() =>
                                  handleRemoveListItems(
                                    obj.FileName,
                                    obj.Base64URL
                                  )
                                }
                              >
                                <DeleteIcon
                                  sx={{ color: 'red', mt: "-6px" }}
                                />
                              </IconButton >
                            </Grid>
                          </Grid>
                        </Box>
                      )
                    })
                  }
                </div>
              )}
            <br />
            <Box sx={{ mb: "12px" }}>
              <Box sx={{ mt: "-18px", mb: "-10px" }}>
                <Box mt={1}>
                  <Checkbox onChange={() => setRequestReadReceipt(!requestReadReceipt)} size="small" sx={{ ml: "-10px" }} />
                  <Typography sx={{ display: 'inline-block' }}>
                    Request Read Receipt? :
                  </Typography>
                </Box>

                <Box mt={-1}>
                  <Checkbox onChange={scheduleMessageCheckBox} onClick={() => setRequestSchedule(!requestSchedule)} size="small" sx={{ ml: "-10px" }} />
                  <Typography sx={{ display: 'inline-block' }}>
                    Schedule Message at:
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Grid container sx={{ display: scheduleMessage }} >
              <Box sx={{ display: "flex" }}>
                <Grid item xs={6} >
                  <TextField
                    type="date" id="outlined-required" variant="standard"
                    onChange={scheduleDateAndTime}
                    inputProps={{ min: MinDate, max: MaxDate }}
                  />
                </Grid>


                <Grid item xs={4}>
                  <TimePicker
                    value={value}
                    onChange={clickTime}
                    renderInput={(params) =>
                      <TextField {...params} variant="standard" size="small" sx={{ float: "right", mt: "3px" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTimeIcon fontSize='small' sx={{ mb: "2px" }} />
                            </InputAdornment>
                          ),
                        }}
                      />}
                  />
                </Grid>
              </Box>
            </Grid>
            <Box sx={{ mb: '10px', mt: '5px' }}>
              <ErrorMessage1 Error={schTimeerror} />
              <ErrorMessage1 Error={requestScheduleMsg} />
            </Box>
            <TextField fullWidth multiline rows={4}
              margin="normal" label='Content :' name="Content" type="text"
              variant="outlined" sx={{ mt: "-0.5px" }}
              value={formik.values.Content}
              onChange={formik.handleChange}
            />
            <Box mb={0.4}>
              {formik.touched.Content && formik.errors.Content ? (
                <ErrorMessage1 Error={formik.errors.Content} />
              ) : null}
            </Box>
            {PageName === 'Reply' || PageName === 'Forwa' ? (
              <>
                <FormHelperText >Original message</FormHelperText>
                <BoxContent>
                  <Wordbreak1 dangerouslySetInnerHTML={{ __html: MSGBody }} />
                </BoxContent>
              </>
            ) : null}

            <Grid item xs={12}>
              <ButtonPrimary color="primary" type="submit" fullWidth
                onClick={formik.handleChange}
                disabled={disabledStateOfSend}
              >
                Send
              </ButtonPrimary>
            </Grid>
          </form>
        </ListStyle>
      </Container>
      <div style={{ display: displayOfRecipients }}>
        <AddReciepents RecipientName={RecipientsObject.RecipientName}
          RecipientId={RecipientsObject.RecipientId}
          recipientListClick={RecipientsListFun}></AddReciepents>
      </div>
      <div style={{ display: displayOfCCRecipients }}>
        <AddReciepents RecipientName={RecipientsCCObject.RecipientName}
          RecipientId={RecipientsCCObject.RecipientId}
          recipientListClick={RecipientsCCListFun}></AddReciepents>
      </div>
    </>
  );
}

export default Form13;
