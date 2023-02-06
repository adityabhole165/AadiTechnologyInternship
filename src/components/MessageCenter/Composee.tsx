import { Container, TextField, Box, FormControl, Grid, Typography, useTheme, TextareaAutosize, Fab, ClickAwayListener, Tooltip, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { AttachmentFile, ISendMessage } from '../../interfaces/MessageCenter/MessageCenter';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import { addRecipients } from 'src/requests/MessageCenter/MessaageCenter';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import ReplyIcon from '@mui/icons-material/Reply';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { BoxContent, CardDetail8, ListStyle, Wordbreak, Wordbreak1 } from 'src/libraries/styled/CardStyle';
import { sitePath } from '../Common/Util';
import AddReciepents from './AddReciepents';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { textAlign } from '@mui/system';
import Errormessages from 'src/libraries/ErrorMessages/Errormessage';
import { FormHelperText } from '@mui/material';

function Form13() {
  
  const RecipientsList: any = useSelector(
    (state: RootState) => state.MessageCenter.RecipientsName
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
  const AttachmentArray = (ViewData === null || ViewData === "" ||View.Attachment=="") ? "null" : View.Attachment.join(',');
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
    ClassId: []
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
  const [schedule_A_Message, setschedule_A_Message] = useState<boolean>(false);
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
        ScheduleDateTime:""
      },
      asIsForward: `${PageName === 'Forwa' ? 'Y' : 'N'}`,
      asIsSoftwareCordinator: 0,
      asMessageId: ID != undefined || ID != "" ? parseInt(ID) : 0,
      asSchoolName: SchoolName,
      asSelectedStDivId: RoleId == '3' ? DivisionId : RecipientsObject.ClassId.toString(),
      asSelectedUserIds: RecipientsObject.RecipientId.toString(),
      sIsReply: `${PageName === 'Reply' ? 'Y' : 'N'}`,
      attachmentFile: finalBase642New,
      asFileName: fileName,
      asSelectedUserIdsCc:RecipientsCCObject.RecipientId.toString(),
      asSelectedStDivIdCc: RoleId == '3' ? DivisionId : RecipientsCCObject.ClassId.toString(),
      asIsSoftwareCordinatorCc:"",
      asDisplayTextCc:RecipientsCCObject.RecipientName.toString()
    };

    MessageCenterApi.GetSendMessage(sendMessageAPIBody)
      .then((res: any) => {
        if (res.status === 200) {
          setdisabledStateOfSend(true);
          if (schedule_A_Message) {
            toast.success('Message scheduled successfully');
            localStorage.setItem("messageBody", '');
          } else {
            toast.success('Message sent successfully');
            localStorage.setItem("messageBody", '');
          }
          setTimeout(RediretToSentPage, 100);
          localStorage.setItem("messageBody", '');
        }
      })
      .catch((err) => {
        toast.error('Message does not sent successfully');
        localStorage.setItem("messageBody", '');
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
      sendMessage();
      setdisabledStateOfSend(true);
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
    if (ReplyRecipientNameId.ReplyRecipientName != undefined) {
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
              background: `${theme.colors.gradients.pink1}`,
              position: 'absolute',
              top: '30px',
              left: '35px'
            }}
          >
            <ReplyIcon />
          </Fab>
        </span>
        <ListStyle sx={{ padding: '20px', backgroundColor: '#ffffffdb' }}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              <FormHelperText sx={{ mb: '-15px' }}>To</FormHelperText>
              <TextField
                multiline
                value={RecipientsObject.RecipientName.map(obj => obj?.trim()).join('; ').replace(';','')}
                id=""
                fullWidth
                disabled
                margin="normal"
                onChange={formik.handleChange}
                sx={{
                  height: "50px",
                  overflow: 'auto',
                  border: "0.1px solid #c4c5c5",
                  borderRadius: "5.3px",
                }}
              />

              <p style={{ color: 'red', marginTop: 2 }}>
                {RecipientsList.length == 0 ? (
                  <div className={classes.error}>{formik.errors.To}</div>
                ) : null}
              </p>
              <Grid container spacing={2} >
                <Grid item xs={6} sx={{ marginTop: "4px" }}>
                  <ButtonPrimary fullWidth
                    onClick={(e) => RecipientButton(e)}
                    color="primary">
                    Add Recipients
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: "4px" }}>
                  {/* <ButtonPrimary fullWidth
                    color="primary" >
                    Add Cc
                  </ButtonPrimary> */}
                </Grid>
              </Grid>
              <>
                <FormHelperText sx={{ mb: '-15px' }}>Cc</FormHelperText>
                <TextField
                  multiline
                  value={RecipientsCCObject.RecipientName.map(obj => obj?.trim()).join('; ').replace(';', '')}
                  id=""
                  fullWidth
                  disabled
                  margin="normal"
                  onChange={formik.handleChange}
                  sx={{
                    height: "50px",
                    overflow: 'auto',
                    border: "0.1px solid #c4c5c5",
                    borderRadius: "5.3px",
                  }}
                />
                <Grid container spacing={2} >
                  <Grid item xs={6} sx={{ marginTop: "4px" }}>
                    <ButtonPrimary fullWidth
                      onClick={(e) => RecipientCCButton(e)}
                      color="primary">
                      Add Cc Recipients
                    </ButtonPrimary>
                  </Grid>
                  <Grid item xs={6} sx={{ marginTop: "4px" }}>

                  </Grid>
                </Grid>
              </>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label='Subject :'
              name="Subject"
              type="text"
              autoComplete="off"
              variant="standard"
              value={formik.values.Subject}
              onChange={formik.handleChange}
            />
            <p style={{ color: 'red', marginTop: -10, marginBottom: '-10px' }}>
              {formik.touched.Subject && formik.errors.Subject ? (
                <div className={classes.error}>{formik.errors.Subject}</div>
              ) : null}
            </p>

            <TextField
              fullWidth
              id="fullWidth"
              type="file"
              name="Attachment"
              variant="standard"
              className={classes.InputField}
              onChange={fileChangedHandler}
              inputProps={{ multiple: true }}
              InputProps={{
                endAdornment: (
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <ClickAwayListener onClickAway={handleClickAway}>
                      <Tooltip
                        PopperProps={{
                          disablePortal: true
                        }}
                        onClose={handleClick}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={Note}
                        arrow
                        placement="left"
                        componentsProps={{
                          tooltip: {
                            sx: {
                              marginLeft: '10px',
                              mt: 0.5,
                              transform:
                                'translate3d(17px, 0.5px, 0px) !important'
                            }
                          }
                        }}
                      >
                        <InfoTwoToneIcon
                          type="button"
                          onClick={handleClick}
                          sx={{
                            color: 'navy',
                            mt: 2,
                            fontSize: '17px',
                            float: 'right'
                          }}
                        />
                      </Tooltip>
                    </ClickAwayListener>
                  </Box>
                )
              }}
            />
            <Box sx={{ mt: '15px' }}>
              <Errormessages Error={fileerror} />
            </Box>
            {finalBase642New == undefined ||
              finalBase642New.length == 0
              || PageName == 'Reply'
              ? null :
              (
                <div style={{ marginTop: '10px' }}>
                  <Typography sx={{ mb: '10px' }}>Attachment(s):</Typography>
                  {
                    finalBase642New.map((obj, i) => {
                      return (
                        <Box key={obj.FileName}>
                          <Grid container>
                            <Grid xs={2}>
                              <FilePresentRoundedIcon sx={{ color: 'blue' }} />
                            </Grid>
                            <Grid xs={8}>
                              <CardDetail8 sx={{ mt: '5px' }}>
                                {obj.FileName.slice(0, 25)}
                              </CardDetail8>
                            </Grid>
                            <Grid xs={2}>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                title="Delete"
                                onClick={() =>
                                  handleRemoveListItems(
                                    obj.FileName,
                                    obj.Base64URL
                                  )
                                }
                              >
                                <DeleteIcon
                                  sx={{ color: 'red', mr: '-50px', mt: '-8px' }}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Box>
                      )
                    })
                  }
                </div>
              )}
            <TextField
              fullWidth
              multiline
              rows={4}
              margin="normal"
              label='Content :'
              name="Content"
              type="text"
              variant="outlined"
              value={formik.values.Content}
              onChange={formik.handleChange}
              sx={{ pt: '1px' }}
            />
            <p style={{ color: 'red', marginTop: -10 }}>
              {formik.touched.Content && formik.errors.Content ? (
                <div className={classes.error}>{formik.errors.Content}</div>
              ) : null}
            </p>
            {PageName === 'Reply' || PageName === 'Forwa' ? (
              <>
                <FormHelperText >Original message</FormHelperText>
                <BoxContent>
                  <Wordbreak1 dangerouslySetInnerHTML={{ __html: MSGBody }} />
                </BoxContent>
              </>
            ) : null}

            <Grid item xs={12}>
              <ButtonPrimary
                color="primary"
                onClick={formik.handleChange}
                disabled={disabledStateOfSend}
                type="submit"
                fullWidth
              >
                {' '}
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
