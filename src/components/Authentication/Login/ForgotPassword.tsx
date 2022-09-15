import PageHeader from 'src/libraries/heading/PageHeader';
import { useEffect } from 'react';
import GetPasswordApi from 'src/api/Authentication/GetPassword';

import {
  ButtonPrimary,

} from 'src/libraries/styled/ButtonStyle';

import {
  Button,
  TextField,
  Container,
  Card,
  Typography,
  Box,
  Grid,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  IGetPassword,
  GetPasswordResult
} from 'src/interfaces/Authentication/GetPassword';
import BackButton from 'src/libraries/button/BackButton';
import { useNavigate } from 'react-router-dom';
import Note from 'src/libraries/Note/Note';
import { ListStyle } from 'src/libraries/styled/CardStyle';

import Errormessage from 'src/libraries/ErrorMessages/Errormessage';

function ForgotPassword() {
  const br = `\n`;
  const theme = useTheme();
  const asSchoolId = localStorage.getItem('localSchoolId');

  const submitresult = () => {
    debugger;
    const body: IGetPassword = {
      asSchoolId: asSchoolId,
      asLogin: formik.values.Login,
      asDOB: formik.values.DOB,
      asEmailId: formik.values.EmailId
    };
    console.log(body);
    GetPasswordApi.GetPasswordResult(body)
      .then((res) => {
        if (res != null) toast.success('SMS sent you your email address');
        else toast.success(res.data);
      })
      .catch((err) => {
        toast.warning('Failed to send SMS');
      });
  };

  const formik = useFormik({
    initialValues: {
      MobileNo: '',
      Login: '',
      DOB: '',
      EmailId: ''
    },
    onSubmit: (values) => {
      submitresult();
    },
    validate: (values) => {
      const phoneRegExp = /^\d{10}$/; // for Mobile Numbers
      const emailRegExp = /^\S+@\S+\.\S+$/; // for Mobile Numbers

      const errors: any = {};

      if (!values.Login) {
        errors.Login = 'Please enter the User name or Mobile number.';
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
    ' 3) If you dont remember the user then enter mobile number that is currently registered with the RITeSchool account and date of birth.',
    '4) Please enter email id to receive the login details through email.'
  ];

  return (
    <>
      <PageHeader heading={'Forgot Password'} subheading={''} />

      <Container>
        <ListStyle>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label={'UserName/MobileNumber'}
              name="Login"
              type="number"
              variant="standard"
              value={formik.values.Login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ mt: '-0.3rem' }}
              required
            />
            {formik.touched.Login && formik.errors.Login ? (
              <Errormessage Error={formik.errors.Login} />
            ) : null}
            <br />
            <Box>
              <TextField
              fullWidth
              margin="normal"
              label={"Date Of Birth"}
              name="DOB"
              type="date"
              variant="standard"
              value={formik.values.DOB}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ mt: '-0.3rem' }}
              required
            />
            </Box>


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
              required
            />
            {/* <br/>Please enter email id to receive the login details through email. */}

            {formik.touched.EmailId && formik.errors.EmailId ? (
              <Errormessage Error={formik.errors.EmailId} />
            ) : null}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ButtonPrimary color='primary'
                  onChange={formik.handleChange}
                  type="submit"
                  fullWidth
                >
                  Submit
                </ButtonPrimary>
              </Grid>
              <Grid item xs={6}>
                <ButtonPrimary color='secondary' onClick={click} fullWidth>
                  Cancel
                </ButtonPrimary>
              </Grid>
            </Grid>
          </form>

          <Note NoteDetail={note} />
        </ListStyle>
      </Container>
    </>
  );
}

export default ForgotPassword;
