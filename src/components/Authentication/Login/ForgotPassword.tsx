import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GetPasswordApi from 'src/api/Authentication/GetPassword';
import { IGetPassword } from 'src/interfaces/Authentication/GetPassword';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
import Note from 'src/libraries/Note/Note';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { HelperText, ListStyle } from 'src/libraries/styled/CardStyle';
import { ChangePasswordStyle } from 'src/libraries/styled/CommonStyle';
import { BoxStyle } from 'src/libraries/styled/HeadingStyled';

function ForgotPassword() {
  const theme = useTheme();
  const schoolId = localStorage.getItem('localSchoolId');

  const submitresult = () => {
    const getPasswordAPIBody: IGetPassword = {
      asSchoolId: schoolId,
      asLogin: formik.values.Login,
      asDOB: formik.values.DOB,
      asEmailId: formik.values.EmailId
    };
    GetPasswordApi.GetPasswordResult(getPasswordAPIBody)
      .then((res: any) => {
        if (res.status === 200 && res.data == null) {
          toast.success('SMS has been Sent', { toastId: 'success1' });
          formik.resetForm();
        }
        if (res.data == 'Provided details are not valid.') {
          toast.error('Provided details are not valid.', { toastId: 'error1' });
        }
        if (
          res.data ==
          'Login details have already been sent to you. Please try after 24 Hrs.'
        ) {
          toast.error(
            'Login details have already been sent to you. Please try after 24 Hrs.',
            { toastId: 'error2' }
          );
        }
        if (res.data == 'Failed to send the SMS.') {
          toast.error('Failed to send the SMS.', { toastId: 'error3' });
        }
      })
      .catch((err) => {
        toast.error('Failed to send SMS');
      });
  };

  const formik = useFormik({
    initialValues: {
      Login: '',
      DOB: '',
      EmailId: ''
    },
    onSubmit: (values) => {
      submitresult();
    },
    validate: (values) => {
      const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      const errors: any = {};
      if (!values.Login) {
        errors.Login = 'Please enter the user name.';
      }
      if (!values.DOB) {
        errors.DOB = 'Date of Birth should not be blank.';
      }
      if (!values.EmailId) {
        errors.EmailId = 'Email Id should not be blank.';
      } else if (!emailRegExp.test(values.EmailId)) {
        errors.EmailId = 'Invalid email address';
      }
      return errors;
    }
  });

  const navigate = useNavigate();

  const click = () => {
    navigate('/schoolList');
  };

  const note = [
    '1) Parents need to enter the date of birth of their child.',
    '2) Please enter the user name and date of birth, the system will SMS you the password on the mobile number registered with the  RITeSchool account.',
    '3) Please enter email id to receive the login details through email.'
  ];

  return (
    <BoxStyle>
      <Container>
        <PageHeader heading={'Forgot Password'} subheading={''} />
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={12} lg={6}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <img
                src="/imges/forgotpassword.png"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Stack>
            <Box mt={2}>
              <ListStyle sx={ChangePasswordStyle}>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label={'User Name'}
                    name="Login"
                    type="text"
                    variant="standard"
                    value={formik.values.Login}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ mt: '-0.3rem' }}
                  />
                  {formik.touched.Login && formik.errors.Login ? (
                    <Errormessage Error={formik.errors.Login} />
                  ) : null}
                  <HelperText>{'Date of Birth'}</HelperText>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="DOB"
                    type="date"
                    variant="standard"
                    placeholder="DD/MM/YYYY"
                    value={formik.values.DOB}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ mt: '-0.3rem' }}
                  />
                  {formik.touched.DOB && formik.errors.DOB ? (
                    <Errormessage Error={formik.errors.DOB} />
                  ) : null}
                  <TextField
                    fullWidth
                    margin="normal"
                    label={'Email Id'}
                    name="EmailId"
                    type="text"
                    variant="standard"
                    value={formik.values.EmailId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ mt: '-0.3rem' }}
                  />
                  {formik.touched.EmailId && formik.errors.EmailId ? (
                    <Errormessage Error={formik.errors.EmailId} />
                  ) : null}
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <ButtonPrimary
                        color="primary"
                        onChange={formik.handleChange}
                        type="submit"
                        fullWidth
                      >
                        Submit
                      </ButtonPrimary>
                    </Grid>
                    <Grid item xs={6}>
                      <ButtonPrimary
                        color="secondary"
                        onClick={click}
                        fullWidth
                      >
                        Cancel
                      </ButtonPrimary>
                    </Grid>
                  </Grid>
                </form>
                <Note NoteDetail={note} />
              </ListStyle>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </BoxStyle>
  );
}

export default ForgotPassword;
