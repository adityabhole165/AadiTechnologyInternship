import {
  Container,
  TextField,
  Box,
  Button,
  useTheme,
  FormControl,
  Tooltip,
  ClickAwayListener,
  Fab,
  Autocomplete,
  Grid,
  Card,
  Typography
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ReplyIcon from '@mui/icons-material/Reply';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { AttachmentFile, ISendMessage } from '../../interfaces/MessageCenter/MessageCenter';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import { toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles({
  option: {
    marginBottom: -11,
    marginTop: -11,
    backgroundColor: 'white'
    // "rgba(229, 232, 255,1)"
  }
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Form13() {

  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/MessageCenter/Compose/', '');
  const PageName = pageName.slice(0,5);

  const { To, Text, Attachments, BODY } = useParams();

  const classes = Styles();
  const classes1 = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [fileerror, setFilerror] = useState<any>('');
  const [fileName, setfileName] = useState('');
  const [finalBase64, setFinalBase64] = useState<AttachmentFile[]>([]);

  const Note: string =
    'Supports only .bmp, .doc, .docx, .jpg, .jpeg, .pdf, .png, .pps, .ppsx, .ppt, .pptx, .xls, .xlsx files types with total size upto 20 MB.';
  const TeacherList: any = useSelector(
    (state: RootState) => state.MessageCenter.TeacherList
  );
  const AdminStaffList: any = useSelector(
    (state: RootState) => state.MessageCenter.AdminStaffList
  );
  const [coOrdinator, setCoOrdinator] = useState<any>([
    { Name: 'Software Co-ordinator', Id: '1' }
  ]);
  const allData = TeacherList.concat(AdminStaffList).concat(coOrdinator);
  const [Too, setValue] = React.useState<any>([]);
  const [Name, setname] = React.useState<any>('');
  const [Id, setId] = React.useState<any>('');
  const [Attachment1, SetAttachment] = React.useState<any>('');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const localschoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const StudentName = sessionStorage.getItem('StudentName');
  const DivisionId = sessionStorage.getItem('DivisionId');
  const SchoolName = localStorage.getItem('SchoolName');


  const [fileExtension, setfileExtension] = React.useState<any>('');

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const getinbox = () => {
    navigate('/extended-sidebar/MessageCenter/msgCenter/Inbox');
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const fileChangedHandler = async (event) => {
    const multipleFiles = event.target.files
    for(let i=0; i < multipleFiles.length; i++){
      const isValid = CheckValidation(multipleFiles[i]);
      let fileName = multipleFiles[i].name;
      let base64URL:any = "";
      if(isValid)
      {
        base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
      }
      let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
    
      let AttachmentFile:AttachmentFile = {FileName:fileName, Base64URL:DataAttachment};
      finalBase64.push(AttachmentFile);
    }
    // event.preventDefault();
    // let file = event.target.files[0];
    // setfileName(event.target.files[0].name);
  };

  const CheckValidation = (fileData)=>{
    const fileExtension = fileData?.name?.split('.').at(-1);
      setfileExtension(fileExtension);
      const allowedFileTypes = [
        'BMP','DOC','DOCX','JPG','JPEG','PDF','PNG','PPS','PPSX','PPT','PPTX','XLS','XLSX','bmp','doc','docx','jpg',
        'jpeg','pdf','png','pps','ppsx','ppt','pptx','xls','xlsx'
      ];

      if (fileExtension != undefined || null) {
        if (!allowedFileTypes.includes(fileExtension)) {
          setFilerror('File does not support. Please cheked Note');
          return false;
        } 
        else if (allowedFileTypes.includes(fileExtension)) {
          setFilerror(null);
          return true
        }
        if (fileData?.size > 20e6) {
          setFilerror('Please upload a file smaller than 20 MB');
          return false;
        }
      }
  }


  const ChangeFileIntoBase64 = (fileData)=>{
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
  }
  // Submit form data

  useEffect(() => {
    if (Too !== undefined) {
      const NameList = Too.map((data) => data.Name);
      const IdList = Too.map((data) => data.Id);
      setname(NameList);
      setId(IdList);
    }

  }, [Too]);

  const sendMessage = () => {
    const body: ISendMessage = {
      asSchoolId: localschoolId,
      aoMessage: {
        Body: formik.values.Content,
        Subject: formik.values.Subject,
        SenderName: StudentName,
        DisplayText: Name.toString(),
        SenderUserId: UserId,
        SenderUserRoleId: RoleId,
        AcademicYearId: AcademicYearId,
        SchoolId: localschoolId,
        InsertedById: UserId,
        Attachment: ''
      },
      asIsForward: 'N',
      asIsSoftwareCordinator: 0,
      asMessageId: 0,
      asSchoolName: SchoolName,
      asSelectedStDivId: DivisionId,
      asSelectedUserIds: Id.toString(),
      sIsReply: 'N',
      attachmentFile: finalBase64,
      asFileName: fileName
    };

    MessageCenterApi.GetSendMessage(body)
      .then((res: any) => {
        if (res.status === 200) {
          console.log(res.status)
          formik.resetForm();
          toast.success('Message sent successfully');
        }
      })
      .catch((err) => {
        toast.error('Message not sent successfully');
      });
  };

  const formik = useFormik({
    initialValues: {
      To: '',
      Subject: (PageName == "Forwa" || PageName == "Reply") ? Text : '' ,
      Content: '',
      Attachment: ''
    },
    onSubmit: (values) => {
      sendMessage();
    },
    validate: (values) => {
      const errors: any = {};
      if (Too.length == 0 && PageName !== "Reply") {
        errors.To = 'Atleast one recipient should be selected.';
      }
      if (!values.Subject && PageName !== "Forwa" && PageName !== "Reply") {
        errors.Subject = 'Subject should not be blank.';
      }
      if (!values.Content && PageName !== "Forwa" && PageName !== "Reply") {
        errors.Content = 'Message body should not be blank.';
      }

      return errors;
    }
  });

  const file_path =
    'http://riteschool_old.aaditechnology.com' +
    '/RITeSchool/Uploads/' +
    Attachments;

  return (
    <>
      <Container>
        <Box onClick={getinbox}>
          <Fab
            className={classes.backArrow}
            sx={{
              background: `${theme.colors.gradients.pink1}`,
              position: 'absolute',
              zIndex: 2
            }}
          >
            <ReplyIcon />
          </Fab>
        </Box>
        <Card sx={{ padding: '20px', backgroundColor: '#ffffffdb' }}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              <Autocomplete
                value={Too || To}
                onChange={(events, newValue) => setValue(newValue)} //
                classes={{
                  option: classes1.option
                }}
                multiple
                id="tags-filled"
                options={allData}
                disableCloseOnSelect
                getOptionLabel={(option: any) => option.Name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      value={option.UserId}
                    />
                    {option.Name}

                  </li>
                )}
                
                renderInput={(params) => (
                  (PageName === "Reply")
                  ?
                  <TextField
                    variant="standard"
                    fullWidth
                    name="To"
                    label={'To'}
                    placeholder={To}
                    value={To}
                    disabled={true}
                    className={classes.InputField}
                    onChange={formik.handleChange}
                  />
                  :
                  <TextField
                    {...params}
                    variant="standard"
                    name="To"
                    label={'To'}
                    className={classes.InputField}
                    onChange={formik.handleChange}
                  />
                )
                }
              />
            </FormControl>
            <p style={{ color: 'red', marginTop: 2 }}>
              {Too.length == 0 ? (
                <div className={classes.error}>{formik.errors.To}</div>
              ) : null}
            </p>

            {
              (PageName === "Reply" || PageName === "Forwa")
              ?
              <TextField
              fullWidth
              margin="normal"
              label={'Subject'}
              name="Subject"
              type="text"
              autoComplete="off"
              variant="standard"
              value={ Text }
              onChange={formik.handleChange}
              sx={{ mt: '-0.3rem' }}
            />
            :
            <TextField
              fullWidth
              margin="normal"
              label={'Subject'}
              name="Subject"
              type="text"
              autoComplete="off"
              variant="standard"
              value={ formik.values.Subject }
              onChange={formik.handleChange}
              sx={{ mt: '-0.3rem' }}
            />
            }
            <p style={{ color: 'red', marginTop: -10 }}>
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
              // value={Attachments}
              inputProps={{multiple:true}}
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
            {Attachments == undefined ? null : (
              <>
                <Typography>Attachment(s):</Typography>
                <Typography
                  className={classes.Cardfont1}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    window.open(file_path);
                  }}
                >
                  {Attachments}
                </Typography>
              </>
            )}
            {fileerror && (
              <p style={{ marginBottom: -25 }} className={classes.error}>
                {fileerror}
              </p>
            )}

            <TextField
              fullWidth
              multiline
              rows={4}
              margin="normal"
              label={'Content'}
              name="Content"
              type="text"
              variant="standard"
              value={PageName === "Forwa" ? BODY :  formik.values.Content }
              onChange={formik.handleChange}
              sx={{ pt: '1px' }}
            />
            <p style={{ color: 'red', marginTop: -10 }}>
              {formik.touched.Content && formik.errors.Content ? (
                <div className={classes.error}>{formik.errors.Content}</div>
              ) : null}
            </p>

            <Grid container spacing={2}>
              <Grid item xs={12} style={{ flexDirection: 'row' }}>
                <Button
                  sx={{
                    mt: 0.4
                  }}
                  color="primary"
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  onChange={formik.handleChange}
                >
                  {'Send'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default Form13;