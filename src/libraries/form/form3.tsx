import {
  Button,
  Checkbox,
  TextField,
  Typography,
  FormControlLabel,
  Link,
  Container,
  Card,
  Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
import { AnyIfEmpty } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  IChangePassword,
  IChangePasswordResult
} from 'src/interfaces/Common/ChangePassword';
import http from 'src/requests/SchoolService/schoolServices';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import {
  ButtonPrimary,
  ButtonSecondary
} from 'src/libraries/styled/ButtonStyle';
import Note from 'src/libraries/Note/Note';
import Errormessage from '../ErrorMessages/Errormessage';
import { ListStyle } from '../styled/CardStyle';
const note = [
  '1) Capitalization Matters! Min 6 characters, Max 15 characters. Password should be combination of at least one character, digit & special character.'
];
function Form() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const getHomepage = () => {
    navigate('/extended-sidebar/landing/landing');
  };

  // const back=()=>{
  //   navigate('/')
  // }
  const regularExpression = /^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).*$/;
  const [viewSent, setoutput] = useState<IChangePasswordResult>();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const Id = sessionStorage.getItem('Id');
  const UserLogin = sessionStorage.getItem('Userlogin');

  const [isSubmit, setIsSubmit] = useState(false);
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
    {
      http
        .post('School/ChangePassword', body)
        .then((resp) => resp.data)
        .then((data) => {
          setoutput(data);
          if (data === 'Old password is incorrect.') {
            setIsSubmit(false);
            toast.error('Old password is incorrect.');
          } else {
            toast.success('Password changed Successfully');
            setIsSubmit(true);

            logout();
            //toast.info('Please login again with your new credentials')
          }
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      Oldpassword: '',
      NewPassword: '',
      ConfirmPassword: ''
    },
    onSubmit: (values) => {
      // console.log('Form Data',values)

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
  // console.log('form errors visited',formik.touched)

  return (
    <Container>
      <ListStyle>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label={'Old Password'}
            name="Oldpassword"
            type="password"
            variant="standard"
            value={formik.values.Oldpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ mt: '-0.3rem' }}
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
            variant="standard"
            value={formik.values.NewPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ mt: '-0.3rem' }}
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
            variant="standard"
            value={formik.values.ConfirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ mt: '-0.3rem' }}
          />

          {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword ? (
            <Errormessage Error={formik.errors.ConfirmPassword} />
          ) : null}

          <Note NoteDetail={note} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ButtonPrimary
                onChange={formik.handleChange}
                type="submit"
                fullWidth
                color='primary'
              >
                Save
              </ButtonPrimary>
            </Grid>
            <Grid item xs={6}>
              <ButtonPrimary onClick={getHomepage} fullWidth
                color='secondary'>
                Cancel
              </ButtonPrimary>
            </Grid>
          </Grid>
        </form>
      </ListStyle>
    </Container>
  );
}

export default Form;
