import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  IAcceptTermsBody,
  IChangePassword,
  IChangePasswordResult
} from 'src/interfaces/Common/ChangePassword';
import Note from 'src/libraries/Note/Note';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import http from 'src/requests/SchoolService/schoolServices';
import { getTermsAndCondition } from 'src/requests/TermAndCondition/TermAndCondition';
import { RootState } from 'src/store';
import Errormessage from '../ErrorMessages/Errormessage';
import { ListStyle } from '../styled/CardStyle';
import { ChangePasswordStyle } from '../styled/CommonStyle';
import { green, grey, red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommonPageHeader from 'src/components/CommonPageHeader';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import QuestionMark from '@mui/icons-material/QuestionMark';

const note = [
  ' Capitalization Matters! Min 6 characters, Max 15 characters.',
 
];
const note3 = [
   ' Password should be combination of at least one character, digit & special character.'
];
const note1 = [
  'It seems you have not changed the system generated password. Please reset your password for security purpose.'
];
const note2 = [' Please reset your password for security purpose.'];

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const FirstTime = sessionStorage.getItem('TermsAccepted');

  const TermAndConditions: any = useSelector(
    (state: RootState) => state.TermAndConditions.GetAcceptTermResult
  );

  console.log('FirstTime', FirstTime);

  const logout = () => {
    localStorage.removeItem('auth');
    sessionStorage.clear();
    navigate('/');
  };

  const getHomepage = () => {
    if (window.location.pathname === '/changePassword') {
      navigate('/');
    } else {
      navigate('/extended-sidebar/landing/landing');
    }
  };

  const Logout = async (): Promise<void> => {
    try {
      sessionStorage.clear();
      localStorage.removeItem('auth');
      localStorage.removeItem('url');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const regularExpression = /^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).*$/;
  const [output, setoutput] = useState<IChangePasswordResult>();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const Id = sessionStorage.getItem('Id');
  const UserLogin = sessionStorage.getItem('Userlogin');
  const asUserId = sessionStorage.getItem('Id');

  const [value, setValue] = useState<any>('');
  const values = { Oldpassword: '', NewPassword: '', ConfirmPassword: '' };

  const submitresult = () => {
    const body: IChangePassword = {
      asUserName: UserLogin,
      asUserId: Id,
      asSchoolId: asSchoolId,
      asNewPassword: formik.values.ConfirmPassword,
      asOldPassword: formik.values.Oldpassword
    };

    const TermsBody: IAcceptTermsBody = {
      asSchoolId: asSchoolId,
      asUserId: asUserId
    };
    const Note: string =
    'Capitalization Matters! Min 6 characters, Max 15 characters. Password should be combination of at least one character, digit & special character.';
    const note = [
      '1) Capitalization Matters! Min 6 characters, Max 15 characters.',
      '2) Password should be combination of at least one character, digit & special character.'
    ];
    const note1 = [
      'It seems you have not changed the system generated password. Please reset your password for security purpose.'
    ];
    dispatch(getTermsAndCondition(TermsBody));

    http
      .post('School/ChangePassword', body)
      .then((resp) => resp.data)
      .then((data) => {
        setoutput(data);
        if (data === 'True') {
          toast.success('Password changed successfully');
          //call api
          if (TermAndConditions.AcceptTermsResult === true) {
          }

          Logout();
        } else {
          toast.error(data);
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      UserLogin: UserLogin,
      Oldpassword: '',
      NewPassword: '',
      ConfirmPassword: ''
    },
    onSubmit: (values) => {
      submitresult();
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.Oldpassword) {
        errors.Oldpassword = 'Old Password should not be blank.';
      }
      if (!values.NewPassword) {
        errors.NewPassword = 'New Password should not be blank.';
      } else if (values.NewPassword.length < 6) {
        errors.NewPassword = 'Password should be of minimum 6 characters.';
      } else if (!regularExpression.test(values.NewPassword)) {
        errors.NewPassword =
          'Password should be combination of at least one character, digit & special character.';
      } else if (values.NewPassword.length > 15) {
        errors.NewPassword = 'Password must maximum 15 character';
      }
      if (!values.ConfirmPassword) {
        errors.ConfirmPassword = 'Confirm Password should not be blank.';
      } else if (values.ConfirmPassword != values.NewPassword) {
        errors.ConfirmPassword =
          'New Password and Confirm Password should be same.';
      }
      return errors;
    }
  });

  return (
<>
     <Box mb={2}>
     <CommonPageHeader
        navLinks={[{ title: 'Change Password', path: ' ' }
        ]}
          rightActions={<>
           <Tooltip title={'Change your existing password. You will have to use the same while loging into the site.'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark/>
              </IconButton>
            </Tooltip>
        <Tooltip title={'Cancle'}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: red[500],
                '&:hover': {
                  backgroundColor: red[600]
                }
              }}
              onClick={getHomepage}
               >
              <CancelIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title={'Save'}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: green[500],
                '&:hover': {
                  backgroundColor: green[600]
                }
              }}
               type="submit"
              onChange={formik.handleChange} 
              // onSubmit={formik.handleSubmit}
              >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          </>}
      />
     <Accordion defaultExpanded>
             <AccordionSummary
                 expandIcon={<ExpandMoreIcon />}
                 aria-controls="panel1-content"
                 id="panel1-header"
             >
                 <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>Important Notes</Typography>
             </AccordionSummary>
             <AccordionDetails sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
                <Alert variant="filled" severity="info"><b>{note2}</b> </Alert>
                <Alert variant="filled" severity="info"><b>{note1}</b> </Alert>
                 <Alert variant="filled" severity="info"><b> {note}</b></Alert>
                 <Alert variant="filled" severity="info"><b>{note3}</b></Alert>
                 </AccordionDetails>
                 </Accordion>
                 </Box>
    <Grid container >
      <Grid item md={3}></Grid>
      <Grid item xs={12} md={6}>
        <ListStyle sx={ChangePasswordStyle}>
          <form onSubmit={formik.handleSubmit}>
            {/* {FirstTime == 'N' ? (
              <Note NoteDetail={note1} />
            ) : (
              <Note NoteDetail={note2} />
            )} */}
            <Box gap={2} >
              {/* <Typography>User Name</Typography> */}
              <TextField
                disabled
                fullWidth
                label="User Name"
                margin="normal"
                name="username"
                type="text"
                // variant="standard"
                value={formik.values.UserLogin}
                sx={{backgroundColor:'#F0F0F0'}}
              />
            </Box>
            <Box >
            <TextField
              fullWidth
              margin="normal"
              label={'Old Password'}
              name="Oldpassword"
              type="password"
              // variant="standard"
              value={formik.values.Oldpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // sx={{ mt: '-0.3rem' }}
            />

            {formik.touched.Oldpassword && formik.errors.Oldpassword ? (
              <Errormessage Error={formik.errors.Oldpassword} />
            ) : null}

            <TextField
              fullWidth
              margin="normal"
              label={'New Password'}
              name="NewPassword"
              type="password"
              // variant="standard"
              value={formik.values.NewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // sx={{ mt: 2 }}
            />

            {formik.touched.NewPassword && formik.errors.NewPassword ? (
              <Errormessage Error={formik.errors.NewPassword} />
            ) : null}
            <TextField
              fullWidth
              margin="normal"
              label={'Confirm Password'}
              name="ConfirmPassword"
              type="password"
              // variant="standard"
              value={formik.values.ConfirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // sx={{ my: 2 }}
            />

            {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword ? (
              <Errormessage Error={formik.errors.ConfirmPassword} />
            ) : null}

            {/* <Note NoteDetail={note} /> */}

            </Box>
            {/* <Grid container spacing={2} justifyContent={'right'}>
              <Grid item
              //  xs={2} md={1}
               >

              <Button
                  onClick={getHomepage}
                  fullWidth
                  // color="secondary"
                  sx={{
                    color:'red',
                    borderRadius:'7px',
                      '&:hover': {
                    color:'red',
                    borderRadius:'7px',
                     backgroundColor: red[100]
                      }}}
                >
                  Cancel
                </Button>
                
              </Grid>
              <Grid item 
              // xs={6} md={2}
              >
              <Button
                  onChange={formik.handleChange}
                  type="submit"
                  fullWidth
                  // color="primary"
                  sx={{
                    color:'green',
                    borderRadius:'7px',
                      '&:hover': {
                    color:'green',
                    borderRadius:'7px',
                     backgroundColor: green[100]
                      }}}
                >
                  Save
                </Button>
              </Grid>
            </Grid> */}
          </form>
        </ListStyle>
      </Grid>
    </Grid>
    </>
  );
}

export default Form;
