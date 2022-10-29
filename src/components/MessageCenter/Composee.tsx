import {
  Container,
  TextField,
  Box,
  FormControl,
  Grid,
  Typography,
  useTheme,
  Fab,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import {
  AttachmentFile,
  ISendMessage
} from '../../interfaces/MessageCenter/MessageCenter';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { addRecipients } from 'src/requests/MessageCenter/MessaageCenter';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import ReplyIcon from '@mui/icons-material/Reply';
import AdminTeacherRecipientsList from '../SMSCenter/AdminTeacherRecipientsList';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { TransitionGroup } from 'react-transition-group';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import ChooseFile from 'src/libraries/Choose File/ChooseFile';
import { sitePath } from '../Common/Util';

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

  const { From, Text, AttachmentArray, BODY, FromUserID } = useParams();

  const ReplyRecipientNameId = {
    ReplyRecipientName: From,
    ReplyRecipientID: FromUserID
  };

  const [ArrayOfAttachment, setArrayOfAttachment] = useState<any>([]);
  const [RecipientsObject, setRecipientsObject] = useState<any>({
    RecipientName: [],
    RecipientId: []
  });

  const [finalBase642, setFinalBase642] = useState<AttachmentFile[]>([]);

  const [finalBase642Duplicate, setFinalBase642Duplicate] = useState([]);

  const [FileNameOfAttachment,setFileNameOfAttachment] = useState([]);
  const [Base64URLOfAttachment,setBase64URLOfAttachment] = useState([]);
  const [finalBase642New, setFinalBase642New] = useState<any>([]);


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
          const encode = window.btoa(a[i]);
          let AttachmentFile: AttachmentFile = {
            FileName: filename,
            Base64URL: encode
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
      for(let key in FileNameOfAttachment){
        finalBase642New.push({FileName:FileNameOfAttachment[key],Base64URL:Base64URLOfAttachment[key]})
      }
  
      setFinalBase642New((prev) => [...prev])
    }
  }, [AttachmentArray]);

  const classes = Styles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fileerror, setFilerror] = useState<any>('');
  const [fileName, setfileName] = useState('');
  const [displayOfRecipients, setdisplayOfRecipients] = useState('none');
  const [displayOfComposePage, setdisplayOfComposePage] = useState('block');
  const [schedule_A_Message, setschedule_A_Message] = useState<boolean>(false);

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
        setFilerror('File does not support. Please cheked Note');
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
        DisplayText: RecipientsObject.RecipientName.toString(),
        SenderUserId: UserId,
        SenderUserRoleId: RoleId,
        AcademicYearId: AcademicYearId,
        SchoolId: localschoolId,
        InsertedById: UserId,
        Attachment: ''
      },
      asIsForward: `${PageName === 'Forwa' ? 'Y' : 'N'}`,
      asIsSoftwareCordinator: 0,
      asMessageId: 0,
      asSchoolName: SchoolName,
      asSelectedStDivId: `${RoleId == '3' ? DivisionId : ''}`,
      asSelectedUserIds: RecipientsObject.RecipientId.toString(),
      sIsReply: `${PageName === 'Reply' ? 'Y' : 'N'}`,
      attachmentFile: finalBase642New,
      asFileName: fileName
    };
    MessageCenterApi.GetSendMessage(sendMessageAPIBody)
      .then((res: any) => {
        if (res.status === 200) {
          setdisabledStateOfSend(true);
          if (schedule_A_Message) {
            toast.success('Message scheduled successfully');
          } else {
            toast.success('Message sent successfully');
          }
          setTimeout(RediretToSentPage, 100);
        }
      })
      .catch((err) => {
        toast.error('Message does not sent successfully');
      });
  };

  const formik = useFormik({
    initialValues: {
      To: '',
      Subject: PageName == 'Forwa' || PageName == 'Reply' ? Text : '',
      Content: '',
      Attachment: ''
    },
    onSubmit: (values) => {
      sendMessage();
      console.log(values);
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

  const AttachmentFilePath = sitePath+'/RITeSchool/Uploads/';

  const RecipientButton = (e) => {
    setdisplayOfRecipients('block');
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
  };

  useEffect(() => {
    if (ReplyRecipientNameId.ReplyRecipientName != undefined) {
      RecipientsObject.RecipientName.push(
        ReplyRecipientNameId.ReplyRecipientName
      );
      RecipientsObject.RecipientId.push(ReplyRecipientNameId.ReplyRecipientID);
    }
  }, []);

  const handleRemoveListItems = (e,c) =>{
    finalBase642New.length = 0;
    console.log(FileNameOfAttachment)

    for(let key in FileNameOfAttachment){
      let indOfFileName = FileNameOfAttachment.indexOf(e)
      let indOfFileName2 = Base64URLOfAttachment.indexOf(c)
      if(FileNameOfAttachment[key] == e){
        let spl = FileNameOfAttachment.splice(indOfFileName,1);
        let spl2 = Base64URLOfAttachment.splice(indOfFileName2,1);
      }
      console.log(FileNameOfAttachment)
    }
    
    for(let key in FileNameOfAttachment){
      finalBase642New.push({FileName:FileNameOfAttachment[key],Base64URL:Base64URLOfAttachment[key]})
    }
    setFinalBase642New((prev) => [...prev])
  }

  const ObjectOfFileNameAndBase64Function = (e) => {
    console.log(e)
    setFinalBase642New(e.FileBaseandNameObject)
    setFileNameOfAttachment(e.NameOFFile)
    setBase64URLOfAttachment(e.Base64UrlOfFile)
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
              <TextField
                multiline
                placeholder="To"
                value={RecipientsObject.RecipientName}
                // variant="outlined"
                id="body"
                label={'To'}
                fullWidth
                margin="normal"
                onChange={formik.handleChange}
                style={{ scrollBehavior: 'auto' }}
                sx={{
                  marginLeft: '-5px',
                  width: '19.5rem',
                  maxHeight: '60px',
                  overflow: 'auto'
                }}
              />

              <p style={{ color: 'red', marginTop: 2 }}>
                {RecipientsList.length == 0 ? (
                  <div className={classes.error}>{formik.errors.To}</div>
                ) : null}
              </p>
              <span>
                <ButtonPrimary
                  color="primary"
                  onClick={(e) => RecipientButton(e)}
                >
                  Add Recipients
                </ButtonPrimary>
              </span>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label={'Subject'}
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

            <ChooseFile ObjectOfFileNameAndBase64={ObjectOfFileNameAndBase64Function}/>

            {finalBase642New == undefined ||
            finalBase642New.length == 0 ||
            PageName === 'Reply' ? null : (
              <div style={{ marginTop: '10px' }}>
                <Typography sx={{ mb: '10px' }}>Attachment(s):</Typography>
                <Box sx={{ mt: 1 }}>
                  <List>
                    <TransitionGroup>
                      {finalBase642New.map((item, key) => {
                        return (
                          <Collapse key={item.FileName}>
                            <ListItem
                             secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                title="Delete"
                                onClick={() => handleRemoveListItems(item.FileName,item.Base64URL)}
                              >
                                <DeleteIcon sx={{color:'red'}}/>
                              </IconButton>
                            }
                        
                            >
                              <FilePresentRoundedIcon
                                sx={{
                                  ml: '-20px',
                                  mr: '15px',
                                  color: 'blue'
                                }}
                              />
                              <ListItemText
                                primary={item.FileName.slice(0, 25)}
                              />
                            </ListItem>
                          </Collapse>
                        );
                      })}
                    </TransitionGroup>
                  </List>
                </Box>
              </div>
            )}

            {PageName === 'Reply' || PageName === 'Forwa' ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                margin="normal"
                label={'Content'}
                name="Content"
                type="text"
                variant="standard"
                value={BODY}
                disabled={true}
                sx={{ mt: '10px' }}
              />
            ) : null}

            <TextField
              fullWidth
              multiline
              rows={4}
              margin="normal"
              label={'Content'}
              name="Content"
              type="text"
              variant="standard"
              value={formik.values.Content}
              onChange={formik.handleChange}
              sx={{ pt: '1px' }}
            />
            <p style={{ color: 'red', marginTop: -10 }}>
              {formik.touched.Content && formik.errors.Content ? (
                <div className={classes.error}>{formik.errors.Content}</div>
              ) : null}
            </p>

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
        <AdminTeacherRecipientsList
          displayProperty={displayPropertyFun}
          RecipientsListDetails={RecipientsListFun}
          ReplyRecipient={ReplyRecipientNameId}
          PageName={'MessageCenter'}
        />
      </div>
    </>
  );
}

export default Form13;
