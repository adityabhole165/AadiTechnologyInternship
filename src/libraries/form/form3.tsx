import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonPageHeader from 'src/components/CommonPageHeader';
import { AlertContext } from 'src/contexts/AlertContext';
import { IChangePassword, IChangePasswordResult } from 'src/interfaces/Common/ChangePassword';
import http from 'src/requests/SchoolService/schoolServices';
import { getTermsAndCondition } from 'src/requests/TermAndCondition/TermAndCondition';
import { RootState } from 'src/store';
import Errormessage from '../ErrorMessages/Errormessage';
import { ListStyle } from '../styled/CardStyle';
import { ChangePasswordStyle } from '../styled/CommonStyle';
function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const FirstTime = sessionStorage.getItem('TermsAccepted');

  const TermAndConditions = useSelector(
    (state: RootState) => state.TermAndConditions.GetAcceptTermResult
  );

  const logout = () => {
    localStorage.removeItem('auth');
    sessionStorage.clear();
    navigate('/');
  };

  const getHomepage = () => {
    if (window.location.pathname === '/changePassword') {
      navigate('/');
    } else {
      navigate('/RITeSchool/landing/landing');
    }
  };
  const { showAlert, closeAlert } = useContext(AlertContext);
  const regularExpression = /^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).*$/;
  const [output, setOutput] = useState<IChangePasswordResult>();

  // const submitResult = () => {
  //   const body: IChangePassword = {
  //     asUserName: sessionStorage.getItem('Userlogin'),
  //     asUserId: sessionStorage.getItem('Id'),
  //     asSchoolId: localStorage.getItem('localSchoolId'),
  //     asNewPassword: formik.values.ConfirmPassword,
  //     asOldPassword: formik.values.Oldpassword,
  //   };

  //   dispatch(getTermsAndCondition({ asSchoolId: localStorage.getItem('localSchoolId'), asUserId: sessionStorage.getItem('Id') }));

  //   http.post('School/ChangePassword', body).then((resp) => {
  //     const data = resp.data;
  //     setOutput(data);
  //     if (data === 'True') {
  //       toast.success('Password changed successfully');
  //       logout();
  //     } else {
  //       toast.error(data);
  //     }
  //   });
  // };

  const submitResult = () => {
    const body: IChangePassword = {
      asUserName: sessionStorage.getItem('Userlogin'),
      asUserId: sessionStorage.getItem('Id'),
      asSchoolId: localStorage.getItem('localSchoolId'),
      asNewPassword: formik.values.ConfirmPassword,
      asOldPassword: formik.values.Oldpassword,
    };

    showAlert({
      title: 'Please Confirm',
      message: 'Are you sure you want to change your password?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(getTermsAndCondition({
          asSchoolId: localStorage.getItem('localSchoolId'),
          asUserId: sessionStorage.getItem('Id')
        }));

        http.post('School/ChangePassword', body).then((resp) => {
          const data = resp.data;
          setOutput(data);
          if (data === 'True') {
            toast.success('Password changed successfully');
            logout();
          } else {
            toast.error(data);
          }
        });

        closeAlert();
      },
    });
  };

  // const formik = useFormik({
  //   initialValues: {
  //     UserLogin: sessionStorage.getItem('Userlogin'),
  //     Oldpassword: '',
  //     NewPassword: '',
  //     ConfirmPassword: '',
  //   },
  //   onSubmit: submitResult,
  //   validate: (values) => {
  //     const errors: any = {};
  //     if (!values.Oldpassword) {
  //       errors.Oldpassword = 'Old password should not be blank.';
  //     }
  //     if (!values.NewPassword) {
  //       errors.NewPassword = 'New password should not be blank.';
  //     } else if (values.NewPassword.length < 6) {
  //       errors.NewPassword = 'Password should be of minimum 6 characters.';
  //     } else if (!regularExpression.test(values.NewPassword)) {
  //       errors.NewPassword =
  //         'Password should be a combination of at least one character, digit & special character.';
  //     } else if (values.NewPassword.length > 15) {
  //       errors.NewPassword = 'Password must be a maximum of 15 characters';
  //     }
  //     if (!values.ConfirmPassword) {
  //       errors.ConfirmPassword = 'Confirm password should not be blank.';
  //     } else if (values.ConfirmPassword !== values.NewPassword) {
  //       errors.ConfirmPassword =
  //         'New password and confirm password should be the same.';
  //     }
  //     return errors;
  //   },
  // });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  const formik = useFormik({
    initialValues: {
      UserLogin: sessionStorage.getItem('Userlogin'),
      Oldpassword: '',
      NewPassword: '',
      ConfirmPassword: '',
    },
    onSubmit: submitResult,
    validate: (values) => {
      const errors: any = {};

      if (!values.Oldpassword) {
        errors.Oldpassword = 'Old password should not be blank.';
      }

      if (!values.NewPassword) {
        errors.NewPassword = 'New password should not be blank.';
      } else if (values.NewPassword.length < 6) {
        errors.NewPassword = 'Password should be of minimum 6 characters.';
      } else if (values.NewPassword.length > 15) {
        errors.NewPassword = 'Password must be a maximum of 15 characters';
      } else if (values.NewPassword === values.Oldpassword) {
        errors.NewPassword = 'Old Password and New Password should not be the same.';
      } else if (!passwordRegex.test(values.NewPassword)) {
        errors.NewPassword =
          'Password should be a combination of at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.';
      }
      if (!values.ConfirmPassword) {
        errors.ConfirmPassword = 'Confirm password should not be blank.';
      } else if (values.ConfirmPassword !== values.NewPassword) {
        errors.ConfirmPassword =
          'New password and confirm password should be the same.';
      }

      return errors;
    },
  });

  return (
    <>
      <Box mb={2}>
        <CommonPageHeader
          navLinks={[{ title: 'Change Password', path: ' ' }]}
          rightActions={
            <>
              <Tooltip title={'Change your existing password. You will have to use the same while logging into the site.'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                      backgroundColor: grey[600],
                    },
                  }}
                >
                  <QuestionMark />
                </IconButton>
              </Tooltip>
              {/* <Tooltip title={'Cancel'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: red[500],
                    '&:hover': {
                      backgroundColor: red[600],
                    },
                  }}
                  onClick={getHomepage}
                >
                  <CancelIcon />
                </IconButton>
              </Tooltip> */}
              <Tooltip title={'Save'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: green[500],
                    '&:hover': {
                      backgroundColor: green[600],
                    },
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default behavior
                    formik.handleSubmit(); // Trigger form submission
                  }}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            </>
          }
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
            <Alert variant="filled" severity="info"><b>{'Please reset your password for security purpose.'}</b></Alert>
            <Alert variant="filled" severity="info"><b>{'It seems you have not changed the system generated password. Please reset your password for security purpose.'}</b></Alert>
            <Alert variant="filled" severity="info"><b>{'Capitalization Matters! Min 6 characters, Max 15 characters.'}</b></Alert>
            <Alert variant="filled" severity="info"><b>{'Password should be combination of at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.'}</b></Alert>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Grid container>
        <Grid item md={3}></Grid>
        <Grid item xs={12} md={6}>
          <ListStyle sx={ChangePasswordStyle}>
            <form onSubmit={formik.handleSubmit}>
              <Box gap={2}>
                <TextField
                  disabled
                  fullWidth
                  label="User Name"
                  margin="normal"
                  name="username"
                  type="text"
                  value={formik.values.UserLogin}
                  sx={{ backgroundColor: '#F0F0F0' }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  margin="normal"
                  label={
                    <span>
                      Old Password <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  name="Oldpassword"
                  type="password"
                  value={formik.values.Oldpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Oldpassword && formik.errors.Oldpassword ? (
                  <Errormessage Error={formik.errors.Oldpassword} />
                ) : null}

                <TextField
                  fullWidth
                  margin="normal"
                  label={
                    <span>
                      New Password <span style={{ color: 'red' }}>*</span>
                    </span>}
                  name="NewPassword"
                  type="password"
                  value={formik.values.NewPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.NewPassword && formik.errors.NewPassword ? (
                  <Errormessage Error={formik.errors.NewPassword} />
                ) : null}

                <TextField
                  fullWidth
                  margin="normal"
                  label={
                    <span>
                      Confirm Password <span style={{ color: 'red' }}>*</span>
                    </span>}
                  name="ConfirmPassword"
                  type="password"
                  value={formik.values.ConfirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword ? (
                  <Errormessage Error={formik.errors.ConfirmPassword} />
                ) : null}
              </Box>
              {/* <Grid container spacing={2} justifyContent={'right'}>
                <Grid item>
                  <Button
                    onClick={getHomepage}
                    fullWidth
                    sx={{
                      color: 'red',
                      borderRadius: '7px',
                      '&:hover': {
                        backgroundColor: red[100],
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      color: 'green',
                      borderRadius: '7px',
                      '&:hover': {
                        backgroundColor: green[100],
                      },
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid> */}
            </form>
          </ListStyle>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>
    </>
  );
}

export default Form;
