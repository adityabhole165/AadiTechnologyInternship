import {Container,TextField,Box,FormControl,Tooltip,ClickAwayListener,Grid,Card,Typography,useTheme,Fab,Avatar} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import {AttachmentFile,ISendMessage} from '../../interfaces/MessageCenter/MessageCenter';
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


function Form13() {
  const RecipientsList: any = useSelector(
    (state: RootState) => state.MessageCenter.RecipientsName
  );

  const dispatch = useDispatch();

  const theme = useTheme();
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/MessageCenter/Compose/','');
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
    if (AttachmentArray != undefined ) {
      if( AttachmentArray != 'null'){
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
        }
        setArrayOfAttachment((prev) => [...prev]);
      }
    }
  }, [AttachmentArray]);

  const classes = Styles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fileerror, setFilerror] = useState<any>('');
  const [fileName, setfileName] = useState('');
  const [finalBase64, setFinalBase64] = useState([]);
  const [displayOfRecipients, setdisplayOfRecipients] = useState('none');
  const [displayOfComposePage, setdisplayOfComposePage] = useState('block');

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

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const fileChangedHandler = async (event) => {
    const multipleFiles = event.target.files;
    for (let i = 0; i < multipleFiles.length; i++) {
      const isValid = CheckValidation(multipleFiles[i]);
      let fileName = multipleFiles[i].name;
      let base64URL: any = '';
      if (isValid) {
        base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
      }
      let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);

      let AttachmentFile: AttachmentFile = {
        FileName: fileName,
        Base64URL: DataAttachment
      };
      finalBase642.push(AttachmentFile);
    }
  };

  const CheckValidation = (fileData) => {
    const fileExtension = fileData?.name?.split('.').at(-1);
    setfileExtension(fileExtension);
    const allowedFileTypes = ['BMP','DOC','DOCX','JPG','JPEG','PDF','PNG','PPS','PPSX','PPT','PPTX','XLS','XLSX','bmp','doc',
      'docx','jpg','jpeg','pdf','png','pps','ppsx','ppt','pptx','xls','xlsx'];

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

  const RediretToSentPage = () => { navigate('/extended-sidebar/MessageCenter/msgCenter/Inbox');};

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
      asSelectedStDivId: DivisionId,
      asSelectedUserIds: RecipientsObject.RecipientId.toString(),
      sIsReply: `${PageName === 'Reply' ? 'Y' : 'N'}`,
      attachmentFile: finalBase642,
      asFileName: fileName
    };
    MessageCenterApi.GetSendMessage(sendMessageAPIBody)
      .then((res: any) => {
        if (res.status === 200) {
          setdisabledStateOfSend(true);
          toast.success('Message sent successfully');
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

  const AttachmentFilePath = 'https://192.168.1.80/' + '/RITeSchool/Uploads/';

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
        <Card sx={{ padding: '20px', backgroundColor: '#ffffffdb' }}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                margin="normal"
                label={'To'}
                name="To"
                type="text"
                autoComplete="off"
                variant="standard"
                value={RecipientsObject.RecipientName}
                onChange={formik.handleChange}
                sx={{ mt: '-0.3rem' }}
              />

              <p style={{ color: 'red', marginTop: 2 }}>
                {RecipientsList.length == 0 ? (
                  <div className={classes.error}>{formik.errors.To}</div>
                ) : null}
              </p>
              <span>
                <ButtonPrimary color="primary" onClick={(e) => RecipientButton(e)}>
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
                              marginLeft: '70px',
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
            {ArrayOfAttachment == undefined ||
            ArrayOfAttachment == 'null' ||
            ArrayOfAttachment.length == 0 ||
            PageName === 'Reply' ? null : (
              <div style={{marginTop:'10px'}}>
                <Typography sx={{mb:'10px'}}>Attachment(s):</Typography>
                <Box sx={{ mt: 1 }}>
                  <List>
                    <TransitionGroup>
                      {ArrayOfAttachment.map((item,key) => (
                        <Collapse key={item}>
                          <ListItem>
                        <FilePresentRoundedIcon sx={{ml:'-20px',mr:'15px',color:'blue'}}/>
                        <ListItemText primary={item.slice(0,25)} onClick={(event: React.MouseEvent<HTMLElement>) => {
                          window.open(AttachmentFilePath.concat(item));
                        }}/>
                      </ListItem>
                        </Collapse>
                      ))}
                    </TransitionGroup>
                  </List>
                </Box>               
              </div>
            )}
            {fileerror && (
              <p style={{ marginBottom: -25 }} className={classes.error}>
                {fileerror}
              </p>
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
              <ButtonPrimary color="primary"
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
          </Card>
      
      </Container>
      <div style={{ display: displayOfRecipients }}>
        <AdminTeacherRecipientsList displayProperty={displayPropertyFun} RecipientsListDetails={RecipientsListFun} ReplyRecipient={ReplyRecipientNameId} PageName={'MessageCenter'}/>
      </div>
    </>
  );
}

export default Form13;

